import { Grid } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import Preloader from "../../components/preloader/Preloader";
import usePrices from "../../hooks/usePrices";
import Price from "./Price";
import FormPageContainer from "../../components/containers/FormPageContainer";
import PageContainer from "../../components/containers/PageContainer";

const PricePage = () => {
  const { isLoading, getPrices, prices } = usePrices();
  useEffect(() => {
    getPrices();
  }, [getPrices]);
  console.log(prices);

  const renderPrice = useMemo(() => prices.map((el) => <Price key={el.tid} {...el}/>), [prices]);

  if (isLoading) return <Preloader full />;
  return (
    <FormPageContainer>
        <PageContainer pathToAdd="/price/create" btnText={"+ Добавить Цену"}>
        {renderPrice}
        </PageContainer>
    </FormPageContainer>
  )
};

export default PricePage;
