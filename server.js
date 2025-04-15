const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noticiaRoutes = require("./routes/noticiaRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/noticias", noticiaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
