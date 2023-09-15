import mongoose, { Schema } from "mongoose"

const PollSchema = new mongoose.Schema({
    eventId: {
        type: Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    organizerName: {
        type: String,
    },
    organizerEmail: {
        type: String,
    },
    deadline: {
        type: Number,
        required: true,
    },
    details: {
        type: String,
    },
    options: {
        type: [],
        required: true,
    },
    responses: {
        type: [],
        required: true,
    },
    dateCreated: {
        type: Number,
    },
    dateLastUpdated: {
        type: Number,
    }
})

const PollModel = mongoose.model("Poll", PollSchema)

export default PollModel
