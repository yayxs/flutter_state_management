import React from 'react'


class Form extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            val:''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSub = this.handleSub.bind(this)
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

            <form onSubmit={this.handleSub}>
                <label>name</label>
                <input type='text' name="name" value={this.state.val} onChange={this.handleChange} />
                <input type="submit" value="提交" />
            </form>

        )
    }
}

export default Form