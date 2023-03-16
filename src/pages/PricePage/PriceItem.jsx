import { Grid, TextField, Typography, Button } from "@mui/material";
import React, {  useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PriceItem = ({ price, title, isEdit, index, list }) => {

  const [label, setLabel] = useState(title);
  const [sprice, setPrice] = useState(price);

  const handleIncrement = () => {
    setPrice((prev) => prev + 100);
    const objIndex = list?.findIndex((obj) => obj.id === index);
    list[objIndex].price = sprice + 100;
  };
  const handleDecrement = () => {
    setPrice((prev) => prev - 100);
    const objIndex = list?.findIndex((obj) => obj.id === index);
    list[objIndex].price = sprice - 100;
  };
  const handleSaveTitle = () => {
    const objIndex = list?.findIndex((obj) => obj.id === index);
    list[objIndex].title = label;
  };

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "25px",
          borderRadius: "5px",
          WebkitBoxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.1)",
          MozBoxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.1)",
          boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.1)",
          marginBottom: 4,
        }}
      >
        {isEdit ? (
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              width: "50%",
            }}
          >
            <TextField
              variant="outlined"
              value={label}
              sx={{
                width: "60%",
                marginRight:2
              }}
              onChange={(e) => setLabel(e.target.value)}
            ></TextField>
            <Button onClick={() => handleSaveTitle()}>
              <CheckCircleIcon sx={{
                padding:"10px"
              }}/>
            </Button>
          </Grid>
        ) : (
          <Typography variant="h6">{title}</Typography>
        )}
        {isEdit ? (
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button variant="outlined" onClick={() => handleDecrement()}>
              -
            </Button>
            <Typography variant="h6">{sprice}c</Typography>
            <Button
              variant="outlined"
              onClick={() => {
                handleIncrement();
              }}
            >
              +
            </Button>
          </Grid>
        ) : (
          <Typography variant="h6">{sprice}</Typography>
        )}
      </Grid>
    </>
  );
};

export default PriceItem;
