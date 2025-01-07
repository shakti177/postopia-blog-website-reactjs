import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Demo() {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Content:", content);
    alert("Content submitted! Check the console for details.");
  };

  return (
    <div className="App">
      <header>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>
          React Quill Demo
        </h1>
      </header>
      <main style={{ maxWidth: "800px", margin: "20px auto", padding: "10px" }}>
        <form onSubmit={handleSubmit}>
          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            className="h-72 mb-12"
            onChange={(value) => setContent(value)}
          />
          <button
            type="submit"
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#6c63ff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}

export default Demo;
