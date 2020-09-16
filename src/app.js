import "./style/index.scss";

const rootURL = "http://localhost:8080";
const { pathname } = window.location;
const userWithIdURL = rootURL + pathname;

// TODO feedback: 没必要放在全局，可以放在对应的render方法中
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
  // TODO feedback: 长方法，代码可读性差
  data.map((item) => {
    // TODO feedback: education-container用ul li更符合语义
    // TODO feedback: 可以通过添加html的方式，每次子元素都createElement过于复杂
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
    // TODO feedback: 如果不需要return可以用forEach
    return null;
  });
}

async function render() {
  // TODO feedback: 可以考虑把获取data的逻辑提取到单独的方法中
  const userInfoResponse = await fetch(userWithIdURL);
  const userInfo = await userInfoResponse.json();
  renderResumeHeader(userInfo);
  renderAboutMe(userInfo);
  const educationResponse = await fetch(`${userWithIdURL}/educations`);
  const educationList = await educationResponse.json();
  renderEducationList(educationList);
}

render();
