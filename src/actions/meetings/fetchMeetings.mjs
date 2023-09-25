const fetchMeetings = async () => {
    const params = new URLSearchParams()

    // Add each query parameter individually
    params.append('organizerEmail', 'j1@gmail.com')
    params.append('attendees', 'James')

    const url = `http://localhost:3000/events?${params.toString()}`

    try {
        const response = await fetch(url, {
            method: "GET",
            mode: 'cors',
        })
        return response.json()
    } catch (error) {
        return "failed"
    }
}

export default fetchMeetings
