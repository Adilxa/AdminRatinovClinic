import { Box, Button, Typography, TextField, FormControl } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/containers/PageContainer";
import Preloader from "../../components/preloader/Preloader";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useTours from "../../hooks/useTours";
import InfoCard from "../../components/InfoCard";

function TourDetailPage() {
  const { id } = useParams();
  const {
    error,
    isLoading,
    getDetailDoctor,
    tourDetail,
    updateDoctor,
    setLoading,
  } = useTours();

  const [url, setUrl] = useState();
  const [fileData, setFileData] = useState();

  const [url2, setUrl2] = useState();
  const [fileData2, setFileData2] = useState();

  const [diploma, setDiploma] = useState(null)

  const onSave = () => {
    updateDoctor(id, { ...data, diplomas: diploma });
  };

  useEffect(() => {
    getDetailDoctor(id);
  }, [id]);

  useEffect(() => {
    setDiploma(tourDetail?.diplomas)
  }, [tourDetail]);

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

  const onSaveDiplom = () => {
    setDiploma([...diploma, url2])
    updateDoctor(id, data);
  };

  const renderDiplomas = useMemo(
    () =>
      diploma &&
      diploma.map((el, index) => (
        <img
          key={index}
          src={el}
          alt="diploma"
          style={{ width: "280px", height: "360px" }}
        ></img>
      )),
    [diploma, url2]
  );

  useMemo(() => {
    if (fileData2) {
      const imageRef = ref(storage, fileData2.name);
      setLoading(true);

      uploadBytes(imageRef, fileData2)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url2) => {
              setUrl2(url2);
              setDiploma([...diploma, url2])
            })
            .finally(() => {
              setLoading(false);
            })
            .catch((error) => {
              console.log(error.message, "error");
            });
          setFileData2(null);
        })
        .catch((error) => {
          console.log(error.message, "error");
        });
    }
  }, [fileData2]);

  const handleImage = (target) => {
    if (target.files[0]) {
      setFileData(target.files[0]);
    }
  };
  const handleImage2 = (target) => {
    if (target.files[0]) {
      setFileData2(target.files[0]);
    }
  };

  ///States///
  const [Sname, setName] = useState(`${tourDetail?.name}`);
  const [SWork, setWork] = useState(tourDetail?.day_work);
  const [SSpec, setSpec] = useState(tourDetail?.specialization);
  const [SPro, setPro] = useState(tourDetail?.proffesions);
  const [Sjob, setJob] = useState([]);
  const [edit, setEdit] = useState(false);
  const [SPrice, setPrice] = useState(tourDetail?.price);

  const data = {
    day_work: SWork || tourDetail?.day_work,
    diplomas: tourDetail?.diplomas,
    fullSizeImg: tourDetail?.fullSizeImg,
    img: url == undefined ? tourDetail?.img : url,
    imgPos: tourDetail?.imgPos,
    info: tourDetail?.info,
    name: tourDetail?.name,
    photo: tourDetail?.photo || "",
    pos: tourDetail?.pos,
    post: tourDetail?.post,
    price: Number(SPrice || tourDetail?.price),
    proffesions: SPro || tourDetail?.proffesions,
    specialization: SSpec || tourDetail?.specialization,
    year: tourDetail?.year || tourDetail?.year,
  };

  const sendPost = () => {
    if (Sjob.length > 0) {
      tourDetail.post.push(Sjob);
      updateDoctor(id, data);
      setEdit(false);
    } else {
      alert("Заполните поле");
    }
  };

  const onRedact = () => {
    setEdit(true);
  };
  const closeRedact = () => {
    setEdit(false);
  };

  if (isLoading) return <Preloader full />;
  if (error) return <h1>{error}</h1>;
  return (
    <PageContainer title={""}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">Профиль доктора</Typography>
        {edit ? (
          <Button
            onClick={() => closeRedact()}
            color="error"
            variant="contained"
          >
            Закрыть Редактирование
          </Button>
        ) : (
          <Button onClick={() => onRedact()} variant="contained">
            Редактировать
          </Button>
        )}
      </Box>
      <Typography variant="h6" sx={{ marginBottom: 5 }}>
        Опыт работы с {tourDetail.year} года
      </Typography>
      {edit ? (
        <>
          <TextField
            label="Имя"
            variant="outlined"
            value={tourDetail.name}
            sx={{ width: "30%", marginTop: 5 }}
            onChange={(e) => setName((tourDetail.name = e.target.value))}
          ></TextField>
          <br />
          <Box
            width="30%"
            gap="20px"
            display="flex"
            justifyContent="space-around"
            sx={{ marginBottom: 5 }}
          >
            <Button
              sx={{ width: "100%", marginTop: 1 }}
              variant="contained"
              onClick={() => onSave()}
            >
              Обновить
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="h6" onClick={() => setEdit(!edit)}>
          {tourDetail.name}
        </Typography>
      )}
      {edit ? (
        <>
          <TextField
            label="Дни работы"
            variant="outlined"
            value={tourDetail.day_work}
            sx={{ width: "30%" }}
            onChange={(e) => setWork((tourDetail.day_work = e.target.value))}
          ></TextField>
          <br />
          <Box
            width="30%"
            gap="20px"
            display="flex"
            justifyContent="space-around"
            marginBottom={5}
          >
            <Button
              sx={{ width: "100%", marginTop: 1 }}
              variant="contained"
              onClick={() => onSave()}
            >
              Обновить
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="h6" onClick={() => setEdit(!edit)}>
          Дни работы: {tourDetail.day_work}
        </Typography>
      )}
      {edit ? (
        <>
          <TextField
            label="Цена"
            variant="outlined"
            value={tourDetail.price}
            sx={{ width: "30%" }}
            onChange={(e) => setPrice((tourDetail.price = e.target.value))}
          ></TextField>
          <br />
          <Box
            width="30%"
            gap="20px"
            display="flex"
            justifyContent="space-around"
            marginBottom={5}
          >
            <Button
              sx={{ width: "100%", marginTop: 1 }}
              variant="contained"
              onClick={() => onSave()}
            >
              Обновить
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="h6">Цена: {tourDetail?.price} coм</Typography>
      )}
      {tourDetail.img && (
        <>
          <img
            style={{
              borderRadius: "7%",
              objectFit: "cover",
              width: "30%",
              marginTop: 20,
              marginBottom: 2,
            }}
            alt={tourDetail?.name}
            src={tourDetail?.img}
          />
        </>
      )}
      <br />
      {edit && (
        <>
          <FormControl sx={{ marginTop: 2 }}>
            <Button
              sx={{ width: "172%", marginBottom: 2 }}
              variant="contained"
              component="label"
            >
              Вставить новое фото
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => handleImage(e.target)}
                name="file"
              />
            </Button>
            <Button
              onClick={() => onSave()}
              sx={{ width: "172%" }}
              variant="contained"
              color="success"
            >
              Обновить
            </Button>
          </FormControl>
          <br />
          {url && (
            <img
              style={{
                borderRadius: "7%",
                objectFit: "cover",
                width: "30%",
                marginTop: 20,
                marginBottom: 20,
              }}
              alt={"Uploaded img"}
              src={url}
            />
          )}
        </>
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="-20px"
      ></Box>
      <Box>
        <Typography sx={{ marginTop: 5, marginBottom: 2 }} variant="h5">
          Должность
        </Typography>
        <ul>
          {tourDetail.post.map((el, index) => (
            <li
              style={{
                marginBottom: "10px",
                fontSize: 20,
                fontWeight: 500,
                marginLeft: "20px",
              }}
              key={index}
            >
              {el}
            </li>
          ))}
        </ul>
        {edit && (
          <>
            <TextField
              onChange={(e) => setJob(e.target.value)}
              id="outlined-basic"
              label="Добавить должность"
              variant="outlined"
              sx={{ width: "30%", marginTop: "20px" }}
            />
            <br />
            <Box display="flex" justifyContent="space-between" width="30%">
              <Button
                onClick={() => sendPost()}
                type="submit"
                variant="contained"
                sx={{ width: "100%", marginTop: 1 }}
              >
                Обновить
              </Button>
            </Box>
          </>
        )}
      </Box>
      <Box marginTop={5}>
        <Typography sx={{ marginBottom: 2 }} variant="h5">
          Специализация
        </Typography>
        {edit ? (
          <>
            <TextField
              label="Редактировать"
              variant="outlined"
              value={tourDetail.specialization}
              sx={{ width: "100%" }}
              multiline
              rows={4}
              maxRows={1}
              onChange={(e) =>
                setSpec((tourDetail.specialization = e.target.value))
              }
            ></TextField>
            <Button
              variant="contained"
              sx={{ width: "100%", marginTop: 1 }}
              onClick={() => onSave()}
            >
              Обновить
            </Button>
          </>
        ) : (
          <Typography variant="h6">{tourDetail?.specialization}</Typography>
        )}
      </Box>
      <Box marginTop={5} mb={5}>
        <Typography sx={{ marginBottom: 2 }} variant="h5">
          Професии
        </Typography>
        {edit ? (
          <>
            <TextField
              label="Редактировать"
              variant="outlined"
              value={tourDetail.proffesions}
              sx={{ width: "100%" }}
              multiline
              rows={3}
              maxRows={1}
              onChange={(e) =>
                setPro((tourDetail.proffesions = e.target.value))
              }
            ></TextField>
            <Button
              variant="contained"
              sx={{ width: "100%", marginTop: 1 }}
              onClick={() => onSave()}
            >
              Обновить
            </Button>
          </>
        ) : (
          <Typography variant="h6">{tourDetail?.proffesions}</Typography>
        )}
      </Box>
      <Box width="100%">
        <Typography variant="h5">Дипломы</Typography>
        {renderDiplomas}
      </Box>
      {edit && (
        <>
          <FormControl sx={{ marginTop: 2 }}>
            <Button
              sx={{ width: "165%", marginBottom: 2 }}
              variant="contained"
              component="label"
            >
              Вставить новое фото
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => handleImage2(e.target)}
                name="file"
              />
            </Button>
            <Button
              onClick={() => onSaveDiplom()}
              sx={{ width: "165%" }}
              variant="contained"
              color="success"
            >
              Обновить
            </Button>
          </FormControl>
        </>
      )}
      <Box marginTop={5}>
        {tourDetail.info.map((el, index) => (
          <InfoCard
            key={el.id}
            data={data}
            des={el.des}
            title={el.title}
            setEdit={setEdit}
            edit={edit}
            index={index}
          />
        ))}
      </Box>
    </PageContainer>
  );
}


export default TourDetailPage;
