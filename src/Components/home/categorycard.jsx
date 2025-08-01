import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Link } from "react-router-dom";

const CategoryCard = ({ title, label, image, to }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600–959px

  const overlayPaddingX = isTablet ? 2 : 3;

  return (
    <Box
      component={Link}
      to={to}
      sx={{
        display: "block",
        width: "100%",         // ✅ Full width để parent (Grid) kiểm soát
        height: "100%",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        textDecoration: "none",
        transition: "transform 0.3s ease-in-out",
        "&:hover .hover-zoom": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box
        className="hover-zoom"
        component="img"
        src={image}
        alt={title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.3s ease-in-out",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.35)",
          color: "#fff",
          px: overlayPaddingX,
          py: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Button
          variant="contained"
          size="small"
          sx={{
            bgcolor: "#d32f2f",
            mb: 1,
            textTransform: "none",
            fontSize: 13,
            width: "fit-content",
            borderRadius: "30px",
          }}
        >
          {label}
        </Button>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            mt: 1,
            fontSize: 14,
          }}
        >
          Xem ngay →
        </Typography>
      </Box>
    </Box>
  );
};

export default CategoryCard;
