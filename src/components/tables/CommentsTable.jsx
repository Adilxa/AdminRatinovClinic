import React from "react";
import { IconButton, TableCell } from "@mui/material";
import TableCellContainer from "./TableCellContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const CommentsTable = ({ tid, name, link }) => {
  const onDelete = async (e) => {
    e.stopPropagation();
    const res = window?.confirm(
      "Вы действительно хотите удалить " + name + "?"
    );
    if (res) {
      await deleteDoc(doc(db, "comments", tid));
      window?.location?.reload();
    }
  };

  return (
    <TableCellContainer path={`/comments/${tid}`}>
      <TableCell scope="row">{name}</TableCell>
      <TableCell scope="row">{link}</TableCell>
      <TableCell scope="row"></TableCell>
      <TableCell scope="row"></TableCell>
      <TableCell scope="row" align="right">
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableCellContainer>
  );
};
export default CommentsTable;
