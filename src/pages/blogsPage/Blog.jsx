import React, { useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Blog = ({ tid, title, des, img }) => {
  const onDelete = async (e) => {
    e.stopPropagation();
    const res = window?.confirm(
      "Вы действительно хотите удалить блог " + title + "?"
    );
    if (res) {
      await deleteDoc(doc(db, "blog", tid));
      window?.location?.reload();
    }
  };
  return (
    <Grid
      sx={{
        margin: 2,
        marginBottom: 12,
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "1px 9px 50px 9px rgba(212,209,209,0.40)",
        WebkitBoxShadow: "1px 9px 50px 9px rgba(212,209,209,0.40)",
        MozBoxShadow: "1px 9px 50px 9px rgba(212,209,209,0.40)",
      }}
      key={tid}
    >
      <Grid
        sx={{
          width: "100%",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
            borderRadius: "5px",
          }}
          src={img}
          alt={title}
        />
      </Grid>
      <Grid>
        <Typography
          sx={{
            marginBottom: 1,
          }}
          variant="h6"
        >
          {title}
        </Typography>
        {des.map((el) => (
          <Typography
            sx={{
              marginBottom: 2,
            }}
            key={el + "hehe"}
          >
            {el}
          </Typography>
        ))}
      </Grid>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          gap:"20px"
        }}
      >
        <Link
          style={{
            color: "white",
            backgroundColor: "green",
            borderRadius: "4px",
            padding: "9px 43px",
            fontWeight: 600,
          }}
          to={`/blogs/${tid}`}
        >
          Edit
        </Link>
        <Button onClick={(e) => onDelete(e)} variant="contained" color="error">
          Delete Blog
        </Button>
      </Grid>
    </Grid>
  );
};

export default Blog;
