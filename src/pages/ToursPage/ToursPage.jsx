import { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableRow, TableCell } from "@mui/material";
import TourTable from "../../components/tables/TourTable";
import useTours from "../../hooks/useTours";
import Preloader from "../../components/preloader/Preloader";

function ToursPage() {
  const { tours, getDoctor, isLoading } = useTours();

  useEffect(() => {
    getDoctor();
  }, [getDoctor]);

  const renderList = useMemo(
    () => tours.map((el) => <TourTable key={el.tid} {...el} />),
    [tours]
  );

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer
      title="Доктора"
      pathToAdd="/tour/create"
      btnText={"+ Добавить доктора"}
    >
      <TableContainer
        isLoading={isLoading}
        Header={
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell />
          </TableRow>
        }
        Body={renderList}
      />
    </PageContainer>
  );
}

export default ToursPage;
