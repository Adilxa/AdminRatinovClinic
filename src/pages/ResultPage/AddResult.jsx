import React, { useState, useMemo, useEffect } from "react";
import FormPageContainer from "../../components/containers/FormPageContainer";
import { Grid, TextField, Typography, Button, IconButton } from "@mui/material";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import DoneIcon from "@mui/icons-material/Done";
import useResult from "../../hooks/useResult";
import Preloader from "../../components/preloader/Preloader";
import { useNavigate } from "react-router-dom";

const AddResult = () => {
  const [beforeComplaints, setComplaints] = useState("");
  const [appointment, setAppointment] = useState("");
  const [afterDisaese, setDisaese] = useState("");
  const [afterComplaints, setafterComplaints] = useState("");
  const [time, setTime] = useState("");
  const [timeDes, setTimeDes] = useState("");
  const [type, setType] = useState(false);
  const { setLoading, isLoading, addResult, getResult, result } = useResult();
  //

  const [url, setUrl] = useState();
  const [fileData, setFileData] = useState();

  useEffect(() => {
    getResult();
  }, [getResult]);

  useEffect(() => {
    setLoading(false);
  }, []);

  useMemo(() => {
    if (fileData) {
      const imageRef = ref(storage, fileData.name);
      setLoading(true);
      uploadBytes(imageRef, fileData)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setUrl(url);
            })
            .finally(() => {
              setLoading(false);
            })
            .catch((error) => {
              console.log(error.message, "error");
            });

          setFileData(null);
        })
        .catch((error) => {
          console.log(error.message, "error");
        });
    }
  }, [fileData]);

  const handleImage = (target) => {
    if (target.files[0]) {
      setFileData(target.files[0]);
    }
  };

  const isType = (type) => {
    if (type) {
      return "neck";
    } else {
      return "lumbar";
    }
  };

  const navigate = useNavigate();
  const data = {
    afterComplaints: afterComplaints,
    afterDisease: afterDisaese,
    appointment: appointment,
    beforeComplaints: beforeComplaints,
    img: url || "",
    time: time,
    timeDes: timeDes,
    type: isType(type),
    num: result.length + 1,
  };

  const onAdd = () => {
    if (data.afterComplaints || data.appointment) {
      addResult(data);
      navigate("/results");
    } else {
      alert("Заполните поля!");
    }
  };

  if (isLoading) return <Preloader full />;
  return (
    <FormPageContainer>
      <Grid
        sx={{
          display: "flex",
          gap: "25px",
          marginBottom: 5,
        }}
      >
        {type ? (
          <>
            <Button variant="contained" color="error">
              Шейный отдел
            </Button>
            <Button variant="contained" onClick={() => setType(false)}>
              Поясничный отдел
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={() => setType(true)}>
              Шейный отдел
            </Button>
            <Button variant="contained" color="error">
              Поясничный отдел
            </Button>
          </>
        )}
      </Grid>
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Жалобы до лечения:</Typography>
        <TextField
          value={beforeComplaints}
          onChange={(e) => setComplaints(e.target.value)}
          multiline
          minRows={3}
          required
        />
        <Typography variant="h6">Назначили:</Typography>
        <TextField
          value={appointment}
          onChange={(e) => setAppointment(e.target.value)}
          multiline
          minRows={3}
          required
        />
        <Typography variant="h6">После лечения:</Typography>
        <TextField
          value={afterDisaese}
          onChange={(e) => setDisaese(e.target.value)}
          multiline
          minRows={3}
          required
        />
        <TextField
          value={afterComplaints}
          onChange={(e) => setafterComplaints(e.target.value)}
          multiline
          minRows={3}
        />
        <Typography variant="h6">Результат:</Typography>
        <TextField
          value={time}
          onChange={(e) => setTime(e.target.value)}
          multiline
          minRows={3}
          required
        />
        <TextField
          value={timeDes}
          onChange={(e) => setTimeDes(e.target.value)}
          multiline
          minRows={3}
        />
        {url && (
          <img
            src={url}
            style={{
              height: "40vh",
              objectFit: "contain",
            }}
            alt=""
          />
        )}
        <Button
          sx={{ width: "100%", marginBottom: 2 }}
          variant="contained"
          component="label"
        >
          Загрузить картину
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => handleImage(e.target)}
            name="file"
          />
        </Button>
      </Grid>
      <Grid
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <IconButton
          color="primary"
          size="large"
          sx={{
            border: "1px solid #1976D2",
          }}
          onClick={() => onAdd()}
        >
          <DoneIcon
            sx={{
              margin: "20px",
            }}
          />
        </IconButton>
      </Grid>
    </FormPageContainer>
  );
};

export default AddResult;
