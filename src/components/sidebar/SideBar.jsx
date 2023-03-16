import React from "react";
import css from "./SideBar.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CommuteIcon from "@mui/icons-material/Commute";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../firebase/firebase";

const links = [
  {
    path: "/",
    title: "Доктора",
    Icon: CommuteIcon,
  },
  {
    path: "/comments",
    title: "Комментарии",
    Icon: HandshakeIcon,
  },
  {
    path: "/price",
    title: "Цены",
    Icon: AddIcCallIcon,
  },
  {
    path: "/blogs",
    title: "Блоги",
    Icon: AddIcCallIcon,
  },
];

function SideBar() {
  const location = useLocation();
  const onLogout = () => {
    logout();
  };
  return (
    <div className={css.wrapper}>
      <div className={css.logo}>Ratinov Clinic</div>
      <List>
        {links.map(({ path, title, Icon }) => (
          <ListItem
            key={path}
            selected={path === location.pathname}
            classes={{ selected: css.selected }}
            disablePadding
            component={Link}
            to={path}
          >
            <ListItemButton>
              <ListItemIcon>
                <Icon
                  style={path === location.pathname ? { color: "#fff" } : {}}
                />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
        <br />
        <br />
        <ListItem disablePadding onClick={onLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Выйти"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}

export default SideBar;
