import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Switch} from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';


export default function App() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () =>{
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])


// Fetch Tasks
    const fetchTasks = async () =>{
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json();

        console.log(data);
        return data;    
    }

    // Fetch Task
    const fetchTask = async (id) =>{
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json();

        console.log(data);
        return data;    
    }


    // AddTask

    const addTask = async (task) => {

        const res = await fetch('http://localhost:5000/tasks',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json();
        setTasks([...tasks, data])


        // const id = Math.floor(Math.random() * 100000)+1
        // const newTask = {id, ...task}
        // setTasks([...tasks, newTask])
    }


    // Delete Task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`,
        {
            method: 'DELETE',
        }
        )
        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toogle Remainder
    const toggleRemainder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updateTask = {...taskToToggle, remainder: !taskToToggle.remainder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`,
        {
            method: 'PUT',
            headers: { 
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(updateTask)
        })

        const data = await res.json()



        setTasks(
            tasks.map((task) => 
            task.id === id ? { ...task, remainder: data.remainder } : task
            )
            )


        // console.log('Remainder Toggling',id);
        // setTasks(tasks.map((task) => task.id === id ?
        // {...task, remainder: !data.remainder} : task))
    }


    
  return (
      <Router>
    <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} title="Task Tracker" showAdd ={showAddTask}/>
        <Routes>
        
        <Route path="/" exact element={
            <>

        {showAddTask && <AddTask onAdd = {addTask}/>}
        {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle = {toggleRemainder}/>
        ) : (
            'No Tasks To Show'
        )
        
        }
            </>
        } />
        <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
    </div>
      </Router>
  )
}
