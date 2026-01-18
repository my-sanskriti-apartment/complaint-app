const API_URL = "YOUR_GOOGLE_SCRIPT_URL";

function sendOtp(){
  const email = document.getElementById("email").value;
  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({ action: "sendOtp", email })
  }).then(() => {
    alert("OTP sent to your email");
    document.getElementById("otpBox").style.display = "block";
  });
}

function verifyOtp(){
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;

  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({ action: "verifyOtp", email, otp })
  }).then(res => res.text())
    .then(result => {
      if(result === "OK"){
        localStorage.setItem("userEmail", email);
        alert("Login Successful");
        window.location = "complain.html";
      } else {
        alert("Invalid OTP");
      }
    });
}
