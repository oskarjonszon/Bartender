from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from werkzeug.exceptions import abort, HTTPException, NotFound

import jwt
import json
import bcrypt
import uuid
import sqlite3

secret = 'UIYbRbFqLiwQ08Gk96OUyc75LF8l5JfXaujxPhwzotXQqvclwPkvOEcf9omGSiq'
algorithm = 'HS256'

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

class Welcome(Resource):
    def get(self):
        return 'Welcome to the API'


class GetDrink(Resource):
    def get(self, drink_id):
        with sqlite3.connect("./server/drinks.db") as con:

            c = con.cursor()
            c.execute(
                """
                SELECT drink_id, drink_name, image, description, username
                FROM drinks
                WHERE drink_id = ?
                """, 
                [drink_id]
            )

            row = c.fetchone()

            if row is not None:
                drink = {
                    "id" : row[0],
                    "name" : row[1],
                    "description" : row[2],
                    "image" : row[3],
                    "username" : row[4]
                }

                c.execute(
                    """
                    SELECT ingredient_name, amount, measurement, parts, type, drink_id
                    FROM ingredients
                    WHERE drink_id = ?
                    """,
                    [drink_id]
                )

                ingredients = [{"name": ingredient_name, "amount": amount, 
                    "measurements" : measurement, "parts" : parts, "type" : type, "drink_id" : drink_id}
                    for (ingredient_name, amount, measurement, parts, type, drink_id) in c]
                
                drink['ingredients'] = ingredients

            return drink


class Drinks(Resource):
    def get(self):
        with sqlite3.connect("./server/drinks.db") as con:

            #TODO: Update with query parameters. (limit/page, search terms etc.)

            c = con.cursor()
            c.execute(
                """
                SELECT drink_id, drink_name, image, username
                FROM drinks
                """
            )

            data = [{"drink_id": drink_id, "drink_name": drink_name, "image": image, "username" : username}
                for (drink_id, drink_name, image, username) in c]

            return data

    def post(self):
        try:
            with sqlite3.connect("./server/drinks.db") as con:
            
                drink = request.get_json()    
                drink_id = str(uuid.uuid4())
                token = jwt.decode(drink['token'], secret, algorithms='HS256')
                username = token['username']
            
                if not (drink['name'] and drink['ingredients'] and username):
                    return {"error": "Missing parameter"}

                c = con.cursor()
                c.execute(
                    """
                    INSERT INTO drinks (drink_id, drink_name, description, image, username)
                    VALUES (?, ?, ?, ?, ?)
                    """,
                    [drink_id, drink['name'], drink['description'], drink['image'], username]
                )
                con.commit()

                ingredients = []

                for ingredient in drink['ingredients']:
                    ingredients.append((drink_id, ingredient['name'], ingredient['amount'], 
                    ingredient['measurement'], ingredient['parts'], ingredient['type']))

                c.executemany(
                    """
                    INSERT INTO ingredients (drink_id, ingredient_name, amount, measurement, parts, type)
                    VALUES (?, ?, ?, ?, ?, ?)
                    """,
                    ingredients
                )
                con.commit()

                return format_json(drink_id) 

        except jwt.exceptions.InvalidSignatureError:
            return {"Error" : "Token Could not be read"}
        except:
            return {"Error" : "Something Went Wrong"}

            

class AuthenticateUser(Resource):
    def post(self):
        with sqlite3.connect("./server/drinks.db") as con:

            data = request.get_json()
            username = data['username']
            password = data['password']

            c = con.cursor()

            c.execute(
                """
                SELECT password
                FROM users 
                WHERE username = ?
                """,
                [username]
            )

            row = c.fetchone()

            if row is not None:

                h_password = row[0]

                #TODO: Make expire date. Change Username to User_Id
                expire = "2000"

                if check_password(password, h_password):
                    token = jwt.encode({"username" : username, "expires" : expire}, secret, algorithm)
                    return {"id" : token.decode('utf-8'), "expires" : expire}
            else:
                abort(401)


class CreateUser(Resource):
    def post(self):
        with sqlite3.connect("./server/drinks.db") as con:

            #TODO: User_Id.

            username = request.form['username']
            password = request.form['password']

            h_password = hash_password(password)

            if not (username and password):
                return {"error": "Missing parameter"}

            c = con.cursor()

            c.execute(
                """
                SELECT username
                FROM users
                WHERE username = ?
                """,
                [username]
            )

            if c.fetchone():
                return {"error": "Username already exists"}

            c.execute(
                """
                INSERT INTO users (username, password)
                VALUES (?, ?)
                """,
                [username, h_password]
            )
            con.commit()

            return {'username' : username}

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def check_password(password, h_password):
    return bcrypt.checkpw(password.encode('utf-8'), h_password)

def format_json(data):
    return json.dumps(data)


api.add_resource(Welcome, '/')
api.add_resource(AuthenticateUser, '/token')
api.add_resource(CreateUser, '/users')
api.add_resource(Drinks, '/drinks')
api.add_resource(GetDrink, '/drinks/<drink_id>')

if __name__ == '__main__':
    app.run(debug=True)
