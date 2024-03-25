from api import mongo

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
        branches = mongo.db.branches.find()
        return [branch for branch in branches]
