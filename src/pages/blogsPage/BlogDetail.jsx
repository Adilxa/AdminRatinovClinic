import { Typography, Grid, Button, TextField } from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import useBLogs from "../../hooks/useBlogs";
import PageContainer from "../../components/containers/PageContainer";
import FormPageContainer from "../../components/containers/FormPageContainer";
import Preloader from "../../components/preloader/Preloader";
import BlogDes from "./BlogDes";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const { getBlog, detailBlog, isLoading, setLoading, updateBlog } = useBLogs();
  const { id } = useParams();
  const [des, setDes] = useState(detailBlog?.des);
  const [isEdit, setEdit] = useState(false);
  const [title, setTitle] = useState(detailBlog?.title);
  const navigate = useNavigate();
  //upload image

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
  //

  useEffect(() => {
    getBlog(id);
  }, [id]);

  useEffect(() => {
    setDes(detailBlog?.des);
  }, [detailBlog]);

  const data = {
    des: des,
    id: detailBlog?.id,
    img: url || detailBlog?.img,
    title: title || detailBlog?.title,
  };
  console.log(data);
  const update = () => {
    navigate("/blogs");
    updateBlog(id, data);
  };

  if (isLoading) return <Preloader full />;
  return (
    <FormPageContainer>
      {isEdit ? (
        <Button
          sx={{
            marginBottom: "10px",
            width: "20%",
          }}
          variant="contained"
          color="success"
          onClick={() => update()}
        >
          Save
        </Button>
      ) : (
        <Button
          sx={{
            marginBottom: "10px",
            width: "20%",
          }}
          variant="contained"
          onClick={() => setEdit(!isEdit)}
        >
          Edit
        </Button>
      )}
      <img
        loading="lazy"
        style={{
          width: "100%",
          height: "50vh",
          objectFit: "cover",
          borderRadius: "5px",
        }}
        src={detailBlog?.img}
        alt="main image"
      />
      {isEdit && (
        <>
          <Button
            sx={{ width: "100%", marginBottom: 2 }}
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
        </>
      )}
      {url && (
        <img
          style={{
            width: "100%",
            height: "50vh",
            objectFit: "cover",
            borderRadius: "5px",
          }}
          src={url}
          alt="main image"
        />
      )}
      {isEdit ? (
        <TextField
          value={detailBlog?.title}
          sx={{
            width: "100%",
            marginTop: 5,
            marginBottom: 5,
          }}
          onChange={(e) => setTitle((detailBlog.title = e.target.value))}
        />
      ) : (
        <Typography
          variant="h6"
          sx={{
            marginTop: 2,
            marginBottom: 3,
          }}
        >
          {detailBlog?.title}
        </Typography>
      )}
      {detailBlog?.des.map((el, index) =>
        isEdit ? (
          <BlogDes
            key={el + " " + index}
            title={el}
            index={index}
            setDes={setDes}
          />
        ) : (
          <Typography
            sx={{
              marginBottom: 3,
            }}
            key={el + " " + index}
          >
            {el}
          </Typography>
        )
      )}
    </FormPageContainer>
  );
};

export default BlogDetail;
