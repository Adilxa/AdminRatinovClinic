import React from "react";
import { IconButton, TableCell } from "@mui/material";
import TableCellContainer from "./TableCellContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const CommentsTable = ({ tid, title }) => {
  const onDelete = async (e) => {
    e.stopPropagation();
    const res = window?.confirm(
      "Вы действительно хотите удалить " + title + "?"
    );
    if (res) {
      await deleteDoc(doc(db, "blog", tid));
      window?.location?.reload();
    }
  };

  return (
    <TableCellContainer path={`/blogs/${tid}`}>
      <TableCell scope="row">{title}</TableCell>
      <TableCell scope="row"></TableCell>
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
