import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Update.css"; // CSS file

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://shaadi-server.onrender.com/api/users";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const UpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [aadhaarPreview, setAadhaarPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // ✅ success box

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        const user = res.data;

        setFormData({
          name: user.name || "",
          gender: user.gender || "",
          dob: user.dob || "",
          birthplace: user.birthplace || "",
          kuldevat: user.kuldevat || "",
          gotra: user.gotra || "",
          height: user.height || "",
          bloodGroup: user.bloodGroup || "",
          education: user.education || "",
          profession: user.profession || "",
          fatherName: user.fatherName || "",
          fatherProfession: user.fatherProfession || "",
          motherName: user.motherName || "",
          motherProfession: user.motherProfession || "",
          siblings: user.siblings || "",
          mama: user.mama || "",
          kaka: user.kaka || "",
          address: user.address || "",
          mobile: user.mobile || "",
          profilePhoto: null,
          aadhaar: null,
        });

        if (user.profilePhotoPath)
          setPhotoPreview(
            `${import.meta.env.VITE_BASE_URL}${user.profilePhotoPath}`
          );
        if (user.aadhaarPath)
          setAadhaarPreview(
            `${import.meta.env.VITE_BASE_URL}${user.aadhaarPath}`
          );
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      if (name === "profilePhoto")
        setPhotoPreview(URL.createObjectURL(files[0]));
      if (name === "aadhaar") setAadhaarPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      await axios.put(`${API_URL}/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("✅ प्रोफाइल यशस्वीपणे अपडेट झाले!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate(`/profile/${id}`);
      }, 3000);
    } catch (err) {
      console.error(err);
      setSuccessMessage("❌ अपडेट करताना त्रुटी आली!");
    }
  };

  return (
    <div className="uf-container">
      {/* ✅ Success Box */}
      {successMessage && <div className="success-box">{successMessage}</div>}

      <form className="uf-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="uf-back-btn"
          onClick={() => navigate(`/profile/${id}`)}
        >
          ⬅ Home
        </button>
        <h2 className="uf-title">प्रोफाइल अपडेट करा</h2>

        {/* Name */}
        <div className="uf-form-group">
          <label>पूर्ण नाव *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="तुमचे पूर्ण नाव टाका"
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="uf-form-group">
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

        {/* DOB */}
        <div className="uf-form-group">
          <label>जन्म तारीख *</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        {/* Birthplace */}
        <div className="uf-form-group">
          <label>जन्मस्थळ *</label>
          <input
            type="text"
            name="birthplace"
            value={formData.birthplace}
            placeholder="शहर / गाव टाका"
            onChange={handleChange}
            required
          />
        </div>

        {/* Kuldevat & Gotra */}
        <div className="uf-form-row">
          <div className="uf-form-group">
            <label>कुलदेवत *</label>
            <input
              type="text"
              name="kuldevat"
              value={formData.kuldevat}
              placeholder="कुलदेवत टाका"
              onChange={handleChange}
              required
            />
          </div>
          <div className="uf-form-group">
            <label>गोत्र *</label>
            <input
              type="text"
              name="gotra"
              value={formData.gotra}
              placeholder="गोत्र टाका"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Other fields */}
        <div className="uf-form-group">
          <label>उंची *</label>
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>

        <div className="uf-form-group">
          <label>रक्तगट *</label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          />
        </div>

        <div className="uf-form-group">
          <label>शिक्षण *</label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
          />
        </div>

        <div className="uf-form-group">
          <label>व्यवसाय *</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
          />
        </div>

        {/* Family Information */}
        <div className="uf-form-row">
          <div className="uf-form-group">
            <label>वडिलांचे नाव *</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="uf-form-group">
            <label>वडिलांचा व्यवसाय *</label>
            <input
              type="text"
              name="fatherProfession"
              value={formData.fatherProfession}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="uf-form-row">
          <div className="uf-form-group">
            <label>आईचे नाव *</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="uf-form-group">
            <label>आईचा व्यवसाय *</label>
            <input
              type="text"
              name="motherProfession"
              value={formData.motherProfession}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Siblings */}
        <div className="uf-form-row">
          <div className="uf-form-group">
            <label>भावंड</label>
            <input
              type="text"
              name="siblings"
              value={formData.siblings}
              onChange={handleChange}
            />
          </div>
          <div className="uf-form-group">
            <label>मामा</label>
            <input
              type="text"
              name="mama"
              value={formData.mama}
              onChange={handleChange}
            />
          </div>
          <div className="uf-form-group">
            <label>काका</label>
            <input
              type="text"
              name="kaka"
              value={formData.kaka}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Address */}
        <div className="uf-form-group">
          <label>पत्ता *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mobile */}
        <div className="uf-form-group">
          <label>मोबाईल नंबर *</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        {/* Profile Photo */}
        <div className="uf-form-group">
          <label>प्रोफाइल फोटो</label>
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleChange}
          />
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Profile Preview"
              className="uf-photo-preview"
            />
          )}
        </div>

        {/* Aadhaar */}
        <div className="uf-form-group">
          <label>आधार कार्ड</label>
          <input
            type="file"
            name="aadhaar"
            accept="image/*,application/pdf"
            onChange={handleChange}
          />
          {aadhaarPreview && (
            <a
              href={aadhaarPreview}
              target="_blank"
              rel="noreferrer"
              className="uf-doc-link"
            >
              जुना आधार पहा
            </a>
          )}
        </div>

        <button type="submit" className="uf-submit-btn">
          अपडेट करा
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
