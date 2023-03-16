import React, { useMemo, useState } from "react";
import FormPageContainer from "../../components/containers/FormPageContainer";
import { TextField, Grid, Button } from "@mui/material";
import AddPriceList from "./AddPriceList";
import usePrices from "../../hooks/usePrices";
import { useNavigate } from "react-router-dom";

const AddPrice = () => {
  const [list, setList] = useState([""]);
  const [groupName, setGroupName] = useState("");
  const { addPrice } = usePrices();
  const navigate = useNavigate();
  console.log(list);
  const renderList = useMemo(
    () =>
      list.map((el, index) => (
        <AddPriceList
          key={`${el} ${index}`}
          list={list}
          setList={setList}
          index={index}
        />
      )),
    [list, setList]
  );

  const newArr = list.filter((element) => element !== "");
  const data = {
    group: groupName,
    list: newArr,
  };

  const onSave = () => {
    if (data.group.length > 2 || data.list.length > 1) {
      addPrice(data);
      navigate("/price");
    } else {
      alert("Заполните поля");
    }
  };

  console.log(data);
  return (
    <FormPageContainer>
      <TextField
        value={groupName}
        sx={{
          marginBottom: 4,
          width: "100%",
        }}
        variant="outlined"
        label="Enter a Group Name"
        onChange={(e) => setGroupName(e.target.value)}
      ></TextField>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {renderList}
      </Grid>
      <Button
        variant="contained"
        color="success"
        sx={{
          width: "100%",
          padding: "10px",
          fontSize: "20px",
        }}
        onClick={() => onSave(data)}
      >
        Create Price
      </Button>
    </FormPageContainer>
  );
};

export default AddPrice;
