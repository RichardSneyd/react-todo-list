import React from 'react';


const Todo = ({ name, id, removeTodo }) => {
    return (
        // to use an invoked function as callback, wrap it in an arrow function:
        <li key={id}>{name} <button onClick={() => { removeTodo(id) }}> Remove </button></li>
    );
}

export default Todo;