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

  const filteredList = tours.filter(item => {
    return (
      item?.name
        .includes("ДАЙДАКЕЕВА ГУЛИНА ТОКТОНАЛИЕВНА") ||
      item?.name
        .includes("КОНОПЛЕВ ТИМОФЕЙ ДМИТРИЕВИЧ") ||
      item?.name
        .includes("ОСМАНОВА ГУЗАЛИЯ БЕГИВАЕВНА") ||
      item?.name
        .includes("ХЕГАЙ МАРИНА ФЕДОРОВНА") ||
      item?.name
        .includes("КУБАНЫЧБЕК КЫЗЫ ГУЛДААНА") ||
      item?.name
        .includes("АЙДАРАЛИЕВА ФАРИЗАТ ЖЕЕНКУЛОВНА") ||
      item?.proffesions
        .includes("Медсестра") ||
      item?.proffesions
        .includes("Массажист") ||
      item?.proffesions
        .includes("специалист по лечебной физкультуре")
    );
  });

  console.log(tours);

  const filteredListDoctors = tours.filter(item => {
    return !(
      item?.name
        .includes("ДАЙДАКЕЕВА ГУЛИНА ТОКТОНАЛИЕВНА") ||
      item?.name
        .includes("КОНОПЛЕВ ТИМОФЕЙ ДМИТРИЕВИЧ") ||
      item?.name
        .includes("ОСМАНОВА ГУЗАЛИЯ БЕГИВАЕВНА") ||
      item?.name
        .includes("ХЕГАЙ МАРИНА ФЕДОРОВНА") ||
      item?.name
        .includes("КУБАНЫЧБЕК КЫЗЫ ГУЛДААНА") ||
      item?.name
        .includes("АЙДАРАЛИЕВА ФАРИЗАТ ЖЕЕНКУЛОВНА") ||
      item?.proffesions
        .includes("Медсестра") ||
      item?.proffesions
        .includes("Массажист") ||
      item?.proffesions
        .includes("специалист по лечебной физкультуре")
    );
  });

  const renderList = useMemo(
    () => filteredListDoctors.map((el) => <TourTable key={el.tid} {...el} />),
    [tours]
  );


  const renderPersenal = useMemo(
    () => filteredList.map((el) => <TourTable key={el.tid} {...el} />),
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
