import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const AddBlogDes = ({ setDes, index, des }) => {
  const [title, setTitle] = useState("");

  const handleSaveTitle = () => {
    if (title.length > 1) {
      setDes((prev) => [...prev, title]);
    }
  };

  return (
    <>
      <TextField
        sx={{
          width: "70%",
        }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Description"
        multiline
      />
      <br />
      <Button
        variant="contained"
        sx={{
          width: "70%",
          marginTop: "15px",
          marginBottom: "45px",
        }}
        onClick={() => handleSaveTitle()}
      >
        Save
      </Button>
    </>
  );
};

export default AddBlogDes;
