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

//TODO: Add json to the dom!

async function getGuestMessages() {
  const response = await fetch("http://localhost:7777/comments");
  const json = await response.json();
  console.log("JSON Data:", json);
  const messagecontainer = document.getElementById("post-submit");
  //search through array for items to list
  json.forEach((item) => {
    //select element to place them in
    const messageDiv = document.createElement("div");
    //add class to each object
    messageDiv.classList.add("comment");
    //select object content
    messageDiv.textContent = `${item.name}\n${item.visitdate}\n${item.comments}`;
    //add content to container
    messagecontainer.appendChild(messageDiv);
  });
}
getGuestMessages();
