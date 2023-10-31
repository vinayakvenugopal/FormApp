import express from "express"
const router = express.Router()
import { addFormSchema } from "../controller/adminController.js"


router.post('/addFormSchema',addFormSchema)

export default router 