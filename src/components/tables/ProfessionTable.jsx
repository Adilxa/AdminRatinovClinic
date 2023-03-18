import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import TableCellContainer from "./TableCellContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import useProfession from "../../hooks/useProfession";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ProfessionTable = ({ tid, proffesion }) => {
  const { getProfession, detailProfession, updateProfession } = useProfession();

  useEffect(() => {
    getProfession(tid);
  }, [tid]);
  const onDelete = async (e) => {
    e.stopPropagation();
    const res = window?.confirm(
      "Вы действительно хотите удалить " + proffesion + "?"
    );
    if (res) {
      await deleteDoc(doc(db, "proffesions", tid));
      window?.location?.reload();
    }
  };

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");

  const data = {
    proffesion: title || detailProfession?.proffesion,
    pos: detailProfession?.pos,
  };
  const onSave = () => {
    updateProfession(tid, data);
    setEdit(false);
  };

  return (
    <>
      <TableCellContainer
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TableCell scope="row">
          {edit ? (
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                value={detailProfession.proffesion}
                onChange={(e) =>
                  setTitle((detailProfession.proffesion = e.target.value))
                }
                sx={{
                  padding: "0px 14px",
                }}
              />
              <IconButton onClick={() => onSave()}>
                <CheckCircleOutlineIcon />
              </IconButton>
            </Grid>
          ) : (
            <Typography>{detailProfession?.proffesion}</Typography>
          )}
        </TableCell>
        <TableCell scope="row"></TableCell>
        <TableCell scope="row"></TableCell>
        <TableCell scope="row" align="right"></TableCell>
        <TableCell scope="row" align="right">
          <IconButton onClick={() => setEdit(!edit)}>
            <DesignServicesIcon />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableCellContainer>
    </>
  );
};
export default ProfessionTable;
