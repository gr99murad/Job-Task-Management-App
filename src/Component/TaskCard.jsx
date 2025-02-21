import { useDraggable } from '@dnd-kit/core';
import React from 'react';

const TaskCard = ({task}) => {
    const { attributes, listeners, setNodeRef, transform} = useDraggable({ id: task._id});

    const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`} : {};

    return (
        <div ref={setNodeRef} {...listeners} {...attributes} style={style} className='p-4 bg-white rounded-md shadow-md mb-2 '>
            <h3 className='text-lg font-semibold'>{task.title}</h3>
            <p className='text-sm text-gray-600'>{task.description}</p>
        </div>
      
    );
};

export default TaskCard;