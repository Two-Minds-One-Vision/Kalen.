import moment from 'moment-timezone';


const updatePoll = async (values, id) => {
    // TODO: format `options` and `responses`

    const body = {
        eventId: values.eventId,
        name: values.name.trim(),
        organizerName: values.organizerName,
        organizerEmail: values.organizerEmail,
        deadline: moment(values.deadline).valueOf(),
        details: values.details.trim(),
        options: values.options,
        responses: values.responses,
        dateCreated: moment(values.dateCreated).valueOf(),
        dateLastUpdated: moment(Date.now()).valueOf(),
    }

    try {
        await fetch(`http://localhost:3000/polls/${id}`, {
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

export default updatePoll
