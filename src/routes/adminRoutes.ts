import express from "express";
import customerRoutes from "../api/admin/customerRoutes";

const adminRoutes = express();


adminRoutes.use("/customer",customerRoutes)

export default adminRoutes;
