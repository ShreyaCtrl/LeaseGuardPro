from app import mongo

class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email

    def save(self):
        mongo.db.users.insert_one({
            'username': self.username,
            'email': self.email
        })

    @staticmethod
    def get_all():
        return list(mongo.db.users.find())

