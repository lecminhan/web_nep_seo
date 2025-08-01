import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Rating,
  useTheme,
  useMediaQuery,
  Container,
  Button,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const Section5 = () => {
  const [categories, setCategories] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
 const API_URL = process.env.REACT_APP_API_URL;
  const allowedNames = [
    "Nẹp Inox 304",
    "Nẹp Nhôm Cao Cấp",
    "Nẹp Đồng Thau",
    "Nẹp Nhựa PVC",
    "Nẹp Xây Dựng",
    "Nẹp Đèn LED",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/categories/tree-with-products`);
        const data = res.data;

        const filteredCategories = data
          .filter((cat) => allowedNames.includes(cat.name) && cat.children)
          .map((cat) => {
            let products = [];
            cat.children.forEach((child) => {
              if (Array.isArray(child.products)) {
                products = [...products, ...child.products];
              }
            });

            return {
              name: cat.name,
              slug: cat.slug, // assuming API provides slug
              products: products.slice(0, 10),
            };
          });

        setCategories(filteredCategories);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const getFontSize = (base) => {
    if (isMobile) return base * 0.85;
    if (isTablet) return base;
    return base + 1;
  };

  const getImageHeight = () => {
    if (isMobile) return 120;
    if (isTablet) return 140;
    return 160;
  };

  const getRatingSize = () => {
    return isMobile || isTablet ? "small" : "medium";
  };

  return (
    <Box component="section" sx={{ pb: 3, pt: 4, bgcolor: "#fff", padding: "0px 15px" }}>
      <Container maxWidth="xl">
        {categories.map((cat, i) => (
          <Box key={i} sx={{ mb: 6 }}>
            {/* Tiêu đề + Xem tất cả */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                  borderBottom: "2px solid #d32f2f",
                  display: "inline-block",
                  fontSize: getFontSize(33.6),
                }}
              >
                {cat.name}
              </Typography>

              <Button
                component={Link}
                to={`/san-pham/${cat.slug}`}
                variant="text"
                sx={{
                  textTransform: "none",
                  fontSize: getFontSize(14),
                  color: "#1976d2",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Xem tất cả
              </Button>
            </Box>

            {/* Lưới sản phẩm */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                  lg: "repeat(5, 1fr)",
                },
                gap: 2,
              }}
            >
              {cat.products.map((prod, idx) => (
                <Card
                  key={idx}
                  elevation={1}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid #eee",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 3,
                    },
                    "&:hover .infoBox": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      image={`/images/sanpham/${prod.image_url}`}
                      alt={prod.name}
                      sx={{
                        width: "100%",
                        height: getImageHeight(),
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      className="infoBox"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        px: 1,
                        py: 1,
                        opacity: 0,
                        transform: "translateY(20px)",
                        transition: "all 0.3s ease-in-out",
                        pointerEvents: "none",
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                        <Rating name={`rating-${idx}`} size={getRatingSize()} value={4} readOnly />
                        <Typography variant="caption" fontSize={getFontSize(10)} color="inherit">
                          0 đánh giá
                        </Typography>
                      </Box>
                      <Typography fontSize={getFontSize(12)} fontWeight={600}>
                        0đ
                      </Typography>
                      <Typography fontSize={getFontSize(11)} color="lightgreen">
                        ✅ Còn hàng
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ px: 1.2, py: 1 }}>
                    <Typography
                      fontSize={getFontSize(11)}
                      fontWeight={600}
                      sx={{
                        lineHeight: 1.3,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {prod.name}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default Section5;
