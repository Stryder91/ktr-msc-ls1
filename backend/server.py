from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient

app = Flask(__name__)

# Package allowing us to use .env 
load_dotenv()

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == "__main__":        
    app.run()   