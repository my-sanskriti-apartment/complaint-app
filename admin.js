const ADMIN_API = "https://script.google.com/macros/s/AKfycbxzr6bMVLPKnS_ZUwl35N95XOp4O7_1alJS_0TG2hOKvDe3OlZfb-kpaj33ENMJEbk76Q/exec";

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
