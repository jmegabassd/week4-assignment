console.log("MOO!");

const commentsForm = document.getElementById("form-comments");
commentsForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(commentsForm);
  const formValues = Object.fromEntries(formData);
  console.log(formValues);
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
  console.log("HTTP Response:", response);
  const json = await response.json();
  console.log("JSON Data:", json);
}
getGuestMessages();
