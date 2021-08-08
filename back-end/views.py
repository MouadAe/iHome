from dns.rdatatype import NULL
from flask import Flask , jsonify, request, redirect, Response, send_file
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin
import io
from base64 import encodebytes
from PIL import Image
from bson import json_util
from bson.objectid import ObjectId


app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "ihome_secrets" 
jwt = JWTManager(app)
app.config["MONGO_URI"] = "mongodb+srv://soufiane:ihomedb@cluster0.lxgog.mongodb.net/ihome?retryWrites=true&w=majority"
mongo = PyMongo(app)


@app.route('/SignUp', methods=['POST'])
def SignUp():

    data=request.get_json()
    user=mongo.db.users.find_one({"email": data['email']})   
    ##print(data['email'],user)
    if user :
        response= jsonify({"status": "DEJA_EXIST"})
        response.status_code=404
    else:
        hashed_pass=generate_password_hash(data['password'])
        id=mongo.db.users.insert({"email": data['email'], "password":hashed_pass , "status": data['status'] })
        
        userActuel=mongo.db.users.find_one({"_id": ObjectId(id)})
        access_token = create_access_token({ "id": str(userActuel['_id']), "email": userActuel['email'],"status":userActuel['status']})
        response= jsonify(access_token)
        response.status_code=200

    return response



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



@app.route('/Addpost',methods=['POST'])
def addPosts() :

    data=request.form
    print(data)
    print(request.files['file1'].filename)
    img1= request.files['file1'] if request.files.__contains__("file1") else NULL
    
    img2= request.files['file2'] if request.files.__contains__("file2") else NULL
    img3= request.files['file3'] if request.files.__contains__("file3") else NULL
    img4= request.files['file4'] if request.files.__contains__("file4") else NULL
    img5= request.files['file5'] if request.files.__contains__("file5") else NULL
    filename1= "NOT_SET" if img1 is NULL else img1.filename
    filename2= "NOT_SET" if img2 is NULL else img2.filename
    filename3= "NOT_SET" if img3 is NULL else img3.filename
    filename4= "NOT_SET" if img4 is NULL else img4.filename
    filename5= "NOT_SET" if img5 is NULL else img5.filename

    post=mongo.db.posts.insert({"title": data['title'], "owner": data['owner'], "charges": data['charges'], "address" : data['address'],
    "nChamber": int(data['nChamber']), "equiped": data['equiped'], "prix": float(data['prix']),"date": data['date'], "image1": filename1,
    "image2": filename2,"image3": filename3,"image4": filename4,"image5": filename5});
    if post :
        name1=filename1.split(".") if filename1 is not NULL else NULL
        name2=filename2.split(".") if filename2 is not NULL else NULL
        name3=filename3.split(".") if filename3 is not NULL else NULL
        name4=filename4.split(".") if filename4 is not NULL else NULL
        name5=filename5.split(".") if filename5 is not NULL else NULL

        img1.save("images/"+name1[0]+"_"+str(post)+"."+name1[1]) if img1 is not NULL else NULL
        img2.save("images/"+name2[0]+"_"+str(post)+"."+name2[1]) if img2 is not NULL else NULL
        img3.save("images/"+name3[0]+"_"+str(post)+"."+name3[1]) if img3 is not NULL else NULL
        img4.save("images/"+name4[0]+"_"+str(post)+"."+name4[1]) if img4 is not NULL else NULL
        img5.save("images/"+name5[0]+"_"+str(post)+"."+name5[1]) if img5 is not NULL else NULL

        postActuel=mongo.db.posts.find_one({"_id": ObjectId(post)})
        print(postActuel)
        response= json_util.dumps({"post" : postActuel})

        return Response(response, mimetype="application/json") , 200

    response= jsonify({"status": "NOT_ADDED"})
    response.status_code=403
    return response
    
@app.route('/Updatepost',methods=['POST'])
def UpdatePosts() :

    data=request.get_json()

    doc = mongo.db.posts.find_one_and_update(
    {"_id" : ObjectId(data['id'])},
    {"$set":
        {"charges": data['charges'], "nChamber": int(data['nChamber']), "equiped": data['equiped'], "prix": float(data['prix'])}
    },upsert=True)

    if doc :
        response= jsonify({"status": "UPDATED"})
        response.status_code=200
        return response

    response= jsonify({"status": "NOT_UPDATE"})
    response.status_code=403
    return response 
    


def get_response_image(image_path):
    pil_img = Image.open(image_path, mode='r') # reads the PIL image
    byte_arr = io.BytesIO()
    pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
    encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
    return encoded_img

@app.route('/Getposts',methods=['GET'])
def getPosts() :

    posts=mongo.db.posts.find()
    postVf=[]
    for post in posts :
        encoded_imges = []
        print(post['image3'])
        nameP1=post['image1'].split('.') if post['image1'] != "NOT_SET" else 0
        nameP2=post['image2'].split('.') if post['image2'] != "NOT_SET" else 0
        nameP3=post['image3'].split('.') if post['image3'] != "NOT_SET" else 0
        nameP4=post['image4'].split('.') if post['image4'] != "NOT_SET" else 0
        nameP5=post['image5'].split('.') if post['image5'] != "NOT_SET" else 0
        postVf.append(post)

       
    response = json_util.dumps(postVf)
    return Response(response, mimetype="application/json")
    


@app.route('/GetOnePost/<id>', methods=['GET'])
def GetOnePost(id) :

    dataUser=id.split("_")
    post=mongo.db.posts.find_one({"_id" : ObjectId(dataUser[0])})
    demande= mongo.db.demandes.find_one({"postId" : str(dataUser[0]), "userName" : dataUser[1]})
    print(demande)    
    if demande :
        response = json_util.dumps({"post" : post, "demande" : demande })
    else:
        response = json_util.dumps({"post" : post })

    return Response(response, mimetype="application/json") , 200

@app.route('/AddDemande',methods=['POST'])
def addDemande() :
    data=request.get_json()
    post=mongo.db.demandes.insert({"postId" : data['postId'],"prix" : float(data['prix']), "userName": data['userName'],"date": data['date'], "owner" : data['owner'], "status": "Processing"})
    response= jsonify({"status": "Added"})
    response.status_code=200
    return response

@app.route('/DeleteDemande',methods=['POST'])
def DeleteDemande() :
    data=request.get_json()
    print(data['postId'])
    mongo.db.demandes.delete_one({"_id" : ObjectId(data['postId'])})
    response= jsonify({"status": "Deleted"})
    response.status_code=200
    return response


@app.route('/Deletepost',methods=['POST'])
def Deletepost() :
    data=request.get_json()

    mongo.db.posts.delete_one({"_id" : ObjectId(data['id'])})
    response= jsonify({"status": "Deleted"})
    response.status_code=200
    return response

@app.route('/GetRequest/<id>',methods=['GET'])
def getRequests(id) :
    
    posts=mongo.db.posts.find({"owner" : id})
    dems=[]
    for post in posts :
        req=mongo.db.demandes.find({"postId" : str(post['_id'])})
        ds=[]
        for r in req :
            ds.append(r)  

        dems.append({"id_post": str(post['_id']), "requests": ds})

    response = json_util.dumps({"requests" : dems })

    return Response(response, mimetype="application/json") , 200

@app.route('/UpdateStatus',methods=['POST'])
def updateRequests() :
    
    data= request.get_json()

    doc = mongo.db.demandes.update_many(
        {"postId" : data["postId"]},
        {"$set":
            {"status": "Refused"}},upsert=True)
    
    doc1 = mongo.db.demandes.find_one_and_update(
        {"_id" : ObjectId(data['reqId'])},
        {"$set":
            {"status": "Accepted"}
        },upsert=True)
    postAct=mongo.db.posts.find_one({"_id" : ObjectId(data["postId"])})
    print(postAct['address'])

    mongo.db.Bills.insert({"name" : data['userName'], "adresse" : postAct['address'], "type" : "Non Payé"})
    response = json_util.dumps({"requests" : "test" })

    return Response(response, mimetype="application/json") , 200


@app.route('/GetBills/<id>',methods=['GET'])
def getBills(id) :
    
    bills=mongo.db.Bills.find({"name" : id})

    response = json_util.dumps({"bills" : bills })

    return Response(response, mimetype="application/json") , 200

@app.route('/UpdateBill',methods=['POST'])
def UpdateBill() :
    
    data= request.get_json()
    
    doc1 = mongo.db.Bills.find_one_and_update(
        {"_id" : ObjectId(data['id'])},
        {"$set":
            {"type": "payé"}
        },upsert=True)

    response = json_util.dumps({"bills" : "updated" })

    return Response(response, mimetype="application/json") , 200




@app.route('/images/<filenameimg>',methods=['GET'])
def getImage(filenameimg) :

    return send_file("images/"+filenameimg,mimetype="image/jpg")
    