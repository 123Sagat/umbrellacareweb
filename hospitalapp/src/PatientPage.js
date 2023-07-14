import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase"; // Assuming you have initialized the Firestore instance as "firestore"
import "./UserPage.css";

const PatientPage = () => {
  const navigate = useNavigate();
  const [patientRecords, setPatientRecords] = useState([]);

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

  useEffect(() => {
    const fetchPatientRecords = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "patients"));
        const patientsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatientRecords(patientsData);
      } catch (error) {
        console.error("Error fetching patient records:", error);
      }
    };

    fetchPatientRecords();
  }, []);

  return (
    <div className="container5">
      <h5>Hospital Administration Centre</h5>
      <div className="search-container">
        <input type="text" className="search-input" placeholder="Search..." />
        <button className="search-button"></button>
      </div>

      <div className="deeper1"></div>
      <div className="button-container">
        <button
          className="button1"
          style={{ border: " none " }}
          onClick={handleHomeClick}
        >
          Home
        </button>
        <button className="button2" onClick={handleAvailableDoctorsClick}>
          Available Doctors
        </button>
        <button
          className="button3"
          style={{ border: " 4px solid #FFB800" }}
          onClick={handlePatientsRecordsClick}
        >
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
      <div className="pending">
        <text9 style={{ marginLeft: "100px", Top: "200px" }}>
          Total Patients<b>{patientRecords.length}</b>
        </text9>
        <div className="pending1">
          <h7 style={{ left: "80px" }}>Patient ID</h7>
          <h8 style={{ left: "280px" }}>Patient Name</h8>
          <h9 style={{ left: "510px" }}>Department</h9>
          <h10 style={{ left: "750px" }}>AssignedDoctor</h10>
          <h11 style={{ left: "990px" }}>AppointmentTime&Date</h11>

          <table>
            <thead>
              <tr>
                <th style={{ color: "black" }}>Patient ID</th>
                <th style={{ color: "black" }}>Patient Name</th>
                <th style={{ color: "black" }}>View Report</th>
                <th style={{ color: "black" }}>Assigned Doctor</th>
                <th style={{ color: "black" }}>Diagnosis Status</th>
              </tr>
            </thead>
            <tbody>
              {patientRecords.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>
                    <Link to={`/viewreport/${patient.id}`}>View Report</Link>
                  </td>
                  <td>{patient.assignedDoctor}</td>
                  <td>{patient.diagnosisStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientPage;