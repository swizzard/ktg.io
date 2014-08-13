# coding=utf8
__author__ = 'Sam Raker'


from flask import Flask, render_template
from flask_jsonrpc import JSONRPC

from ktg import get_fours, get_eights

app = Flask(__name__)
jsonrpc = JSONRPC(app, '/api')

@app.route('/')
def home():
    return render_template("home.html")



@jsonrpc.method('ktat.get')
def get_tats(method="fours", dupes=False):
    if method == "fours":
        tats = get_fours(dupes)
    elif method == "eights":
        tats = get_eights()
    else:
        raise ValueError("Method must be one of 'fours' or 'eights'")
    return {"left": tats[0], "right": tats[1]}


if __name__ == "__main__":
    app.run(debug=True)