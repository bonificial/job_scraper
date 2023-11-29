from flask import Flask, request, jsonify
from bardapi import Bard  # Import Bard API
import os
app = Flask(__name__)

# Initialize Bard API with your token


token = os.environ.get('BARD_API_TOKEN')


if token:
    print(f"The Bard API token is: {token}")
else:
    print("Bard API token is not set.")

bard = Bard(token=token)

@app.route('/process_message', methods=['POST'])
def process_message():
    if 'message' in request.json:
        message = request.json['message']
        response = bard.get_answer(message)['content']
        # return jsonify({"response": response})
        return response
    else:
        return jsonify({"error": "Message not found in request"}), 400

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)