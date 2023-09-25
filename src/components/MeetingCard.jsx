import moment from 'moment-timezone'
import React, { useState } from "react"
import { Link } from "react-router-dom"
import deleteMeeting from '../actions/meetings/deleteMeeting.mjs'
import "./MeetingCard.css"

const MeetingCard = ({ meeting, timezone }) => {
    const [toDelete, setToDelete] = useState(false)
    const handleDelete = async () => {
        const success = await deleteMeeting(meeting._id)
        console.log("Sucessful?", success)
        if (success) {
            alert("Meeting successfully deleted!")
            document.location = "/meetings"
        } else {
            alert("Failed to delete meeting. Try again later.")
        }
    }

    // Format date & time in user timezone
    const startTimeMoment = moment(meeting.startTime).tz(timezone)
    const date = startTimeMoment.format('MMM. Do')
    let time = startTimeMoment.format('hh:mm a')
    if (time[0] == "0") time = time.slice(1)

    // TODO: address user email
    const organizer = meeting.organizerEmail == "j1@gmail.com" ? "You" : `${meeting.organizerName} (${meeting.organizerEmail})`
    const organizerOptions = (
        <div className="meeting-options">
            <Link to={"/meetings/" + meeting._id + "/edit"} state={{meeting}}>Edit</Link> <button onClick={() => setToDelete(true)}>Delete</button>
        </div>
    )
    const attendeeOptions = (
        <div className="meeting-options"><button>Notify Organizer</button> <button>Suggest Change</button></div>
    )

    const details = meeting.details ? meeting.details : "none"
    return (
        <>
            <div id={meeting._id} className="meeting-card">
                <div className="meeting-card-dt-container">
                    <p className="meeting-card-dt-date">{date}</p>
                    <p className="meeting-card-dt-time">{time}</p>
                </div>
                <div className="meeting-card-details">
                    <h2>{meeting.name}</h2>
                    <p>Organizer: {organizer}</p>
                    <p>Location: {meeting.location}</p>
                    <p>Details: {details}</p>
                    {organizer == "You" ? (organizerOptions) : (attendeeOptions)}
                    {toDelete ?
                        <div className="delete-confirmation">
                            <p>Are you sure that you want to delete this meeting? &nbsp;</p>
                            <div className="meeting-options"><button onClick={handleDelete}>Yes</button><button onClick={() => setToDelete(false)}>No</button></div>
                        </div>
                        :
                        null
                    }

                </div>
            </div>
            <br />
        </>

    );
}

export default MeetingCard
