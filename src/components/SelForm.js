import React from 'react'

class SelForm extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            val:'js'
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSub  = this.handleSub.bind(this)
    }
    handleChange(e){
        this.setState((state,props)=>({
            val:e.target.value
        }))
    }
    handleSub(e){
        e.preventDefault();
        
    }
    render(){


        return (
            <form>
                <label>
                    <select value={this.state.value} >
                        <option value="react" selected> react</option>
                        <option value="vue">vue</option>
                        <option value="js">js</option>
                    </select>
                </label>
               
            </form>
        )
    }
}


export default SelForm