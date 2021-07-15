function Box(props){


    return (
        <div> {props.children}</div>
    )
}


function Dialog (){


    return (
        <Box> <span>123</span> </Box>
    )
}

export default Dialog