import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";
import UserCard from "./UserCard";
import "./AdminHome.css"; // ✅ Custom grid styles

const AdminHome = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-home-container">
      <h2 className="admin-title">✨All Profiles</h2>
      {users.length === 0 ? (
        <p className="no-users">No users found.</p>
      ) : (
        <div className="user-cards-container">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminHome;
