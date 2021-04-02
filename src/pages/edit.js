import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Loader from "../loader/loader";
import Button from "@material-ui/core/Button";
import firebase from "../config/fbConfig";
import CircularProgress from "@material-ui/core/CircularProgress";

class Edit extends Component {
  state = {
    editData: "",
    firstCourseTitle: "",
    firstCourseName: "",
    firstCourseLink: "",
    firstCourseStatus: false,
    secondCourseTitle: "",
    secondCourseName: "",
    secondCourseLink: "",
    secondCourseStatus: false,
    thirdCourseTitle: "",
    thirdCourseName: "",
    thirdCourseLink: "",
    thirdCourseStatus: false,
    loading: false,
    update: false,
  };

  handleChange = (e) => {
    this.setState({
      editData: {
        ...this.state.editData,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleAnotherChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLMS = (e) => {
    if (e.target.value === "true") {
      this.setState({
        editData: {
          ...this.state.editData,
          lms: true,
        },
      });
    } else if (e.target.value === "false") {
      this.setState({
        editData: {
          ...this.state.editData,
          lms: false,
        },
      });
    }
  };

  handleAnotherLMS = (e) => {
    if (e.target.name === "firstCourseStatus") {
      if (e.target.value === "true") {
        this.setState({
          firstCourseStatus: true,
        });
      } else if (e.target.value === "false") {
        this.setState({
          firstCourseStatus: false,
        });
      }
    } else if (e.target.name === "secondCourseStatus") {
      if (e.target.value === "true") {
        this.setState({
          secondCourseStatus: true,
        });
      } else if (e.target.value === "false") {
        this.setState({
          secondCourseStatus: false,
        });
      }
    } else if (e.target.name === "thirdCourseStatus") {
      if (e.target.value === "true") {
        this.setState({
          thirdCourseStatus: true,
        });
      } else if (e.target.value === "false") {
        this.setState({
          thirdCourseStatus: false,
        });
      }
    }
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.match.params.id)
      .get()
      .then((data) => {
        if (data.exists) {
          this.setState({
            loading: true,
            editData: data.data(),
            firstCourseTitle: data.data().course[0]
              ? data.data().course[0]["First Course Title"]
              : "",
            firstCourseName: data.data().course[0]
              ? data.data().course[0]["First Course Name"].name
              : "",
            firstCourseStatus: data.data().course[0]
              ? data.data().course[0]["First Course Name"].status
              : false,
            firstCourseLink: data.data().course[0]
              ? data.data().course[0]["First Course Name"].link
              : "",
            secondCourseTitle: data.data().course[1]
              ? data.data().course[1]["Second Course Title"]
              : "",
            secondCourseName: data.data().course[1]
              ? data.data().course[1]["Second Course Name"].name
              : "",
            secondCourseStatus: data.data().course[1]
              ? data.data().course[1]["Second Course Name"].status
              : false,
            secondCourseLink: data.data().course[1]
              ? data.data().course[1]["Second Course Name"].link
              : "",
            thirdCourseTitle: data.data().course[2]
              ? data.data().course[2]["Third Course Title"]
              : "",
            thirdCourseName: data.data().course[2]
              ? data.data().course[2]["Third Course Name"].name
              : "",
            thirdCourseStatus: data.data().course[2]
              ? data.data().course[2]["Third Course Name"].status
              : false,
            thirdCourseLink: data.data().course[2]
              ? data.data().course[2]["Third Course Name"].link
              : "",
          });
        }
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let course = [];

    const first = {
      "First Course Title": this.state.firstCourseTitle,
      "First Course Name": {
        link: this.state.firstCourseLink,
        name: this.state.firstCourseName,
        status: this.state.firstCourseStatus,
      },
    };

    const second = {
      "Second Course Title": this.state.secondCourseTitle,
      "Second Course Name": {
        link: this.state.secondCourseLink,
        name: this.state.secondCourseName,
        status: this.state.secondCourseStatus,
      },
    };

    const third = {
      "Third Course Title": this.state.thirdCourseTitle,
      "Third Course Name": {
        link: this.state.thirdCourseLink,
        name: this.state.thirdCourseName,
        status: this.state.thirdCourseStatus,
      },
    };

    if (this.state.firstCourseTitle) {
      course.push(first);
    }

    if (this.state.secondCourseTitle) {
      course.push(second);
    }

    if (this.state.thirdCourseTitle) {
      course.push(third);
    }

    this.setState({
      editData: {
        ...this.state.editData,
        course,
      },
    });

    this.setState({ update: true });
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.match.params.id)
      .update({
        fullName: this.state.editData.fullName,
        rollNumber: this.state.editData.rollNumber,
        course: course ? course : [],
        fatherName: this.state.editData.fatherName
          ? this.state.editData.fatherName
          : "",
        lms: this.state.editData.lms ? this.state.editData.lms : false,
      })
      .then(() => {
        this.setState({ update: false });
      });
  };

  handleFirstCourseTitle = (event) => {
    this.setState({
      firstCourseTitle: event.target.value,
      firstCourseName: "",
      firstCourseLink: "",
    });
  };

  handleSecondCourseTitle = (event) => {
    this.setState({
      secondCourseTitle: event.target.value,
      secondCourseName: "",
      secondCourseLink: "",
    });
  };

  handleThirdCourseTitle = (event) => {
    this.setState({
      thirdCourseTitle: event.target.value,
      thirdCourseName: "",
      thirdCourseLink: "",
    });
  };

  handleFirstCourseName = ({ target }) => {
    const { value } = target;

    if (value === "Microsoft Front End Development") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/frontEndLMS",
        firstCourseName: value,
      });
    } else if (value === "Data Science") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/dataScienceLMS",
        firstCourseName: value,
      });
    } else if (value === "ASP.NET Web Applications") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/aspDotNetLMS",
        firstCourseName: value,
      });
    } else if (value === "PHP Laravel") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/phpLaravelLMS",
        firstCourseName: value,
      });
    } else if (value === "MERN Stack") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/mernStackLMS",
        firstCourseName: value,
      });
    } else if (value === "SQL Server Specialist") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/sqlServerSpecialistLMS",
        firstCourseName: value,
      });
    } else if (value === "Oracle Database Administrator (OCP : 12C DBA)") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/oracleDatabaseLMS",
        firstCourseName: value,
      });
    } else if (value === "Android Apps Development") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/androidAppLMS",
        firstCourseName: value,
      });
    } else if (value === "IOS Apps Development") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/iosAppLMS",
        firstCourseName: value,
      });
    } else if (value === "Xamarin Mobile Apps Development") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/xamarinAppLMS",
        firstCourseName: value,
      });
    } else if (value === "React Native Web & Apps Development") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/reactNativeLMS",
        firstCourseName: value,
      });
    } else if (value === "Game Development") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/gameDevelopmentLMS",
        firstCourseName: value,
      });
    } else if (value === "Cisco CCNA Networking") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/ccnaNetworkingLMS",
        firstCourseName: value,
      });
    } else if (value === "Graphics Design") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/graphicDesignLMS",
        firstCourseName: value,
      });
    } else if (value === "Video Editing") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/videoEditingLMS",
        firstCourseName: value,
      });
    } else if (value === "Search Engine Optimization (SEO)") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/seoLMS",
        firstCourseName: value,
      });
    } else if (value === "Social Media Marketing") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/socialMediaLMS",
        firstCourseName: value,
      });
    } else if (value === "Amazon FBA Business") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/amazonFbaBusinessLMS",
        firstCourseName: value,
      });
    } else if (value === "Project Management Professional (PMP)") {
      this.setState({
        firstCourseLink:
          "/lmsDashboard/myCourses/projectManagementProfessionalLMS",
        firstCourseName: value,
      });
    } else if (value === "Digital Forensic Cyber Security") {
      this.setState({
        firstCourseLink:
          "/lmsDashboard/myCourses/digitalForensicCyberSecurityLMS",
        firstCourseName: value,
      });
    } else if (value === "Penetration Testing Cyber Security") {
      this.setState({
        firstCourseLink:
          "/lmsDashboard/myCourses/penetrationTestingCyberSecurityLMS",
        firstCourseName: value,
      });
    } else if (value === "Artificial Intelligence") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/artificialIntelligenceLMS",
        firstCourseName: value,
      });
    } else if (value === "AWS Cloud Computing") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/cloudComputingLMS",
        firstCourseName: value,
      });
    } else if (value === "Full Stack Web Development") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/fullStackWebDevelopmentLMS",
        firstCourseName: value,
      });
    } else if (value === "Internet of Things (IoT)") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/iotLMS",
        firstCourseName: value,
      });
    } else if (value === "BlockChain Technology") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/blockChainLMS",
        firstCourseName: value,
      });
    } else if (value === "CompTIA It Fundamentals") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/comptiaItFundamentalsLMS",
        firstCourseName: value,
      });
    } else if (value === "Kotlin Mobile Apps Development") {
      this.setState({
        firstCourseLink:
          "/lmsDashboard/myCourses/kotlinMobileAppsDevelopmentLMS",
        firstCourseName: value,
      });
    } else if (value === "CompTIA Security + (SYO - 601)") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/comptiaSecurityPlusLMS",
        firstCourseName: value,
      });
    } else if (value === "Certified Ethical Hacking") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/certifiedEthicalHackingLMS",
        firstCourseName: value,
      });
    } else if (value === "Certified Hacking Forensic Investigator") {
      this.setState({
        firstCourseLink:
          "/lmsDashboard/myCourses/certifiedHackingForensicInvestigatorLMS",
        firstCourseName: value,
      });
    } else if (value === "Penetration Testing Security Analyst") {
      this.setState({
        firstCourseLink:
          "/lmsDashboard/myCourses/penetrationTestingSecurityAnalystLMS",
        firstCourseName: value,
      });
    } else if (value === "Certified Information System Auditor") {
      this.setState({
        firstCourseLink:
          "/lmsDashboard/myCourses/certifiedInformationSystemAuditorLMS",
        firstCourseName: value,
      });
    } else if (value === "Certified Information Security Manager") {
      this.setState({
        firstCourseLink:
          "/lmsDashboard/myCourses/certifiedInformationSecurityManagerLMS",
        firstCourseName: value,
      });
    } else if (value === "AWS Practitioner") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/awsPractitionerLMS",
        firstCourseName: value,
      });
    } else if (value === "AWS Solution Architect") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/awsSolutionArchitectLMS",
        firstCourseName: value,
      });
    } else if (value === "AWS SysOps Administrator") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/awsSysOpsAdministratorLMS",
        firstCourseName: value,
      });
    } else if (value === "AWS Developer Associate") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/awsDeveloperAssociateLMS",
        firstCourseName: value,
      });
    } else if (value === "Microsoft Azure Cloud Fundamentals") {
      this.setState({
        firstCourseLink:
          "/lmsDashboard/myCourses/microsoftAzureCloudFundamentalsLMS",
        firstCourseName: value,
      });
    } else if (value === "Microsoft Cloud Administrator 103 - 104") {
      this.setState({
        firstCourseLink:
          "/lmsDashboard/myCourses/microsoftCloudAdministratorLMS",
        firstCourseName: value,
      });
    } else if (value === "Google Cloud Engineer") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/googleCloudEngineerLMS",
        firstCourseName: value,
      });
    } else if (value === "Python For Everyone") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/pythonForEveryoneLMS",
        firstCourseName: value,
      });
    } else if (value === "Machine Learning & AI") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/machineLearningAndAILMS",
        firstCourseName: value,
      });
    } else if (value === "Big Data & Headoop Ecosystem") {
      this.setState({
        firstCourseLink:
          "/lmsDashboard/myCourses/bigDataAndHeadoopEcosystemLMS",
        firstCourseName: value,
      });
    } else if (value === "QuickBooks ERP") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/quickBooksERPLMS",
        firstCourseName: value,
      });
    } else if (value === "SAP ERP") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/sapERPLMS",
        firstCourseName: value,
      });
    } else if (value === "Digital Marketing") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/digitalMarketingLMS",
        firstCourseName: value,
      });
    } else if (value === "UI / UX Design") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/uiUXDesignLMS",
        firstCourseName: value,
      });
    } else if (value === "Interior Design") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/interiorDesignLMS",
        firstCourseName: value,
      });
    } else if (value === "3D Maya Max Animation") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/3dMayaMaxAnimationLMS",
        firstCourseName: value,
      });
    } else if (value === "AutoCad") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/autocadLMS",
        firstCourseName: value,
      });
    } else if (value === "Microsoft Office 365") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/microsoftOffice365LMS",
        firstCourseName: value,
      });
    } else if (value === "Enterpreneurship") {
      this.setState({
        firstCourseLink: "/lmsDashboard/myCourses/enterpreneurshipLMS",
        firstCourseName: value,
      });
    } else if (value === "CISSP Cyber Security Professional") {
      this.setState({
        firstCourseLink:
          "/lmsDashboard/myCourses/cisspCyberSecurityProfessionalLMS",
        firstCourseName: value,
      });
    }
  };

  handleSecondCourseName = ({ target }) => {
    const { value } = target;

    if (value === "Microsoft Front End Development") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/frontEndLMS",
        secondCourseName: value,
      });
    } else if (value === "Data Science") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/dataScienceLMS",
        secondCourseName: value,
      });
    } else if (value === "ASP.NET Web Applications") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/aspDotNetLMS",
        secondCourseName: value,
      });
    } else if (value === "PHP Laravel") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/phpLaravelLMS",
        secondCourseName: value,
      });
    } else if (value === "MERN Stack") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/mernStackLMS",
        secondCourseName: value,
      });
    } else if (value === "SQL Server Specialist") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/sqlServerSpecialistLMS",
        secondCourseName: value,
      });
    } else if (value === "Oracle Database Administrator (OCP : 12C DBA)") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/oracleDatabaseLMS",
        secondCourseName: value,
      });
    } else if (value === "Android Apps Development") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/androidAppLMS",
        secondCourseName: value,
      });
    } else if (value === "IOS Apps Development") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/iosAppLMS",
        secondCourseName: value,
      });
    } else if (value === "Xamarin Mobile Apps Development") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/xamarinAppLMS",
        secondCourseName: value,
      });
    } else if (value === "React Native Web & Apps Development") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/reactNativeLMS",
        secondCourseName: value,
      });
    } else if (value === "Game Development") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/gameDevelopmentLMS",
        secondCourseName: value,
      });
    } else if (value === "Cisco CCNA Networking") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/ccnaNetworkingLMS",
        secondCourseName: value,
      });
    } else if (value === "Graphics Design") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/graphicDesignLMS",
        secondCourseName: value,
      });
    } else if (value === "Video Editing") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/videoEditingLMS",
        secondCourseName: value,
      });
    } else if (value === "Search Engine Optimization (SEO)") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/seoLMS",
        secondCourseName: value,
      });
    } else if (value === "Social Media Marketing") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/socialMediaLMS",
        secondCourseName: value,
      });
    } else if (value === "Amazon FBA Business") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/amazonFbaBusinessLMS",
        secondCourseName: value,
      });
    } else if (value === "Project Management Professional (PMP)") {
      this.setState({
        secondCourseLink:
          "/lmsDashboard/myCourses/projectManagementProfessionalLMS",
        secondCourseName: value,
      });
    } else if (value === "Digital Forensic Cyber Security") {
      this.setState({
        secondCourseLink:
          "/lmsDashboard/myCourses/digitalForensicCyberSecurityLMS",
        secondCourseName: value,
      });
    } else if (value === "Penetration Testing Cyber Security") {
      this.setState({
        secondCourseLink:
          "/lmsDashboard/myCourses/penetrationTestingCyberSecurityLMS",
        secondCourseName: value,
      });
    } else if (value === "Artificial Intelligence") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/artificialIntelligenceLMS",
        secondCourseName: value,
      });
    } else if (value === "AWS Cloud Computing") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/cloudComputingLMS",
        secondCourseName: value,
      });
    } else if (value === "Full Stack Web Development") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/fullStackWebDevelopmentLMS",
        secondCourseName: value,
      });
    } else if (value === "Internet of Things (IoT)") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/iotLMS",
        secondCourseName: value,
      });
    } else if (value === "BlockChain Technology") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/blockChainLMS",
        secondCourseName: value,
      });
    } else if (value === "CompTIA It Fundamentals") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/comptiaItFundamentalsLMS",
        secondCourseName: value,
      });
    } else if (value === "Kotlin Mobile Apps Development") {
      this.setState({
        secondCourseLink:
          "/lmsDashboard/myCourses/kotlinMobileAppsDevelopmentLMS",
        secondCourseName: value,
      });
    } else if (value === "CompTIA Security + (SYO - 601)") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/comptiaSecurityPlusLMS",
        secondCourseName: value,
      });
    } else if (value === "Certified Ethical Hacking") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/certifiedEthicalHackingLMS",
        secondCourseName: value,
      });
    } else if (value === "Certified Hacking Forensic Investigator") {
      this.setState({
        secondCourseLink:
          "/lmsDashboard/myCourses/certifiedHackingForensicInvestigatorLMS",
        secondCourseName: value,
      });
    } else if (value === "Penetration Testing Security Analyst") {
      this.setState({
        secondCourseLink:
          "/lmsDashboard/myCourses/penetrationTestingSecurityAnalystLMS",
        secondCourseName: value,
      });
    } else if (value === "Certified Information System Auditor") {
      this.setState({
        secondCourseLink:
          "/lmsDashboard/myCourses/certifiedInformationSystemAuditorLMS",
        secondCourseName: value,
      });
    } else if (value === "Certified Information Security Manager") {
      this.setState({
        secondCourseLink:
          "/lmsDashboard/myCourses/certifiedInformationSecurityManagerLMS",
        secondCourseName: value,
      });
    } else if (value === "AWS Practitioner") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/awsPractitionerLMS",
        secondCourseName: value,
      });
    } else if (value === "AWS Solution Architect") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/awsSolutionArchitectLMS",
        secondCourseName: value,
      });
    } else if (value === "AWS SysOps Administrator") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/awsSysOpsAdministratorLMS",
        secondCourseName: value,
      });
    } else if (value === "AWS Developer Associate") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/awsDeveloperAssociateLMS",
        secondCourseName: value,
      });
    } else if (value === "Microsoft Azure Cloud Fundamentals") {
      this.setState({
        secondCourseLink:
          "/lmsDashboard/myCourses/microsoftAzureCloudFundamentalsLMS",
        secondCourseName: value,
      });
    } else if (value === "Microsoft Cloud Administrator 103 - 104") {
      this.setState({
        secondCourseLink:
          "/lmsDashboard/myCourses/microsoftCloudAdministratorLMS",
        secondCourseName: value,
      });
    } else if (value === "Google Cloud Engineer") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/googleCloudEngineerLMS",
        secondCourseName: value,
      });
    } else if (value === "Python For Everyone") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/pythonForEveryoneLMS",
        secondCourseName: value,
      });
    } else if (value === "Machine Learning & AI") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/machineLearningAndAILMS",
        secondCourseName: value,
      });
    } else if (value === "Big Data & Headoop Ecosystem") {
      this.setState({
        secondCourseLink:
          "/lmsDashboard/myCourses/bigDataAndHeadoopEcosystemLMS",
        secondCourseName: value,
      });
    } else if (value === "QuickBooks ERP") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/quickBooksERPLMS",
        secondCourseName: value,
      });
    } else if (value === "SAP ERP") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/sapERPLMS",
        secondCourseName: value,
      });
    } else if (value === "Digital Marketing") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/digitalMarketingLMS",
        secondCourseName: value,
      });
    } else if (value === "UI / UX Design") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/uiUXDesignLMS",
        secondCourseName: value,
      });
    } else if (value === "Interior Design") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/interiorDesignLMS",
        secondCourseName: value,
      });
    } else if (value === "3D Maya Max Animation") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/3dMayaMaxAnimationLMS",
        secondCourseName: value,
      });
    } else if (value === "AutoCad") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/autocadLMS",
        secondCourseName: value,
      });
    } else if (value === "Microsoft Office 365") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/microsoftOffice365LMS",
        secondCourseName: value,
      });
    } else if (value === "Enterpreneurship") {
      this.setState({
        secondCourseLink: "/lmsDashboard/myCourses/enterpreneurshipLMS",
        secondCourseName: value,
      });
    } else if (value === "CISSP Cyber Security Professional") {
      this.setState({
        secondCourseLink:
          "/lmsDashboard/myCourses/cisspCyberSecurityProfessionalLMS",
        secondCourseName: value,
      });
    }
  };

  handleThirdCourseName = ({ target }) => {
    const { value } = target;

    if (value === "Microsoft Front End Development") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/frontEndLMS",
        thirdCourseName: value,
      });
    } else if (value === "Data Science") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/dataScienceLMS",
        thirdCourseName: value,
      });
    } else if (value === "ASP.NET Web Applications") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/aspDotNetLMS",
        thirdCourseName: value,
      });
    } else if (value === "PHP Laravel") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/phpLaravelLMS",
        thirdCourseName: value,
      });
    } else if (value === "MERN Stack") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/mernStackLMS",
        thirdCourseName: value,
      });
    } else if (value === "SQL Server Specialist") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/sqlServerSpecialistLMS",
        thirdCourseName: value,
      });
    } else if (value === "Oracle Database Administrator (OCP : 12C DBA)") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/oracleDatabaseLMS",
        thirdCourseName: value,
      });
    } else if (value === "Android Apps Development") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/androidAppLMS",
        thirdCourseName: value,
      });
    } else if (value === "IOS Apps Development") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/iosAppLMS",
        thirdCourseName: value,
      });
    } else if (value === "Xamarin Mobile Apps Development") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/xamarinAppLMS",
        thirdCourseName: value,
      });
    } else if (value === "React Native Web & Apps Development") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/reactNativeLMS",
        thirdCourseName: value,
      });
    } else if (value === "Game Development") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/gameDevelopmentLMS",
        thirdCourseName: value,
      });
    } else if (value === "Cisco CCNA Networking") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/ccnaNetworkingLMS",
        thirdCourseName: value,
      });
    } else if (value === "Graphics Design") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/graphicDesignLMS",
        thirdCourseName: value,
      });
    } else if (value === "Video Editing") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/videoEditingLMS",
        thirdCourseName: value,
      });
    } else if (value === "Search Engine Optimization (SEO)") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/seoLMS",
        thirdCourseName: value,
      });
    } else if (value === "Social Media Marketing") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/socialMediaLMS",
        thirdCourseName: value,
      });
    } else if (value === "Amazon FBA Business") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/amazonFbaBusinessLMS",
        thirdCourseName: value,
      });
    } else if (value === "Project Management Professional (PMP)") {
      this.setState({
        thirdCourseLink:
          "/lmsDashboard/myCourses/projectManagementProfessionalLMS",
        thirdCourseName: value,
      });
    } else if (value === "Digital Forensic Cyber Security") {
      this.setState({
        thirdCourseLink:
          "/lmsDashboard/myCourses/digitalForensicCyberSecurityLMS",
        thirdCourseName: value,
      });
    } else if (value === "Penetration Testing Cyber Security") {
      this.setState({
        thirdCourseLink:
          "/lmsDashboard/myCourses/penetrationTestingCyberSecurityLMS",
        thirdCourseName: value,
      });
    } else if (value === "Artificial Intelligence") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/artificialIntelligenceLMS",
        thirdCourseName: value,
      });
    } else if (value === "AWS Cloud Computing") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/cloudComputingLMS",
        thirdCourseName: value,
      });
    } else if (value === "Full Stack Web Development") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/fullStackWebDevelopmentLMS",
        thirdCourseName: value,
      });
    } else if (value === "Internet of Things (IoT)") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/iotLMS",
        thirdCourseName: value,
      });
    } else if (value === "BlockChain Technology") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/blockChainLMS",
        thirdCourseName: value,
      });
    } else if (value === "CompTIA It Fundamentals") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/comptiaItFundamentalsLMS",
        thirdCourseName: value,
      });
    } else if (value === "Kotlin Mobile Apps Development") {
      this.setState({
        thirdCourseLink:
          "/lmsDashboard/myCourses/kotlinMobileAppsDevelopmentLMS",
        thirdCourseName: value,
      });
    } else if (value === "CompTIA Security + (SYO - 601)") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/comptiaSecurityPlusLMS",
        thirdCourseName: value,
      });
    } else if (value === "Certified Ethical Hacking") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/certifiedEthicalHackingLMS",
        thirdCourseName: value,
      });
    } else if (value === "Certified Hacking Forensic Investigator") {
      this.setState({
        thirdCourseLink:
          "/lmsDashboard/myCourses/certifiedHackingForensicInvestigatorLMS",
        thirdCourseName: value,
      });
    } else if (value === "Penetration Testing Security Analyst") {
      this.setState({
        thirdCourseLink:
          "/lmsDashboard/myCourses/penetrationTestingSecurityAnalystLMS",
        thirdCourseName: value,
      });
    } else if (value === "Certified Information System Auditor") {
      this.setState({
        thirdCourseLink:
          "/lmsDashboard/myCourses/certifiedInformationSystemAuditorLMS",
        thirdCourseName: value,
      });
    } else if (value === "Certified Information Security Manager") {
      this.setState({
        thirdCourseLink:
          "/lmsDashboard/myCourses/certifiedInformationSecurityManagerLMS",
        thirdCourseName: value,
      });
    } else if (value === "AWS Practitioner") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/awsPractitionerLMS",
        thirdCourseName: value,
      });
    } else if (value === "AWS Solution Architect") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/awsSolutionArchitectLMS",
        thirdCourseName: value,
      });
    } else if (value === "AWS SysOps Administrator") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/awsSysOpsAdministratorLMS",
        thirdCourseName: value,
      });
    } else if (value === "AWS Developer Associate") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/awsDeveloperAssociateLMS",
        thirdCourseName: value,
      });
    } else if (value === "Microsoft Azure Cloud Fundamentals") {
      this.setState({
        thirdCourseLink:
          "/lmsDashboard/myCourses/microsoftAzureCloudFundamentalsLMS",
        thirdCourseName: value,
      });
    } else if (value === "Microsoft Cloud Administrator 103 - 104") {
      this.setState({
        thirdCourseLink:
          "/lmsDashboard/myCourses/microsoftCloudAdministratorLMS",
        thirdCourseName: value,
      });
    } else if (value === "Google Cloud Engineer") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/googleCloudEngineerLMS",
        thirdCourseName: value,
      });
    } else if (value === "Python For Everyone") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/pythonForEveryoneLMS",
        thirdCourseName: value,
      });
    } else if (value === "Machine Learning & AI") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/machineLearningAndAILMS",
        thirdCourseName: value,
      });
    } else if (value === "Big Data & Headoop Ecosystem") {
      this.setState({
        thirdCourseLink:
          "/lmsDashboard/myCourses/bigDataAndHeadoopEcosystemLMS",
        thirdCourseName: value,
      });
    } else if (value === "QuickBooks ERP") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/quickBooksERPLMS",
        thirdCourseName: value,
      });
    } else if (value === "SAP ERP") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/sapERPLMS",
        thirdCourseName: value,
      });
    } else if (value === "Digital Marketing") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/digitalMarketingLMS",
        thirdCourseName: value,
      });
    } else if (value === "UI / UX Design") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/uiUXDesignLMS",
        thirdCourseName: value,
      });
    } else if (value === "Interior Design") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/interiorDesignLMS",
        thirdCourseName: value,
      });
    } else if (value === "3D Maya Max Animation") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/3dMayaMaxAnimationLMS",
        thirdCourseName: value,
      });
    } else if (value === "AutoCad") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/autocadLMS",
        thirdCourseName: value,
      });
    } else if (value === "Microsoft Office 365") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/microsoftOffice365LMS",
        thirdCourseName: value,
      });
    } else if (value === "Enterpreneurship") {
      this.setState({
        thirdCourseLink: "/lmsDashboard/myCourses/enterpreneurshipLMS",
        thirdCourseName: value,
      });
    } else if (value === "CISSP Cyber Security Professional") {
      this.setState({
        thirdCourseLink:
          "/lmsDashboard/myCourses/cisspCyberSecurityProfessionalLMS",
        thirdCourseName: value,
      });
    }
  };
  render() {
    return this.state.loading ? (
      <div className="container">
        <h1 className="display-4 text-center m-3 fw-bold">Edit User</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="batch" className="form-label fw-bold">
              Batch
            </label>
            <input
              type="text"
              value={this.state.editData.batch}
              onChange={this.handleChange}
              name="batch"
              className="form-control"
              id="batch"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="roll#" className="form-label fw-bold">
              Roll #
            </label>
            <input
              type="text"
              onChange={this.handleChange}
              name="rollNumber"
              value={this.state.editData.rollNumber}
              className="form-control"
              id="roll#"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label fw-bold">
              Full Name
            </label>
            <input
              type="text"
              onChange={this.handleChange}
              name="fullName"
              value={this.state.editData.fullName}
              className="form-control"
              id="fullName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fatherName" className="form-label fw-bold">
              Father Name
            </label>
            <input
              type="text"
              onChange={this.handleChange}
              name="fatherName"
              value={this.state.editData.fatherName}
              className="form-control"
              id="fatherName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="LMS Status" className="form-label fw-bold">
              LMS Status
            </label>
            <select
              value={this.state.editData.lms}
              onChange={this.handleLMS}
              name="lms"
              className="form-select"
              id="LMS Status"
            >
              <option value="">Choose</option>
              <option value={true}>Open</option>
              <option value={false}>Close</option>
            </select>
          </div>

          {this.state.firstCourseTitle && (
            <>
              <div className="mb-3">
                <label htmlFor="First Course" className="form-label fw-bold">
                  First Course
                </label>
                {/* <input
                  type="text"
                  disabled
                  name="firstCourseTitle"
                  onChange={this.handleAnotherChange}
                  value={this.state.firstCourseTitle}
                  className="form-control"
                  id="First Course"
                /> */}

                <select
                  name="firstCourseTitle"
                  onChange={this.handleFirstCourseTitle}
                  value={this.state.firstCourseTitle}
                  className="form-select"
                  id="First Course"
                >
                  <option value="Fast Track Technical Program">
                    Fast Track Technical Program
                  </option>
                  <option value="Fast Track Non-Technical Program">
                    Fast Track Non-Technical Program
                  </option>
                  <option value="Associate Certification Program">
                    Associate Certification Program
                  </option>
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="First Course Category"
                  className="form-label fw-bold"
                >
                  First Course Category
                </label>
                {/* <input
                  type="text"
                  disabled
                  value={this.state.firstCourseName}
                  onChange={this.handleAnotherChange}
                  name="firstCourseName"
                  className="form-control"
                  id="First Course Category"
                /> */}

                <select
                  value={this.state.firstCourseName}
                  onChange={this.handleFirstCourseName}
                  name="firstCourseName"
                  className="form-select"
                  id="First Course Category"
                >
                  {this.state.firstCourseTitle ===
                    "Fast Track Technical Program" && (
                    <>
                      <option value="">Choose</option>
                      <option value="CompTIA It Fundamentals">
                        CompTIA It Fundamentals
                      </option>
                      <option value="Microsoft Front End Development">
                        Microsoft Front End Development
                      </option>
                      <option value="ASP.NET Web Applications">
                        ASP.NET Web Applications
                      </option>
                      <option value="PHP Laravel">PHP Laravel</option>
                      <option value="MERN Stack">MERN Stack</option>
                      <option value="SQL Server Specialist">
                        SQL Server Specialist
                      </option>
                      <option value="Oracle Database Administrator (OCP : 12C DBA)">
                        Oracle Database Administrator (OCP : 12C DBA)
                      </option>
                      <option value="Android Apps Development">
                        Android Apps Development
                      </option>
                      <option value="Kotlin Mobile Apps Development">
                        Kotlin Mobile Apps Development
                      </option>
                      <option value="IOS Apps Development">
                        IOS Apps Development
                      </option>
                      <option value="Xamarin Mobile Apps Development">
                        Xamarin Mobile Apps Development
                      </option>
                      <option value="React Native Web &amp; Apps Development">
                        React Native Web &amp; Apps Development
                      </option>
                      <option value="Game Development">Game Development</option>
                      <option value="Cisco CCNA Networking">
                        Cisco CCNA Networking
                      </option>
                      <option value="CompTIA Security + (SYO - 601)">
                        CompTIA Security + (SYO - 601)
                      </option>
                      <option value="Certified Ethical Hacking">
                        Certified Ethical Hacking
                      </option>
                      <option value="Certified Hacking Forensic Investigator">
                        Certified Hacking Forensic Investigator
                      </option>
                      <option value="Penetration Testing Security Analyst">
                        Penetration Testing Security Analyst
                      </option>
                      <option value="Certified Information System Auditor">
                        Certified Information System Auditor
                      </option>
                      <option value="Certified Information Security Manager">
                        Certified Information Security Manager
                      </option>
                      <option value="AWS Practitioner">AWS Practitioner</option>
                      <option value="AWS Solution Architect">
                        AWS Solution Architect
                      </option>
                      <option value="AWS SysOps Administrator">
                        AWS SysOps Administrator
                      </option>
                      <option value="AWS Developer Associate">
                        AWS Developer Associate
                      </option>
                      <option value="Microsoft Azure Cloud Fundamentals">
                        Microsoft Azure Cloud Fundamentals
                      </option>
                      <option value="Microsoft Cloud Administrator 103 - 104">
                        Microsoft Cloud Administrator 103 - 104
                      </option>
                      <option value="Google Cloud Engineer">
                        Google Cloud Engineer
                      </option>
                      <option value="Python For Everyone">
                        Python for Everyone
                      </option>
                      <option value="Machine Learning &amp; AI">
                        Machine Learning &amp; AI
                      </option>
                      <option value="Data Science">Data Science</option>
                      <option value="Big Data &amp; Headoop Ecosystem">
                        Big Data &amp; Headoop Ecosystem
                      </option>
                    </>
                  )}
                  {this.state.firstCourseTitle ===
                    "Fast Track Non-Technical Program" && (
                    <>
                      <option value="">Choose</option>
                      <option value="QuickBooks ERP">QuickBooks ERP</option>
                      <option value="SAP ERP">SAP ERP</option>
                      <option value="Project Management Professional (PMP)">
                        Project Management Professional (PMP)
                      </option>
                      <option value="Amazon FBA Business">
                        Amazon FBA Business
                      </option>
                      <option value="Search Engine Optimization (SEO)">
                        Search Engine Optimization (SEO)
                      </option>
                      <option value="Digital Marketing">
                        Digital Marketing
                      </option>
                      <option value="Social Media Marketing">
                        Social Media Marketing
                      </option>
                      <option value="Graphics Design">Graphic Design</option>
                      <option value="UI / UX Design">UI / UX Design</option>
                      <option value="Interior Design">Interior Design</option>
                      <option value="3D Maya Max Animation">
                        3D Maya Max Animation
                      </option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="AutoCad">AutoCad</option>
                      <option value="Microsoft Office 365">
                        Microsoft Office 365
                      </option>
                      <option value="Enterpreneurship">Enterpreneurship</option>
                    </>
                  )}
                  {this.state.firstCourseTitle ===
                    "Associate Certification Program" && (
                    <>
                      <option value="">Choose</option>
                      <option value="Digital Forensic Cyber Security">
                        Digital Forensic Cyber Security
                      </option>
                      <option value="Penetration Testing Cyber Security">
                        Penetration Testing Cyber Security
                      </option>
                      <option value="CISSP Cyber Security Professional">
                        CISSP Cyber Security Professional
                      </option>
                      <option value="Artificial Intelligence">
                        Artificial Intelligence
                      </option>
                      <option value="AWS Cloud Computing">
                        AWS Cloud Computing
                      </option>
                      <option value="Internet of Things (IoT)">
                        Internet of Things (IoT)
                      </option>
                      <option value="BlockChain Technology">
                        BlockChain Technology
                      </option>
                      <option value="Full Stack Web Development">
                        Full Stack Web Development (MCSA)
                      </option>
                    </>
                  )}
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="First Course Status"
                  className="form-label fw-bold"
                >
                  First Course Status
                </label>
                <select
                  value={this.state.firstCourseStatus}
                  className="form-select"
                  onChange={this.handleAnotherLMS}
                  name="firstCourseStatus"
                  id="First Course Status"
                >
                  <option value="">Choose</option>
                  <option value={true}>Open</option>
                  <option value={false}>Close</option>
                </select>
              </div>
            </>
          )}

          <div className="mb-3">
            <label htmlFor="Second Course" className="form-label fw-bold">
              Second Course
            </label>
            {/* <input
                  type="text"
                  disabled
                  onChange={this.handleAnotherChange}
                  name="secondCourseTitle"
                  value={this.state.secondCourseTitle}
                  className="form-control"
                  id="Second Course"
                /> */}

            <select
              onChange={this.handleSecondCourseTitle}
              name="secondCourseTitle"
              value={this.state.secondCourseTitle}
              className="form-select"
              id="Second Course"
            >
              <option value="">Choose</option>
              <option value="Fast Track Technical Program">
                Fast Track Technical Program
              </option>
              <option value="Fast Track Non-Technical Program">
                Fast Track Non-Technical Program
              </option>
              <option value="Associate Certification Program">
                Associate Certification Program
              </option>
            </select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="Second Course Category"
              className="form-label fw-bold"
            >
              Second Course Category
            </label>
            {/* <input
                  type="text"
                  disabled
                  onChange={this.handleAnotherChange}
                  name="secondCourseName"
                  value={this.state.secondCourseName}
                  className="form-control"
                  id="Second Course Category"
                /> */}

            <select
              onChange={this.handleSecondCourseName}
              name="secondCourseName"
              value={this.state.secondCourseName}
              className="form-select"
              id="Second Course Category"
            >
              {this.state.secondCourseTitle === "" && (
                <option value="">Choose</option>
              )}

              {this.state.secondCourseTitle ===
                "Fast Track Technical Program" && (
                <>
                  <option value="">Choose</option>
                  <option value="CompTIA It Fundamentals">
                    CompTIA It Fundamentals
                  </option>
                  <option value="Microsoft Front End Development">
                    Microsoft Front End Development
                  </option>
                  <option value="ASP.NET Web Applications">
                    ASP.NET Web Applications
                  </option>
                  <option value="PHP Laravel">PHP Laravel</option>
                  <option value="MERN Stack">MERN Stack</option>
                  <option value="SQL Server Specialist">
                    SQL Server Specialist
                  </option>
                  <option value="Oracle Database Administrator (OCP : 12C DBA)">
                    Oracle Database Administrator (OCP : 12C DBA)
                  </option>
                  <option value="Android Apps Development">
                    Android Apps Development
                  </option>
                  <option value="Kotlin Mobile Apps Development">
                    Kotlin Mobile Apps Development
                  </option>
                  <option value="IOS Apps Development">
                    IOS Apps Development
                  </option>
                  <option value="Xamarin Mobile Apps Development">
                    Xamarin Mobile Apps Development
                  </option>
                  <option value="React Native Web &amp; Apps Development">
                    React Native Web &amp; Apps Development
                  </option>
                  <option value="Game Development">Game Development</option>
                  <option value="Cisco CCNA Networking">
                    Cisco CCNA Networking
                  </option>
                  <option value="CompTIA Security + (SYO - 601)">
                    CompTIA Security + (SYO - 601)
                  </option>
                  <option value="Certified Ethical Hacking">
                    Certified Ethical Hacking
                  </option>
                  <option value="Certified Hacking Forensic Investigator">
                    Certified Hacking Forensic Investigator
                  </option>
                  <option value="Penetration Testing Security Analyst">
                    Penetration Testing Security Analyst
                  </option>
                  <option value="Certified Information System Auditor">
                    Certified Information System Auditor
                  </option>
                  <option value="Certified Information Security Manager">
                    Certified Information Security Manager
                  </option>
                  <option value="AWS Practitioner">AWS Practitioner</option>
                  <option value="AWS Solution Architect">
                    AWS Solution Architect
                  </option>
                  <option value="AWS SysOps Administrator">
                    AWS SysOps Administrator
                  </option>
                  <option value="AWS Developer Associate">
                    AWS Developer Associate
                  </option>
                  <option value="Microsoft Azure Cloud Fundamentals">
                    Microsoft Azure Cloud Fundamentals
                  </option>
                  <option value="Microsoft Cloud Administrator 103 - 104">
                    Microsoft Cloud Administrator 103 - 104
                  </option>
                  <option value="Google Cloud Engineer">
                    Google Cloud Engineer
                  </option>
                  <option value="Python For Everyone">
                    Python for Everyone
                  </option>
                  <option value="Machine Learning &amp; AI">
                    Machine Learning &amp; AI
                  </option>
                  <option value="Data Science">Data Science</option>
                  <option value="Big Data &amp; Headoop Ecosystem">
                    Big Data &amp; Headoop Ecosystem
                  </option>
                </>
              )}
              {this.state.secondCourseTitle ===
                "Fast Track Non-Technical Program" && (
                <>
                  <option value="">Choose</option>
                  <option value="QuickBooks ERP">QuickBooks ERP</option>
                  <option value="SAP ERP">SAP ERP</option>
                  <option value="Project Management Professional (PMP)">
                    Project Management Professional (PMP)
                  </option>
                  <option value="Amazon FBA Business">
                    Amazon FBA Business
                  </option>
                  <option value="Search Engine Optimization (SEO)">
                    Search Engine Optimization (SEO)
                  </option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Social Media Marketing">
                    Social Media Marketing
                  </option>
                  <option value="Graphics Design">Graphic Design</option>
                  <option value="UI / UX Design">UI / UX Design</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="3D Maya Max Animation">
                    3D Maya Max Animation
                  </option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="AutoCad">AutoCad</option>
                  <option value="Microsoft Office 365">
                    Microsoft Office 365
                  </option>
                  <option value="Enterpreneurship">Enterpreneurship</option>
                </>
              )}
              {this.state.secondCourseTitle ===
                "Associate Certification Program" && (
                <>
                  <option value="">Choose</option>
                  <option value="Digital Forensic Cyber Security">
                    Digital Forensic Cyber Security
                  </option>
                  <option value="Penetration Testing Cyber Security">
                    Penetration Testing Cyber Security
                  </option>
                  <option value="CISSP Cyber Security Professional">
                    CISSP Cyber Security Professional
                  </option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="AWS Cloud Computing">
                    AWS Cloud Computing
                  </option>
                  <option value="Internet of Things (IoT)">
                    Internet of Things (IoT)
                  </option>
                  <option value="BlockChain Technology">
                    BlockChain Technology
                  </option>
                  <option value="Full Stack Web Development">
                    Full Stack Web Development (MCSA)
                  </option>
                </>
              )}
            </select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="Second Course Status"
              className="form-label fw-bold"
            >
              Second Course Status
            </label>
            <select
              onChange={this.handleAnotherLMS}
              name="secondCourseStatus"
              value={this.state.secondCourseStatus}
              className="form-select"
              id="Second Course Status"
            >
              <option value="">Choose</option>
              <option value={true}>Open</option>
              <option value={false}>Close</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="Third Course" className="form-label fw-bold">
              Third Course
            </label>
            {/* <input
                  type="text"
                  disabled
                  name="thirdCourseTitle"
                  onChange={this.handleAnotherChange}
                  value={this.state.thirdCourseTitle}
                  className="form-control"
                  id="Third Course"
                /> */}

            <select
              name="thirdCourseTitle"
              onChange={this.handleThirdCourseTitle}
              value={this.state.thirdCourseTitle}
              className="form-select"
              id="Third Course"
            >
              <option value="">Choose</option>
              <option value="Fast Track Technical Program">
                Fast Track Technical Program
              </option>
              <option value="Fast Track Non-Technical Program">
                Fast Track Non-Technical Program
              </option>
              <option value="Associate Certification Program">
                Associate Certification Program
              </option>
            </select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="Third Course Category"
              className="form-label fw-bold"
            >
              Third Course Category
            </label>
            {/* <input
                  type="text"
                  name="thirdCourseName"
                  disabled
                  onChange={this.handleAnotherChange}
                  value={this.state.thirdCourseName}
                  className="form-control"
                  id="Third Course Category"
                /> */}

            <select
              onChange={this.handleThirdCourseName}
              value={this.state.thirdCourseName}
              name="thirdCourseName"
              className="form-select"
              id="Third Course Category"
            >
              {this.state.thirdCourseTitle === "" && (
                <option value="">Choose</option>
              )}
              {this.state.thirdCourseTitle ===
                "Fast Track Technical Program" && (
                <>
                  <option value="">Choose</option>
                  <option value="CompTIA It Fundamentals">
                    CompTIA It Fundamentals
                  </option>
                  <option value="Microsoft Front End Development">
                    Microsoft Front End Development
                  </option>
                  <option value="ASP.NET Web Applications">
                    ASP.NET Web Applications
                  </option>
                  <option value="PHP Laravel">PHP Laravel</option>
                  <option value="MERN Stack">MERN Stack</option>
                  <option value="SQL Server Specialist">
                    SQL Server Specialist
                  </option>
                  <option value="Oracle Database Administrator (OCP : 12C DBA)">
                    Oracle Database Administrator (OCP : 12C DBA)
                  </option>
                  <option value="Android Apps Development">
                    Android Apps Development
                  </option>
                  <option value="Kotlin Mobile Apps Development">
                    Kotlin Mobile Apps Development
                  </option>
                  <option value="IOS Apps Development">
                    IOS Apps Development
                  </option>
                  <option value="Xamarin Mobile Apps Development">
                    Xamarin Mobile Apps Development
                  </option>
                  <option value="React Native Web &amp; Apps Development">
                    React Native Web &amp; Apps Development
                  </option>
                  <option value="Game Development">Game Development</option>
                  <option value="Cisco CCNA Networking">
                    Cisco CCNA Networking
                  </option>
                  <option value="CompTIA Security + (SYO - 601)">
                    CompTIA Security + (SYO - 601)
                  </option>
                  <option value="Certified Ethical Hacking">
                    Certified Ethical Hacking
                  </option>
                  <option value="Certified Hacking Forensic Investigator">
                    Certified Hacking Forensic Investigator
                  </option>
                  <option value="Penetration Testing Security Analyst">
                    Penetration Testing Security Analyst
                  </option>
                  <option value="Certified Information System Auditor">
                    Certified Information System Auditor
                  </option>
                  <option value="Certified Information Security Manager">
                    Certified Information Security Manager
                  </option>
                  <option value="AWS Practitioner">AWS Practitioner</option>
                  <option value="AWS Solution Architect">
                    AWS Solution Architect
                  </option>
                  <option value="AWS SysOps Administrator">
                    AWS SysOps Administrator
                  </option>
                  <option value="AWS Developer Associate">
                    AWS Developer Associate
                  </option>
                  <option value="Microsoft Azure Cloud Fundamentals">
                    Microsoft Azure Cloud Fundamentals
                  </option>
                  <option value="Microsoft Cloud Administrator 103 - 104">
                    Microsoft Cloud Administrator 103 - 104
                  </option>
                  <option value="Google Cloud Engineer">
                    Google Cloud Engineer
                  </option>
                  <option value="Python For Everyone">
                    Python for Everyone
                  </option>
                  <option value="Machine Learning &amp; AI">
                    Machine Learning &amp; AI
                  </option>
                  <option value="Data Science">Data Science</option>
                  <option value="Big Data &amp; Headoop Ecosystem">
                    Big Data &amp; Headoop Ecosystem
                  </option>
                </>
              )}
              {this.state.thirdCourseTitle ===
                "Fast Track Non-Technical Program" && (
                <>
                  <option value="">Choose</option>
                  <option value="QuickBooks ERP">QuickBooks ERP</option>
                  <option value="SAP ERP">SAP ERP</option>
                  <option value="Project Management Professional (PMP)">
                    Project Management Professional (PMP)
                  </option>
                  <option value="Amazon FBA Business">
                    Amazon FBA Business
                  </option>
                  <option value="Search Engine Optimization (SEO)">
                    Search Engine Optimization (SEO)
                  </option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Social Media Marketing">
                    Social Media Marketing
                  </option>
                  <option value="Graphics Design">Graphic Design</option>
                  <option value="UI / UX Design">UI / UX Design</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="3D Maya Max Animation">
                    3D Maya Max Animation
                  </option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="AutoCad">AutoCad</option>
                  <option value="Microsoft Office 365">
                    Microsoft Office 365
                  </option>
                  <option value="Enterpreneurship">Enterpreneurship</option>
                </>
              )}
              {this.state.thirdCourseTitle ===
                "Associate Certification Program" && (
                <>
                  <option value="">Choose</option>
                  <option value="Digital Forensic Cyber Security">
                    Digital Forensic Cyber Security
                  </option>
                  <option value="Penetration Testing Cyber Security">
                    Penetration Testing Cyber Security
                  </option>
                  <option value="CISSP Cyber Security Professional">
                    CISSP Cyber Security Professional
                  </option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="AWS Cloud Computing">
                    AWS Cloud Computing
                  </option>
                  <option value="Internet of Things (IoT)">
                    Internet of Things (IoT)
                  </option>
                  <option value="BlockChain Technology">
                    BlockChain Technology
                  </option>
                  <option value="Full Stack Web Development">
                    Full Stack Web Development (MCSA)
                  </option>
                </>
              )}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="Third Course Status" className="form-label fw-bold">
              Third Course Status
            </label>
            <select
              value={this.state.thirdCourseStatus}
              className="form-select"
              name="thirdCourseStatus"
              onChange={this.handleAnotherLMS}
              id="Third Course Status"
            >
              <option value="">Choose</option>
              <option value={true}>Open</option>
              <option value={false}>Close</option>
            </select>
          </div>

          <div className="my-3 d-flex justify-content-center">
            <Button
              type="submit"
              variant="contained"
              className="outline"
              color="primary"
            >
              {this.state.update && (
                <CircularProgress className="loader me-2" />
              )}
              {this.state.update ? "Updating" : "Update"}
            </Button>
          </div>
        </form>
      </div>
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.firestore.data.users
      ? state.firestore.data.users[ownProps.match.params.id]
      : "",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  //   firestoreConnect([{ collection: "users" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(Edit);
