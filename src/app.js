import "./style/index.scss";

const rootURL = "http://localhost:8080";
const { pathname } = window.location;
const userWithIdURL = rootURL + pathname;
const header = document.getElementsByClassName("header")[0];
const avatar = document.getElementsByClassName("avatar")[0];
const aboutMe = document.getElementsByClassName("about-me")[0];

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

async function render() {
  const response = await fetch(userWithIdURL);
  const data = await response.json();
  renderResumeHeader(data);
  renderAboutMe(data);
}

render();
