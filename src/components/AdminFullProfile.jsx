import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/userService";
import "./AdminFullProfile.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AdminFullProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="admin-container">
      {/* Top Title */}
      <div className="admin-top-title">
        || बंजारा समाज वधू - वर मेळावा जळगाव जिल्हा ||
      </div>

      <div className="admin-header">
        {/* Left: User Photo */}
        <div className="admin-photo-section">
          <img
            src={
              user.profilePhotoPath
                ? `${BASE_URL}${user.profilePhotoPath}`
                : "/default-avatar.png"
            }
            alt={user.name}
            className="admin-user-photo"
          />
        </div>

        {/* Center: User Info */}
        <div className="admin-info-section">
          <h1 className="admin-user-name">{user.name}</h1>
          <p className="admin-user-gender">{user.gender}</p>
          <div className="admin-header-buttons">
            <button className="admin-print-btn" onClick={handlePrint}>
              प्रिंट करा
            </button>
          </div>
        </div>

        {/* Right: Ganpati Bappa */}
        <div className="admin-ganpati-section">
          <img
            src="/images/god.png"
            alt="Ganpati Bappa"
            className="admin-ganpati-img"
          />
          <p className="admin-ganpati-text">|| श्री गणेशाय नमः ||</p>
        </div>
      </div>

      <div className="admin-content">
        <section className="admin-section">
          <h2>व्यक्तिगत माहिती</h2>
          <p>
            <span className="admin-info-label">जन्म तारीख :</span> {user.dob}
          </p>
          <p>
            <span className="admin-info-label">जन्म स्थळ :</span>{" "}
            {user.birthplace}
          </p>
          <p>
            <span className="admin-info-label">कुलदेवत :</span> {user.kuldevat}
          </p>
          <p>
            <span className="admin-info-label">गोत्र :</span> {user.gotra}
          </p>
          <p>
            <span className="admin-info-label">उंची :</span> {user.height}
          </p>
          <p>
            <span className="admin-info-label">रक्तगट :</span> {user.bloodGroup}
          </p>
          <p>
            <span className="admin-info-label">शिक्षण :</span> {user.education}
          </p>
          <p>
            <span className="admin-info-label">व्यवसाय :</span>{" "}
            {user.profession}
          </p>
        </section>

        <section className="admin-section">
          <h2>कौटुंबिक माहिती</h2>
          <p>
            <span className="admin-info-label">वडिलांचे नाव :</span>{" "}
            {user.fatherName}
          </p>
          <p>
            <span className="admin-info-label">वडिलांचा व्यवसाय :</span>{" "}
            {user.fatherProfession}
          </p>
          <p>
            <span className="admin-info-label">आईचे नाव :</span>{" "}
            {user.motherName}
          </p>
          <p>
            <span className="admin-info-label">आईचा व्यवसाय :</span>{" "}
            {user.motherProfession}
          </p>
          <p>
            <span className="admin-info-label">भाऊ-बहीणांची माहिती :</span>{" "}
            {user.siblings}
          </p>
          <p>
            <span className="admin-info-label">मामा :</span> {user.mama}
          </p>
          <p>
            <span className="admin-info-label">काका :</span> {user.kaka}
          </p>
          <p>
            <span className="admin-info-label">पत्ता :</span> {user.address}
          </p>
          <p>
            <span className="admin-info-label">मोबाईल :</span> {user.mobile}
          </p>
        </section>

        <section className="admin-section">
          <h2>Documents</h2>
          <p>
            <span className="admin-info-label"> प्रोफाइल फोटो: </span>
            <a
              href={`${BASE_URL}${user.profilePhotoPath}`}
              target="_blank"
              rel="noreferrer"
            >
              View
            </a>
          </p>
          <p>
            <span className="admin-info-label"> आधार कार्ड: </span>
            <a
              href={`${BASE_URL}${user.aadhaarPath}`}
              target="_blank"
              rel="noreferrer"
            >
              View
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AdminFullProfile;
