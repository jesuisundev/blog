from flask import Flask, request
app = Flask(__name__)

from controllers import search

@app.route('/search', methods=['GET'])
def _search():
    """
    Launch the images search on each existing provider

    Returns:
        string -- array of images found on different provider
    """
    result = search.search(dict(request.args))

    return str(result)