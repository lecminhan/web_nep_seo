import React, { useEffect, useState } from "react";
import { Fab, Zoom, useTheme, useMediaQuery } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // dùng sm thay vì xs

  const toggleVisibility = () => {
    setVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Zoom in={visible}>
      <Fab
        size={isMobile ? "small" : "medium"}
        aria-label="scroll back to top"
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: isMobile ? 160 : 180,
          right: isMobile ? 12 : 20,
          zIndex: 9999,
          backgroundColor: "rgba(215,25,32,0.7)",
          color: "#fff",
          boxShadow: 3,
          opacity: 0.85,
          transition: "background-color 0.3s, opacity 0.3s",
          "&:hover": {
            backgroundColor: "rgba(215,25,32,1)",
            opacity: 1,
          },
        }}
      >
        <KeyboardArrowUp fontSize={isMobile ? "small" : "default"} />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTopButton;
