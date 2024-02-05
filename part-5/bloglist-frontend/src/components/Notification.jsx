const Notification = ({ type, message }) => {
    if (message === null) {
      return null;
    }
    return (<div
      className={type === "errormessage" ? "errormessage" : "notification"} > {message}
    </div>)
  }
export default Notification;