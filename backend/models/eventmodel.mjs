import mongoose from "mongoose"


const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  organizerName: {
    type: String, 
    required: true,
  },
  organizerEmail: {
    type: String, 
    required: true,
  },
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
  attendees: {
    type: [String],
  },
  details: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    required: true,
  },
  dateCreated: { 
    type: Number,
  },
  dateLastUpdated: { 
    type: Number, 
  }
});

const Event = mongoose.model("Event", EventSchema);

export default Event;
