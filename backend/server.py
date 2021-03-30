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
db = client['businessDB']
c_Users = db['users']

@app.route('/')
def hello_world():
    return 'Hello from backend python'

if __name__ == "__main__":        
    app.run()   