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
collection = db['test-collection']

@app.route('/')
def hello_world():
    all = collection.find()
    print(all)
    return 'Hello, World!'

if __name__ == "__main__":        
    app.run()   