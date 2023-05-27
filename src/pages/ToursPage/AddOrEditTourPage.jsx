import {
  Button,
  TextField,
  FormControl,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../components/containers/FormContainer";
import FormPageContainer from "../../components/containers/FormPageContainer";
import useTours from "../../hooks/useTours";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import InfoInput from "../../components/InfoInput/InfoIput";
import Preloader from "../../components/preloader/Preloader";

function AddOrEditTourPage() {

  const { addDoctor } = useTours();

  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate("/");
    addDoctor(doctorData).then(() => {
      toast.success("Доктор был успешно создан!");
      navigate("/");
    });
  };

  const [name, setName] = useState("");
  const [dayWork, setWork] = useState("");
  const [price, setPrice] = useState();
  const [workExpirience, setExpirience] = useState("");
  const [proffesions, setProffesions] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [position, setPosition] = useState();
  const [post, setPost] = useState("");
  const [postArr, setPostArr] = useState([]);
  const [medPersonal, setPersonal] = useState(false);

  const [infoArr, setInfoArr] = useState([]);
  const [infoTitle, setInfoTitle] = useState("");
  const [infoField, setInfoField] = useState("");

  //upload img
  const [url, setUrl] = useState();
  const [fileData, setFileData] = useState();
  const [diploma, setDiploma] = useState([]);

  const handleImage = (target) => {
    if (target.files[0]) {
      setFileData(target.files[0]);
    }
  };

  //upload fullsize img
  const [url2, setUrl2] = useState();
  const [fileData2, setFileData2] = useState();
  const [diploma2, setDiploma2] = useState([]);

  //upload photo
  const [url3, setUrl3] = useState();
  const [fileData3, setFileData3] = useState();
  const [diploma3, setDiploma3] = useState([]);

  const onSaveDiplom = () => {
    setDiploma((prev) => [...prev, url]);
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
  //
  useMemo(() => {
    if (fileData2) {
      const imageRef = ref(storage, fileData2.name);
      setLoading(true);
      uploadBytes(imageRef, fileData2)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setUrl2(url);
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

  useMemo(() => {
    if (fileData3) {
      const imageRef = ref(storage, fileData3.name);
      setLoading(true);
      uploadBytes(imageRef, fileData3)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setUrl3(url);
            })
            .finally(() => {
              setLoading(false);
            })
            .catch((error) => {
              console.log(error.message, "error");
            });

          setFileData3(null);
        })
        .catch((error) => {
          console.log(error.message, "error");
        });
    }
  }, [fileData3]);

  const handleImage2 = (target) => {
    if (target.files[0]) {
      setFileData2(target.files[0]);
    }
  };

  const handleImage3 = (target) => {
    if (target.files[0]) {
      setFileData3(target.files[0]);
    }
  };

  const onSaveDiplom2 = () => {
    setDiploma2((prev) => [...prev, url2]);
  };

  const onSaveDiplom3 = () => {
    setDiploma3((prev) => [...prev, url3]);
  };

  const savePost = () => {
    setPostArr((prev) => [...prev, post]);
    setPost("");
  };

  const onSaveInfo = (data) => {
    infoArr.push(data);
  };

  const renderDiplomas = useMemo(() => {
    if (diploma.length) {
      return diploma.map((el, index) => (
        <img
          style={{
            width: "200px",
            heigth: "250px",
          }}
          key={`${el}_${index}`}
          src={el}
          alt="diploma"
        />
      ));
    }
  }, [diploma]);

  const renderFullImg = useMemo(() => {
    if (diploma2.length) {
      return (
        <img
          style={{
            width: "200px",
            heigth: "250px",
          }}
          src={diploma2[diploma2.length - 1]}
          alt="diploma"
        />
      );
    }
  }, [diploma2]);

  const renderImg = useMemo(() => {
    if (diploma3.length) {
      return (
        <img
          style={{
            width: "200px",
            heigth: "250px",
          }}
          src={diploma3[diploma3.length - 1]}
          alt="diploma"
        />
      );
    }
  }, [diploma3]);

  const [testArr, setTestArr] = useState([1]);
  const renderInfos = useMemo(() => {
    return testArr.map(() => (
      <InfoInput
        infoTitle={infoTitle}
        setInfoTitle={setInfoTitle}
        infoField={infoField}
        setInfoField={setInfoField}
        setInfoArr={setInfoArr}
        infoArr={infoArr}
        onSaveInfo={onSaveInfo}
      />
    ));
  }, [testArr]);

  const doctorData = {
    day_work: dayWork || "",
    diplomas: diploma || "",
    fullSizeImg: diploma2[0] || "",
    img: diploma3[0] || "",
    imgPos: Number(position) || 1,
    info: infoArr || [],
    name: name || "",
    photo: diploma3[0] || "",
    pos: Number(position) || 1,
    post: postArr || [1],
    price: Number(price) || 1,
    proffesions: proffesions || "",
    specialization: specialization || "",
    year: workExpirience || "",
    medType: medPersonal
  };

  console.log(medPersonal);

  if (isLoading) return <Preloader full />;
  return (
    <FormPageContainer>
      <FormContainer>
        <form
          onSubmit={submit}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "50px",
          }}
        >
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Имя"
            variant="outlined"
            required
            sx={{
              width: "45%",
            }}
          />
          <TextField
            value={dayWork}
            onChange={(e) => setWork(e.target.value)}
            label="Время работы"
            variant="outlined"
            required
            sx={{
              width: "45%",
            }}
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            label="Цена"
            variant="outlined"
            required
            type="number"
            sx={{
              width: "45%",
            }}
          />
          <TextField
            value={workExpirience}
            onChange={(e) => setExpirience(e.target.value)}
            label="Опыт работы"
            variant="outlined"
            required
            type="number"
            sx={{
              width: "45%",
            }}
          />
          <TextField
            value={proffesions}
            onChange={(e) => setProffesions(e.target.value)}
            label="Професии"
            variant="outlined"
            rows={4}
            maxRows={1}
            multiline
            sx={{
              width: "45%",
            }}
          />
          <TextField
            label="Cпециализация"
            variant="outlined"
            value={specialization}
            sx={{ width: "45%" }}
            multiline
            required
            rows={4}
            maxRows={1}
            onChange={(e) => setSpecialization(e.target.value)}
          ></TextField>
          <TextField
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            label="Позиция Доктора"
            variant="outlined"
            required
            type="number"
            sx={{
              width: "45%",
            }}
          />
          <Grid sx={{
            display: "flex",
            gap: 3
          }}>
            {
              medPersonal ?
                <>
                  <Button variant="outlined" onClick={() => setPersonal(false)}>Мед персонал</Button>
                  <Button variant="contained">Врач</Button>
                </>
                :
                <>
                  <Button variant="contained">Мед персонал</Button>
                  <Button variant="outlined" onClick={() => setPersonal(true)} >Врач</Button>
                </>
            }
          </Grid>
          <div
            style={{
              width: "100%",
              height: "2px",
              backgroundColor: "#ccc",
            }}
          ></div>
          <Grid display="block">
            <Typography variant="h5">Дипломы</Typography>
            <FormControl sx={{ marginTop: 2 }}>
              <Button
                sx={{ width: "165%", marginBottom: 2 }}
                variant="contained"
                component="label"
              >
                Добавить диплом
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
                onClick={onSaveDiplom}
                sx={{ width: "165%" }}
                variant="contained"
                color="success"
              >
                Добавить
              </Button>
            </FormControl>
          </Grid>
          <br />
          <Grid display="flex" flexWrap="wrap" gap={3}>
            {renderDiplomas}
          </Grid>
          <div
            style={{
              width: "100%",
              height: "2px",
              backgroundColor: "#ccc",
            }}
          ></div>
          <Grid display="block">
            <Typography variant="h5">Полный рост</Typography>
            <FormControl sx={{ marginTop: 2 }}>
              <Button
                sx={{ width: "165%", marginBottom: 2 }}
                variant="contained"
                component="label"
              >
                Добавить фото в полный рост
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
                onClick={onSaveDiplom2}
                sx={{ width: "165%" }}
                variant="contained"
                color="success"
              >
                Сохранить
              </Button>
            </FormControl>
          </Grid>
          <Grid display="flex" flexWrap="wrap" gap={3}>
            {renderFullImg}
          </Grid>
          <div
            style={{
              width: "100%",
              height: "2px",
              backgroundColor: "#ccc",
            }}
          ></div>
          <Grid display="block">
            <Typography variant="h5">Лицо</Typography>
            <FormControl sx={{ marginTop: 2 }}>
              <Button
                sx={{ width: "165%", marginBottom: 2 }}
                variant="contained"
                component="label"
              >
                Добавить фото не в полный рост
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={(e) => handleImage3(e.target)}
                  name="file"
                />
              </Button>
              <Button
                onClick={onSaveDiplom3}
                sx={{ width: "165%" }}
                variant="contained"
                color="success"
              >
                Сохранить
              </Button>
            </FormControl>
          </Grid>
          <Grid display="flex" flexWrap="wrap" gap={3}>
            {renderImg}
          </Grid>
          <div
            style={{
              width: "100%",
              height: "2px",
              backgroundColor: "#ccc",
            }}
          ></div>
          <Grid
            sx={{
              width: "45%",
            }}
          >
            <TextField
              value={post}
              onChange={(e) => setPost(e.target.value)}
              variant="outlined"
              label="Професии"
              sx={{
                width: "100%",
              }}
            />
            {postArr ? (
              <ul
                style={{
                  marginLeft: "20px",
                }}
              >
                {postArr.map((el, index) => (
                  <li
                    style={{
                      marginBottom: "5px",
                      marginTop: "5px",
                    }}
                    key={index + "_" + el}
                  >
                    {el}
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
            <Button
              onClick={() => savePost()}
              sx={{
                width: "100%",
                marginTop: 1,
              }}
              variant="contained"
            >
              Сохранить
            </Button>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              width: "45%",
            }}
          >
            <Button
              variant="contained"
              onClick={() => setTestArr([...testArr, " "])}
              sx={{
                width: "45%",
                height: "100%",
              }}
            >
              Add one Info
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => testArr.length > 1 && setTestArr([testArr.pop()])}
              sx={{
                width: "45%",
                height: "100%",
              }}
            >
              Remove all info
            </Button>
          </Grid>
          {renderInfos}
          <div
            style={{
              width: "100%",
              height: "2px",
              backgroundColor: "#ccc",
            }}
          ></div>
          <Button
            variant="contained"
            sx={{ width: "100%", height: "80px" }}
            type="submit"
          >
            Save Doctor
          </Button>
        </form>
      </FormContainer>
    </FormPageContainer>
  );
}

export default AddOrEditTourPage;
