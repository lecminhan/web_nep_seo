import React from "react";
import { Breadcrumbs, Link, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const BreadcrumbsNav = ({ links }) => {
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" }, // Sử dụng flex để căn chỉnh tốt hơn
        overflowX: "auto",
        whiteSpace: "nowrap",
        px: { xs: 2, sm: 0 },
        pt: { xs: 1, sm: 1.5, md: 2 },
        pb: { xs: 1, sm: 1.5, md: 2 },
        width: "100%",
        ml: { sm: "20px", md: "30px" },
        alignItems: "center", // Căn giữa dọc
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
          lineHeight: 1.5, // Đồng nhất chiều cao dòng
        }}
      >
        {links.map((item, index) =>
          item.href && index !== links.length - 1 ? (
            <Link
              key={index}
              component={RouterLink}
              to={item.href}
              underline="hover"
              color="inherit"
              sx={{
                fontWeight: index === 0 ? 600 : 400,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                lineHeight: 1.5, // Đồng nhất với Typography
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "inline-flex",
                alignItems: "center",
                maxWidth: { xs: "100px", sm: "150px", md: "200px" }, // Giới hạn chiều rộng để tránh tràn
              }}
            >
              {item.label}
            </Link>
          ) : (
            <Typography
              key={index}
              color="text.secondary"
              sx={{
                fontWeight: 400,
                opacity: 0.75,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                lineHeight: 1.5, // Đồng nhất với Link
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "inline-flex",
                alignItems: "center",
                maxWidth: { xs: "100px", sm: "150px", md: "200px" }, // Giới hạn chiều rộng
              }}
            >
              {item.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbsNav;
