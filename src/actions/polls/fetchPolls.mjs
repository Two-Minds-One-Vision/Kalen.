const fetchPolls = async () => {
    const params = new URLSearchParams()

    // Add each query parameter individually
    params.append('organizerEmail', 'j1@gmail.com')

    const url = `http://localhost:3000/polls?${params.toString()}`

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

export default fetchPolls
