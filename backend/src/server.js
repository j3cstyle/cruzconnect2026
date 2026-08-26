import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import contactRoutes from "./routes/contact.routes.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({origin: env.corsOrigins, methods:["GET","POST","OPTIONS"], allowedHeaders:["Content-Type"]}));
app.use(express.json({limit:"100kb"}));
app.use(express.urlencoded({extended:false,limit:"100kb"}));

app.use("/api", rateLimit({
  windowMs:15*60*1000, limit:100, standardHeaders:"draft-8", legacyHeaders:false,
  skip:req => req.path === "/health",
  message:{success:false,message:"Too many requests. Please try again later."}
}));

app.get("/", (_req,res) => res.json({success:true,service:"cruzconnect-backend",status:"online"}));

app.get("/api/health", (_req,res) => res.json({success:true,service:"cruzconnect-backend",status:"ok",timestamp:new Date().toISOString()}));
app.use("/api/contact", contactRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(env.port, "0.0.0.0", () => console.log(`CruzConnect API listening on 0.0.0.0:${env.port}`));