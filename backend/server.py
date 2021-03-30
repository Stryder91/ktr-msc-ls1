from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
import os
import pymongo
from pymongo import MongoClient


app = Flask(__name__)

# Package allowing us to use .env 
load_dotenv()

client = MongoClient(os.getenv("DATABASE_URL"))
# Global variables to store our database and collections in db
db = client['businessDB']
c_Users = db['users']

# If needed to check backend
@app.route('/')
def hello_world():
    return 'Hello from backend python'

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
                access_token = create_access_token(identity=form_login['email'])
                refresh_token = create_refresh_token(identity=form_login['email'])
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