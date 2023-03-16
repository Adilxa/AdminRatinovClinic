import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
const BlogDes = ({ title, setDes, index }) => {
  const [stitle, setTitle] = useState(`${title}`);

  const handleSaveTitle = (index) => {
    setDes((prevArr) => {
      const newArr = [...prevArr];
      newArr[index] = stitle;
      return newArr;
    });
  };
  return (
    <>
      <TextField
        value={stitle}
        multiline
        maxRows={4}
        sx={{
          width: "100%",
          marginTop: 4,
          marginBottom: 2,
        }}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        color="success"
        variant="contained"
        onClick={() => handleSaveTitle(index)}
      >
        update description
      </Button>
    </>
  );
};

export default BlogDes;
