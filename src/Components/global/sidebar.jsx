import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
  Typography,
  Divider,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  ExpandLess,
  ExpandMore,
  Close as CloseIcon,
} from "@mui/icons-material";
import { fetchParentCategories } from "../../Services/categoryService";

const Sidebar = ({ open, onClose }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const fontSize = isMobile ? "0.85rem" : isTablet ? "0.9rem" : "1rem";
  const drawerWidth = isMobile ? "80vw" : isTablet ? 280 : 300;

  useEffect(() => {
    fetchParentCategories()
      .then(setParentCategories)
      .catch((err) => console.error("Lỗi tải danh mục cha:", err));
  }, []);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
    >
      <Box
        sx={{
          width: drawerWidth,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1,
            bgcolor: "#ffff",
            borderBottom: "1px solid #eee",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textAlign: "center",
            }}
          >
            <Box sx={{ height: 70, paddingLeft: 1 }}>
              <img
                src="/images/logo.png"
                alt="Logo Luxinox nẹp"
                title="Trang chủ Luxinox nẹp"
                style={{ height: "100%", objectFit: "contain", width: "auto" }}
              />
            </Box>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Menu chính */}
        <Box sx={{ flexGrow: 1 }} onClick={onClose}>
          <List>
            <ListItemButton component={NavLink} to="/">
              <ListItemText
                primary="Trang chủ"
                primaryTypographyProps={{ fontSize }}
              />
            </ListItemButton>

            <ListItemButton
              onClick={(e) => {
                e.stopPropagation();
                setOpenDropdown(!openDropdown);
              }}
            >
              <ListItemText
                primary="Sản phẩm"
                primaryTypographyProps={{ fontSize }}
              />
              {openDropdown ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openDropdown} timeout={300} unmountOnExit>
              <List component="div" disablePadding>
                {parentCategories.map((item) => (
                  <ListItemButton
                    key={item.id}
                    component={NavLink}
                    to={`/san-pham/${item.slug}`}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{ fontSize }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            {[
              { label: "Giới thiệu", path: "/gioi-thieu" },
              { label: "Tin tức", path: "/tin-tuc" },
              { label: "Dự án", path: "/du-an" },
              { label: "Liên hệ", path: "/lien-he" },
            ].map((item) => (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Divider />

        {/* Footer */}
        <Box sx={{ p: 2, fontSize: "1rem", bgcolor: "#fafafa" }}>
          <Typography fontWeight="bold" sx={{ fontSize: "0.9rem" }}>
            CÔNG TY TNHH LUXINOX
          </Typography>
          <Typography sx={{ mt: 0.5, fontSize: "0.8rem" }}>
            Hotline: <b style={{ color: "#e53935" }}>0935.128.542</b>
          </Typography>
          <Typography sx={{ fontSize: "0.8rem" }}>
            Email:{" "}
            <b style={{ color: "#1e88e5" }}>Lecongmanhtruong273@gmail.com</b>
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
