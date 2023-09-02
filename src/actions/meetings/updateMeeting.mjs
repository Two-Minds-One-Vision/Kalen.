import moment from 'moment-timezone';


const updateMeeting = async (values, id) => {
    let attendees = values.attendees.split(",")
    for (let idx in attendees) {
        attendees[idx] = attendees[idx].trim()
    }

    const body = {
        name: values.name.trim(),
        organizerName: "John", // TODO: set
        organizerEmail: "j1@gmail.com", // TODO: set
        startTime: moment(values.startTime).valueOf(),
        endTime: moment(values.endTime).valueOf(),
        attendees: attendees,
        details: values.details.trim(),
        location: values.location.trim(),
        dateCreated: moment(values.dateCreated).valueOf(),
        dateLastUpdated: moment(Date.now()).valueOf(),
    }

    try {
        await fetch(`http://localhost:3000/events/${id}`, {
            method: "PUT",
            mode: 'cors',
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        return true
    } catch {
        return false
    }
}

export default updateMeeting
