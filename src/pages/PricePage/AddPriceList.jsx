import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

const AddPriceList = ({ setList, index, list }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [onSaved, setSaved] = useState(false);

  const data = {
    id: index,
    price: Number(price),
    title: title,
  };
  const onSave = () => {
    if (title && price) {
      setList([...list, data]);
      setSaved(true);
    } else {
      alert("Заполните все поля");
    }
  };

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: 4,
        borderRadius: "5px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        label="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          width: "100%",
        }}
      ></TextField>
      <TextField
        label="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        sx={{
          width: "100%",
        }}
        type="number"
      ></TextField>
      {onSaved ? (
        <Button
          sx={{
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          variant="contained"
          disabled
        >
          <CheckIcon
            sx={{
              padding: "15px 5px",
            }}
          />
        </Button>
      ) : (
        <Button
          sx={{
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => onSave()}
          variant="contained"
        >
          <CheckIcon
            sx={{
              padding: "15px 5px",
            }}
          />
        </Button>
      )}
    </Grid>
  );
};

export default AddPriceList;
