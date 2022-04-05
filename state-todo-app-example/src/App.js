import './App.css';
import { useState, useEffect } from 'react';

import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import TodosCounter from './components/TodosCounter';

function App() {
  const [todos, setTodos] = useState([
    { id: 0, task: 'Köp kaffe' },
    { id: 1, task: 'Köp kaka' },
    { id: 2, task: 'Brygg kaffe' },
    { id: 3, task: 'Drick kaffe' }
  ]);

  const [info, setInfo] = useState(true);

  useEffect(() => {
    console.log('State har uppdaterats');  
  }) //körs varje ggn ett state uppdateras

  useEffect(() => {
    console.log('körs enbart en ggn');

    async function getTodos() {
      const response = await fetch('https://awesome-todo-api.herokuapp.com/tasks')
      const data = await response.json();

      console.log(data);
      // setTodos(data.todos);
    }

    getTodos();
  }, []); //körs en ggn när hemsidan laddas

  useEffect(() => {
    console.log('Todos state uppdaterades');
    setInfo(!info);
  }, [todos]) //kör varje ggn todos state uppdateras och enbart detta


  const todoItems = todos.map((todo) => {
    return <TodoItem task={ todo.task } key={ todo.id } />
  });

  function addTodo(todoText) {
    const newTodo = {
      id: todos.length,
      task: todoText
    }

    const todoArrayCopy = [...todos]; // Skapa en kopia av arrayen
    todoArrayCopy.push(newTodo); // Pusha in den nya todon i vår array

    setTodos(todoArrayCopy); // Uppdatera vårt state med den nya arrayen
  }

  return (
    <div className="App">
      <h2>Todos App</h2>
      <TodosCounter amount={ todos.length }/>
      <ul>
        { todoItems }
      </ul>
      { info ? <p>Ny todo tillagd!</p> : "" }
      <AddTodo addTodo={ addTodo } />
    </div>
  );
}

export default App;
