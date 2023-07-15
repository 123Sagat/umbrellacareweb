import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "./firebaseConfig";
import "./AvailablePage.css";

const ClickonuserreviewPage = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsSnapshot = await getDocs(collection(firestore, "doctors"));
        const doctorsData = doctorsSnapshot.docs.map((doc) => doc.data());
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsSnapshot = await getDocs(collection(firestore, "reviews"));
        const reviewsData = reviewsSnapshot.docs.map((doc) => doc.data());
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchDoctors();
    fetchReviews();
  }, []);

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  const handleAvailableDoctorsClick = () => {
    navigate("/available");
  };

  const handlePatientsRecordsClick = () => {
    navigate("/patient");
  };

  const handlePendingPatientsClick = () => {
    navigate("/pending");
  };

  const handleUserReviewsClick = () => {
    navigate("/user");
  };

  const handleClickdoctor = () => {
    navigate("/doctor");
  };

  return (
    <div className="container5">
      <h5>Hospital Administration Centre</h5>
      <div className="search-container">
        <input type="text" className="search-input" placeholder="Search" />
        <button
          className="search-button"
          aria-label="Search through site content"
        ></button>
      </div>

      <div className="deeper1"></div>
      <div className="button-container">
        <button
          className="button1"
          style={{ border: "none" }}
          onClick={handleHomeClick}
        >
          Home
        </button>
        <button
          className="button2"
          style={{ border: " 4px solid #FFB800" }}
          onClick={handleAvailableDoctorsClick}
        >
          Available Doctors
        </button>
        <button className="button3" onClick={handlePatientsRecordsClick}>
          Patients Records
        </button>
        <button className="button4" onClick={handlePendingPatientsClick}>
          Pending Patients
        </button>
        <button className="button5" onClick={handleUserReviewsClick}>
          User Reviews
        </button>
        <button className="button6" onClick={handleClickdoctor}>
          Doctor Records
        </button>
      </div>

      <div className="available">
        <br />
        <content1>User Reviews for Dr. SamplePokhrel</content1>
        <div className="review">
          <img src={"hx_4 1.png"} alt="Description of the image" />
          <span>sample pokhrel</span>
          <p>anesthesiology</p>
          <text>MBBS, FCPS, FICS (USA)</text>
          <text1>4.1</text1>
          <text2>3 Ratings</text2>
          <img
            className="image1"
            src={"Ellipse 66 (2).png"}
            alt="Description of the image"
          />
        </div>
        {reviews.map((review, index) => (
          <div className="review" key={index}>
            <div className="image-gallery">
              {Array(review.rating).fill(
                <img
                  src="Star 1.png"
                  alt={`Image ${index}`}
                  style={{
                    width: "20px",
                    height: "20px",
                    top: `${240 + index * 90}px`,
                    left: "1050px",
                  }}
                />
              )}
              {Array(5 - review.rating).fill(
                <img
                  src="Star 5.png"
                  alt={`Image ${index}`}
                  style={{
                    width: "20px",
                    height: "20px",
                    top: `${215 + index * 90}px`,
                    left: "1250px",
                  }}
                />
              )}
            </div>
            <p1>{review.user}</p1>
            <p>{review.date}</p>
            <div className={`border${index + 1}`}></div>
          </div>
        ))}
        <div className="doctor-list">
          <h2>Available Doctors</h2>
          {doctors.map((doctor, index) => (
            <div key={index}>
              <h3>{doctor.name}</h3>
              <p>Specialization: {doctor.specialization}</p>
              <p>Qualification: {doctor.qualification}</p>
              <p>Rating: {doctor.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClickonuserreviewPage;
