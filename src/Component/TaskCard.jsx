import { useDraggable } from '@dnd-kit/core';
import React from 'react';

const TaskCard = ({task, onDelete, onUpdate}) => {
    const { attributes, listeners, setNodeRef, transform} = useDraggable({ id: task._id});

    const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`} : {};

    const handleUpdate = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        onUpdate(task);
        console.log("update button clicked");
        
    };
    const handleDelete = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        console.log("Delete button clicked");
        onDelete(task._id);
    }


    return (
        <div ref={setNodeRef} {...listeners} {...attributes} style={style} className='p-4 bg-white rounded-md shadow-md mb-2 '>
            <h3 className='text-lg font-semibold'>{task.title}</h3>
            <p className='text-sm text-gray-600'>{task.description}</p>
            <div className='mt-2 flex justify-between'>
                <button onClick={handleUpdate} onPointerDown={(e) => e.stopPropagation()} className='btn text-blue-500'>Update</button>
                <button onClick={handleDelete} onPointerDown={(e) => e.stopPropagation()} className='btn text-red-500'>Delete</button>
                
            </div>
        </div>
      
    );
};

export default TaskCard;