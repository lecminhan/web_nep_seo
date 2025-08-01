// src/services/categoryService.js
const API_URL = process.env.REACT_APP_API_URL;
const API_BASE = `${API_URL}/categories`;
/**
 * Lấy danh mục cha
 */
export const fetchParentCategories = async () => {
  const res = await fetch(`${API_BASE}/parent`);
  if (!res.ok) throw new Error("Lỗi khi tải danh mục cha");
  return res.json();
};

/**
 * Lấy danh mục con theo parent_id
 * @param {number} parentId
 */
export const fetchChildCategories = async (parentId) => {
  const res = await fetch(`${API_BASE}/child/${parentId}`);
  if (!res.ok) throw new Error("Lỗi khi tải danh mục con");
  return res.json();
};

