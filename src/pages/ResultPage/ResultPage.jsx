import React, { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import { TableRow, TableCell } from "@mui/material";
import TableContainer from "../../components/TableContainer/TableContainer";
import ResultTable from "../../components/tables/ResultTable";
import useResult from "../../hooks/useResult";
import Preloader from "../../components/preloader/Preloader";

const ResultPage = () => {
  const { isLoading, result, getResult , updateResult } = useResult();

  useEffect(() => {
    getResult();
  }, [getResult , updateResult]);

  const renderResult = useMemo(
    () =>
      result.map((el, index) => (
        <ResultTable key={`${el.num}_${index}`} {...el} />
      )),
    [result]
  );

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer
      title="Результаты"
      pathToAdd={"/results/create"}
      btnText="+ Добавить результат"
    >
      <TableContainer
        isLoading={isLoading}
        Header={
          <TableRow>
            <TableCell>Тип</TableCell>
            <TableCell>Результат</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell />
          </TableRow>
        }
        Body={renderResult}
      ></TableContainer>
    </PageContainer>
  );
};

export default ResultPage;
