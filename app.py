from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Perform object detection (replace this with your actual detection logic)
        # processed_image = perform_object_detection(filepath)
        
        processed_image = 'path_to_processed_image.jpg'  # Placeholder for processed image path
        
        return jsonify({
            'original_image': filepath,
            'processed_image': processed_image
        })

if __name__ == '__main__':
    app.run(debug=True)
