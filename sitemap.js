/**
 * Tạo sitemap động cho nepdanang.vn
 * Chạy: node generate-sitemap.js
 * File output: ./public/sitemap.xml
 */

const fs = require("fs");
const axios = require("axios");

const BASE_URL = "https://nepdanang.vn";

(async () => {
  let urls = [
    { loc: `${BASE_URL}/`, priority: 1.0, changefreq: "daily" },
    { loc: `${BASE_URL}/san-pham`, priority: 0.8, changefreq: "weekly" },
    { loc: `${BASE_URL}/tin-tuc`, priority: 0.7, changefreq: "weekly" },
    { loc: `${BASE_URL}/du-an`, priority: 0.7, changefreq: "weekly" },
  ];

  // 1. Lấy danh sách sản phẩm
  try {
    const catTree = (
      await axios.get(`${BASE_URL}/api/categories/tree-with-products`)
    ).data;
    catTree.forEach((parent) => {
      urls.push({
        loc: `${BASE_URL}/san-pham/${parent.slug}`,
        priority: 0.7,
        changefreq: "weekly",
      });
      parent.children.forEach((child) => {
        urls.push({
          loc: `${BASE_URL}/san-pham/${parent.slug}/${child.slug}`,
          priority: 0.6,
        });
        child.products.forEach((p) => {
          urls.push({
            loc: `${BASE_URL}/san-pham/${parent.slug}/${child.slug}/${p.slug}`,
            priority: 0.5,
            changefreq: "weekly",
          });
        });
      });
    });
  } catch (_) {
    console.log("⚠ Không lấy được sản phẩm");
  }

  // 2. Lấy tin tức
  try {
    const news = (await axios.get(`${BASE_URL}/api/news`)).data;
    news.forEach((n) => {
      urls.push({
        loc: `${BASE_URL}/tin-tuc/${n.slug}`,
        priority: 0.5,
        changefreq: "monthly",
      });
    });
  } catch (_) {
    console.log("⚠ Không lấy được tin tức");
  }

  // 3. Lấy dự án
  try {
    const pj = (await axios.get(`${BASE_URL}/api/projects`)).data;
    pj.forEach((p) => {
      urls.push({
        loc: `${BASE_URL}/du-an/${p.slug}`,
        priority: 0.5,
        changefreq: "monthly",
      });
    });
  } catch (_) {
    console.log("⚠ Không lấy được dự án");
  }

  // Build file XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `
  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("")}
</urlset>`;

  fs.writeFileSync("./public/sitemap.xml", xml);
  console.log("✅ Đã tạo sitemap.xml xong!");
})();
