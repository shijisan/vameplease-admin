"use client";

import { useState, useEffect } from "react";

export default function ManageAdmins() {
	const [admins, setAdmins] = useState([]);
	const [newAdmin, setNewAdmin] = useState({ username: "", password: "", email: "" });
	const [editedAdmin, setEditedAdmin] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fetchAdmins = async () => {
			const res = await fetch("/api/manage-admins");
			const data = await res.json();
			setAdmins(data);
		};
		fetchAdmins();
	}, []);

	const handleAddAdmin = async () => {
		if (!newAdmin.username || !newAdmin.password || !newAdmin.email) {
			alert("Please fill in all fields.");
			return;
		}

		const res = await fetch("/api/manage-admins", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newAdmin),
		});

		if (res.ok) {
			setNewAdmin({ username: "", password: "", email: "" });
			try {
				const newAdminData = await res.json();
				setAdmins((prev) => [...prev, newAdminData]);
			} catch (error) {
				console.error("Error parsing response:", error);
			}
		} else {
			console.error("Error creating admin:", await res.text());
		}
	};

	const handleEditAdmin = async () => {
		if (!editedAdmin.username || !editedAdmin.password || !editedAdmin.email) {
			alert("Please fill in all fields.");
			return;
		}

		const res = await fetch(`/api/manage-admins/${editedAdmin.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(editedAdmin),
		});

		if (res.ok) {
			const updatedAdmin = await res.json();
			setAdmins((prev) =>
				prev.map((admin) => (admin.id === updatedAdmin.id ? updatedAdmin : admin))
			);
			setEditedAdmin(null); 
		} else {
			console.error("Error updating admin:", await res.text());
		}
	};

	const handleDeleteAdmin = async (id) => {
		const res = await fetch(`/api/manage-admins/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			setAdmins((prev) => prev.filter((admin) => admin.id !== id));
		}
	};

	const filteredAdmins = admins.filter((admin) =>
		admin.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
		admin.email.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<section className="min-h-screen bg-gradient-to-b from-violet-300 to-pink-500 flex pt-[14vh]">
			<div className="w-1/2 flex justify-center items-center">
				<form className="bg-white rounded-lg max-w-md w-full p-4 space-y-3 flex flex-col">
					<div className="flex justify-center items-center space-x-3">
						<img className="w-1/4" src="/logo.webp" alt="logo" />
						<h1 className="text-3xl font-semibold text-center flex">
							Create Admin
						</h1>
					</div>
					<div>
						<input
							type="text"
							value={newAdmin.username}
							onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
							placeholder="Username"
							className="border p-2 rounded-sm w-full"
						/>
					</div>
					<div>
						<input
							type="email"
							value={newAdmin.email}
							onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
							placeholder="Email"
							className="border p-2 rounded-sm w-full"
						/>
					</div>
					<div>
						<input
							type="password"
							value={newAdmin.password}
							onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
							className="border p-2 rounded-sm w-full"
							placeholder="Password"
						/>
					</div>
					<div>
						<button
							className="w-full bg-purple-800 text-white text-center rounded p-2 transition-colors hover:cursor-pointer hover:bg-purple-700"
							onClick={handleAddAdmin}
						>
							Add Admin
						</button>
					</div>
				</form>
			</div>

			<div className="w-1/2 bg-slate-900 p-4 text-white">
				<h1 className="text-3xl font-semibold mb-4">Existing Admins</h1>
				<input
					type="text"
					placeholder="Search Admins..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="border p-2 rounded-sm w-full mb-4 text-black"
				/>
				<table className="min-w-full table-auto border border-gray-300">
					<thead>
						<tr>
							<th className="border border-gray-300 px-4 py-2">Username</th>
							<th className="border border-gray-300 px-4 py-2">Email</th>
							<th className="border border-gray-300 px-4 py-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredAdmins.map((admin) => (
							<tr key={admin.id}>
								<td className="border border-gray-300 px-4 py-2">{admin.username}</td>
								<td className="border border-gray-300 px-4 py-2">{admin.email}</td>
								<td className="border border-gray-300 px-4 py-2">
									<div className="flex justify-evenly items-center w-full h-full">
									<button
										className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
										onClick={() => setEditedAdmin(admin)}
									>
										Edit
									</button>
									<button
										className="bg-red-500 text-white px-3 py-1 rounded"
										onClick={() => handleDeleteAdmin(admin.id)}
									>
										Delete
									</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{editedAdmin && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
					<div className="bg-white p-6 rounded-lg w-96">
						<h1 className="text-3xl font-semibold mb-4">Edit Admin</h1>
						<div>
							<input
								type="text"
								value={editedAdmin.username}
								onChange={(e) => setEditedAdmin({ ...editedAdmin, username: e.target.value })}
								placeholder="Username"
								className="border p-2 rounded-sm w-full mb-3"
							/>
						</div>
						<div>
							<input
								type="email"
								value={editedAdmin.email}
								onChange={(e) => setEditedAdmin({ ...editedAdmin, email: e.target.value })}
								placeholder="Email"
								className="border p-2 rounded-sm w-full mb-3"
							/>
						</div>
						<div>
							<input
								type="password"
								value={editedAdmin.password || ""}
								onChange={(e) => setEditedAdmin({ ...editedAdmin, password: e.target.value })}
								placeholder="Password"
								className="border p-2 rounded-sm w-full mb-3"
							/>
						</div>
						<div className="flex justify-between">
							<button
								onClick={() => setEditedAdmin(null)}
								className="bg-gray-500 text-white px-4 py-2 rounded"
							>
								Cancel
							</button>
							<button
								onClick={handleEditAdmin}
								className="bg-blue-500 text-white px-4 py-2 rounded"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
