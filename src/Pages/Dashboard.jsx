import React, { useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import { closestCenter, DndContext } from '@dnd-kit/core';
import TaskColumn from '../Component/TaskColumn';
import AddTasks from '../Component/AddTasks';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const categories = ['To-Do', 'In Progress', 'Done'];
    
    useEffect(() => {
        fetch('http://localhost:5000/tasks')
        .then(res => res.json())
        .then(data => setTasks(data));
    },[]);

    const handleDragEnd = async (e) => {
        
        const {active, over} = e;
        if(!over) return;

        const draggedTask = tasks.find(task => task._id === active.id);
        if(!draggedTask) return;

        const newCategory = over.id;
        if(draggedTask.category !== newCategory){
            const updatedTask = {...draggedTask, category: newCategory};
            setTasks(tasks.map(task => task._id === active.id ? updatedTask : task));

            // update category in MOngoDB
            await fetch(`http://localhost:5000/tasks/${active.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ category: newCategory})
            });
        }
    };
    return (
        <>
        <Navbar></Navbar>
        
        <div className='py-24 px-24'>
        <div className='py-4'>
        <AddTasks setTasks={setTasks}></AddTasks>
        </div>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {categories.map(category => (
                    <TaskColumn key={category} category={category} tasks={tasks.filter(task => task.category === category)} setTasks={setTasks} ></TaskColumn>
                ))}

            </div>
        </DndContext>
        </div>
        
            
        </>
    );
};

export default Dashboard;