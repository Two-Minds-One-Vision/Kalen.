const deleteMeeting = async (id) => {
    try {
        await fetch(`http://localhost:3000/events/${id}`, {
            method: "DELETE",
        })
        return true
    } catch {
        return false
    }
}

export default deleteMeeting
