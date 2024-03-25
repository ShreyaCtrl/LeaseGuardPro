from app import mongo

class Branch:
    def __init__(self, name, location):
        self.name = name
        self.location = location

    def save(self):
        mongo.db.branches.insert_one({
            'name': self.name,
            'location': self.location
        })

    @staticmethod
    def get_all():
        return list(mongo.db.branches.find())