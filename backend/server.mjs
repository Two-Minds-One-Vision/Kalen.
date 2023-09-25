import express from "express"
import mongoose from "mongoose"
import Router from "./routes.mjs"
import dotenv  from "dotenv"
import path from "path"
import { fileURLToPath } from 'url';
import cors from 'cors'
import jwt from "jsonwebtoken";


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.resolve(__dirname, '..', '.env')

dotenv.config({ path: envPath })


const app = express()
app.use(express.json())
app.use(cors())

const username = process.env.VITE_USERNAME
const password = process.env.VITE_PASSWORD
const cluster =  process.env.VITE_CLUSTER
const dbname = process.env.VITE_DB_NAME // will later change to `prod` or something similar once releasing package

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.dluhdun.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

const connection = mongoose.connection

connection.on("error", console.error.bind(console, "connection error: "))
connection.once("open", async function () {
  console.log("Connected successfully")

  // // Access a collection
  // const collection = connection.db.collection('listingsAndReviews'); // Change to your actual collection name

  // // Define your query and perform the query here
  // const query = {
  //   room_type: "Private room"
  // }; // Define your query
  // try {
  //   const result = await collection.find(query).toArray();
  //   console.log(result);
  // } catch (err) {
  //   console.error(err);
  // }
})

const users = [
  {
    id: "1",
    username: "john",
    password: "John0908",
    isAdmin: true
  },
  {
    id: "2",
    username: "jane",
    password: "Jane0908",
    isAdmin: false
  }
]

app.post("/api/login", (req, res) => {
  const{username, password} = req.body
  //res.json("hey it works")
  const user = users.find((u) => {
     return u.username === username && u.password === password
  })
  if(user){
    //Generate an access token
    const accessToken = jwt.sign({id: user.id, isAdmin: user.isAdmin}, "mySecretKey")
    res.json({
      username:user.username,
      isAdmin:user.isAdmin,
      accessToken,
    })
  }else{
    res.status(400).json("Username or password incorrect")
  }
})

app.use(Router)

const verify = (req, res, next) => {
   const authHeader = req.headers.authorization
   if(authHeader){
    const token = authHeader.split(" ")[1]

    jwt.verify(token, "mySecretKey", (err, user) => {
        if(err){
            return res.status(403).json("Token is not valid!")
        }
        req.user = user
        next()
    })
   } else{
    res.status(401).json("You are not authenticated")
   }
}

app.delete("/api/users/:userId", verify, (req, res)=>{
    if(req.user.id === req.params.userId || req.user.isAdmin){
          res.status(200).json("User has been deleted.")
    } else{
        res.status(403).json("You are not allowed to delete this user!")
    }

})

app.listen(3000, () => {
  console.log(`Server is running at port 3000`)
})
