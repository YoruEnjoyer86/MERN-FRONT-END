let local_url = "http://localhost:3001";
let deployment_url = "https://ecommerce-bibart-alexandru-backend.onrender.com";
let base_url = "";

if (process.env.NODE_ENV === "production") base_url = deployment_url;
else base_url = local_url;

export default base_url;
