import React from 'react'
import { Link } from "react-router-dom"
import fetchMeetings from "../../actions/meetings/fetchMeetings.mjs"
import MeetingCard from '../../components/MeetingCard'
import "./MeetingsPage.css"


let meetings = await fetchMeetings();
meetings.sort((m1, m2) => m1.startTime - m2.startTime) // sort by startTime in accending order

const MeetingsPage = () => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return (
        <div id="main-container">
            <h1>Meetings</h1>
            <div id="sub-container">
                <small id="notice">Note: meetings are shown in your current timezone - <span>{userTimezone.replace("_", " ")}</span></small>
                <Link id="schedule-btn" to="/meetings/schedule">Schedule New Meeting</Link>
            </div>
            <br />
            <br />
            {meetings.map(meeting => {
                return <MeetingCard key={meeting._id} meeting={meeting} timezone={userTimezone} />
            })}
        </div>
    )
}

export default MeetingsPage
