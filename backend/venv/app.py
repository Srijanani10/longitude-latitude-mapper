from flask import Flask, request, jsonify
import pandas as pd
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

# Ensure the upload folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/upload', methods=['POST'])
def upload_files():
    data = {}

    for file_key in request.files:
        file = request.files[file_key]
        if file and (file.filename.endswith('.xlsx') or file.filename.endswith('.csv')):
            # Save the file
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(file_path)

            # Process the file
            if file.filename.endswith('.csv'):
                df = pd.read_csv(file_path)
            else:
                df = pd.read_excel(file_path)

            # Filter out rows with missing LATITUDE or LONGITUDE values
            df = df[['LATITUDE', 'LONGITUDE']].dropna(subset=['LATITUDE', 'LONGITUDE'])

            # Add cleaned data to response
            data[file.filename] = df.to_dict(orient='records')

    return jsonify(data), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
