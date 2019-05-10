import Products from "./main/products.js";
import Product from "./main/product.js";

const indexRoutes = [
  { path: "/product/:id", name: "Product", component: Product },
  { path: "/products", name: "Products", component: Products },
  { path: "/", name: "Products", component: Products },
];

export default indexRoutes;