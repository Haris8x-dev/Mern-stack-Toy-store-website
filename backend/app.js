// app.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import figureRoutes from "./routes/figureRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import wishlistRoutes from './routes/wishlistRoutes.js'

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies
  })
); // during dev you may restrict origin
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/figures", figureRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wishlist", wishlistRoutes);

// root
app.get("/", (req, res) => res.send("hello from backend !"));

// error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
