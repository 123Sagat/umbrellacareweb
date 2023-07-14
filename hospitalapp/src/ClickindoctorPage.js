import React, { useState, useEffect } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import moment from "moment";
import { collection, addDoc, serverTimestamp, getDoc, getDocs, doc, where } from "firebase/firestore";
import { firestore } from "./firebase";
import "./UserPage.css";

const ClickinDoctorPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const doctorId= params.get('a');
console.log(doctorId);
  const navigate = useNavigate();
  //const { doctorId } = useParams();
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointmentTimes, setAppointmentTimes] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(false);
  const [ConfirmButtonColor, setConfirmButtonColor] = useState("#ffffff");
  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    specialization: "",
    qualification: "",
  });

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

  const handleButtonClick = () => {
    setConfirmButtonColor("#ffffff");
    setSelectedButtons(["33", "34", "37", "38", "39", "40"]);

    if (!selectedDate || selectedButtons.length === 0 || patientName.trim() === "") {
      console.log("No date, time, or patient name selected");
      return;
    }

    const doctorName = doctorInfo?.name;
    const appointmentTime = selectedButtons[0]; // Assuming only one time slot can be selected

    setSelectedButtons(["33", "34", "37", "38", "39", "40"]);

    (async () => {
      try {
        await handleBooking(doctorName, appointmentTime, patientName);
        console.log("Booking successfully saved!");
        setConfirmButtonDisabled(true);
      } catch (error) {
        console.error("Error saving booking:", error);
      }
    })();
  };

  const handleBooking = async (doctorName, appointmentTime, patientName) => {
    if (!selectedDate) {
      console.error("No selected date");
      return;
    }

    const bookingData = {
      doctor: doctorName,
      date: selectedDate,
      time: appointmentTime,
      patient: patientName,
    };

    try {
      const docRef = await addDoc(collection(firestore, "test"), bookingData);
      console.log("Document ID:", docRef.id);
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };
 

  //fetch doctorinfo from firebase
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        console.log(doctorId+ '/////////////////');
        const docRef = doc(firestore, "doctors", doctorId); // Replace "test" with the actual collection name
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDoctorInfo(data);
        } else {
          console.log("Doctor document does not exist");
        }
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchDoctorInfo();
  }, [doctorId]);




  useEffect(() => {
    const fetchAppointmentTimes = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "appointmentTimes"), where("doctorId", "==", doctorId));
        const newAppointmentTimes = querySnapshot.docs.map((doc) => {
          const appointmentData = doc.data();
          const time = appointmentData?.time;
          const date = appointmentData?.date?.toDate();
          const formattedDate = date ? moment(date).format("YYYY-MM-DD") : "";
          return {
            id: doc.id,
            time,
            date: formattedDate,
          };
        });
        setAppointmentTimes(newAppointmentTimes);
      } catch (error) {
        console.error("Error fetching appointment times:", error);
      }
    };

    fetchAppointmentTimes();
  }, [doctorId]);

  const handleButtonSelection = (time) => {
    setSelectedButtons((prevButtons) => {
      if (prevButtons.includes(time)) {
        // Deselect the button
        return prevButtons.filter((btn) => btn !== time);
      } else {
        // Select the button
        return [...prevButtons, time];
      }
    });
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1);
      return newMonth;
    });
  };

  const renderCalendarDays = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

    const days = [];

    for (let i = 0; i < daysOfWeek.length; i++) {
      days.push(
        <div key={i} className="day">
          {daysOfWeek[i]}
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isCurrentDay = currentDate.toDateString() === new Date().toDateString();
      const isSelectedDay = selectedDate && currentDate.toDateString() === selectedDate.toDateString();
      const dayClass = isCurrentDay ? "day current-day" : "day";
      const selectedClass = isSelectedDay ? "selected" : "white";

      days.push(
        <div
          key={i + daysOfWeek.length}
          className={`${dayClass} ${selectedClass}`}
          onClick={() => handleDayClick(currentDate)}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="container5">
      <h5>Hospital Administration Centre</h5>
      <div className="search-container">
        <input type="text" className="search-input" placeholder="Search" />
        <button className="search-button" aria-label="Search through site content"></button>
      </div>

      <div className="deeper1"></div>
      <div className="button-container">
        <button className="button1" style={{ border: "none" }} onClick={handleHomeClick}>
          Home
        </button>
        <button className="button2" style={{ border: " 4px solid #FFB800" }} onClick={handleAvailableDoctorsClick}>
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
        <div className="Appointment">
          <text
            style={{
              color: "#7D32AC",
              margin: 30,
              width: "208px",
              height: "25px",
              top: "10px",
              left: "470px",
              fontFamily: "M PLUS 1",
              fontSize: "20px",
              fontWeight: "550",
              lineHeight: "20px",
              letterSpacing: "0em",
            }}
          >
            Appointment Schedule
          </text>
          <input
            style={{
              position: "absolute",
              color: "blue",
              backgroundColor: "whitesmoke",
              border: "yellow",
              left: "calc(100% - 700px)",
              top: "70px",
            }}
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
          <img src={"hx_4 1.png"} alt="Description of the image" />
          <span>{doctorInfo?.name}</span>
          <p style={{ top: "500px" }}>{doctorInfo?.specialization}</p>
          <div style={{ top: "550px", position: "absolute", color: "#FFB800" }}>
            {doctorInfo?.qualification}
          </div>
          <div className="button-container1"></div>
          <div className="container6">
            <div className="calendar">
              <div className="calendar-header">
                <button className="prev-button" onClick={handlePreviousMonth}>
                  {"<"}
                </button>
                <div className="month-year">
                  {currentMonth.toLocaleString("en-US", { month: "long", year: "numeric" })}
                </div>
                <button className="next-button" onClick={handleNextMonth}>
                  {">"}
                </button>
              </div>
              <div className="days">{renderCalendarDays()}</div>
              <div
                className="grid-container"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)", // Adjust the number of columns as needed
                  gap: "20px",
                }}
              >
                {appointmentTimes.map((appointment) => (
                  <div key={appointment.id}>
                    <p>Time: {appointment?.time}</p>
                    <p>Date: {appointment?.date}</p>
                  </div>
                ))}
                <button
                  className={`button33${selectedButtons.includes("9") ? " selected" : ""}`}
                  onClick={() => handleButtonSelection("9")}
                >
                  9:00 AM
                </button>
                <button
                  className={`button34${selectedButtons.includes("10") ? " selected" : ""}`}
                  onClick={() => handleButtonSelection("10")}
                >
                  10:00 AM
                </button>
                <button
                  className={`button35${selectedButtons.includes("11") ? " selected" : ""}`}
                  onClick={() => handleButtonSelection("11")}
                >
                  11:00 AM
                </button>
                <button
                  className={`button36 ${selectedButtons.includes("12") ? "selected" : ""}`}
                  onClick={() => handleButtonSelection("12")}
                >
                  12:00 PM
                </button>
                <button
                  className={`button37 ${selectedButtons.includes("13") ? "selected" : ""}`}
                  onClick={() => handleButtonSelection("13")}
                >
                  13:00 PM
                </button>
                <button
                  className={`button38${selectedButtons.includes("14") ? " selected" : ""}`}
                  onClick={() => handleButtonSelection("14")}
                >
                  14:00 PM
                </button>
                <button
                  className={`button39${selectedButtons.includes("15") ? " selected" : ""}`}
                  onClick={() => handleButtonSelection("15")}
                >
                  15:00 PM
                </button>
                <button
                  className={`button40${selectedButtons.includes("16") ? " selected" : ""}`}
                  onClick={() => handleButtonSelection("16")}
                >
                  16:00 PM
                </button>
                <button
                  className="button41"
                  style={{
                    backgroundColor: ConfirmButtonColor,
                    color: "black",
                    fontFamily: "M PLUS 1",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "23px",
                    letterSpacing: "0em",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onClick={handleButtonClick}
                  disabled={confirmButtonDisabled}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClickinDoctorPage;
