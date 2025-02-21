import React, { useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import axios from 'axios';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    },[]);
    const fetchTasks = async () => {
        const res = await axios.get('http://localhost:5000/tasks');
        setTasks(res.data);
    }
    const handleDragEnd = async (result) =>{
        if(!result.destination) return;

        const items = Array.from(tasks);
        const [recorderedItem]= items.splice(result.source.index, 1);
        recorderedItem.category = result.destination.droppableId;
        items.splice(result.destination.index, 0, recorderedItem);

        setTasks(items);
        await axios.put(`http://localhost:5000/tasks/${recorderedItem._id}`,recorderedItem);

    };
    
    return (
        <>
        <Navbar></Navbar>
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {['TO-DO','In Progress',  'Done'].map((category) => (
                    <Droppable key={category} droppableId={category}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className='p-4 w-1/3 border'>
                                <h3 className='font-bold text-lg'>{category}</h3>
                                {tasks.filter(task => task.category === category).map((task, index) => (
                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='p-2 my-2 border rounded bg-gray-200 '>
                                                <h4 className='font-semibold'>{task.title}</h4>
                                                <p>{task.description}</p>

                                            </div>
                                        )}
                                    </Draggable>
                                   
                                ))}
                                 {provided.placeholder}

                            </div>
                        )}
                    </Droppable>
                ))}

            </div>
            
        </DragDropContext>       
        </>
    );
};

export default Dashboard;