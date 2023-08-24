import express from "express";
import User from "./models/usermodel.mjs";
const ExpressApp = express();

console.log("Entered routes")

/* USER ENDPOINTS */

ExpressApp.post("/users", async (request, response) => {
  const user = new User(request.body)

  try {
    await user.save();
    response.send(user)
    console.log("Successfully created user")
  } catch (error) {
    response.status(500).send(error);
    console.log("This is the Express App error: ", error)
  }
})

ExpressApp.get("/users", async (request, response) => {
  const users = await User.find({});

  try {
    response.send(users)
    console.log("Successfully fetched user")
  } catch (error) {
    response.status(500).send(error)
  }
})

ExpressApp.put("/users/:id", async (request, response) => {
  const userId = request.params.id
  const updatedUserDetails = {
    name: request.body.name,
    username: request.body.username,
    email: request.body.email,
  }

  try {
    const result = await User.findByIdAndUpdate(
      userId,
      updatedUserDetails)
    console.log("Successfully updated user:", result)
  } catch (error) {
    response.status(500).send(error);
    console.log("This is the Express App error: ", error)
  }

})

ExpressApp.delete("/users/:id", async (request, response) => {
  const userId = request.params.id

  try {
    const result = await User.findByIdAndDelete(userId)
    console.log("Successfully deleted user:", result)
  } catch (error) {
    response.status(500).send(error);
    console.log("This is the Express App error: ", error)
  }

})

export default ExpressApp;
