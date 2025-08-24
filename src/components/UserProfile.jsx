import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../services/userService";
import "./UserProfile.css";

const BASE_URL = "https://shaadi-server.onrender.com/uploads/";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    <>
      {/* Back Button outside container */}
      <div className="up-back-btn-container">
        <button className="up-back-btn" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>
      </div>

      <div className="up-container">
        {/* Top Title & Organizer */}
        <div className="up-top-bar">
          <div className="admin-top-title">
            || बंजारा समाज वधू - वर मेळावा जळगाव जिल्हा ||
            <div className="admin-top-title">
              मुख्य आयोजक - नितीन तुळशिराम जाधव
            </div>
          </div>
        </div>

        <div className="up-header">
          {/* Left: User Photo */}
          <div className="up-photo-section">
            <img
              src={
                user.profilePhotoPath
                  ? `${BASE_URL}${user.profilePhotoPath}`
                  : "/default-avatar.png"
              }
              alt={user.name}
              className="up-user-photo"
            />
          </div>

          {/* Center: User Info */}
          <div className="up-info-section">
            <h1 className="up-user-name">{user.name}</h1>
            <p className="up-user-gender">{user.gender}</p>
            <div className="up-header-buttons">
              <button
                className="up-update-btn"
                onClick={() => navigate(`/update/${user.id}`)}
              >
                प्रोफाइल अपडेट करा
              </button>
              <button className="up-print-btn" onClick={handlePrint}>
                प्रिंट करा
              </button>
            </div>
          </div>

          {/* Right: Ganpati Bappa */}
          <div className="up-ganpati-section">
            <img
              src="/images/god.png"
              alt="Ganpati Bappa"
              className="up-ganpati-img"
            />
            <p className="up-ganpati-text">|| श्री गणेशाय नमः ||</p>
          </div>
        </div>

        <div className="up-content">
          <section className="up-section">
            <h2>व्यक्तिगत माहिती</h2>
            <p>
              <span className="up-info-label">जन्म तारीख :</span> {user.dob}
            </p>
            <p>
              <span className="up-info-label">जन्म स्थळ :</span>{" "}
              {user.birthplace}
            </p>
            <p>
              <span className="up-info-label">कुलदेवत :</span> {user.kuldevat}
            </p>
            <p>
              <span className="up-info-label">गोत्र :</span> {user.gotra}
            </p>
            <p>
              <span className="up-info-label">उंची :</span> {user.height}
            </p>
            <p>
              <span className="up-info-label">रक्तगट :</span> {user.bloodGroup}
            </p>
            <p>
              <span className="up-info-label">शिक्षण :</span> {user.education}
            </p>
            <p>
              <span className="up-info-label">व्यवसाय :</span> {user.profession}
            </p>
          </section>

          <section className="up-section">
            <h2>कौटुंबिक माहिती</h2>
            <p>
              <span className="up-info-label">वडिलांचे नाव :</span>{" "}
              {user.fatherName}
            </p>
            <p>
              <span className="up-info-label">वडिलांचा व्यवसाय :</span>{" "}
              {user.fatherProfession}
            </p>
            <p>
              <span className="up-info-label">आईचे नाव :</span>{" "}
              {user.motherName}
            </p>
            <p>
              <span className="up-info-label">आईचा व्यवसाय :</span>{" "}
              {user.motherProfession}
            </p>
            <p>
              <span className="up-info-label">भाऊ-बहीणांची माहिती :</span>{" "}
              {user.siblings}
            </p>
            <p>
              <span className="up-info-label">मामा :</span> {user.mama}
            </p>
            <p>
              <span className="up-info-label">काका :</span> {user.kaka}
            </p>
            <p>
              <span className="up-info-label">पत्ता :</span> {user.address}
            </p>
            <p>
              <span className="up-info-label">मोबाईल :</span> {user.mobile}
            </p>
          </section>

          <section className="up-section">
            <h2>Documents</h2>
            <p>
              <span className="up-info-label">प्रोफाइल फोटो :</span>

              <a
                href={`${BASE_URL}${user.profilePhotoPath}`}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
            </p>
            <p>
              <span className="up-info-label">आधार कार्ड :</span>
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
    </>
  );
};

export default UserProfile;
