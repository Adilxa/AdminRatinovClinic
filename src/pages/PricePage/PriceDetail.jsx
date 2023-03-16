import { Typography, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Preloader from "../../components/preloader/Preloader";
import usePrices from "../../hooks/usePrices";
import PriceItem from "./PriceItem";
import PageContainer from "../../components/containers/PageContainer";

const PriceDetail = () => {
  const { getPrice, detailPrice, isLoading, updatePrice } = usePrices();
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(detailPrice?.list);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    getPrice(id);
  }, [id]);

  useEffect(() => {
    setList(detailPrice?.list);
  }, [detailPrice]);

  const data = {
    group: detailPrice?.group,
    list: list,
  };
  const onSave = () => {
    updatePrice(id, data);
    navigate("/price");
  };

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Typography variant="h4">{detailPrice?.group}</Typography>
        <Button variant="contained" onClick={() => setEdit(!isEdit)}>
            {isEdit ? "Close" : "Edit"}
        </Button>
      </Grid>
      <Grid>
        {detailPrice?.list.map((el, index) => (
          <PriceItem
            id={id}
            setList={setList}
            isEdit={isEdit}
            key={`${el.price}${el.title} `}
            list={list}
            index={index}
            {...el}
          />
        ))}
      </Grid>
      <Button
        onClick={() => onSave()}
        variant="contained"
        sx={{
          width: "100%",
        }}
      >
        Save
      </Button>
    </PageContainer>
  );
};

export default PriceDetail;
