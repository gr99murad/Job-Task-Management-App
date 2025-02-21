import React, { useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import axios from 'axios';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    },[]);
    const fetchTasks = async () => {
        const res = await axios.get('http://localhost:5000/tasks');
        setTasks(res.data);
    }
    
    return (
        <>
        <Navbar></Navbar>
        <div>
            
        </div>

            
        </>
    );
};

export default Dashboard;