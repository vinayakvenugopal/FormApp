import express from "express"
import { getFormList, getFormSchema } from "../controller/userController.js"
const router = express.Router()


router.get('/getFormSchema',getFormSchema)
router.get('/getFormList',getFormList)


export default router 