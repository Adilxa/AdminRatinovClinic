import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Preloader from "../../components/preloader/Preloader";
import useComments from "../../hooks/useComments";
import FormPageContainer from "../../components/containers/FormPageContainer";
import { Typography, Grid, Button } from "@mui/material";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const CommentsDetail = () => {
  const { id } = useParams();
  const { getComment, detailComment, isLoading } = useComments();

  useEffect(() => {
    getComment(id);
  }, [id]);
  const navigate = useNavigate();
  const onDelete = async (e) => {
    e.stopPropagation();
    const res = window?.confirm(
      "Вы действительно хотите удалить " + detailComment?.name + "?"
    );
    if (res) {
      await deleteDoc(doc(db, "comments", id));
      navigate("/comments");
    }
  };

  if (isLoading) return <Preloader full />;
  return (
    <FormPageContainer>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={5}
      >
        <Grid>
          <Typography variant="h4">{detailComment?.name}</Typography>
          <h3
            style={{
              color: "gray",
            }}
          >
            {detailComment?.link}
          </h3>
        </Grid>
      </Grid>
      <Typography sx={{
        width:"90%"
      }} mb={5} variant="h6">
        {detailComment?.des}
      </Typography>
      <Grid
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{
            borderRadius: "50%",
          }}
          onClick={(e) => onDelete(e)}
        >
          <DeleteSharpIcon
            sx={{
              padding: "14px 5px",
              opacity: "1.5",
            }}
          />
        </Button>
      </Grid>
    </FormPageContainer>
  );
};

export default CommentsDetail;
