import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Uploadimg() {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [selecteduser_order_id, setSelecteduser_order_id] = useState("");

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleuser_order_idChange = (event) => {
    setSelecteduser_order_id(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/display")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpload = () => {
    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("user_order_id", selecteduser_order_id);

    axios
      .post("http://localhost:5000/upload", formdata)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Succeded");
        } else {
          console.log("Failed");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <form>
        <h3>user_order_id:</h3>
        <input
          id="user_order_id"
          value={selecteduser_order_id}
          onChange={handleuser_order_idChange}
        />
        <h3>Upload Business Card Design:</h3>
        <input type="file" onChange={handleFile} />
        <button onClick={handleUpload}>Upload</button>
      </form>
      <div>
        {data.map((product) => (
          <img
            key={product.id}
            src={"http://localhost:5000/images/" + product.image}
            style={{ width: "300px", height: "300px" }}
            alt="nothing here"
          />
        ))}
      </div>
    </div>
  );
}
