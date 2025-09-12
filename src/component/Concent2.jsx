export default function MyAppointments() {
    return (
        <div>
            <h1>My Appointments</h1>
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
                    <p>Time: 12:00 PM</p>
                </div>
            </div>
            <div className="appointment-upcoming-list">
                <div className="appointment-item">
                    <h2>Appointment 2</h2>
                    <p>Date: 2024-01-02</p>
                    <p>Time: 11:00 AM</p>
                </div>
                <div className="pending-deleted-appointment-item">
                    <h2>Pending Appointment</h2>
                    <p>Date: 2024-01-02</p>
                    <p>Time: 11:00 AM</p>
                </div>
                <div className="completed-appointment-item">
                    <h2>Completed Appointment</h2>
                    <p>Date: 2024-01-03</p>
                    <p>Time: 12:00 PM</p>
                </div>
            </div>
        </div>
    )
}