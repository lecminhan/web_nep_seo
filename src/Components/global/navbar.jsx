import React, { useState, useEffect } from "react";
import {
  Box,
  Link,
  Collapse,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  fetchParentCategories,
  fetchChildCategories,
} from "../../Services/categoryService";

const navItems = [
  { label: "Trang chủ", path: "/", title: "Về Nguyễn Phát Nẹp" },
  { label: "Giới thiệu", path: "/gioi-thieu", title: "Giới thiệu công ty" },
  { label: "Tin tức", path: "/tin-tuc", title: "Tin tức mới nhất" },
  { label: "Dự án", path: "/du-an", title: "Các dự án đã thực hiện" },
  { label: "Liên hệ", path: "/lien-he", title: "Thông tin liên hệ" },
];

const Navbar = () => {
  const [hovered, setHovered] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [childCategories, setChildCategories] = useState({});
  const [hoveredParentId, setHoveredParentId] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const fontSize = isTablet ? "14px" : "16px";
  const itemPaddingX = isTablet ? 0.5 : 1;
  const itemGap = isTablet ? 2 : 4;

  useEffect(() => {
    fetchParentCategories()
      .then(setParentCategories)
      .catch((err) => console.error("Lỗi tải danh mục cha:", err));
  }, []);

  const handleParentHover = async (parentId) => {
    setHoveredParentId(parentId);
    if (!childCategories[parentId]) {
      try {
        const data = await fetchChildCategories(parentId);
        if (data.length > 0) {
          setChildCategories((prev) => ({ ...prev, [parentId]: data }));
        }
      } catch (err) {
        console.error("Lỗi tải danh mục con:", err);
      }
    }
  };

  if (isMobile) return null;

  return (
    <nav
      aria-label="Thanh điều hướng chính"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#fff",
        borderBottom: "1px solid #eee",
      }}
    >
      <Box
        component="ul"
        sx={{
          listStyle: "none",
          display: "flex",
          justifyContent: "center",
          gap: itemGap,
          m: 0,
          px: 2,
          py: 1.5,
        }}
      >
        {/* Trang chủ */}
        <li>
          <Link
            component={NavLink}
            to="/"
            title="Trang chủ"
            sx={{
              color: "#333",
              textDecoration: "none",
              fontWeight: 500,
              fontSize,
              px: itemPaddingX,
              py: 0.5,
              "&.active": {
                color: "#d32f2f",
                borderBottom: "2px solid #d32f2f",
              },
              "&:hover": { color: "#d32f2f" },
            }}
          >
            Trang chủ
          </Link>
        </li>

        {/* Ngành hàng */}
        <li
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            setHoveredParentId(null);
          }}
          style={{ position: "relative" }}
        >
          <Link
            underline="none"
            sx={{
              color: "#333",
              fontWeight: 500,
              fontSize,
              px: itemPaddingX,
              py: 0.5,
              cursor: "pointer",
              "&:hover": { color: "#d32f2f" },
            }}
          >
            Sản phẩm
          </Link>

          <Collapse in={hovered} timeout={250} unmountOnExit>
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                mt: 1,
                zIndex: 1001,
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
              }}
            >
              {/* Danh mục cha */}
              <Paper
                elevation={4}
                sx={{
                  minWidth: 200,
                  maxHeight: 300,
                  overflowY: "auto",
                  p: 1,
                  border: "1px solid #eee",
                  backgroundColor: "#fff",
                  flexShrink: 0,
                  alignSelf: "flex-start",
                }}
              >
                {parentCategories.map((parent) => (
                  <Box
                    key={parent.id}
                    onMouseEnter={() => handleParentHover(parent.id)}
                    sx={{ px: 0 }}
                  >
                    <Link
                      component={NavLink}
                      to={`/san-pham/${parent.slug}`}
                      sx={{
                        display: "block",
                        px: 2,
                        py: 1,
                        color: "#333",
                        textDecoration: "none",
                        "&:hover": {
                          bgcolor: "#f5f5f5",
                          color: "#d32f2f",
                        },
                      }}
                    >
                      {parent.name}
                    </Link>
                  </Box>
                ))}
              </Paper>

              {/* Danh mục con */}
              {hoveredParentId &&
                childCategories[hoveredParentId]?.length > 0 && (
                  <Paper
                    elevation={4}
                    sx={{
                      minWidth: 220,
                      maxHeight: 300,
                      overflowY: "auto",
                      p: 1,
                      border: "1px solid #eee",
                      backgroundColor: "#fff",
                      flexShrink: 0,
                      alignSelf: "flex-start",
                    }}
                  >
                    {childCategories[hoveredParentId].map((child) => (
                      <Box
                        key={child.id}
                        component={NavLink}
                        to={`/san-pham/${child.parent_slug}/${child.slug}`}
                        sx={{
                          display: "block",
                          px: 2,
                          py: 1,
                          color: "#333",
                          textDecoration: "none",
                          "&:hover": {
                            bgcolor: "#f5f5f5",
                            color: "#d32f2f",
                          },
                        }}
                      >
                        {child.name}
                      </Box>
                    ))}
                  </Paper>
                )}
            </Box>
          </Collapse>
        </li>

        {/* Các mục còn lại */}
        {navItems.slice(1).map((item) => (
          <li key={item.path}>
            <Link
              component={NavLink}
              to={item.path}
              title={item.title}
              sx={{
                color: "#333",
                textDecoration: "none",
                fontWeight: 500,
                fontSize,
                px: itemPaddingX,
                py: 0.5,
                "&.active": {
                  color: "#d32f2f",
                  borderBottom: "2px solid #d32f2f",
                },
                "&:hover": {
                  color: "#d32f2f",
                },
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </Box>
    </nav>
  );
};

export default Navbar;
