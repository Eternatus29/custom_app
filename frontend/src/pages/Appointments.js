// src/pages/Appointments.js
import React, { useState, useEffect } from "react";

const Appointments = () => {
	const [appointments, setAppointments] = useState([]);
	const [newAppointment, setNewAppointment] = useState({
		name: "",
		date: "",
		time: "",
	});

	useEffect(() => {
		// Fetch appointments from the backend when the component mounts
		const fetchAppointments = async () => {
			try {
				const response = await fetch(
					"http://localhost:5000/appointments/get-appointments"
				);
				if (response.ok) {
					const data = await response.json();
					setAppointments(data);
				} else {
					console.error("Failed to fetch appointments.");
				}
			} catch (error) {
				console.error("Error during appointment fetch:", error);
			}
		};

		fetchAppointments();
	}, []); // The empty dependency array ensures the effect runs only once on mount

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewAppointment((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleAddAppointment = async () => {
		try {
			const response = await fetch(
				"http://localhost:5000/appointments/add-appointment",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newAppointment),
				}
			);

			if (response.ok) {
				console.log("Appointment added successfully.");
				// Fetch updated appointments after adding a new one
				const updatedAppointments = await (
					await fetch("http://localhost:5000/appointments/get-appointments")
				).json();
				setAppointments(updatedAppointments);
				// Clear the form
				setNewAppointment({ name: "", date: "", time: "" });
			} else {
				console.error("Failed to add appointment.");
			}
		} catch (error) {
			console.error("Error during appointment addition:", error);
		}
	};

	const handleDeleteAppointment = async (id) => {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(
				`http://localhost:5000/appointments/delete-appointment/${id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				console.log("Appointment deleted successfully.");
				// Fetch updated appointments after deleting one
				const updatedAppointments = await (
					await fetch("http://localhost:5000/appointments/get-appointments")
				).json();
				setAppointments(updatedAppointments);
			} else {
				console.error("Failed to delete appointment.");
			}
		} catch (error) {
			console.error("Error during appointment deletion:", error);
		}
	};

	return (
		<div className="min-h-screen bg-dark-blue text-white p-4">
			<div className="max-w-md mx-auto bg-white/30 backdrop-blur-sm rounded-lg p-4">
				<h2 className="text-xl font-bold text-center">Add New Appointment</h2>
				<div className="my-4">
					<input
						type="text"
						name="name"
						placeholder="Name"
						value={newAppointment.name}
						onChange={handleInputChange}
						className="w-full p-2 rounded my-2 bg-white/50"
					/>
					<input
						type="date"
						name="date"
						value={newAppointment.date}
						onChange={handleInputChange}
						className="w-full p-2 rounded my-2 bg-white/50"
					/>
					<input
						type="time"
						name="time"
						value={newAppointment.time}
						onChange={handleInputChange}
						className="w-full p-2 rounded my-2 bg-white/50"
					/>
					<button
						onClick={handleAddAppointment}
						className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Add Appointment
					</button>
				</div>
			</div>
			<div className="max-w-md mx-auto mt-8">
				<h3 className="text-2xl font-bold text-center">Appointments</h3>
				<ul className="divide-y divide-gray-300/50">
					{appointments.map((appointment) => (
						<li
							key={appointment._id}
							className="flex justify-between items-center py-3"
						>
							<div>
								<p className="font-semibold">{appointment.name}</p>
								<p>{`Date: ${new Date(
									appointment.date
								).toLocaleDateString()}, Time: ${new Date(
									`2022-01-01T${appointment.time}:00`
								).toLocaleTimeString([], { timeStyle: "short" })}`}</p>
							</div>
							<button
								onClick={() => handleDeleteAppointment(appointment._id)}
								className="text-red-500 hover:text-red-700"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Appointments;
