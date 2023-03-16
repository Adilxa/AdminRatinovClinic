import React, { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import useComments from "../../hooks/useComments";
import Preloader from "../../components/preloader/Preloader";
import CommentsTable from "../../components/tables/CommentsTable";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableRow, TableCell } from "@mui/material";

const CommentsPage = () => {
  const { getComments, comments, isLoading } = useComments();
  useEffect(() => {
    getComments();
  }, [getComments]);

  const renderComments = useMemo(
    () =>
      comments.map((el , index) => (
        <CommentsTable key={`${el.link} + ${index}`} {...el} />
      )),
    [comments]
  );

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer
      title="Отзывы"
      pathToAdd={"/comments/create"}
      btnText={"+ Добавить отзыв"}
    >
      <TableContainer
        isLoading={isLoading}
        Header={
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell>Никнейм</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell />
          </TableRow>
        }
        Body={renderComments}
      />
    </PageContainer>
  );
};

export default CommentsPage;
