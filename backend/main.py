from flask import Flask, jsonify, request
import base64
import os

from rating import random_rating
from resume import Resume
from enum import Enum

app = Flask(__name__)

resumes = []

class GameType(Enum):
    SOFTWARE_ENGINEERING = 0
    DATA_SCIENCE = 1
    BUSINESS = 2
    MEDICAL = 3
    MECHANICAL_ENGINEERING = 4

@app.route("/resumes", methods=['GET'])
def get_resumes():
    game_type_str = request.args.get('game_type', 'SOFTWARE_ENGINEERING').upper()
    try:
        game_type = GameType[game_type_str]
    except KeyError:
        game_type = GameType.SOFTWARE_ENGINEERING  # Default to SOFTWARE_ENGINEERING if invalid
    return jsonify([[pair[0].to_dict(), pair[1].to_dict()] for pair in pair_resumes(resumes, game_type)])


def convert_to_pix(pdf_path):
    """
    Convert the first page of a PDF file to a fitz.Pixmap object.

    :param pdf_path: Path to the PDF file.
    :return: fitz.Pixmap object of the first page.
    """
    scale = 300 / 72  # Scale for high resolution (300 DPI)
    pdf_document = fitz.open(pdf_path)

    # Convert the first page to a pixmap
    page = pdf_document[0]
    mat = fitz.Matrix(scale, scale)
    pix = page.get_pixmap(matrix=mat)

    pdf_document.close()
    return pix


def pix_to_base64(pix):
    """
    Convert a fitz.Pixmap to a Base64 string.

    :param pix: fitz.Pixmap object.
    :return: Base64 string of the image.
    """
    return base64.b64encode(pix.tobytes()).decode("utf-8")


def load_resumes(folder_path):
    """
    Load and process resumes from a folder.

    :param folder_path: Path to the folder containing PDF files.
    :return: List of Resume objects.
    """
    resumes = []
    for file_name in os.listdir(folder_path):
        if file_name.lower().endswith(".pdf"):  # Check if the file is a PDF
            pdf_path = os.path.join(folder_path, file_name)
            pix = convert_to_pix(pdf_path)  # Convert PDF to pixmap
            image_b64 = pix_to_base64(pix)  # Convert pixmap to Base64 string
            text = pdf_to_text(pdf_path)
            resumes.append(Resume(False, random_rating(), image_b64, text, False))  # Create Resume object

    print("Resumes imported")
    return resumes


def save_image_from_base64(base64_string, output_path):
    """
    Save an image from a Base64 string to a specified file. FOR TESTING

    :param base64_string: The Base64-encoded string of the image.
    :param output_path: The path where the image will be saved (including file name and extension).
    """
    try:
        # Decode the Base64 string to binary image data
        image_data = base64.b64decode(base64_string)

        # Write the binary image data to a file
        with open(output_path, "wb") as image_file:
            image_file.write(image_data)

        print(f"Image successfully saved to {output_path}")
    except Exception as e:
        print(f"Failed to save image: {e}")
import fitz  # PyMuPDF

def pdf_to_text(pdf_path):
    """
    Converts a PDF file to a string by extracting all its text.

    :param pdf_path: Path to the PDF file.
    :return: A string containing the entire text of the PDF.
    """
    # Open the PDF
    pdf_document = fitz.open(pdf_path)

    # Initialize an empty string to store the content
    pdf_text = ""

    # Iterate through each page of the PDF
    for page_num in range(pdf_document.page_count):
        page = pdf_document.load_page(page_num)
        pdf_text += page.get_text()

    pdf_document.close()

    return pdf_text
#[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
def pair_resumes(resumes, game_type: GameType):
    pairings = []
    num_resumes = len(resumes)
    for i in range(0, num_resumes - 1, 2):
        r1 = resumes[i]
        r2 = resumes[i+1]
        expected_winner([r1, r2], game_type)
        pairings.append([r1, r2])
    return pairings

def expected_winner(pair, game_type: GameType):
    r1 = pair[0]
    r2 = pair[1]

    if game_type == GameType.SOFTWARE_ENGINEERING:
        r1_better = r1.rating.software_engineering > r2.rating.software_engineering
    elif game_type == GameType.DATA_SCIENCE:
        r1_better = r1.rating.data_science > r2.rating.data_science
    elif game_type == GameType.BUSINESS:
        r1_better = r1.rating.business > r2.rating.business
    elif game_type == GameType.MEDICAL:
        r1_better = r1.rating.medical > r2.rating.medical
    elif game_type == GameType.MECHANICAL_ENGINEERING:
        r1_better = r1.rating.mechanical_engineering > r2.rating.mechanical_engineering
    else:
        r1_better = False # Default case if game_type is not recognized

    r1.is_better = r1_better
    r2.is_better = not r1_better


if __name__ == '__main__':
    resumes = load_resumes("resumes/pdf")
    # Flask will run and allow testing via the "/resumes" endpoint
    app.run(debug=True)
