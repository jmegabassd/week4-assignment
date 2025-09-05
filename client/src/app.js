console.log("MOO!");

//select form from DOM
const commentsForm = document.getElementById("form-comments");
// add submit event
commentsForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  //prevent the data from going to the url
  event.preventDefault();
  //create a new template object using my form inputs
  const formData = new FormData(commentsForm);
  //fill the input data in the template object
  const formValues = Object.fromEntries(formData);
  console.log(formValues);
  //send data to the server
  fetch("http://localhost:7777/comments-add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
}
