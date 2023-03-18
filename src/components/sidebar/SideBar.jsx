import React from "react";
import css from "./SideBar.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../firebase/firebase";
import GroupsIcon from "@mui/icons-material/Groups";
import CommentIcon from "@mui/icons-material/Comment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookIcon from "@mui/icons-material/Book";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const links = [
  {
    path: "/",
    title: "Доктора",
    Icon: GroupsIcon,
  },
  {
    path: "/comments",
    title: "Комментарии",
    Icon: CommentIcon,
  },
  {
    path: "/price",
    title: "Цены",
    Icon: AttachMoneyIcon,
  },
  {
    path: "/blogs",
    title: "Блоги",
    Icon: BookIcon,
  },
  {
    path: "/youtube",
    title: "Видео",
    Icon: YouTubeIcon,
  },
  {
    path: "/profession",
    title: "Профессии",
    Icon: LocalHospitalIcon,
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
