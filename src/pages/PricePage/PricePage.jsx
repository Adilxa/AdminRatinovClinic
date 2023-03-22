import React, { useEffect, useMemo } from "react";
import Preloader from "../../components/preloader/Preloader";
import usePrices from "../../hooks/usePrices";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import PriceTable from "../../components/tables/PriceTable";
import { TableRow, TableCell } from "@mui/material";


const PricePage = () => {
  const { isLoading, getPrices, prices } = usePrices();
  useEffect(() => {
    getPrices();
  }, [getPrices]);
  const renderPrice = useMemo(
    () => prices.map((el) => <PriceTable key={el.tid} {...el} />),
    [prices]
  );

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer
      title="Цены"
      pathToAdd={"/price/create"}
      btnText="+ Добавить Цену"
    >
      <TableContainer
        isLoading={isLoading}
        Header={
          <TableRow>
            <TableCell>Тип</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell />
          </TableRow>
        }
        Body={renderPrice}
      ></TableContainer>
    </PageContainer>
  );
};

export default PricePage;
