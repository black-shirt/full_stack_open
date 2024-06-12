const Notification = ({ message }) => {
    if (message[0] === "") {
        return null
    }
    const type = message[1] ? "success" : "error"
    return (
        <div className={type}>
            {message[0]}
        </div>
    )
}

export default Notification