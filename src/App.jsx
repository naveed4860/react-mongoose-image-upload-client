import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
  const [postImage, setPostImage] = useState({
    myFile: "",
  });

  const [post, setpost] = useState([]);

  const baseUrl = "http://localhost:4000/";

  useEffect(() => {
    async function makeGetRequest() {
      const res = await axios.get(baseUrl);
      setpost(res.data);
    }
    makeGetRequest();
  }, [post]);

  const createImage = (newImage) => axios.post(`${baseUrl}post`, newImage);

  const createPost = async (post) => {
    try {
      await createImage(post);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
    window.location.reload();
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          label="Image"
          name="myFile"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />

        <button>Submit</button>
      </form>
      {post.map((item, index) => {
        return (
          <div key={`item-${item.myFile}-${index}`}>
            <img
              src={item.myFile}
              style={{ width: "50px", height: "50px" }}
            ></img>
          </div>
        );
      })}
    </div>
  );
};

export default App;
