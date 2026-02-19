import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:3000'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`)
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, detail })
      })
      const newTodo = await response.json()
      setTodos([...todos, newTodo])
      setTitle('')
      setDetail('')
    } catch (error) {
      console.error('Error creating todo:', error)
    }
  }

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending'
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      const updatedTodo = await response.json()
      setTodos(todos.map(t => t.id === id ? updatedTodo : t))
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' })
      setTodos(todos.filter(t => t.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <div className="app">
      <h1>Todo App</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Detail"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      {todos.length === 0 ? (
        <div className="empty-state">
          No todos yet. Add one above to get started!
        </div>
      ) : (
        <table className="todo-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Detail</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id} className={todo.status}>
                <td>{todo.title}</td>
                <td>{todo.detail}</td>
                <td>
                  <button
                    className={`status-btn ${todo.status}`}
                    onClick={() => toggleStatus(todo.id, todo.status)}
                  >
                    {todo.status}
                  </button>
                </td>
                <td>{new Date(todo.createdAt).toLocaleString()}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App
