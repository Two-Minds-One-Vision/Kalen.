import express from "express";
import User from "./models/usermodel.mjs";
import Event from "./models/eventmodel.mjs";
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


/* EVENT ENDPOINTS */

ExpressApp.post("/events", async (request, response) => {
  const event = new Event(request.body)

  try {
    await event.save();
    console.log("Successfully created event")
    response.status(200).send(event)
  } catch (error) {
    response.status(500).send(error);
    console.log("Error creating event: ", error)
  }
})

ExpressApp.get("/events", async (request, response) => {
  try {
      const queryConditions = []
      if (request.query.organizerEmail) {
          queryConditions.push({ organizerEmail: request.query.organizerEmail })
      }
      if (request.query.attendees) {
          queryConditions.push({ attendees: request.query.attendees })
      }
      const events = await Event.find().or(queryConditions)

      response.status(200).send(events)
      console.log("Successfully fetched events")
  } catch (error) {
      console.error("Error fetching events: ", error)
      response.status(500).send(error)
  }
})

ExpressApp.put("/events/:id", async (request, response) => {
  const eventId = request.params.id
  const updatedEventDetails = {
    name: request.body.name,
    organizerName: request.body.organizerName,
    organizerEmail: request.body.organizerEmail,
    startTime: request.body.startTime,
    endTime: request.body.endTime,
    attendees: request.body.attendees,
    details: request.body.details,
    location: request.body.location,
    dateCreated: request.body.dateCreated,
    dateLastUpdated: request.body.dateLastUpdated,
  }

  try {
    const result = await Event.findByIdAndUpdate(
      eventId,
      updatedEventDetails)
    console.log("Successfully updated event:", result)
    response.sendStatus(200)
  } catch (error) {
    response.status(500).send(error);
    console.log("Error updting event: ", error)
  }
})

ExpressApp.delete("/events/:id", async (request, response) => {
  const eventId = request.params.id

  try {
    const result = await Event.findByIdAndDelete(eventId)
    console.log("Successfully deleted event:", result)
    response.sendStatus(200)
  } catch (error) {
    response.status(500).send(error);
    console.log("Error deleting event:", error)
  }

})

export default ExpressApp;
