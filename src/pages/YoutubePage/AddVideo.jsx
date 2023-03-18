import React, { useState } from "react";
import FormPageContainer from "../../components/containers/FormPageContainer";
import { Button, Grid, TextField } from "@mui/material";
import useYouTube from "../../hooks/useYouTube";
import { useNavigate } from "react-router-dom";

const AddVideo = () => {
  const { addVideo } = useYouTube();
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");

  const navigate = useNavigate()
  const data = {
    id: Math.floor(Math.random() * 11000000),
    img: img,
    name: title,
    video,
  };
  const onSubmit = () => {
    if (img && video && title) {
      addVideo(data);
      setImg("");
      setVideo("");
      setTitle("");
      navigate("/youtube")
    } else {
      alert("Заполните все поля!");
    }
  };

  return (
    <FormPageContainer>
      <form
        action=""
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          alignItems: "center",
        }}
      >
        {data.img && (
          <iframe
            style={{
              width: "70%",
              height: "35vh",
              marginTop: "35px",
            }}
            src={img}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
        <TextField
          label="Заголовок"
          sx={{
            width: "70%",
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <TextField
          value={img}
          label="Сылка на видео"
          sx={{
            width: "70%",
          }}
          onChange={(e) => setImg(e.target.value)}
        />
        <TextField
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          label="Сылка на YouTube"
          sx={{
            width: "70%",
          }}
        />
        <Button
          onClick={onSubmit}
          variant="contained"
          color="success"
          sx={{
            width: "70%",
            padding: "10px",
            fontSize: "large",
          }}
        >
          Create Video
        </Button>
      </form>
    </FormPageContainer>
  );
};

export default AddVideo;
