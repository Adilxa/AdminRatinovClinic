import React, { useState } from "react";
import FormPageContainer from "../../components/containers/FormPageContainer";
import useComments from "../../hooks/useComments";
import { Button, Grid, TextField } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

const AddComment = () => {
  const { addComment } = useComments();
  const [name, setName] = useState("");
  const [nick, setNick] = useState("");
  const [des, setDes] = useState("");
  const navigate = useNavigate();
  const data = {
    des,
    link: nick,
    name,
    img: "",
  };

  const onSave = () => {
    if (nick.length && des.length && name.length > 2) {
      addComment(data);
      navigate("/comments");
    } else {
      alert("Заполните поля!");
    }
  };
  return (
    <FormPageContainer>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
        }}
      >
        <TextField
          value={name}
          label="Имя"
          variant="outlined"
          sx={{
            width: "70%",
          }}
          onChange={(e) => setName(e.target.value)}
        ></TextField>
        <TextField
          value={nick}
          label="Никнейм"
          variant="outlined"
          sx={{
            width: "70%",
          }}
          onChange={(e) => setNick(e.target.value)}
        ></TextField>
        <TextField
          value={des}
          label="Комментарий"
          variant="outlined"
          multiline
          minRows={5}
          sx={{
            width: "70%",
          }}
          onChange={(e) => setDes(e.target.value)}
        ></TextField>
        <Button
          sx={{
            borderRadius: "50%",
          }}
          variant="contained"
          onClick={onSave}
        >
          <CheckCircleOutlineIcon sx={{ padding: "20px 10px" }} />
        </Button>
      </Grid>
    </FormPageContainer>
  );
};

export default AddComment;
