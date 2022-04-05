import React from 'react'

const TodosCounter = (props) => {
    const { amount } = props;
  return (
    <span>Antal Todos: {amount}</span>
  )
}

export default TodosCounter