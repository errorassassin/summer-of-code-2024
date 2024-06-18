import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'uebfhb@*$U&bfhrbuh6969'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://postgres:Pulkit$321@localhost/PoS'
    SQLALCHEMY_TRACK_MODIFICATIONS = False