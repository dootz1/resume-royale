class Resume:
    def __init__(self, is_selected, rating, resume, text, is_better = False):
        self.is_selected = is_selected
        self.rating = rating
        self.resume = resume # insane pdf thing to figure out
        self.text = text
        self.is_better = is_better

    def to_dict(self):
        """
        Convert the Resume object to a dictionary for JSON serialization.
        """
        return {
            "is_selected": self.is_selected,
            "rating": self.rating.to_dict() if self.rating else None,
            "resume": self.resume[:200] + "...",
            "text": self.text[:200] + "...",
            "is_better": self.is_better,
        }
