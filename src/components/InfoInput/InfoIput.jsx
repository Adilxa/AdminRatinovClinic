import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
} from "@mui/material";

const InfoInput = ({ onSaveInfo }) => {
  const [infoTitle, setInfoTitle] = useState("");
  const [infoField, setInfoField] = useState("");
  const [info, setInfo] = useState([]);

  const saveInfo = () => {
    setInfo([...info, infoField]);
    setInfoField("");
  };

  const infoData = {
    des: info,
    title: infoTitle,
    id: info.length + `${infoTitle}`,
  };
  
  return (
    <Grid
      sx={{
        width: "45%",
      }}
    >
      <TextField
        value={infoTitle}
        onChange={(e) => setInfoTitle(e.target.value)}
        variant="outlined"
        label="Инфо Загаловок"
        sx={{
          width: "100%",
        }}
      />
      <ul
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        {info.map((el, index) => (
          <li key={el + Date.now() + `${index}`}>{el}</li>
        ))}
      </ul>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          value={infoField}
          onChange={(e) => setInfoField(e.target.value)}
          variant="outlined"
          label="Инфо Поле"
          sx={{
            width: "70%",
          }}
        />
        <Button
          sx={{
            width: "30%",
            height: "56px",
            marginLeft: "5px",
          }}
          variant="contained"
          onClick={() => saveInfo()}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: 13,
            }}
          >
            {" "}
            Save Field
          </Typography>
        </Button>
      </Grid>
      <Button
        onClick={() => onSaveInfo(infoData)}
        variant="contained"
        sx={{
          marginTop: 2,
          width:"100%"
        }}
      >
        Save Info
      </Button>
    </Grid>
  );
};

export default InfoInput;
