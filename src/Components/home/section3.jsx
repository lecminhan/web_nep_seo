import React from "react";
import { Box, Grid, useTheme, useMediaQuery, Typography } from "@mui/material";
import CategoryCard from "./categorycard";

const Section3 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));       // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg")); // 600px – 1199px

  // SEO-optimized category data with proper alt texts
  const categoryImages = [
    {
      title: "Nẹp Nhôm Cao Cấp",
      label: "Chuẩn quốc tế",
      image: "/images/nep-t-nhom-t10-bac-guong.jpg",
      to: "/san-pham/nep-nhom-cao-cap",
      description: "Nẹp nhôm chất lượng cao ứng dụng trong xây dựng và nội thất"
    },
    {
      title: "Nẹp Inox 304",
      label: "Sáng bóng, bền đẹp",
      image: "/images/nep-inox-304-v-5-bac-xuoc.jpg",
      to: "/san-pham/nep-inox-304",
      description: "Nẹp inox 304 chống gỉ, độ bền cao cho công trình chất lượng"
    },
    {
      title: "Nẹp Đồng Thau",
      label: "Đẳng cấp cổ điển",
      image: "/images/nep-la-dong-dong-thau.jpg",
      to: "/san-pham/nep-dong-thau",
      description: "Nẹp đồng thau sang trọng, phù hợp không gian cao cấp"
    },
  ];

  return (
    <Box
      component="section"
      aria-label="Danh mục sản phẩm nổi bật"
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        bgcolor: "#fff",
      }}
    >
      {/* SEO-optimized heading */}
      <Typography 
        variant="h2" 
        component="h2"
        sx={{
          textAlign: "center",
          mb: 3,
          fontSize: isMobile ? "1.75rem" : "2rem",
          fontWeight: 700,
          color: '#d71920',
        }}
      >
        Sản Phẩm Nẹp Chất Lượng Cao
      </Typography>

      {/* SEO description */}
      <Typography
        variant="body1"
        component="p"
        sx={{
          textAlign: "center",
          mb: 4,
          px: 2,
          color: theme.palette.text.secondary,
          maxWidth: "800px",
          mx: "auto",
          fontSize: isMobile ? "0.875rem" : "1rem"
        }}
      >
        Các dòng sản phẩm nẹp nhôm, inox, đồng chất lượng cao với độ bền vượt trội, 
        thẩm mỹ tinh tế phù hợp cho mọi công trình
      </Typography>

      <Grid
        container
        spacing={isTablet ? 2 : 3}
        justifyContent="center"
        sx={{ 
          px: 0,
          '& .MuiGrid-item': {
            borderRadius: '5px' // Consistent 5px border radius
          }
        }}
      >
        {categoryImages.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={4}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: isMobile
                  ? "90%"
                  : isTablet
                  ? "clamp(160px, 30vw, 240px)"
                  : 360,
                aspectRatio: "1 / 1",
                borderRadius: '5px', // 5px border radius
                overflow: 'hidden' // Ensure child elements respect border radius
              }}
            >
              <CategoryCard 
                {...item} 
                sx={{ borderRadius: '5px' }} // Ensure card respects border radius
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section3;