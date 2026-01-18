const API_URL = "https://script.google.com/macros/s/AKfycbxzr6bMVLPKnS_ZUwl35N95XOp4O7_1alJS_0TG2hOKvDe3OlZfb-kpaj33ENMJEbk76Q/exec";

// Check login
const userEmail = localStorage.getItem("userEmail");
if(!userEmail && window.location.pathname.includes("complain.html")){
  alert("Login first");
  window.location = "login.html";
}

// Submit complaint
if (document.getElementById("complaintForm")) {
  document.getElementById("complaintForm").addEventListener("submit", e => {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("email", userEmail);

    fetch(API_URL, { method: "POST", body: form })
      .then(() => alert("Complaint submitted"))
      .then(() => window.location = "index.html");
  });
}

// Load complaints
if (document.getElementById("complaints")) {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      data.forEach(c => {
        document.getElementById("complaints").innerHTML += `
          <div class="card">
            <div>📅 ${c.date} | ⏰ ${c.time}</div>
            <div><b>${c.subject}</b></div>
            <div>Status: <span class="status ${c.status.replace(" ", "")}">${c.status}</span></div>
            <div>Flat: ${c.flat}</div>
            <div>
              👍 ${c.likes} 
              <button onclick="like('${c.id}')">Like</button>
            </div>
          </div>`;
      });
    });
}

// Search by Flat No
if (document.getElementById("searchFlat")) {
  document.getElementById("searchFlat").addEventListener("input", e => {
    const v = e.target.value;
    document.querySelectorAll('.card').forEach(c => {
      c.style.display = c.innerText.includes(v) ? 'block' : 'none';
    });
  });
}

function like(id){
  fetch(API_URL, {
    method:'POST',
    body:new URLSearchParams({ action:'like', id })
  }).then(()=> location.reload());
}

// Swipe gesture
let startX = 0;
document.addEventListener("touchstart", (e)=>{
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e)=>{
  const endX = e.changedTouches[0].clientX;
  if(endX - startX > 80){
    alert("Swipe Right Detected!");
  }
});
