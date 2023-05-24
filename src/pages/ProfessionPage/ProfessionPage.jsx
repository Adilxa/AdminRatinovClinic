import React, { useEffect, useMemo, useState } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import ProfessionTable from "../../components/tables/ProfessionTable";
import { TableRow, TableCell, IconButton, TextField } from "@mui/material";
import useProfession from "../../hooks/useProfession";
import Preloader from "../../components/preloader/Preloader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

const ProfessionPage = () => {
  const { isLoading, proffession, getProfessions, addProfession } =
    useProfession();

  useEffect(() => {
    getProfessions();
  }, [getProfessions, addProfession]);

  const [add, setAdd] = useState(false);
  const [prof, setProf] = useState("");

  const renderProfession = useMemo(
    () =>
      proffession.map((el, index) => (
        <ProfessionTable key={`${el.pos}_${index}`} {...el} />
      )),
    [proffession, addProfession]
  );

  const data = {
    proffesion: prof,
    pos: proffession.length + 1,
  };
  const onSave = () => {
    if (prof) {
      addProfession(data);
      setAdd(false);
      setProf("");
    } else {
      alert("Заполните поле!");
    }
  };

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer title="Профессии">
      <TableContainer
        isLoading={isLoading}
        Header={
          <TableRow>
            <TableCell>Профессия</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell scope="row" align="right">
              <IconButton onClick={() => setAdd(!add)}>
                <AddCircleOutlineIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        }
        Body={renderProfession}
      >
        {add && (
          <TableRow>
            <TableCell>
              <TextField
                sx={{
                  width: "100%",
                }}
                value={prof}
                onChange={(e) => setProf(e.target.value)}
              ></TextField>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell scope="row" align="right">
              <IconButton onClick={() => onSave()}>
                <FileDownloadDoneIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        )}
      </TableContainer>
    </PageContainer>
  );
};

export default ProfessionPage;
