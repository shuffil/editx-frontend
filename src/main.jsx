import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  const [status, setStatus] = useState("Ready");

  const handleUpload = async (e) => {
    e.preventDefault();
    const files = e.target.elements.files.files;

    if (!files.length) {
      setStatus("❌ No files selected.");
      return;
    }

    setStatus("⏳ Uploading...");

    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    try {
      const response = await fetch("https://editx-backend.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        setStatus("✅ Upload successful!");
        console.log("Session ID:", data.sessionId);
      } else {
        throw new Error("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload error. Check console.");
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2em" }}>
      <form onSubmit={handleUpload} style={{ maxWidth: 400, margin: "auto", background: "#fff", padding: "2em", borderRadius: "8px" }}>
        <h2>Upload Videos</h2>
        <input type="file" name="files" multiple style={{ width: "100%" }} />
        <button type="submit" style={{ marginTop: "1em", width: "100%" }}>Upload</button>
        <p>{status}</p>
      </form>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
