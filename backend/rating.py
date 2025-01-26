from random import randint

class Rating:
    def __init__(self, software_engineering, data_science, business, medical, mechanical_engineering):
        self.software_engineering = software_engineering
        self.data_science = data_science
        self.business = business
        self.medical = medical
        self.mechanical_engineering = mechanical_engineering

    def to_dict(self):
        """
        Convert the Rating object to a dictionary for JSON serialization.
        """
        return {
            "software_engineering": self.software_engineering,
            "data_science": self.data_science,
            "business": self.business,
            "medical": self.medical,
            "mechanical_engineering": self.mechanical_engineering,
        }

def random_rating():
    return Rating(randint(1, 10), randint(1, 10), randint(1, 10), randint(1, 10), randint(1, 10))