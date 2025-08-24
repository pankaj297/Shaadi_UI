import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // Custom CSS

const HomePage = () => {
  const navigate = useNavigate();
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [lastUser, setLastUser] = useState(null);

  useEffect(() => {
    const storedUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    setRegisteredUsers(storedUsers);
    if (storedUsers.length > 0) {
      setLastUser(storedUsers[storedUsers.length - 1]);
    }
  }, []);

  return (
    <div id="pm-home-container">
      {/* Header */}
      <header id="pm-header">
        <div id="pm-header-inner">
          <h1 id="pm-logo">💕 परफेक्ट मॅच</h1>
          <nav id="pm-nav">
            <button
              className="pm-nav-btn"
              onClick={() => navigate("/admin-login")}
            >
              Admin
            </button>
            <button
              className="pm-nav-btn pm-nav-btn-primary"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="pm-hero">
        <div id="pm-hero-left">
          <h2 className="pm-hero-title">
            तुमच्या आयुष्यातील परफेक्ट जीवनसाथी शोधा
          </h2>
          <p className="pm-hero-desc">
            जळगाव जिल्ह्यातील बंजारा समाज वधू-वर मेळावा <br />
            आयोजित करण्यात येत आहे. हा मेळावा संपूर्ण समाजातील युवक-युवतींना
            त्यांच्या जीवनसाथीच्या शोधात मदत करण्यासाठी आयोजित केला जात आहे.
            <br />
            वधू-वर वय १८ वर्षे आणि त्याहून अधिक ✅
          </p>
          <div className="pm-hero-btn-group">
            <button
              className="pm-hero-btn"
              onClick={() => navigate("/register")}
            >
              सुरुवात करा
            </button>

            {lastUser ? (
              <button
                className="pm-hero-btn"
                onClick={() => navigate(`/profile/${lastUser}`)}
              >
                प्रोफाइल पहा
              </button>
            ) : (
              <button
                className="pm-hero-btn"
                onClick={() => alert("अजून कोणताही User नोंदणी केलेला नाही ✅")}
              >
                प्रोफाइल पहा
              </button>
            )}
          </div>
        </div>

        <div id="pm-hero-right">
          <img src="./images/Home.png" alt="Couple" className="pm-hero-img" />
        </div>
      </section>

      {/* 🔹 Couples Section */}
      <section id="pm-couples">
        <h2 className="pm-section-title">सुखी जोडपे</h2>
        <div className="pm-couples-grid">
          <div className="pm-couple-card">
            <img
              src="./images/couple1.jpg"
              alt="Couple 1"
              className="pm-couple-img"
            />
            <h3 className="pm-couple-name">स्नेहा ❤️ रोहन</h3>
          </div>
          <div className="pm-couple-card">
            <img
              src="./images/couple2.jpg"
              alt="Couple 2"
              className="pm-couple-img"
            />
            <h3 className="pm-couple-name">प्रिया ❤️ चेतन</h3>
          </div>
          <div className="pm-couple-card">
            <img
              src="./images/couple3.jpg"
              alt="Couple 3"
              className="pm-couple-img"
            />
            <h3 className="pm-couple-name">स्नेहा ❤️ अर्जुन</h3>
          </div>
          <div className="pm-couple-card">
            <img
              src="./images/couple4.jpg"
              alt="Couple 4"
              className="pm-couple-img"
            />
            <h3 className="pm-couple-name">काव्या ❤️ रोहन</h3>
          </div>
        </div>
      </section>

      {/* Featured Profiles Section */}
      <section id="pm-featured">
        <h2 className="pm-section-title">वैशिष्ट्यीकृत प्रोफाइल्स</h2>
        <div className="pm-featured-grid">
          <div className="pm-profile-card pm-card-hover">
            <div className="pm-profile-img">👩</div>
            <h3 className="pm-profile-name">प्रिया एस.</h3>
            <p className="pm-profile-desc">२५ वर्षे, सॉफ्टवेअर इंजिनीअर</p>
            <p className="pm-profile-location">मुंबई, महाराष्ट्र</p>
          </div>
          <div className="pm-profile-card pm-card-hover">
            <div className="pm-profile-img">👨</div>
            <h3 className="pm-profile-name">राहुल एम.</h3>
            <p className="pm-profile-desc">२८ वर्षे, डॉक्टर</p>
            <p className="pm-profile-location">दिल्ली, भारत</p>
          </div>
          <div className="pm-profile-card pm-card-hover">
            <div className="pm-profile-img">👩</div>
            <h3 className="pm-profile-name">अंजली के.</h3>
            <p className="pm-profile-desc">२६ वर्षे, शिक्षक</p>
            <p className="pm-profile-location">बंगळुरू, कर्नाटक</p>
          </div>
          <div className="pm-profile-card pm-card-hover">
            <div className="pm-profile-img">👨</div>
            <h3 className="pm-profile-name">अर्जुन पी.</h3>
            <p className="pm-profile-desc">३० वर्षे, व्यवसाय मालक</p>
            <p className="pm-profile-location">चेन्नई, तमिळनाडू</p>
          </div>
        </div>
      </section>

      {/* 🔹 Info Section */}
      <section id="pm-info">
        <h2 className="pm-info-title">या मेळाव्यात</h2>
        <p className="pm-info-invite">
          जळगाव जिल्ह्यातील बंजारा समाज वधू-वर मेळावा <br />
          आयोजित करण्यात येत आहे. हा मेळावा संपूर्ण समाजातील युवक-युवतींना
          त्यांच्या जीवनसाथीच्या शोधात मदत करण्यासाठी आयोजित केला जात आहे.
        </p>
        <br />
        <ul className="pm-info-list">
          <li>वधू-वर वय १८ वर्षे आणि त्याहून अधिक ✅</li>
          <li>विवाहित होऊ इच्छिणारे युवक-युवती सहभागी होतील.</li>
          <li>समाजातील सदस्य एकमेकांना ओळखण्याची संधी मिळेल.</li>
          <li>
            वैयक्तिक माहिती, शिक्षण, व्यवसाय व आवडी-निवडी याबद्दल माहिती
            घेण्याची सोय.
          </li>
          <li>सामाजिक बंध मजबूत करण्यासाठी हा मेळावा महत्त्वाचा ठरेल.</li>
        </ul>
        <p className="pm-info-details">
          तारीख: [तारीख टाका] <br />
          ठिकाण: [ठिकाण टाका], जळगाव जिल्हा <br />
          संपर्क: [संपर्क क्रमांक टाका]
        </p>
        <p className="pm-info-invite">
          सर्व समाजातील युवक-युवतींना आणि त्यांच्या कुटुंबियांना या मेळाव्यात
          सहभागी होण्याचे आमंत्रण! आपल्या योग्य जोडीदाराशी भेटण्याची सुवर्णसंधी
          नक्कीच मिळेल.
        </p>
      </section>

      {/* Footer */}
      <footer id="pm-footer">
        <p className="pm-footer-copy">© २०२५ परफेक्ट मॅच. सर्व हक्क राखीव.</p>
        <div className="pm-footer-grid">
          <div>
            <h3 className="pm-footer-title">नितीन तुळशिराम जाधव</h3>
            <ul className="pm-footer-list">
              <li>📞 9049145319</li>
              <li>मुख्य आयोजक</li>
              <li>बंजारा युवा प्रीमियर लीग जळगाव</li>
            </ul>
          </div>
          <div>
            <h3 className="pm-footer-title">पंकज सुकलाल नाईक</h3>
            <ul className="pm-footer-list">
              <li>📞 7276028036</li>
              <li>वेबसाइट लेखक</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
