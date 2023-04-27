import React from 'react';
import Chart from 'chart.js/auto';
import styles from '@/styles/Data.module.css';
import UserTable from '@/components/UserTable';


export default function DataAnalytics() {
    
    
    //Leaders view (teams they are in)


    //Managers View (all teams on system)

    return (
        <div>
            <div class='center'><h1>All Users</h1></div>
            <UserTable />
        </div>
    );

};

