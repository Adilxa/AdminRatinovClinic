import React, { useEffect, useState } from "react";
import { Button, Grid, Typography, TextField } from "@mui/material";
import useYouTube from "../../hooks/useYouTube";
import { useParams } from "react-router-dom";
import Preloader from "../../components/preloader/Preloader";
import FormPageContainer from "../../components/containers/FormPageContainer";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useNavigate } from "react-router-dom";

const YoutubeDetail = () => {
  const { isLoading, getVideo, detailVideo, updateVideo } = useYouTube();
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getVideo(id);
  }, [id]);

  const data = {
    name: detailVideo?.name,
    img: detailVideo?.img,
    video: detailVideo?.video,
    id: detailVideo?.id,
  };

  const onUpdate = () => {
    updateVideo(id, data);
    navigate("/youtube");
  };

  if (isLoading) return <Preloader full />;
  return (
    <FormPageContainer>
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={() => setEdit(!edit)} variant="contained">
          {edit ? "Close" : "Edit"}
        </Button>
      </Grid>
      {edit ? (
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <Typography variant="h5">Заголовок:</Typography>
          <TextField
            sx={{ width: "50%" }}
            value={detailVideo.name}
            onChange={(e) => setTitle((detailVideo.name = e.target.value))}
            multiline
          ></TextField>
        </Grid>
      ) : (
        <Typography
          mb={5}
          variant="h5"
          sx={{
            width: "50%",
          }}
        >
          {detailVideo?.name}
        </Typography>
      )}
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
        }}
        mb={5}
      >
        <Typography variant="h5">Сылка на Youtube:</Typography>
        {edit ? (
          <TextField
            sx={{ width: "50%", marginLeft: "20px" }}
            value={detailVideo.video}
            onChange={(e) => setLink((detailVideo.video = e.target.value))}
          />
        ) : (
          <Typography ml={3} variant="h5" color="primary">
            {detailVideo?.video}
          </Typography>
        )}
      </Grid>
      <iframe
        style={{
          width: "100%",
          height: "50vh",
          marginBottom: "35px",
        }}
        src={detailVideo?.img}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h5"> Сылка на видео:</Typography>
        {edit ? (
          <TextField
            sx={{ width: "50%", marginLeft: "20px" }}
            value={detailVideo.img}
            onChange={(e) => setVideoLink((detailVideo.img = e.target.value))}
          />
        ) : (
          <Typography ml={3} variant="h5" color="primary">
            {detailVideo?.img}
          </Typography>
        )}
      </Grid>
      {edit && (
        <Grid
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={onUpdate}
            sx={{
              marginTop: "35px",
              borderRadius: "50%",
            }}
            variant="contained"
          >
            <FileUploadIcon sx={{ margin: "25px 15px" }} />
          </Button>
        </Grid>
      )}
    </FormPageContainer>
  );
};

export default YoutubeDetail;
