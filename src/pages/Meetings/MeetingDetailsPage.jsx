import { Formik } from "formik"
import moment from 'moment'
import React from "react"
import { Button, Form } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import * as yup from "yup"
import uploadMeeting from "../../actions/meetings/uploadMeeting.mjs"
import updateMeeting from '../../actions/meetings/updateMeeting.mjs'
import FormDateTimePicker from "../../components/FormDateTimePicker.jsx"
import FormTextArea from "../../components/FormTextArea.jsx"
import FormTextInput from "../../components/FormTextInput.jsx"
import "./MeetingDetailsPage.css"


const handleUpload = async (values) => {
    const success = await uploadMeeting(values)
    if (success) {
        alert("Meeting successfully created!")
        document.location = "/meetings"
    } else {
        alert("Failed to uploaded meeting. Try again later.")
    }
}

const handleUpdate = async (values, id) => {
    const success = await updateMeeting(values, id)
    if (success) {
        alert("Meeting successfully updated!")
        document.location = "/meetings"
    } else {
        alert("Failed to update meeting. Try again later.")
    }
}

const schema = yup.object().shape({
    // Must set default of date values to 0000-00-00 to trigger type error when user has not set the date. Could be result of bug.
    name: yup.string().required("Name is required").min(3, "Name should be at least 3 characters"),
    startTime: yup.date().required("Start time is required").min(new Date(), "Start time should be after now").default("0000-00-00").typeError("Start time is required"),
    endTime: yup.date().required("End time is required").min(yup.ref("startTime"), "End time should be after start time").default("0000-00-00").typeError("End time is required"),
    attendees: yup.string().nullable().optional(),
    details: yup.string().nullable().optional(),
    location: yup.string().required("Location is required"),
})

const MeetingDetailsPage = () => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone.replace("_", " ")
    const location = useLocation()
    const meeting = location?.state?.meeting
    const initStartTime = meeting ? moment(meeting.startTime).toDate() : ""
    const initEndTime = meeting ? moment(meeting.endTime).toDate() : ""
    const initAttendees = (meeting && meeting.attendees.length != 0) ? meeting.attendees.join(", ") : ""
    const handleFormSubmit = meeting ? handleUpdate : handleUpload
    const buttonText = meeting ? "Update" : "Create"
    return (
        <Formik
            initialValues={{
                name: meeting?.name ?? "",
                startTime: initStartTime,
                endTime: initEndTime,
                attendees: initAttendees,
                details: meeting?.details ?? "",
                location: meeting?.location ?? "",
            }}
            onSubmit={values => handleFormSubmit(values, meeting?._id)}
            validationSchema={schema}
            validateOnChange={false}
            validateOnBlur={false}
        >
            {({ handleSubmit, setFieldValue, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <div id="name-container" className="main-container">
                        <Link to="/meetings" id="view-meetings-btn"> &lt; View All Meetings </Link>
                        <FormTextArea
                            label=""
                            name="name"
                            rows="3"
                            placeholder="Meeting Name"
                        />
                    </div>
                    <div id="form-container" className="main-container">
                        <small id="form-notice">Note: meeting will be set in your current timezone - <span>{userTimezone}</span></small>
                        <br />
                        <FormDateTimePicker
                            label="Start Time"
                            name="startTime"
                            initial={initStartTime}
                            setFieldValue={setFieldValue}
                            aria-label="event start time"
                        />
                        <br />
                        <FormDateTimePicker
                            label="End time"
                            name="endTime"
                            initial={initEndTime}
                            setFieldValue={setFieldValue}
                            aria-label="event start time"
                        />
                        <br />
                        <FormTextInput
                            label="Attendees"
                            name="attendees"
                            type="text"
                            placeholder=""
                            aria-label="event attendees"
                            aria-describedby="attendeesCriteria"
                            descriptor="Enter the email of each attendee separate by a comma"
                        />
                        <br />
                        <FormTextInput
                            label="Details"
                            name="details"
                            type="text"
                            placeholder=""
                            aria-label="event details"
                        />
                        <br />
                        <FormTextInput
                            label="Location"
                            name="location"
                            type="text"
                            placeholder="Zoom"
                            aria-label="event location"
                            aria-describedby="locationHelp"
                            descriptor="Feel free to enter a physical location or give a URL to Zoom, Google Meets, etc."
                        />
                        <br />
                        <Button type="submit" id="submit-btn">{buttonText}</Button>
                    </div>
                </Form>
            )}
        </Formik >)
}

export default MeetingDetailsPage
