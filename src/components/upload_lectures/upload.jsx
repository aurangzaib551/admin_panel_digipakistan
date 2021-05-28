import React, { useState, useLayoutEffect } from "react";
import { Button, makeStyles, MenuItem, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import {
  clearAll,
  updateLecture,
  uploadLecture,
} from "../../store/actions/lecturesActions";
import firebase from "../../config/fbConfig";

const useStyles = makeStyles(() => ({
  textfieldOutline: {
    borderColor: "#02a39b !important",
  },

  label: {
    color: "#02a39b !important",
  },
}));

const Upload = (props) => {
  // state
  const [courseName, setCourseName] = useState("");
  const [notification, setNotification] = useState("");
  const [categoryOfLecture, setCategoryOfLecture] = useState("");
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [existingTopics, setExistingTopics] = useState([]);

  // materialize css initialising
  const classes = useStyles();

  const handleUpdate = (event) => {
    event.preventDefault();

    if (courseName && topic) {
      // getting all watch array
      firebase
        .firestore()
        .collection(courseName)
        .doc(topic)
        .get()
        .then((doc) => {
          const watch = [];
          // setting new and previous data in watch array
          watch.push(...doc.data().watch, {
            subTopic,
            video: videoURL,
          });
          // updating the lecture
          props.updateLecture(watch, courseName, topic, notification);
        });
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    // uploading new lecture
    props.uploadLecture(courseName, topic, subTopic, videoURL, notification);
  };

  if (props.lectureUploaded) {
    setTimeout(() => {
      setCourseName("");
      setCategoryOfLecture("");
      setTopic("");
      setSubTopic("");
      setVideoURL("");
      setNotification("");
      props.clearAll();
      // window.location.reload();
    }, 1500);
  }

  const id = sessionStorage.getItem("auth");

  useLayoutEffect(() => {
    if (categoryOfLecture === "New") {
      setTopic("");
    }

    if (categoryOfLecture === "Existing") {
      if (courseName.trim() === "") {
        alert("Course name shouldn't be empty");
        setCategoryOfLecture("");
        return;
      } else if (courseName) {
        firebase
          .firestore()
          .collection(courseName)
          .onSnapshot((querySnapshot) => {
            const existingData = [];
            querySnapshot.forEach((doc) => {
              existingData.push({ topic: doc.id });
            });
            setExistingTopics(existingData);
          });
      }
    }
  }, [id, categoryOfLecture]);

  return (
    <React.Fragment>
      <div className="container my-5 px-md-0">
        <div className="upload-lectures rounded d-flex flex-column align-items-center">
          <h1 className="display-4 text-center font-weight-bold title">
            Upload Lecture
          </h1>

          <TextField
            style={{ width: "100%" }}
            InputProps={{
              classes: {
                notchedOutline: classes.textfieldOutline,
                focused: classes.textfieldOutline,
              },
            }}
            InputLabelProps={{
              classes: {
                focused: classes.label,
              },
            }}
            fullWidth
            value={courseName}
            onChange={(event) => setCourseName(event.target.value)}
            id="course name"
            select
            label="Select Course Name"
            variant="outlined"
          >
            <MenuItem value="CompTIA It Fundamentals">
              CompTIA It Fundamentals
            </MenuItem>
            <MenuItem value="Microsoft Front End Development">
              Microsoft Front End Development
            </MenuItem>
            <MenuItem value="ASPNET Web Applications">
              ASP.NET Web Applications
            </MenuItem>
            <MenuItem value="PHP Laravel">PHP Laravel</MenuItem>
            <MenuItem value="MERN Stack">MERN Stack</MenuItem>
            <MenuItem value="SQL Server Specialist">
              SQL Server Specialist
            </MenuItem>
            <MenuItem value="Oracle Database Administrator">
              Oracle Database Administrator (OCP : 12C DBA)
            </MenuItem>
            <MenuItem value="Android Apps Development">
              Android Apps Development
            </MenuItem>
            <MenuItem value="Kotlin Mobile Apps Development">
              Kotlin Mobile Apps Development
            </MenuItem>
            <MenuItem value="IOS Apps Development">
              IOS Apps Development
            </MenuItem>
            <MenuItem value="Xamarin Mobile Apps Development">
              Xamarin Mobile Apps Development
            </MenuItem>
            <MenuItem value="React Native Web and Apps Development">
              React Native Web &amp; Apps Development
            </MenuItem>
            <MenuItem value="Game Development">Game Development</MenuItem>
            <MenuItem value="Cisco CCNA Networking">
              Cisco CCNA Networking
            </MenuItem>
            <MenuItem value="CompTIA Security">
              CompTIA Security + (SYO - 601)
            </MenuItem>
            <MenuItem value="Certified Ethical Hacking">
              Certified Ethical Hacking
            </MenuItem>
            <MenuItem value="Certified Hacking Forensic Investigator">
              Certified Hacking Forensic Investigator
            </MenuItem>
            <MenuItem value="Penetration Testing Security Analyst">
              Penetration Testing Security Analyst
            </MenuItem>
            <MenuItem value="Certified Information System Auditor">
              Certified Information System Auditor
            </MenuItem>
            <MenuItem value="Certified Information Security Manager">
              Certified Information Security Manager
            </MenuItem>
            <MenuItem value="AWS Practitioner">AWS Practitioner</MenuItem>
            <MenuItem value="AWS Solution Architect">
              AWS Solution Architect
            </MenuItem>
            <MenuItem value="AWS SysOps Administrator">
              AWS SysOps Administrator
            </MenuItem>
            <MenuItem value="AWS Developer Associate">
              AWS Developer Associate
            </MenuItem>
            <MenuItem value="Microsoft Azure Cloud Fundamentals">
              Microsoft Azure Cloud Fundamentals
            </MenuItem>
            <MenuItem value="Microsoft Cloud Administrator">
              Microsoft Cloud Administrator 103 - 104
            </MenuItem>
            <MenuItem value="Google Cloud Engineer">
              Google Cloud Engineer
            </MenuItem>
            <MenuItem value="Python For Everyone">Python for Everyone</MenuItem>
            <MenuItem value="Machine Learning and AI">
              Machine Learning &amp; AI
            </MenuItem>
            <MenuItem value="Data Science">Data Science</MenuItem>
            <MenuItem value="Big Data and Headoop Ecosystem">
              Big Data &amp; Headoop Ecosystem
            </MenuItem>
            <MenuItem value="QuickBooks ERP">QuickBooks ERP</MenuItem>
            <MenuItem value="SAP ERP">SAP ERP</MenuItem>
            <MenuItem value="Project Management Professional">
              Project Management Professional (PMP)
            </MenuItem>
            <MenuItem value="Amazon FBA Business">Amazon FBA Business</MenuItem>
            <MenuItem value="Search Engine Optimization">
              Search Engine Optimization (SEO)
            </MenuItem>
            <MenuItem value="Digital Marketing">Digital Marketing</MenuItem>
            <MenuItem value="Social Media Marketing">
              Social Media Marketing
            </MenuItem>
            <MenuItem value="Graphics Design">Graphic Design</MenuItem>
            <MenuItem value="UIUX Design">UI / UX Design</MenuItem>
            <MenuItem value="Interior Design">Interior Design</MenuItem>
            <MenuItem value="3D Maya Max Animation">
              3D Maya Max Animation
            </MenuItem>
            <MenuItem value="Video Editing">Video Editing</MenuItem>
            <MenuItem value="AutoCad">AutoCad</MenuItem>
            <MenuItem value="Microsoft Office 365">
              Microsoft Office 365
            </MenuItem>
            <MenuItem value="Enterpreneurship">Enterpreneurship</MenuItem>
            <MenuItem value="Digital Forensic Cyber Security">
              Digital Forensic Cyber Security
            </MenuItem>
            <MenuItem value="Penetration Testing Cyber Security">
              Penetration Testing Cyber Security
            </MenuItem>
            <MenuItem value="CISSP Cyber Security Professional">
              CISSP Cyber Security Professional
            </MenuItem>
            <MenuItem value="Artificial Intelligence">
              Artificial Intelligence
            </MenuItem>
            <MenuItem value="AWS Cloud Computing">AWS Cloud Computing</MenuItem>
            <MenuItem value="Internet of Things">
              Internet of Things (IoT)
            </MenuItem>
            <MenuItem value="BlockChain Technology">
              BlockChain Technology
            </MenuItem>
            <MenuItem value="Full Stack Web Development">
              Full Stack Web Development (MCSA)
            </MenuItem>
          </TextField>

          <TextField
            style={{ width: "100%", marginTop: 20 }}
            InputProps={{
              classes: {
                notchedOutline: classes.textfieldOutline,
                focused: classes.textfieldOutline,
              },
            }}
            InputLabelProps={{
              classes: {
                focused: classes.label,
              },
            }}
            fullWidth
            value={notification}
            onChange={(event) => setNotification(event.target.value)}
            id="notification"
            select
            label="Select Notification Category"
            variant="outlined"
          >
            <MenuItem value="CompTIA It Fundamentals">
              CompTIA It Fundamentals
            </MenuItem>
            <MenuItem value="Microsoft Front End Development">
              Microsoft Front End Development
            </MenuItem>
            <MenuItem value="ASP.NET Web Applications">
              ASP.NET Web Applications
            </MenuItem>
            <MenuItem value="PHP Laravel">PHP Laravel</MenuItem>
            <MenuItem value="MERN Stack">MERN Stack</MenuItem>
            <MenuItem value="SQL Server Specialist">
              SQL Server Specialist
            </MenuItem>
            <MenuItem value="Oracle Database Administrator (OCP : 12C DBA)">
              Oracle Database Administrator (OCP : 12C DBA)
            </MenuItem>
            <MenuItem value="Android Apps Development">
              Android Apps Development
            </MenuItem>
            <MenuItem value="Kotlin Mobile Apps Development">
              Kotlin Mobile Apps Development
            </MenuItem>
            <MenuItem value="IOS Apps Development">
              IOS Apps Development
            </MenuItem>
            <MenuItem value="Xamarin Mobile Apps Development">
              Xamarin Mobile Apps Development
            </MenuItem>
            <MenuItem value="React Native Web &amp; Apps Development">
              React Native Web &amp; Apps Development
            </MenuItem>
            <MenuItem value="Game Development">Game Development</MenuItem>
            <MenuItem value="Cisco CCNA Networking">
              Cisco CCNA Networking
            </MenuItem>
            <MenuItem value="CompTIA Security + (SYO - 601)">
              CompTIA Security + (SYO - 601)
            </MenuItem>
            <MenuItem value="Certified Ethical Hacking">
              Certified Ethical Hacking
            </MenuItem>
            <MenuItem value="Certified Hacking Forensic Investigator">
              Certified Hacking Forensic Investigator
            </MenuItem>
            <MenuItem value="Penetration Testing Security Analyst">
              Penetration Testing Security Analyst
            </MenuItem>
            <MenuItem value="Certified Information System Auditor">
              Certified Information System Auditor
            </MenuItem>
            <MenuItem value="Certified Information Security Manager">
              Certified Information Security Manager
            </MenuItem>
            <MenuItem value="AWS Practitioner">AWS Practitioner</MenuItem>
            <MenuItem value="AWS Solution Architect">
              AWS Solution Architect
            </MenuItem>
            <MenuItem value="AWS SysOps Administrator">
              AWS SysOps Administrator
            </MenuItem>
            <MenuItem value="AWS Developer Associate">
              AWS Developer Associate
            </MenuItem>
            <MenuItem value="Microsoft Azure Cloud Fundamentals">
              Microsoft Azure Cloud Fundamentals
            </MenuItem>
            <MenuItem value="Microsoft Cloud Administrator 103 - 104">
              Microsoft Cloud Administrator 103 - 104
            </MenuItem>
            <MenuItem value="Google Cloud Engineer">
              Google Cloud Engineer
            </MenuItem>
            <MenuItem value="Python For Everyone">Python for Everyone</MenuItem>
            <MenuItem value="Machine Learning &amp; AI">
              Machine Learning &amp; AI
            </MenuItem>
            <MenuItem value="Data Science">Data Science</MenuItem>
            <MenuItem value="Big Data &amp; Headoop Ecosystem">
              Big Data &amp; Headoop Ecosystem
            </MenuItem>
            <MenuItem value="QuickBooks ERP">QuickBooks ERP</MenuItem>
            <MenuItem value="SAP ERP">SAP ERP</MenuItem>
            <MenuItem value="Project Management Professional (PMP)">
              Project Management Professional (PMP)
            </MenuItem>
            <MenuItem value="Amazon FBA Business">Amazon FBA Business</MenuItem>
            <MenuItem value="Search Engine Optimization (SEO)">
              Search Engine Optimization (SEO)
            </MenuItem>
            <MenuItem value="Digital Marketing">Digital Marketing</MenuItem>
            <MenuItem value="Social Media Marketing">
              Social Media Marketing
            </MenuItem>
            <MenuItem value="Graphics Design">Graphic Design</MenuItem>
            <MenuItem value="UI / UX Design">UI / UX Design</MenuItem>
            <MenuItem value="Interior Design">Interior Design</MenuItem>
            <MenuItem value="3D Maya Max Animation">
              3D Maya Max Animation
            </MenuItem>
            <MenuItem value="Video Editing">Video Editing</MenuItem>
            <MenuItem value="AutoCad">AutoCad</MenuItem>
            <MenuItem value="Microsoft Office 365">
              Microsoft Office 365
            </MenuItem>
            <MenuItem value="Enterpreneurship">Enterpreneurship</MenuItem>
            <MenuItem value="Digital Forensic Cyber Security">
              Digital Forensic Cyber Security
            </MenuItem>
            <MenuItem value="Penetration Testing Cyber Security">
              Penetration Testing Cyber Security
            </MenuItem>
            <MenuItem value="CISSP Cyber Security Professional">
              CISSP Cyber Security Professional
            </MenuItem>
            <MenuItem value="Artificial Intelligence">
              Artificial Intelligence
            </MenuItem>
            <MenuItem value="AWS Cloud Computing">AWS Cloud Computing</MenuItem>
            <MenuItem value="Internet of Things">
              Internet of Things (IoT)
            </MenuItem>
            <MenuItem value="BlockChain Technology">
              BlockChain Technology
            </MenuItem>
            <MenuItem value="Full Stack Web Development">
              Full Stack Web Development (MCSA)
            </MenuItem>
          </TextField>

          <TextField
            style={{ width: "100%", marginTop: 20 }}
            InputProps={{
              classes: {
                notchedOutline: classes.textfieldOutline,
                focused: classes.textfieldOutline,
              },
            }}
            InputLabelProps={{
              classes: {
                focused: classes.label,
              },
            }}
            fullWidth
            id="category of lecture"
            value={categoryOfLecture}
            onChange={(event) => setCategoryOfLecture(event.target.value)}
            select
            label="Select Category of Lecture"
            variant="outlined"
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Existing">Existing</MenuItem>
          </TextField>

          {categoryOfLecture === "New" && (
            <TextField
              style={{ width: "100%", marginTop: 20 }}
              InputProps={{
                classes: {
                  notchedOutline: classes.textfieldOutline,
                  focused: classes.textfieldOutline,
                },
              }}
              InputLabelProps={{
                classes: {
                  focused: classes.label,
                },
              }}
              fullWidth
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              id="topic name"
              label="Topic Name"
              variant="outlined"
            />
          )}

          {categoryOfLecture === "Existing" && (
            <TextField
              style={{ width: "100%", marginTop: 20 }}
              InputProps={{
                classes: {
                  notchedOutline: classes.textfieldOutline,
                  focused: classes.textfieldOutline,
                },
              }}
              InputLabelProps={{
                classes: {
                  focused: classes.label,
                },
              }}
              fullWidth
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              id="topic nam 2"
              label="Topic Name"
              select
              variant="outlined"
            >
              {existingTopics[0] ? (
                existingTopics.map((val, ind) => (
                  <MenuItem key={ind} value={val.topic}>
                    {val.topic ? val.topic : "loading..."}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  No Data, Choose &nbsp;<strong>New</strong>&nbsp; option
                  instead of &nbsp;<strong>Existing</strong>&nbsp;
                </MenuItem>
              )}
            </TextField>
          )}

          <TextField
            style={{ width: "100%", marginTop: 20 }}
            InputProps={{
              classes: {
                notchedOutline: classes.textfieldOutline,
                focused: classes.textfieldOutline,
              },
            }}
            InputLabelProps={{
              classes: {
                focused: classes.label,
              },
            }}
            fullWidth
            value={subTopic}
            onChange={(event) => setSubTopic(event.target.value)}
            id="sub topic"
            label="Sub Topic Name"
            variant="outlined"
          />

          <TextField
            style={{ width: "100%", marginTop: 20 }}
            InputProps={{
              classes: {
                notchedOutline: classes.textfieldOutline,
                focused: classes.textfieldOutline,
              },
            }}
            InputLabelProps={{
              classes: {
                focused: classes.label,
              },
            }}
            fullWidth
            value={videoURL}
            onChange={(event) => setVideoURL(event.target.value)}
            id="video url"
            label="Video URL"
            variant="outlined"
          />

          {/* Success msg  */}
          {props.lectureUploaded && (
            <p className="mb-0 p-3 mt-3 bg-success text-white rounded font-weight-bold">
              {props.lectureUploaded}
            </p>
          )}

          {categoryOfLecture === "New" && (
            <Button
              onClick={handleClick}
              className="outline mt-3"
              color="primary"
              fullWidth
              variant="contained"
            >
              Upload
            </Button>
          )}

          {categoryOfLecture === "Existing" && (
            <Button
              onClick={handleUpdate}
              className="outline mt-3"
              color="primary"
              fullWidth
              variant="contained"
            >
              Add In Existing Topic
            </Button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    lectureUploaded: state.lectures.lectureUploaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadLecture: (collection, topic, subTopic, video, notification) =>
      dispatch(uploadLecture(collection, topic, subTopic, video, notification)),
    updateLecture: (watchData, collection, topic, notification) =>
      dispatch(updateLecture(watchData, collection, topic, notification)),
    clearAll: () => dispatch(clearAll()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
