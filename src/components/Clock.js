function Clock(props){
    return (
        <div>
            <h1>hello</h1>
            <h4> {props.date.toLocaleTimeString()}</h4>
        </div>
    )
}

export default Clock