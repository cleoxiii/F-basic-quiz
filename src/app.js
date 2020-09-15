import "./style/index.scss";

const rootURL = "http://localhost:8080";
const { pathname } = window.location;
const userWithIdURL = rootURL + pathname;
const header = document.getElementsByClassName("header")[0];
const avatar = document.getElementsByClassName("avatar")[0];
const aboutMe = document.getElementsByClassName("about-me")[0];
const education = document.getElementsByClassName("education")[0];

function renderResumeHeader(data) {
  avatar.src = `${data.avatar}`;
  const userInfo = document.createElement("p");
  userInfo.setAttribute("class", "user-info");
  const textOfUserInfo = document.createTextNode(
    `MY NAME IS ${data.name} ${data.age}YO AND THIS IS MY RESUME/CV`
  );
  userInfo.appendChild(textOfUserInfo);
  header.appendChild(userInfo);
}

function renderAboutMe(data) {
  const description = document.createElement("p");
  description.setAttribute("class", "description");
  const textOfDescription = document.createTextNode(data.description);
  description.appendChild(textOfDescription);
  aboutMe.appendChild(description);
}

function renderEducationList(data) {
  data.map((item) => {
    const educationContainer = document.createElement("div");
    educationContainer.setAttribute("class", "education-container");

    const year = document.createElement("p");
    year.setAttribute("class", "year");
    const textOfYear = document.createTextNode(item.year);
    year.appendChild(textOfYear);
    educationContainer.appendChild(year);

    const educationDetailPanel = document.createElement("div");
    educationDetailPanel.setAttribute("class", "education-detail-panel");

    const educationTitle = document.createElement("p");
    educationTitle.setAttribute("class", "education-title");
    const textOfEducationTitle = document.createTextNode(item.title);
    educationTitle.appendChild(textOfEducationTitle);
    educationDetailPanel.appendChild(educationTitle);

    const educationDescription = document.createElement("p");
    educationDescription.setAttribute("class", "description");
    const textOfEducationDescription = document.createTextNode(
      item.description
    );
    educationDescription.appendChild(textOfEducationDescription);
    educationDetailPanel.appendChild(educationDescription);

    educationContainer.appendChild(educationDetailPanel);
    education.appendChild(educationContainer);
    return null;
  });
}

async function render() {
  const userInfoResponse = await fetch(userWithIdURL);
  const userInfo = await userInfoResponse.json();
  renderResumeHeader(userInfo);
  renderAboutMe(userInfo);
  const educationResponse = await fetch(`${userWithIdURL}/educations`);
  const educationList = await educationResponse.json();
  renderEducationList(educationList);
}

render();
