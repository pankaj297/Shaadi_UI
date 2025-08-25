import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";

import "./RegisterForm.css";
import axios from "axios";  // add this


const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    birthplace: "",
    kuldevat: "",
    gotra: "",
    height: "",
    bloodGroup: "",
    education: "",
    profession: "",
    fatherName: "",
    fatherProfession: "",
    motherName: "",
    motherProfession: "",
    siblings: "",
    mama: "",
    kaka: "",
    address: "",
    mobile: "",
    profilePhoto: null,
    aadhaar: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // ✅ success msg state
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ new state

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      if (name === "profilePhoto") {
        setPhotoPreview(URL.createObjectURL(files[0]));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // prevent multiple submits
    setIsSubmitting(true); // disable button

    try {
      const fd = new FormData();
      Object.keys(formData).forEach((key) => fd.append(key, formData[key]));

      const res = await axios.post(`${BASE_URL}/api/users/register`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const userId = res.data.id || res.data.user?.id;
      if (!userId) {
        console.error("User ID missing in backend response", res.data);
        setSuccessMessage("⚠️ Registration failed: User ID missing!");
        setIsSubmitting(false);
        return;
      }

      localStorage.setItem("currentUserId", userId);
      setSuccessMessage("✅ नोंदणी यशस्वी झाली!");

      setTimeout(() => {
        navigate(`/profile/${userId}`);
      }, 2000);
    } catch (err) {
      console.error(err);
      setSuccessMessage("⚠️ नोंदणी अयशस्वी. कृपया पुन्हा प्रयत्न करा.");
    } finally {
      setIsSubmitting(false); // enable button after request
    }
  };

  return (
    <div className="sf-register-container">
      {/* Success Box ✅ */}
      {successMessage && <div className="success-box">{successMessage}</div>}

      <form className="sf-register-form" onSubmit={handleSubmit}>
        {/* ✅ Back to Home Button */}
        <button
          type="button"
          className="back-to-home"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

        <h2 className="sf-form-title">तुमचे प्रोफाइल तयार करा</h2>
        <p className="one-user">
          एका डिव्हाइसवर फक्त एकच User नोंदणी करू शकतो ✅
        </p>
        <br />

        {/* Personal Information */}
        <div className="sf-form-group">
          <label>पूर्ण नाव *</label>
          <input
            type="text"
            name="name"
            placeholder="तुमचे पूर्ण नाव टाका"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="sf-form-group">
          <label>लिंग *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">लिंग निवडा</option>
            <option value="पुरुष">पुरुष</option>
            <option value="महिला">महिला</option>
          </select>
        </div>

        <div className="sf-form-group">
          <label>
            जन्म तारीख *{" "}
            <em className="register-imp">वय १८ वर्षे आणि त्याहून अधिक </em>
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="sf-form-group">
          <label>जन्मस्थळ *</label>
          <input
            type="text"
            name="birthplace"
            placeholder="शहर / गाव टाका"
            value={formData.birthplace}
            onChange={handleChange}
            required
          />
        </div>

        {/* ✅ Added Kuldevat & Gotra */}
        <div className="sf-form-row">
          <div className="sf-form-group">
            <label>कुलदेवत *</label>
            <input
              type="text"
              name="kuldevat"
              placeholder="कुलदेवत टाका"
              value={formData.kuldevat}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sf-form-group">
            <label>गोत्र *</label>
            <input
              type="text"
              name="gotra"
              placeholder="गोत्र टाका"
              value={formData.gotra}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="sf-form-group">
          <label>उंची *</label>
          <input
            type="text"
            name="height"
            placeholder="उंची टाका (उदा. 170 से.मी)"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>

        <div className="sf-form-group">
          <label>रक्तगट *</label>
          <input
            type="text"
            name="bloodGroup"
            placeholder="उदा. A+, B-, O+"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          />
        </div>

        <div className="sf-form-group">
          <label>शिक्षण *</label>
          <input
            type="text"
            name="education"
            placeholder="शिक्षण टाका"
            value={formData.education}
            onChange={handleChange}
            required
          />
        </div>

        <div className="sf-form-group">
          <label>व्यवसाय *</label>
          <input
            type="text"
            name="profession"
            placeholder="तुमचा व्यवसाय टाका"
            value={formData.profession}
            onChange={handleChange}
            required
          />
        </div>

        {/* Family Information */}
        <div className="sf-form-row">
          <div className="sf-form-group">
            <label>वडिलांचे नाव *</label>
            <input
              type="text"
              name="fatherName"
              placeholder="वडिलांचे नाव टाका"
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sf-form-group">
            <label>वडिलांचा व्यवसाय *</label>
            <input
              type="text"
              name="fatherProfession"
              placeholder="व्यवसाय टाका"
              value={formData.fatherProfession}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="sf-form-row">
          <div className="sf-form-group">
            <label>आईचे नाव *</label>
            <input
              type="text"
              name="motherName"
              placeholder="आईचे नाव टाका"
              value={formData.motherName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sf-form-group">
            <label>आईचा व्यवसाय *</label>
            <input
              type="text"
              name="motherProfession"
              placeholder="व्यवसाय टाका"
              value={formData.motherProfession}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="sf-form-row">
          <div className="sf-form-group">
            <label>भावंड</label>
            <input
              type="text"
              name="siblings"
              placeholder="उदा. 1 बहीण, 1 भाऊ"
              value={formData.siblings}
              onChange={handleChange}
            />
          </div>
          <div className="sf-form-group">
            <label>मामा</label>
            <input
              type="text"
              name="mama"
              placeholder="मामा नाव टाका"
              value={formData.mama}
              onChange={handleChange}
            />
          </div>
          <div className="sf-form-group">
            <label>काका</label>
            <input
              type="text"
              name="kaka"
              placeholder="काका नाव टाका"
              value={formData.kaka}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sf-form-group">
          <label>पत्ता *</label>
          <input
            type="text"
            name="address"
            placeholder="संपूर्ण पत्ता टाका"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="sf-form-group">
          <label>मोबाईल नंबर *</label>
          <input
            type="text"
            name="mobile"
            placeholder="उदा. 9876543210"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        {/* Documents */}
        <div className="sf-form-group">
          <label>प्रोफाइल फोटो *</label>
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleChange}
            required
          />
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Profile Preview"
              className="sf-photo-preview"
            />
          )}
        </div>

        <div className="sf-form-group">
          <label>आधार कार्ड *</label>
          <input
            type="file"
            name="aadhaar"
            accept="image/*,application/pdf"
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="sf-submit-btn"
          type="submit"
          disabled={isSubmitting} // ✅ disable during submission
        >
          {isSubmitting ? "Submitting..." : "सबमिट करा"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
