import React, { useState, useMemo, useEffect } from "react";
import FormPageContainer from "../../components/containers/FormPageContainer";
import { TextField, Button, Grid } from "@mui/material";
import useBLogs from "../../hooks/useBlogs";
import Preloader from "../../components/preloader/Preloader";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AddBlogDes from "./AddBlogDes";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const { setLoading, isLoading, detailBlog, addBlog } = useBLogs();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  ///

  const [url, setUrl] = useState();
  const [fileData, setFileData] = useState();

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

  const [des, setDes] = useState([""]);

  ///
  let desArr = des.filter((el) => {
    return el != "";
  });

  const data = {
    des: desArr,
    id: Math.floor(Math.random() * 11000000),
    img: url || "",
    title: title,
  };

  const createBlog = () => {
    if (data.title) {
      addBlog(data);
      navigate("/blogs");
    } else {
      alert("Заполните поля!");
    }
  };

  if (isLoading) {
    return <Preloader full />;
  } else {
    return (
      <FormPageContainer>
        <form>
          <TextField
            sx={{
              width: "70%",
              marginBottom: 2,
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="TITLE"
            required
          />

          <img
            src={url && url}
            alt="upload img"
            required
            style={{
              width: "70%",
              height: "40vh",
              objectFit: "cover",
              borderRadius: 4,
              marginTop: 2,
              marginBottom: 15,
              border: "1px solid #ccc",
              display: "block",
            }}
          />
          <Button
            sx={{ width: "70%", marginBottom: 2 }}
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
          <Grid>
            {des.map((el, index) => (
              <AddBlogDes
                des={des}
                key={`${el} + ${index}`}
                title={el}
                setDes={setDes}
              />
            ))}
          </Grid>
          <Button
            variant="contained"
            color="success"
            sx={{
              padding: "10px 20px",
            }}
            onClick={() => createBlog()}
          >
            Save
          </Button>
        </form>
      </FormPageContainer>
    );
  }
};

export default AddBlog;
