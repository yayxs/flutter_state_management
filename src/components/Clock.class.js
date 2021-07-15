import React from 'react';

class Clock extends React.Component {

    constructor(props){
        super(props) // props 传递到父类的构造函数中
        this.state = { date:new Date()} // 唯一可以给this.state 赋值的地方
    }

    componentDidMount(){
        this.timerId = setInterval(()=>this.tick(),1000)
    }
    componentWillUnmount(){
        clearInterval(this.timerId)
    }
    tick(){
        // this.setState({
        //     date:new Date()
        // })
        // this.state.date = new Date() // wrong
    }
    render(){

        return (<div>
            <span> {this.state.date.toLocaleTimeString()} </span>
        </div>)
    }
}

export default Clock