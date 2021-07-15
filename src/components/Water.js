import React from 'react'


function Show(props){

    if(props.val>=100){
        return <p>done</p>
    }
    return <p>un</p>
}


class Water extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            val:''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState((state,props)=>({
            val:e.target.value
        }))
    }

    render(){

        const val = this.state.val

        return (<fieldset>
            <legend>enter:</legend>
            <input value={val} onChange={this.handleChange} />
            <Show val={parseFloat(val)} />
        </fieldset>)
    }
}

export default Water