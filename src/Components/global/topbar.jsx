import React from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { FaFacebookF } from "react-icons/fa";
const TopBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // xs < 600px

  return (
    <header>
      <Box
        sx={{
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          px: 2,
          py: 0.5,
          fontSize: 14,
          borderBottom: "1px solid #ddd",
          textAlign: { xs: "center", sm: "left" },
          gap: { xs: 0.5, sm: 0 },
        }}
      >
        {/* Liên kết điều hướng – ẩn ở mobile */}
        <Box
          component="nav"
          aria-label="Liên kết người dùng"
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: 2,
          }}
        >
          {/* ✅ Thay nội dung tại đây */}
          <Box></Box>
        </Box>

        {/* Thông tin liên hệ – luôn hiển thị */}
        <address style={{ fontStyle: "normal" }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.85rem",
            }}
          >
            Hotline: <b style={{ color: "#e53935" }}>0935.128.542</b> hoặc{" "}
            <b style={{ color: "#1e88e5" }}>Lecongmanhtruong273@gmail.com</b>
          </Typography>
        </address>
      </Box>
    </header>
  );
};

export default TopBar;
