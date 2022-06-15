import './App.css';
import TodoList from './components/TodoList';
import { useRef, useEffect } from 'react';
import usePersistedState from './hooks/usePersistedState';

function App() {
  // todo objects follow the format: {name, id}
  const initialTodos = [
    {
      name: "Eat a bantha",
      id: 0
    },
    {
      name: "Build deathstar",
      id: 1
    },
    {
      name: "Drink dark-side ale",
      id: 2
    }
  ];
  const [todos, setTodos] = usePersistedState('todos', initialTodos);
  const [todoId, setTodoId] = usePersistedState('todoId', 3);
  const inputValueRef = useRef();

  const handleAddTodo = () => {
    const name = inputValueRef.current.value;
    if (name === '') return;
    setTodos(prevTodos => [...prevTodos, { name: name, id: todoId }]);
    setTodoId(id => id += 1);
    inputValueRef.current.value = '';
  }

  useEffect(() => {
    document.title = `${todos.length} todos left`;
  }, [todos]);

  useEffect(() => {
    console.log(`todoId: `, todoId);
    console.log(`todos: `, todos);
  }, [todos, todoId]);

  const handleClearAll = (e) => {
    setTodos((prev) => []);
  }

  const removeTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  return (
    <div className="App">
      <h1>Darth Vader's Todo List ▼皿▼</h1>
      <p>I really must remember to...</p>
      <hr />
      <TodoList todos={todos} removeTodo={removeTodo} />
      <hr />
      <input ref={inputValueRef} type="text" ></input><button
        onClick={handleAddTodo}>Add Todo</button><button onClick={handleClearAll}>Clear All</button>
    </div>
  );
}

export default App;
