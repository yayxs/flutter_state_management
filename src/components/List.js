function List (props){

    const nums = props.numbers

    const listItems = nums.map((item)=><li>{item}</li>)


    return (
        <ul> {listItems}</ul>
    )
}

export default List