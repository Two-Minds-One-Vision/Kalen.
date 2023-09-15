import moment from 'moment-timezone';


const uploadPoll = async (values) => {
    // TODO: format `options` and `responses`

    const dateCreated = moment(Date.now()).valueOf()
    const body = {
        eventId: values.eventId,
        name: values.name.trim(),
        organizerName: values.organizerName,
        organizerEmail: values.organizerEmail,
        deadline: moment(values.deadline).valueOf(),
        details: values.details.trim(),
        options: values.options,
        responses: values.responses,
        dateCreated: dateCreated,
        dateLastUpdated: dateCreated,
    }

    try {
        await fetch(`http://localhost:3000/polls`, {
            method: "POST",
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

export default uploadPoll
