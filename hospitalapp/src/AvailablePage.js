import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getDocs, collection,doc } from "firebase/firestore";
import { firestore } from "./firebaseConfig";
import "./AvailablePage.css";

const AvailablePage = () => {
  const navigate = useNavigate();

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

  const [doctors, setDoctors] = useState([]);
  const fetchDoctors = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "doctors"));
      const doctorData = querySnapshot.docs.map((doc) => ({
        id:doc.id,
        ...doc.data()
        //console.log(id+"cool nitu")
      }));
      //console.log(doc.id+ "cool nitu");
      setDoctors(doctorData);

    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  
  useEffect(() => {
    fetchDoctors();
  }, []);
  
  return (
    <div className='container5'>
      <h5>Hospital Administration Centre</h5>
      <div className='search-container'>
        <input type='text' className='search-input' placeholder='Search' />
        <button className='search-button' aria-label='Search through site content'></button>
      </div>

      <div className='deeper1'></div>
      <div className='button-container'>
        <button
          className='button1'
          style={{ border: "none" }}
          onClick={handleHomeClick}
        >
          Home
        </button>
        <button
          className='button2'
          style={{ border: " 4px solid #FFB800" }}
          onClick={handleAvailableDoctorsClick}
        >
          Available Doctors
        </button>
        <button className='button3' onClick={handlePatientsRecordsClick}>
          Patients Records
        </button>
        <button className='button4' onClick={handlePendingPatientsClick}>
          Pending Patients
        </button>
        <button className='button5' onClick={handleUserReviewsClick}>
          User Reviews
        </button>
        <button className='button6' onClick={handleClickdoctor}>
          Doctor Records
        </button>
      </div>

      <div className='available'>
        <br />
        <text5>
          AvailableDoctor<b>{doctors.length}</b>
        </text5>
        <div className='scrollable-div'>
          {doctors.map((doctor, index) => (
            <div className='doctor-card' key={index}>
              <img src={"hx_4 1.png"} alt='Description of the image' />
              <span>{doctor.name}</span>
              <p>{doctor.specialization}</p>
              <text>{doctor.qualification}</text>
              <text1>{doctor.rating}</text1>
              <Link to={`/click?a=${doctor.id}`} style={{ top: "190px", left: "295px" }} className='link'>
                sun-fri
              </Link>
              <Link to='/click' className='link'>
                10:00 am to 1:00 pm
              </Link>
              <img
                className='image1'
                src={"Star 1.png"}
                alt='Description of the image'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailablePage;
