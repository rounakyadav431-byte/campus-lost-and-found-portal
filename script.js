// Campus Lost & Found — basic browser-side demo using localStorage.
const STORAGE_KEY = "campusLostFoundPosts";
const starterPosts = [
  {id:1,type:"found",name:"Black wireless earbuds",category:"Electronics",location:"Central Library, 2nd floor",date:"2026-10-29",description:"Black charging case found near the reading tables.",contact:"demo@example.com"},
  {id:2,type:"lost",name:"Blue student notebook",category:"Books & Notes",location:"Academic Block B",date:"2026-10-28",description:"A5 blue notebook with handwritten class notes inside.",contact:"demo@example.com"},
  {id:3,type:"found",name:"Silver keychain with 2 keys",category:"Accessories",location:"Cafeteria entrance",date:"2026-10-30",description:"Small silver keychain picked up beside the entrance.",contact:"demo@example.com"}
];

const $ = (selector) => document.querySelector(selector);
const grid = $("#itemGrid");
const dialog = $("#reportDialog");
let posts = loadPosts();

function loadPosts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : starterPosts;
  } catch (error) {
    console.warn("Could not read saved posts:", error);
    return starterPosts;
  }
}
function savePosts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}
function formatDate(dateString) {
  if (!dateString) return "Date not provided";
  return new Date(dateString + "T00:00:00").toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"});
}
function renderPosts() {
  const query = $("#searchInput").value.trim().toLowerCase();
  const type = $("#typeFilter").value;
  const category = $("#categoryFilter").value;
  const filtered = posts.filter(post => {
    const searchable = [post.name,post.location,post.description,post.category].join(" ").toLowerCase();
    return searchable.includes(query) && (type === "all" || post.type === type) && (category === "all" || post.category === category);
  });
  grid.innerHTML = filtered.map(post => `
    <article class="item-card">
      <div class="item-top"><span class="type-pill ${post.type}">${post.type}</span><span class="category">${escapeHTML(post.category)}</span></div>
      <h3>${escapeHTML(post.name)}</h3>
      <p class="item-description">${escapeHTML(post.description)}</p>
      <div class="item-meta"><span>⌖ ${escapeHTML(post.location)}</span><span>▦ ${formatDate(post.date)}</span></div>
      <a class="contact-link" href="mailto:${encodeURIComponent(post.contact)}?subject=${encodeURIComponent("Campus Lost & Found: " + post.name)}">Contact poster ↗</a>
    </article>`).join("");
  $("#emptyState").hidden = filtered.length > 0;
  $("#totalCount").textContent = posts.length;
  $("#lostCount").textContent = posts.filter(p => p.type === "lost").length;
  $("#foundCount").textContent = posts.filter(p => p.type === "found").length;
}
function openDialog() {
  $("#formMessage").textContent = "";
  if (typeof dialog.showModal === "function") dialog.showModal();
  else alert("Your browser does not support this report form. Please use a modern browser.");
}
$("#reportNavBtn").addEventListener("click",openDialog);
$("#heroReportBtn").addEventListener("click",openDialog);
$("#sectionReportBtn").addEventListener("click",openDialog);
$("#closeDialog").addEventListener("click",() => dialog.close());
$("#searchInput").addEventListener("input",renderPosts);
$("#typeFilter").addEventListener("change",renderPosts);
$("#categoryFilter").addEventListener("change",renderPosts);

$("#reportForm").addEventListener("submit",event => {
  event.preventDefault();
  const newPost = {
    id: Date.now(),
    type: $("#reportType").value,
    name: $("#itemName").value.trim(),
    category: $("#itemCategory").value,
    location: $("#itemLocation").value.trim(),
    date: $("#itemDate").value,
    description: $("#itemDescription").value.trim(),
    contact: $("#itemContact").value.trim()
  };
  if (Object.values(newPost).some(value => value === "" || value === null)) {
    $("#formMessage").textContent = "Please complete every field.";
    return;
  }
  posts.unshift(newPost);
  savePosts();
  renderPosts();
  $("#reportForm").reset();
  $("#formMessage").textContent = "Your report has been published!";
  setTimeout(() => dialog.close(), 700);
});
$("#year").textContent = new Date().getFullYear();
renderPosts();
