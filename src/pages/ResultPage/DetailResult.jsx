import React, { useEffect, useState, useMemo } from "react";
import FormPageContainer from "../../components/containers/FormPageContainer";
import Preloader from "../../components/preloader/Preloader";
import useResult from "../../hooks/useResult";
import { useParams } from "react-router-dom";
import { Button, Grid, Typography, TextField, IconButton } from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";

const DetailResult = () => {
  const { isLoading, getDetail, detailRes, setLoading, updateResult } =
    useResult();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDetail(id);
  }, [id]);

  const [url, setUrl] = useState(null);
  const [fileData, setFileData] = useState();

  const handleImage = (target) => {
    if (target.files[0]) {
      setFileData(target.files[0]);
    }
  };

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

  const resType = (res) => {
    if (res === "neck") {
      return "Шея";
    } else if (res === "lumbar") {
      return "Поясница ";
    }
  };

  const [beforeComplaints, setComplaints] = useState("");
  const [appointment, setAppointment] = useState("");
  const [afterDisaese, setDisaese] = useState("");
  const [afterComplaints, setafterComplaints] = useState("");
  const [time, setTime] = useState("");
  const [timeDes, setTimeDes] = useState("");

  const data = {
    afterComplaints: afterComplaints || detailRes?.afterComplaints,
    afterDisease: afterDisaese || detailRes?.afterDisease,
    appointment: appointment || detailRes?.appointment,
    beforeComplaints: beforeComplaints || detailRes?.beforeComplaints,
    img: url || detailRes?.img,
    time: time || detailRes?.time,
    timeDes: timeDes || detailRes?.timeDes,
  };
  console.log(data);
  const onSave = () => {
    updateResult(id, data);
    navigate("/results");
  };

  if (isLoading) return <Preloader full />;
  return (
    <FormPageContainer>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button onClick={() => setEdit(!edit)} variant="contained">
          {edit ? "Close" : "Edit"}
        </Button>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        {detailRes?.img && (
          <img
            style={{
              width: "30%",
              height: "100%",
              objectFit: "cover",
            }}
            src={detailRes.img}
          />
        )}
        {url && <SwapHorizIcon />}
        {url && (
          <img
            style={{
              width: "30%",
              height: "100%",
              objectFit: "cover",
            }}
            src={url}
          />
        )}
      </Grid>
      {edit && (
        <Button
          sx={{ width: "100%", marginBottom: 2, marginTop: 4 }}
          variant="contained"
          component="label"
        >
          Upload Image
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => handleImage(e.target)}
            name="file"
          />
        </Button>
      )}
      <Typography variant="h6">Тип: {resType(detailRes?.type)}</Typography>
      <div
        className="line"
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#ccc",
          margin: "15px 0",
        }}
      ></div>
      {edit ? (
        <TextField
          label="Жалобы до лечения"
          value={detailRes.beforeComplaints}
          onChange={(e) =>
            setComplaints(detailRes.beforeComplaints = e.target.value)
          }
          sx={{
            width: "100%",
          }}
        ></TextField>
      ) : (
        <Typography variant="h6">
          Жалобы до лечения: {detailRes?.beforeComplaints}
        </Typography>
      )}
      <div
        className="line"
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#ccc",
          margin: "15px 0",
        }}
      ></div>
      {edit ? (
        <TextField
          label="Назначили"
          value={detailRes.appointment}
          onChange={(e) =>
            setAppointment(detailRes.appointment = e.target.value)
          }
          sx={{
            width: "100%",
          }}
        ></TextField>
      ) : (
        <Typography variant="h6">
          Назначили: {detailRes?.appointment}
        </Typography>
      )}
      <div
        className="line"
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#ccc",
          margin: "15px 0",
        }}
      ></div>
      {edit ? (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            label="После лечения"
            value={detailRes.afterDisease}
            onChange={(e) =>
              setDisaese(detailRes.afterDisease = e.target.value)
            }
          ></TextField>
          <TextField
            label={detailRes?.afterComplaints}
            value={detailRes.afterComplaints}
            onChange={(e) =>
              setafterComplaints(detailRes.afterComplaints = e.target.value)
            }
          ></TextField>
        </Grid>
      ) : (
        <>
          <Typography variant="h6">
            После лечения: {detailRes?.afterDisease}
          </Typography>
          <Typography variant="h6">{detailRes?.afterComplaints}</Typography>
        </>
      )}
      <div
        className="line"
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#ccc",
          margin: "15px 0",
        }}
      ></div>
      {edit ? (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            label="Результат"
            value={detailRes.time}
            onChange={(e) => setTime(detailRes.time = e.target.value)}
          ></TextField>
          <TextField
            label={detailRes.timeDes}
            value={detailRes.timeDes}
            onChange={(e) => setTimeDes(detailRes.timeDes = e.target.value)}
          ></TextField>
        </Grid>
      ) : (
        <>
          <Typography variant="h6">Результат: {detailRes?.time}</Typography>
          <Typography variant="h6">{detailRes?.timeDes}</Typography>
        </>
      )}
      <div
        className="line"
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#ccc",
          margin: "15px 0",
        }}
      ></div>
      <Grid display="flex" justifyContent="center" width="100%">
        <IconButton
          color="primary"
          sx={{
            border: "1px solid #1976D2",
          }}
          onClick={() => onSave()}
        >
          <CheckIcon
            sx={{
              margin: "20px",
            }}
          />
        </IconButton>
      </Grid>
    </FormPageContainer>
  );
};

export default DetailResult;
