import { recognize, postUser, enroll, getUser } from "./axios";

const captureVideoButton = document.querySelector(
  "#screenshot .capture-button"
);
const screenshotButton = document.querySelector(
  "#screenshot .screenshot-button"
);
const captureVideoButtonSign = document.querySelector(
  "#signup .capture-buttonS"
);
const screenshotButtonSign = document.querySelector(
  "#signup .screenshot-buttonS"
);

const img = document.querySelector("#screenshot #screenshot-img");
const video = document.querySelector("#screenshot video");
const canvas = document.createElement("canvas");

captureVideoButton.onclick = function() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(handleSuccess)
    .catch(function(err) {
      console.log(err);
    });
};

captureVideoButtonSign.onclick = function() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(handleSuccess)
    .catch(function(err) {
      console.log(err);
    });
};

screenshotButton.onclick = video.onclick = async function() {
  let loading = true;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  img.src = canvas.toDataURL("image/png");

  if (loading) {
    document.getElementById("loading").innerText = "...Loading";
    let result = await recognize(img.src);
    if (result.data.Errors) {
      let message = result.data.Errors[0].Message;
      document.getElementById("loading").innerText = message;
    } else {
      let email = result.data.images[0].transaction.subject_id;
      let status = result.data.images[0].transaction.status;
      let message = result.data.images[0].transaction.message;
      if (status === "success") {
        let userinfo = await getUser(email);
        document.getElementById("Lemail").value = userinfo.email;
        document.getElementById("Lpassword").value = userinfo.password;
        loading = false;
        document.getElementById("loginB").click()
      }
      if (status === "failure") {
        document.getElementById("loading").innerText = message;
      }
    }

    if (!loading) {
      document.getElementById("loading").innerText = "";
    }
  }
};

let count = 0;
screenshotButtonSign.onclick = video.onclick = function() {
  count++;
  let email = document.getElementById("Semail").value;
  let submitB = document.getElementById("submitBdiv");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  img.src = canvas.toDataURL("image/png");
  enroll(img.src, email);
  if (count === 5) {
    submitB.classList.remove("hideB");
  }
};

document
  .getElementById("loginB")
  .addEventListener("click", async function(event) {
    event.preventDefault();
    let email = document.getElementById("Lemail").value;
    let password = document.getElementById("Lpassword").value;
    let check = await getUser(email);
    if (check) {
      if (email === check.email && password === check.password) {
        alert(`Welcome ${check.name}`)
      } else {
        alert("Password or Username is incorrect");
      }
    } else {
      alert("Password or Username is incorrect");
    }
  });

document.getElementById("submitB").addEventListener("click", function(event) {
  event.preventDefault();
  let name = document.getElementById("Sname").value;
  let email = document.getElementById("Semail").value;
  let password = document.getElementById("Spassword").value;
  postUser(name, email, password);
});

function handleSuccess(stream) {
  screenshotButton.disabled = false;
  video.srcObject = stream;
}
