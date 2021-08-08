from views import app
from flask import Flask , jsonify, request, redirect
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
load_dotenv()
import os




jwt = JWTManager(app)
app.config["MONGO_URI"] = "mongodb+srv://soufiane:ihomedb@cluster0.lxgog.mongodb.net/ihome?retryWrites=true&w=majority"
mongo = PyMongo(app)


@app.route('/Login', methods=['POST'])
def login():

    data=request.get_json()
    user=mongo.db.users.find_one({"email": data['email']})   
    
    if user :
       if check_password_hash(user['password'],data['password']) :
            access_token = create_access_token({ "id": str(user['_id']), "email": user['email'],"status":user['status']})
            response= jsonify(access_token)
            response.status_code=200
       else:
            response= jsonify({"status": "PASSWORD_NOT_MTACH"})
            response.status_code=403
    else:
        response= jsonify({"status": "MUST_SIGNUP"})
        response.status_code=403

    return response