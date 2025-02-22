import React, { useState } from 'react';

const AddTasks = ({setTasks}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [taskCategory, setTaskCategory] = useState('To-Do');

    const categories = ['To-Do', 'In Progress', 'Done'];

    const openModal = () => setIsOpen(true);
    const closeMOdal = () => setIsOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title || !description || !timestamp) return;

        const newTask ={
            title,
            description,
            timestamp,
            category: taskCategory
        };
        

        // add task in database
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json'},
            body: JSON.stringify(newTask),
        });
        const result = await res.json();
        if(result.acknowledged){
            setTasks((prevTasks) => [...prevTasks, {...newTask, _id: result.insertedId}]);
            closeMOdal(); // close modal after task added
        }
    };
    return (
        <>
        <button onClick={openModal} className='btn btn-outline'>Create New Task</button>

        {isOpen && (
            <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50'>
                <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
                    <h2 className='text-xl font-semibold mb-4'>Add Task</h2>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div>
                            <label className='label'>Task Title</label>
                        <input type="text" placeholder='Task Title' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full p-2 border border-gray-300 rounded-md' required />
                        </div>
                       <div>
                       <label className='label'>Task Description</label>
                       <textarea placeholder='Task Description' value={description} onChange={(e) => setDescription(e.target.value)} className='w-full p-2 border border-gray-300 rounded-md' required />
                       </div>
                        <div>
                        <label className='label'>Date & Time</label>    
                        <input type="datetime-local"  value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className='w-full p-2 border border-gray-300 rounded-md' required />
                        </div>

                       <div>
                       <label className='label'>Category</label>    
                       <select value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)} className='w-full p-2 border border-gray-300 rounded-md'>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                       </div>

                        <button type='submit' className='w-full p-2 border rounded-md'>Add Task</button>
                    </form>

                    <button onClick={closeMOdal} className='w-full mt-4 p-2 text-gray-500 rounded-md border border-gray-300'>Close</button>

                </div>
            </div>
        )}
            
        </>
    );
};

export default AddTasks;