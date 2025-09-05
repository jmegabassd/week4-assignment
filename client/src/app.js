console.log("MOO!");

const commentsForm = document.getElementById("form-comments");
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
}

async function getGuestMessages() {
  const response = await fetch("http://localhost:7777/comments");
  const json = await response.json();
  console.log("JSON Data:", json);
  const messagecontainer = document.getElementById("post-submit");
  messagecontainer.innerHTML = "";
  json.forEach((item) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("comment");
    messageDiv.textContent = `${item.name}\n${item.visitdate}\n${item.comments}`;
    messagecontainer.appendChild(messageDiv);
  });
}

setInterval(getGuestMessages, 30000);
getGuestMessages();
