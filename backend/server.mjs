import express from "express"
import mongoose from "mongoose"
import Router from "./routes.mjs"
import dotenv  from "dotenv"
import path from "path"
import { fileURLToPath } from 'url';
import cors from 'cors'

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

app.use(Router)

app.listen(3000, () => {
  console.log(`Server is running at port 3000`)
})
