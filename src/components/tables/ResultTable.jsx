import React from "react";
import { IconButton, TableCell } from "@mui/material";
import TableCellContainer from "./TableCellContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const ResultTable = ({ tid, type, time }) => {
  const onDelete = async (e) => {
    e.stopPropagation();
    const res = window?.confirm(
      "Вы действительно хотите удалить " + type + "?"
    );
    if (res) {
      await deleteDoc(doc(db, "result", tid));
      window?.location?.reload();
    }
  };

  const renderType = (type) => {
    if (type === "neck") {
      return "Шейный отдел";
    } else {
      return "Поясничный отдел";
    }
  };

  return (
    <TableCellContainer path={`/results/${tid}`}>
      <TableCell scope="row">{renderType(type)}</TableCell>
      <TableCell scope="row">{time}</TableCell>
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
export default ResultTable;
