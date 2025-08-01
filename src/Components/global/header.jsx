import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
  useTheme,
  useMediaQuery,
  Dialog,
  Slide,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink } from "react-router-dom";
import {
  FaYoutube,
  FaPinterest,
  FaTumblr,
  FaMedium,
  FaLinkedin,
} from "react-icons/fa";
import Sidebar from "./sidebar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openSearchMobile, setOpenSearchMobile] = useState(false);

  const handleMenuClick = () => setOpenSidebar(true);
  const handleCloseSidebar = () => setOpenSidebar(false);
  const handleOpenSearch = () => setOpenSearchMobile(true);
  const handleCloseSearch = () => setOpenSearchMobile(false);

  return (
    <header>
      <Box sx={{ width: "100%", bgcolor: "#fff", borderBottom: "1px solid #ddd" }}>
        <Box
          component="nav"
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            px: { xs: 1, sm: 2 },
            py: 1,
            height: { xs: 70, sm: 80 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {isMobile ? (
            <>
              {/* Mobile: Menu icon (left) */}
              <IconButton onClick={handleMenuClick} aria-label="Mở menu điều hướng">
                <MenuIcon />
              </IconButton>

              {/* Logo (center) */}
              <Box sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                <RouterLink to="/" aria-label="Trang chủ Luxinox">
                  <Box sx={{ height: 50 }}>
                    <img
                      src="/images/logo.png"
                      alt="Logo Luxinox nẹp"
                      title="Trang chủ Luxinox nẹp"
                      style={{ height: "100%", objectFit: "contain", width: "auto" }}
                    />
                  </Box>
                </RouterLink>
              </Box>

              {/* Search icon (right) */}
              <IconButton onClick={handleOpenSearch} aria-label="Tìm kiếm">
                <SearchIcon />
              </IconButton>
            </>
          ) : (
            <>
              {/* Desktop: Logo (left) */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton onClick={handleMenuClick} aria-label="Mở menu điều hướng">
                  <MenuIcon />
                </IconButton>
                <RouterLink to="/" aria-label="Trang chủ Luxinox">
                  <Box sx={{ height: 80 }}>
                    <img
                      src="/images/logo.png"
                      alt="Logo Luxinox nẹp"
                      title="Trang chủ Luxinox nẹp"
                      style={{ height: "100%", objectFit: "contain", width: "auto" }}
                    />
                  </Box>
                </RouterLink>
              </Box>

              {/* Search bar */}
              <Box
                component="form"
                onSubmit={(e) => e.preventDefault()}
                role="search"
                sx={{ flex: 1, mx: 2, maxWidth: 500 }}
              >
                <Paper
                  sx={{
                    p: "4px 8px",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Tìm kiếm sản phẩm..."
                  />
                  <IconButton type="submit" sx={{ p: "10px" }}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Box>

              {/* Social Icons */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Tooltip title="YouTube">
                  <IconButton
                    component="a"
                    href="https://www.youtube.com/@nepdanang"
                    target="_blank"
                    sx={{ color: "#FF0000" }}
                  >
                    <FaYoutube />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Pinterest">
                  <IconButton
                    component="a"
                    href="https://pinterest.com/nepinoxdanang"
                    target="_blank"
                    sx={{ color: "#E60023" }}
                  >
                    <FaPinterest />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Tumblr">
                  <IconButton
                    component="a"
                    href="https://www.tumblr.com/nepinoxdanang"
                    target="_blank"
                    sx={{ color: "#35465C" }}
                  >
                    <FaTumblr />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Medium">
                  <IconButton
                    component="a"
                    href="https://medium.com/@nepdanang"
                    target="_blank"
                    sx={{ color: "#000000" }}
                  >
                    <FaMedium />
                  </IconButton>
                </Tooltip>
                <Tooltip title="LinkedIn">
                  <IconButton
                    component="a"
                    href="https://linkedin.com/in/nẹp-inox-nhôm-đà-nẵng-a02811169"
                    target="_blank"
                    sx={{ color: "#0077B5" }}
                  >
                    <FaLinkedin />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* Sidebar Drawer */}
      <Sidebar open={openSidebar} onClose={handleCloseSidebar} />

      {/* Mobile Search Dialog */}
      <Dialog
        open={openSearchMobile}
        onClose={handleCloseSearch}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            mt: "10vh",
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Tìm kiếm</Typography>
            <IconButton onClick={handleCloseSearch} aria-label="Đóng">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box component="form" onSubmit={(e) => e.preventDefault()}>
            <Paper
              sx={{
                p: "4px 8px",
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Nhập từ khóa tìm kiếm..."
              />
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
        </Box>
      </Dialog>
    </header>
  );
};

export default Header;
