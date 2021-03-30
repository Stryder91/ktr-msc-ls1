from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
import uuid
import os
import datetime
import bcrypt
import pymongo
from pymongo import MongoClient
from mongoflask import MongoJSONEncoder, ObjectIdConverter
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required,
get_jwt_identity)


app = Flask(__name__)
app.config.from_object(__name__)
app.json_encoder = MongoJSONEncoder
CORS(app, resources={r'/*': {'origins': '*'}})

# Package allowing us to use .env 
load_dotenv()

jwt=JWTManager(app)
app.config['JWT_SECRET_KEY'] = 'very-secret-for-epitech-app-should-come-from-env'

client = MongoClient(os.getenv("DATABASE_URL"))
# Global variables to store our database and collections in db
db = client['test']
c_Users = db['users']
c_Cards = db['cards']

# If needed to check backend
@app.route('/')
def hello_world():
    return 'Hello from backend python'

@app.route('/addBusinessCard', methods=['POST'])
def addCard():
    card_form = request.get_json()
    newCard = {**card_form}
    c_Cards.insert_one(newCard)
    return (newCard)

# We retrieve all cards from 'cards' collection where 'user' = our own name (logged user name)
@app.route('/getAllCards', methods=['POST'])
def getCards():
    loggedUser = request.get_json()
    all = c_Cards.find({"user": loggedUser['username']})
    print(all, loggedUser)
    return jsonify(list(all))


# Registering allow us to create our own business card
@app.route('/register', methods=['POST'])
def register():
    form_submitted = request.get_json()

    # Only name and password are required
    if "name" in form_submitted and "password" in form_submitted:
        myUser = c_Users.find_one({"name": form_submitted['name'] })
        if myUser != None:
            return ("This username is already taken")
        else:
            # hashing passwd with bytes and salt to avoir rainbow table attacks
            hashed = bcrypt.hashpw(bytes(form_submitted["password"], encoding="utf-8"), bcrypt.gensalt())
            # We overload our dict form with the new hashed password
            userToInsert = { **form_submitted,
                "password" : hashed
            }
            # Given inserted_id return an _id
            c_Users.insert_one(userToInsert).inserted_id
            return "OK"
    else:
        print("Username or password are missing")
        # Need to implement an Error method

# We need to login to access our business cards and add new business cards
@app.route('/login', methods=['POST'])
def login():
    form_login = request.get_json()
    if "name" in form_login and "password" in form_login:
        user = c_Users.find_one({"name": form_login["name"]})
        print("coucou")
    
        # If a user with the match name exists in db
        if user:        
            # Password in bytes to hash
            password = bytes(form_login["password"], encoding="utf-8")

            # Generating salt to avoid rainbow table attacks
            hashed = bcrypt.hashpw(password, bcrypt.gensalt())

            passwordInDb = user["password"]

            # Check if password matches the hashed password
            if bcrypt.checkpw(password, passwordInDb):
                # We issue an access token and a refresh token
                access_token = create_access_token(identity=form_login['name'])
                refresh_token = create_refresh_token(identity=form_login['name'])
                return jsonify({
                    'username': { 
                        'name': user['name'],
                        'email': user['email'],
                        'company' : user['company'],
                        'telephone' : user['telephone']
                    },
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                })
            else:
                # Need to implement a proper Error
                return("Password didn't match")
        else :
            # Need to implement a proper Error
            return("User not found")
    else:
        # Need to implement a proper Error and a password length minimum ?
        return("Email or password not existing ")
    return jsonify(form_login)

if __name__ == "__main__":        
    app.run()   