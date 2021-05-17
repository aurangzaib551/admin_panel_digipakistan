import React, { useState } from "react";
import firebase from "../../config/fbConfig";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CircularLoader from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  textfieldOutline: {
    borderColor: "#02a39b !important",
  },

  label: {
    color: "#02a39b !important",
  },
}));

const NoticationForm = () => {
  const [courseName, setCourseName] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // materialize css initialising
  const classes = useStyles();

  const handleClick = () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("Notifications")
      .add({
        name: notificationMessage,
        createdAt: new Date(),
        course: courseName,
      })
      .then(() => {
        setLoading(false);
        setCourseName("");
        setNotificationMessage("");
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="container mt-5">
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
        <MenuItem value="ASP.NET Web Applications">
          ASP.NET Web Applications
        </MenuItem>
        <MenuItem value="PHP Laravel">PHP Laravel</MenuItem>
        <MenuItem value="MERN Stack">MERN Stack</MenuItem>
        <MenuItem value="SQL Server Specialist">SQL Server Specialist</MenuItem>
        <MenuItem value="Oracle Database Administrator (OCP : 12C DBA)">
          Oracle Database Administrator (OCP : 12C DBA)
        </MenuItem>
        <MenuItem value="Android Apps Development">
          Android Apps Development
        </MenuItem>
        <MenuItem value="Kotlin Mobile Apps Development">
          Kotlin Mobile Apps Development
        </MenuItem>
        <MenuItem value="IOS Apps Development">IOS Apps Development</MenuItem>
        <MenuItem value="Xamarin Mobile Apps Development">
          Xamarin Mobile Apps Development
        </MenuItem>
        <MenuItem value="React Native Web &amp; Apps Development">
          React Native Web &amp; Apps Development
        </MenuItem>
        <MenuItem value="Game Development">Game Development</MenuItem>
        <MenuItem value="Cisco CCNA Networking">Cisco CCNA Networking</MenuItem>
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
        <MenuItem value="Google Cloud Engineer">Google Cloud Engineer</MenuItem>
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
        <MenuItem value="3D Maya Max Animation">3D Maya Max Animation</MenuItem>
        <MenuItem value="Video Editing">Video Editing</MenuItem>
        <MenuItem value="AutoCad">AutoCad</MenuItem>
        <MenuItem value="Microsoft Office 365">Microsoft Office 365</MenuItem>
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
        <MenuItem value="Internet of Things (IoT)">
          Internet of Things (IoT)
        </MenuItem>
        <MenuItem value="BlockChain Technology">BlockChain Technology</MenuItem>
        <MenuItem value="Full Stack Web Development">
          Full Stack Web Development (MCSA)
        </MenuItem>
      </TextField>

      <TextField
        id="msg"
        label="Notification Message"
        multiline
        rows={6}
        style={{ width: "100%", marginTop: 30 }}
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
        value={notificationMessage}
        onChange={(event) => setNotificationMessage(event.target.value)}
        variant="outlined"
      />

      <Button
        onClick={handleClick}
        className="outline mt-3"
        color="primary"
        fullWidth
        disabled={loading}
        variant="contained"
      >
        {loading && <CircularLoader className="loader me-2" />}
        {loading ? "Sending..." : "Send"}
      </Button>
    </div>
  );
};

export default NoticationForm;
