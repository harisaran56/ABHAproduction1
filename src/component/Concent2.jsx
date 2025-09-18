import './Concent2.css';
import { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';

const appointmentList = [

    {
        id: 1,
        name: 'Appointment 1',
        date: '2024-01-01',
        time: '10:00 AM',
    },
    {
        id: 2,
        name: 'Appointment 2',
        date: '2024-01-02',
        time: '11:00 AM',
    },
    {
        id: 3,
        name: 'Appointment 3',
        date: '2024-01-03',
        time: '12:00 PM',
    },
    {
        id: 4,
        name: 'Appointment 4',
        date: '2024-01-04',
        time: '01:00 PM',
    }
]

export default function MyAppointments() {
    return (
        <div>
            <h1>My Appointments</h1>
            <div className="appointment-container">
            <div className="appointment-list">
                <div className="appointment-item">
                    <h2>Appointment 1</h2>
                    <p>Date: 2024-01-01</p>
                    <p>Time: 10:00 AM</p>
                </div>
                <div className="pending-appointment-item">
                    <h2>Pending Appointment</h2>
                    <p>Date: 2024-01-02</p>
                    <p>Time: 11:00 AM</p>
                </div>
                <div className="completed-appointment-item">
                    <h2>Completed Appointment</h2>
                    <p>Date: 2024-01-03</p>
                    <p>Reason: Completed</p>
                    <p>Time: 12:00 PM</p>
                </div>


            </div>
            <div className="appointment-upcoming-list">
                <div className="appointment-item">
                    <h2>Appointment 2</h2>
                    <p>Date: 2024-01-02</p>
                    <p>Time: 11:00 AM</p>
                    <p>Reason: Completed</p>
                </div>
                
                <div className="pending-deleted-appointment-item">
                    <h2>Pending Appointment</h2>
                    <p>Date: 2024-01-02</p>
                    <p>Time: 11:00 AM</p>
                    <p>Reason: Cancelled</p>
                    <p>Time: 11:00 AM</p>
                </div>
                <div className="completed-appointment-item">
                    <h2>Completed Appointment</h2>
                    <p>Date: 2024-01-03</p>
                    <p>Reason: Completed</p>
                    <p>Time: 12:00 PM</p>
                    </div>
                    <div className="completed-appointment-item">
                    <h2>Completed Appointment</h2>
                    <p>Date: 2024-01-03</p>
                    <p>Reason: Completed</p>
                    <p>Time: 12:00 PM</p>
                    </div>
                </div>
            </div>
        </div>
    )
}