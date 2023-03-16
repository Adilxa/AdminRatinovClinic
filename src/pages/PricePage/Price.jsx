import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Price = ({ group, list, tid }) => {
  const onDelete = async (e) => {
    e.stopPropagation();
    const res = window?.confirm(
      "Вы действительно хотите удалить " + group + "?"
    );
    if (res) {
      await deleteDoc(doc(db, "price", tid));
      window?.location?.reload();
    }
  };
  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 4,
        padding: "25px",
        borderRadius: "5px",
        WebkitBoxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.1)",
        MozBoxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.1)",
        boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.1)",
      }}
    >
      <Typography variant="h6">{group}</Typography>
      <Grid
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link to={`/price/${tid}`}>
          <Button variant="contained">More...</Button>
        </Link>
        <Button onClick={onDelete} color="error" variant="contained">
          Delete
        </Button>
      </Grid>
    </Grid>
  );
};

export default Price;
