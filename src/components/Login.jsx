import React from 'react'


class Login extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            val:""
        }
    }

    render(){
        return (
            <form>
                <label>
                    用户名：<input name="username" type="text"></input>
                </label>
                <label>
                    密码： <input  name="pwd" type="password" > </input>
                </label>
            </form>
        )
    }
}

export default Login