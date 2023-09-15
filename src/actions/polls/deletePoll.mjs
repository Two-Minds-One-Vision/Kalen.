const deletePoll = async (id) => {
    try {
        await fetch(`http://localhost:3000/polls/${id}`, {
            method: "DELETE",
        })
        return true
    } catch {
        return false
    }
}

export default deletePoll
