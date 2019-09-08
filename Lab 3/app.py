import os

from flask import Flask
from flask import render_template
from flask import request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "customer.db"))

app = Flask(__name__, template_folder='templates')
app.config["SQLALCHEMY_DATABASE_URI"] = database_file
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# class Cusotmer(db.Model):
#     username = db.Column(db.String(100), unique=True, nullable=False, primary_key=True)
#     full_name = db.Column(db.String(150), unique=True, nullable=False)
#     address = db.Column(db.String(300), nullable=False)
#     phone_number = db.Column(db.String(10), unique=True, nullable=False)

#     def __repr__(self):
#         return "<username: {}> :: <full_name: {}> :: <address: {}>".format(self.title, self.full_name, self.address)

# This is the inventory of the stock.
class Item(db.Model):
    ext_id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.String(20), nullable=False)
    price_dollar = db.Column(db.Float, nullable=False)
    price_baht = db.Column(db.Float)
    #TODO Add relationship to customer

class ItemLookup(db.Model):
    number = db.Column(db.String(20), unique=True, nullable=False, primary_key=True)
    description = db.Column(db.String(100), unique=True, nullable=False)


@app.route("/item", methods=["GET", "POST"])
def item():
    if request.method == "POST":
        # Do post processing
        pass
    # Do get processing...
    return render_template("item.html")

@app.route("/user", methods=["GET", "POST"])
def user():
    items = []
    for i in range(3):
        items.append(ItemLookup(number="FTest", description="testDescription_{}".format(i)))

    for item in items:
        existed = ItemLookup.query.filter_by(number=item.number).all()
        if not existed:
            db.session.add(item)
            db.session.commit()
    print("add completed")

    [print(i.number, i.description) for i in ItemLookup.query.all()]
    order_number = ['123', '456', '789']
    return render_template("contact.html", order_number=order_number)