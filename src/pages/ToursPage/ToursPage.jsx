import { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableRow, TableCell, Typography } from "@mui/material";
import TourTable from "../../components/tables/TourTable";
import useTours from "../../hooks/useTours";
import Preloader from "../../components/preloader/Preloader";

function ToursPage() {
  const { tours, getDoctor, isLoading } = useTours();

  useEffect(() => {
    getDoctor();
  }, [getDoctor]);

  const renderList = useMemo(
    () => tours.filter((el) => el.medType == true).map((el) => <TourTable key={el.tid} {...el} />),
    [tours]
  );

  const renderPersenal = useMemo(
    () => tours.filter((el) => el.medType == false).map((el) => <TourTable key={el.tid} {...el} />),
    [tours]
  )

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer
      title="Cпециалисты"
      pathToAdd="/tour/create"
      btnText={"+ Добавить доктора"}
    >
      <Typography variant="h5" mt={3} mb={3}>Врачи</Typography>
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
      <Typography variant="h5" mt={3} mb={3}>Младший мед. персонал</Typography>
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
        Body={renderPersenal}
      />
    </PageContainer>
  );
}

export default ToursPage;
