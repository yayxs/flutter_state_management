
import React from 'react'
class LoginControl  extends React.Component {
    constructor(props){
        super(props)

        this.state = {isLogin:false}
    }

    render(){
        const isLogin = this.state.isLogin
        let button;
        return (
            <>
            <span>{ isLogin}</span>
            <span> {button } </span>
            </>
        )
    }
}

export default LoginControl