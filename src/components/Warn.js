import React from 'react'
function Warn (props){
    if(!props.warn){
        return null
    }

    return (<div>
        warn
    </div>)
}

class WarnPage extends React.Component {


    constructor(props){
        super(props)
        this.state = { warn:true }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        this.setState((state,props)=>{
         

            return {
                warn:!state.warn
            }
        })
    }
    render(){
        return (<div>
            <Warn warn={this.state.warn  }  />
            <button onClick=  {this.handleClick} > { this.state.warn ?'hide':'show' } </button>
        </div>)
    }
}

export default WarnPage