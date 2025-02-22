import React, { useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import { closestCenter, DndContext } from '@dnd-kit/core';
import TaskColumn from '../Component/TaskColumn';
import AddTasks from '../Component/AddTasks';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);
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
    const handleUpdateTask = async () => {
        if(!taskToUpdate) return;

        try{
            const res = await fetch(`http://localhost:5000/tasks/${taskToUpdate._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ title: taskToUpdate.title, description: taskToUpdate.description})
            });
            if(!res.ok){
                throw new Error ('Failed to update task');

            }
            setTasks(tasks.map(task => task._id === taskToUpdate._id ? {...task, title: taskToUpdate.title, description: taskToUpdate.description} : task) );

            setShowUpdateModal(false);
        }catch(error){
            console.error('Error updating task',error);
            alert('Error updating task.Please try Again');

        }
    };
    const handleDeleteTask = async () =>{
        if(!taskToDelete) return;
        
        // delete task from server
        await fetch(`http://localhost:5000/tasks/${taskToDelete}`, {
            method: 'Delete',
        });
        // remove task locally
        setTasks(tasks.filter(task => task._id !== taskToDelete));
        setShowDeleteModal(false);
    };

    const handleDelete = (taskId) => {
        setTaskToDelete(taskId);
        setShowDeleteModal(true);
    };

    const handleUpdate = (task) => {
        setTaskToUpdate(task);
        setShowUpdateModal(true);
    }
    return (
        <>
        <Navbar></Navbar>
        
        <div className='py-24 px-14 md:px-24'>
        <div className='py-4'>
        <AddTasks setTasks={setTasks}></AddTasks>
        </div>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {categories.map(category => (
                    <TaskColumn key={category} category={category} tasks={tasks.filter(task => task.category === category)} setTasks={setTasks} onUpdate={handleUpdate} onDelete={handleDelete}></TaskColumn>
                ))}

            </div>
        </DndContext>
        </div>

        {/* update task modal */}
        
        {showUpdateModal && taskToUpdate && (
            <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                <div className='bg-white p-6 rounded-md'>
                    <h3 className='text-xl font-bold text-center mb-4'>Update Task</h3>
                    <input type="text" value={taskToUpdate.title} onChange={(e) => setTaskToUpdate({ ...taskToUpdate, title: e.target.value})} className='input input-bordered' placeholder='Task Title' />

                    <textarea value={taskToUpdate.description} onChange={(e) => setTaskToUpdate({ ...taskToUpdate, description: e.target.value})} className='input input-bordered' placeholder='Task Description'></textarea>

                    <div className='flex justify-between'>
                        <button onClick={handleUpdateTask} className='btn btn-primary'>save</button>
                        <button onClick={() => setShowUpdateModal(false)} className='btn btn-outline'>Cancel</button>
                    </div>

                </div>
            </div>
        )}

         {/* Delete task modal */}
        
         {showDeleteModal && taskToDelete && (
            <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                <div className='bg-white p-6 rounded-md'>
                    <h3 className='text-xl font-bold text-center mb-4'>Are you sure you want to delete this task</h3>
                    
                    <div className='flex justify-between'>
                        <button onClick={handleDeleteTask} className='btn bg-red-500 text-white'>yes</button>
                        <button onClick={() => setShowDeleteModal(false)} className='btn btn-outline'>No</button>
                    </div>

                </div>
            </div>
        )}
            
        </>
    );
};

export default Dashboard;