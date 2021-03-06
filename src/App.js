import './App.css';
import TodoList from './components/TodoList';
import { useRef, useEffect } from 'react';
import usePersistedState from './hooks/usePersistedState';
import initialTodos from './json/startData.json';

function App() {
  const [todos, setTodos] = usePersistedState('todos', initialTodos);
  const [nextTodoId, setNextTodoId] = usePersistedState('todoId', initialTodos.length);
  const inputValueRef = useRef();

  const handleAddTodo = () => {
    const name = inputValueRef.current.value;
    if (name === '') return;
    setTodos(prevTodos => [...prevTodos, { name: name, id: nextTodoId }]);
    setNextTodoId(id => id += 1);
    inputValueRef.current.value = '';
  }

  useEffect(() => {
    document.title = `${todos.length} todos left`;
  }, [todos]);

  const handleClearAll = (e) => {
    setTodos((prev) => []);
  }

  const removeTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  return (
    <div className="App">
      <h1>Darth Vader's Todo List [▼皿▼]</h1>
      <p>I really must remember to...</p>
      <hr />
      <TodoList todos={todos} removeTodo={removeTodo} />
      <hr />
      <input ref={inputValueRef} onKeyDown={(e) => { if (e.key === 'Enter') handleAddTodo() }} type="text" ></input><button
        onClick={handleAddTodo}>Add Todo</button><button onClick={handleClearAll}>Clear All</button>
    </div>
  );
}

export default App;
