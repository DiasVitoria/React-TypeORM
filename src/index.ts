import * as express from "express";
import { Request } from "express"
import * as dotenv from "dotenv"
import routes from './routes';
import cors = require("cors");
dotenv.config();


const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors<Request>());
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

app.use(routes);