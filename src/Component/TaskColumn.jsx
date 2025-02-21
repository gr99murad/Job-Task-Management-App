import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ category, tasks, setTasks}) => {
    const { setNodeRef } = useDroppable({ id: category});
    return (
        <div ref={setNodeRef} className='p-4 bg-gray-200 rounded-md'>
            <h2 className='text-xl font-bold mb-4'>{category}</h2>
            {tasks.map(task => (
                <TaskCard key={task._id} task={task}></TaskCard>
            ))}
            
        </div>
    );
};

export default TaskColumn;