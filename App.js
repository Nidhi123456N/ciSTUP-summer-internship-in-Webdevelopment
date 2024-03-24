import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [originalImage, setOriginalImage] = useState('');
  const [processedImage, setProcessedImage] = useState('');

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedImage);
    
    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setOriginalImage(response.data.original_image);
      setProcessedImage(response.data.processed_image);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  return (
    <div>
      <nav>
        <h1>Transportation Image Object Detection</h1>
      </nav>
      <main>
        <section id="upload-section">
          <h2>Upload Image</h2>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            <button type="submit">Upload</button>
          </form>
        </section>
        <section id="image-display">
          <div>
            <h2>Original Image</h2>
            {originalImage && <img src={originalImage} alt="Original" />}
          </div>
          <div>
            <h2>Processed Image</h2>
            {processedImage && <img src={processedImage} alt="Processed" />}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
