/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import axios from 'axios';
import { useState } from 'react';

function UploadPage() {
  const [file, setFIle] = useState<File>();
  const [imageUrl, setImageURL] = useState<string>();
  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (file) {
            const url = 'http://localhost:8000/upload';
            const formData = new FormData();
            formData.append('file', file, file.name);

            try {
              const response = await axios.post(url, formData);
              setImageURL(response.data.filename);
            } catch (error) {
              console.log(error);
            }
          } else {
            alert('select a file upload');
          }
        }}
      >
        <h1>REact FIle Upload</h1>

        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFIle(e.target.files[0]);
            }
          }}
        />
        <button type="submit">Upload Image</button>
      </form>
      {imageUrl ? (
        <>
          <br />
          <img
            width="500"
            alt="uploadedImg"
            src={`http://localhost:8000${imageUrl}`}
          />
          <br />
        </>
      ) : null}
      <button onClick={() => {
        console.log(`post this to the backend ${imageUrl}`);
      }}
      >
        Add New Image
      </button>
    </div>

  );
}

export default UploadPage;
