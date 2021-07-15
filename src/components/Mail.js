function Mail(props){

    const unreadMessages = props.unreadMessages

    return (<div>
        {
            unreadMessages.length >0 && <h2> { unreadMessages.length} </h2>
        }
    </div>)

}
export default Mail