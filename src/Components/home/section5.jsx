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
                const prodsWithChildSlug = child.products.map((p) => ({
                  ...p,
                  child_slug: child.slug, // <— thêm slug của child category vào từng product
                }));
                products = [...products, ...prodsWithChildSlug];
              }
            });

            return {
              name: cat.name,
              slug: cat.slug,
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
    <Box
      component="section"
      sx={{ pb: 3, pt: 4, bgcolor: "#fff", padding: "0px 15px" }}
    >
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
                <Link
                  to={`/san-pham/${cat.slug}/${prod.child_slug}/${prod.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  key={prod.id || idx}
                >
                  <Card
                    elevation={2}
                    sx={{
                      borderRadius: 1,
                      overflow: "hidden",
                      border: "1px solid #eee",
                      boxShadow: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: 6,
                      },
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`/images/sanpham/${prod.image_url}`}
                      alt={prod.name}
                      sx={{
                        width: "100%",
                        height: getImageHeight(),
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    <CardContent
                      sx={{
                        pt: 1,
                        pb: 0,
                        px: 1.5,
                        flexGrow: 1,
                      }}
                    >
                      <Typography
                        fontSize={getFontSize(15)}
                        fontWeight={700}
                        color="#222"
                        sx={{
                          lineHeight: 1.3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          marginBottom: 0.7,
                          fontSize: "14px", // thu nhỏ lại, ví dụ chữ thường bạn đang xài 16px thì đây để 14 hoặc 13
                          textTransform: "uppercase",
                        }}
                      >
                        {prod.name}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          color: "#FFC107", // màu vàng cho sao
                          mb: 1,
                        }}
                      >
                        <Rating
                          name={`rating-${prod.id || idx}`}
                          size={getRatingSize()}
                          value={5}
                          readOnly
                          precision={0.5}
                          sx={{ color: "#FFC107" }}
                        />
                        <Typography fontSize={getFontSize(12)} color="#777">
                          83 đánh giá
                        </Typography>
                      </Box>
                    </CardContent>

                    <Box sx={{ px: 2, pb: 2 }}>
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          fontSize: getFontSize(13),
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#b00015",
                            boxShadow: "none",
                          },
                        }}
                      >
                        Liên hệ
                      </Button>
                    </Box>
                  </Card>
                </Link>
              ))}
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default Section5;
