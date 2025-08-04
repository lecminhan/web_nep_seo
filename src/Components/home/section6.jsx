import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";

const Section6 = () => {
  const [newsList, setNewsList] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    axios
      .get(`${API_URL}/news/random`)
      .then((res) => setNewsList(res.data))
      .catch((err) => console.error("Lỗi khi tải tin tức:", err));
  }, []);
  const formatDate = (isoString) => {
    const d = new Date(isoString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Box
      component="section"
      aria-label="Tin tức & Sự kiện"
      sx={{
        width: "100%",
        pt: 0,
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2 }}>
        <Typography
          component="h2"
          fontWeight={700}
          mb={3}
          sx={{
            display: "inline-block",
            textTransform: "uppercase",
            borderBottom: "2px solid #d32f2f",
            pb: 1,
            fontSize: "34.6px",
            ml: 0,
            px: 0,
          }}
        >
          Tin tức & sự kiện
        </Typography>

        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            pb: 1,
            ml: 0,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {newsList.map((news, idx) => (
            <Box
              key={idx}
              component={Link}
              to={`/tin-tuc/${news.slug}`}
              title={news.title}
              sx={{
                flex: "0 0 auto",
                width: { xs: "46%", sm: "23%", md: "100%" },
                minWidth: { xs: 130, sm: 185, md: 260 },
                maxWidth: { xs: 200, sm: 240 },
                textDecoration: "none",
                color: "inherit",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 1,
                scrollSnapAlign: "start",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: 3,
                },
              }}
            >
              <Box
                component="img"
                src={news.image_url}
                alt={news.title}
                sx={{
                  width: "100%",
                  height: { xs: 100, sm: 130, md: 140 },
                  objectFit: "cover",
                }}
              />

              <Box sx={{ px: 1, py: 1 }}>
                <Typography
                  fontWeight={600}
                  sx={{
                    fontSize: { xs: 11, sm: 13 },
                    lineHeight: 1.3,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {news.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                    fontSize: { xs: 10.5, sm: 12 },
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {news.desc}
                </Typography>

                {/* Hàng icon ngày tạo + người đăng */}
                <Box
                  display="flex"
                  alignItems="center"
                  mt={1}
                  sx={{ fontSize: { xs: 10, sm: 11 }, color: "text.secondary" }}
                >
                  <CalendarMonthIcon sx={{ fontSize: 14, mr: 0.3 }} />
                  <Typography variant="caption" sx={{ mr: 1 }}>
                    {formatDate(news.published_at)}
                  </Typography>

                  <PersonIcon sx={{ fontSize: 14, mr: 0.3 }} />
                  <Typography variant="caption">admin</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Section6;
