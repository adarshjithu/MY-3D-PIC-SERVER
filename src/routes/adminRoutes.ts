import express from "express";
import customerRoutes from "../api/admin/customer/customerRoutes";
import shapeRouter from "../api/admin/shape/shapeRoutes";
import categoryRouter from "../api/admin/category/categoryRoutes";
import baseRoutes from "../api/admin/base/baseRoutes";

const adminRoutes = express();


adminRoutes.use("/customer",customerRoutes);
adminRoutes.use("/shape",shapeRouter);
adminRoutes.use("/category",categoryRouter);
adminRoutes.use("/base",baseRoutes)

export default adminRoutes;
