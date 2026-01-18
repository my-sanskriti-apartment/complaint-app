const ADMIN_API = "AKfycbyT2jZq2t9NgtznkiNPyd7J6SllPLaam7fhXXlKxZBa";

fetch(ADMIN_API)
.then(res => res.json())
.then(data => {
  data.forEach(c => {
    document.getElementById("adminComplaints").innerHTML += `
      <div class="card">
        <b>${c.subject}</b>
        <div>Flat: ${c.flat}</div>
        <select onchange="updateStatus('${c.id}', this.value)">
          <option ${c.status=='Unseen'?'selected':''}>Unseen</option>
          <option ${c.status=='Read'?'selected':''}>Read</option>
          <option ${c.status=='Under Working'?'selected':''}>Under Working</option>
          <option ${c.status=='Solved'?'selected':''}>Solved</option>
        </select>
      </div>`;
  });
});

function updateStatus(id, status){
  fetch(ADMIN_API, {
    method:'POST',
    body:new URLSearchParams({ action:'status', id, status })
  }).then(()=> alert("Status Updated"));
}
