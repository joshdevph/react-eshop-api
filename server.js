require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')
const { Socket } = require('dgram')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swagger-output.json');

io.on('connection', (socket) => {
    console.log("User is connected");
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(cookieParser())

const corsOptions = {
    origin: '*',
    credentials: true,
    exposedHeaders: ["set-cookie"],
  };
app.use(cors(corsOptions))
app.use(fileUpload({
    useTempFiles: true
}))

// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/paymentRouter'))



// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})



const PORT = process.env.PORT || 5050



server.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})
