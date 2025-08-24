import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserCard.css"; // ✅ Add card-specific styles

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="user-card">
      <img
        src={
          user.profilePhotoPath
            ? `http://localhost:8080/uploads/${user.profilePhotoPath}`
            : "/default-avatar.png"
        }
        alt={user.name}
        className="user-photo"
      />
      <h4 className="user-name">{user.name}</h4>
      <button
        className="pm-profile-btn"
        onClick={() => navigate(`/cbaddda/user/${user.id}`)}
      >
        View Full Profile
      </button>
    </div>
  );
};

export default UserCard;
