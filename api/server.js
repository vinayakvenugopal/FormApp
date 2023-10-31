import express from 'express'
import connectDB from './config/db.js'
import adminRoute from './routes/admin.js'
import userRoute from './routes/user.js'

const port = process.env.PORT||2000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
connectDB();


app.use('/api/admin',adminRoute)

app.use('/api/user',userRoute)

app.get('/',(req,res)=>res.send('Server started'))


app.listen(port,()=>console.log(`Server Started on Port ${port}`)) 

 