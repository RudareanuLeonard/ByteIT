const express = require("express");
const app = express();
const cors = require("cors");

const createProxyMiddleware = require("http-proxy-middleware");

app.use(cors());


app.get("/", createProxyMiddleware({target:'http://localhost:8080/backend/register.php', changeOrigin: true}))
app.get("/", createProxyMiddleware({target:'http://localhost:8080/backend/login.php', changeOrigin: true}))


app.listen(3000, () =>{
    console.log("proxy started");
})