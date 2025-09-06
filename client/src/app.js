console.log("MOO!");

const audio = new Audio("/audio/click.mp3");
const commentsForm = document.getElementById("form-comments");
const thanksForm = document.getElementById("hidden-thanks");

commentsForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(commentsForm);
  const formValues = Object.fromEntries(formData);
  fetch("https://week-4-assignment-server-jnnt.onrender.com/comments-add", {
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
  const messagecontainer = document.getElementById("post-submit");
  messagecontainer.innerHTML = "";
  const response = await fetch(
    "https://week-4-assignment-server-jnnt.onrender.com/comments"
  );
  const json = await response.json();
  json.forEach((item) => {
    const visitDate = new Date(item.visitdate);
    const formattedDate = visitDate.toLocaleDateString();
    const formattedTime = visitDate.toLocaleTimeString();
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("comment");
    messageDiv.textContent = `${item.name}\n${formattedDate} at ${formattedTime}\n`;
    const p = document.createElement("p");
    p.classList.add("message-content");
    p.textContent = item.comments;
    messageDiv.appendChild(p);
    messagecontainer.appendChild(messageDiv);
  });
}

getGuestMessages();
setInterval(getGuestMessages, 60000);
