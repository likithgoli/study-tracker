
import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:5000/api/tasks'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [tasks, setTasks] = useState([])

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // 1. Fetch tasks from MongoDB
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch tasks')
        }

        setTasks(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  // 2. Add a new task to MongoDB
  async function addTask(e) {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject: title,
          topic: subject,
          priority,
          dueDate: dueDate || null,
          status: 'Pending'
        })
      })

      const newTask = await response.json()

      if (!response.ok) {
        throw new Error(newTask.error || 'Failed to add task')
      }

      setTasks(current => [...current, newTask])

      setTitle('')
      setSubject('')
      setPriority('Medium')
      setDueDate('')
      setShowForm(false)

    } catch (err) {
      setError(err.message)
    }
  }

  // 3. Update task status in MongoDB
  async function toggleTask(id) {
    setError('')

    const currentTask = tasks.find(task => task._id === id)

    if (!currentTask) return

    const updatedStatus =
      currentTask.status === 'Completed'
        ? 'Pending'
        : 'Completed'

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: updatedStatus
        })
      })

      const updatedTask = await response.json()

      if (!response.ok) {
        throw new Error(updatedTask.error || 'Failed to update task')
      }

      setTasks(current =>
        current.map(task =>
          task._id === id ? updatedTask : task
        )
      )

    } catch (err) {
      setError(err.message)
    }
  }

  // 4. Delete task from MongoDB
  async function deleteTask(id) {
    setError('')

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete task')
      }

      setTasks(current =>
        current.filter(task => task._id !== id)
      )

    } catch (err) {
      setError(err.message)
    }
  }

  const completed = tasks.filter(
    task => task.status === 'Completed'
  ).length

  const pending = tasks.length - completed

  const progress = tasks.length === 0
    ? 0
    : Math.round((completed / tasks.length) * 100)

  return (
    <div className="layout">

      <aside className="sidebar">
        <h2>📚 StudyHub</h2>

        <p className="side-label">MENU</p>
        <div className="nav-item active">▦ Dashboard</div>
        <div className="nav-item">✓ My Tasks</div>
        <div className="nav-item">📊 My Progress</div>

        <div className="sidebar-bottom">
          Stay focused. Keep learning!
        </div>
      </aside>

      <main className="main-content">

        <header className="topbar">
          <div>
            <h1>My Dashboard</h1>
            <p>Welcome back! Let's achieve your study goals.</p>
          </div>

          <button
            className="add-button"
            onClick={() => setShowForm(!showForm)}
          >
            + Add New Task
          </button>
        </header>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <section className="stats">

          <div className="stat-card purple">
            <span>Total Tasks</span>
            <h2>{tasks.length}</h2>
            <p>All your study tasks</p>
          </div>

          <div className="stat-card green">
            <span>Completed</span>
            <h2>{completed}</h2>
            <p>Tasks finished</p>
          </div>

          <div className="stat-card orange">
            <span>Pending</span>
            <h2>{pending}</h2>
            <p>Tasks remaining</p>
          </div>

        </section>

        <section className="progress-section">
          <div className="progress-heading">
            <h2>Overall Progress</h2>
            <strong>{progress}%</strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </section>

        {showForm && (
          <form className="task-form" onSubmit={addTask}>

            <h2>Add a New Study Task</h2>

            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
            />

            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />

            <div className="form-actions">
              <button type="submit" className="add-button">
                Save Task
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>

          </form>
        )}

        <section className="tasks-section">

          <div className="section-heading">
            <div>
              <h2>My Study Tasks</h2>
              <p>Manage and track your daily learning activities.</p>
            </div>

            <span>{tasks.length} Tasks</span>
          </div>

          {loading ? (
            <div className="empty-state">
              <h3>Loading your tasks...</h3>
            </div>
          ) : tasks.length === 0 ? (

            <div className="empty-state">
              <h2>📖</h2>
              <h3>No tasks yet!</h3>
              <p>Add your first study task to get started.</p>
            </div>

          ) : (

            <div className="task-grid">

              {tasks.map(task => (

                <div className="task-card" key={task._id}>

                  <div className="task-top">

                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority} Priority
                    </span>

                    <span className={`status ${task.status.toLowerCase().replace(' ', '-')}`}>
                      {task.status}
                    </span>

                  </div>

                  <h3>{task.subject}</h3>

                  <p className="subject">{task.topic}</p>

                  <p className="due-date">
                    📅 Due: {
                      task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : 'Not set'
                    }
                  </p>

                  <div className="task-actions">

                    <button
                      className="complete-button"
                      onClick={() => toggleTask(task._id)}
                    >
                      {task.status === 'Completed'
                        ? '↩ Undo'
                        : '✓ Mark Completed'}
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}

        </section>

      </main>
    </div>
  )
}

export default App
