import express from  "express";
import cookieParser from "cookie-parser";
import cors from "cors"

import postRoutes from "./routes/post_route.js"
import authRoutes from "./routes/auth_route.js"
import testRoutes from "./routes/test_routes.js"
import userRoutes from "./routes/user_route.js"

import chatRoutes from "./routes/chat_route.js"
import messageRoutes from "./routes/message_route.js"


const app = express();

app.use(cors({origin : process.env.CLIENT_URL , credentials :true }))

app.use(cookieParser())

app.use(express.json())

app.use("/",postRoutes);
app.use("/api/auth" ,authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/posts",postRoutes)

app.use("/api/test" , testRoutes)
app.use("/api/chats", chatRoutes)
app.use("/api/messages" , messageRoutes)


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})