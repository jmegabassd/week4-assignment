console.log("MOO!");

const audio = new Audio("./src/audio/click.mp3");
const commentsForm = document.getElementById("form-comments");
const thanksForm = document.getElementById("hidden-thanks");

commentsForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(commentsForm);
  const formValues = Object.fromEntries(formData);
  fetch("http://localhost:7777/comments-add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
  commentsForm.style.display = "none";
  thanksForm.style.display = "block";
  audio.play();
}

async function getGuestMessages() {
  const response = await fetch("http://localhost:7777/comments");
  const json = await response.json();
  console.log("JSON Data:", json);
  const messagecontainer = document.getElementById("post-submit");
  messagecontainer.innerHTML = "";
  json.forEach((item) => {
    const visitDate = new Date(item.visitdate);
    const formattedDate = visitDate.toLocaleDateString();
    const formattedTime = visitDate.toLocaleTimeString();
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("comment");
    messageDiv.textContent = `${item.name}\n${formattedDate} at ${formattedTime}\n${item.comments}`;
    messagecontainer.appendChild(messageDiv);
  });
}

setInterval(getGuestMessages, 30000);
getGuestMessages();
