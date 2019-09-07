import os

from flask import Flask
from flask import render_template
from flask import request

from flask_sqlalchemy import SQLAlchemy

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "customer.db"))

app = Flask(__name__, template_folder='templates')
app.config["SQLALCHEMY_DATABASE_URI"] = database_file

db = SQLAlchemy(app)

class Cusotmer(db.Model):
    username = db.Column(db.String(100), unique=True, nullable=False, primary_key=True)
    full_name = db.Column(db.String(150), unique=True, nullable=False)
    address = db.Column(db.String(300), unique=True, nullable=False)

    def __repr__(self):
        return "<username: {}> :: <full_name: {}> :: <address: {}>".format(self.title, self.full_name, self.address)

class Item(db.Model):
    number = db.Column(db.String(100), unique=True, nullable=False, primary_key=True)
    description = db.Column(db.String(100), unique=True, nullable=False, primary_key=True)

@app.route("/user", methods=["GET", "POST"])
def home():
    order_number = ['123', '456', '789']
    return render_template("contact.html", order_number=order_number)