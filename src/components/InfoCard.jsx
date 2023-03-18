import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import useTours from "../hooks/useTours";
import { useParams } from "react-router-dom";

const InfoCard = ({ data, des, title, edit, setEdit, index }) => {
  const { updateDoctor } = useTours();
  let [text, setText] = useState("");
  let arr = [].concat(des);
  const { id } = useParams();

  const onSave = () => {
    data.info[index].des.push(text);
    setEdit(false);
    updateDoctor(id, data);
  };

  return (
    <Box marginBottom={5}>
      <Typography variant="h6">{title}</Typography>
      <ul>
        {arr.map((el, index) => (
          <li style={{ fontSize: 18, fontWeight: 500 , marginLeft:20 }} key={index}>
            {el}
          </li>
        ))}
      </ul>
      {edit && (
        <>
          <TextField sx={{marginTop:2}} value={text} onChange={(e) => setText(e.target.value)} />
          <Button
            sx={{ width: "10%", marginBottom: 2 , height:"55px" , marginLeft: 1 , marginTop:2 }}
            variant="contained"
            onClick={() => onSave()}
          >
            Добавить
          </Button>
        </>
      )}
    </Box>
  );
};

export default InfoCard;
