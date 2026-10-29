const defaultNotices = [
 {category:"IMPORTANT", title:"Internal Examination Schedule Released", description:"The internal examination timetable is now available. Please check your subject dates and prepare accordingly.", date:"Today • 9:15 AM", icon:"⚑"},
 {category:"ACADEMIC", title:"Assignment Submission Deadline", description:"The AI project report is due Friday. Submit your report to the department before the deadline.", date:"Today • 8:30 AM", icon:"▤"},
 {category:"EVENT", title:"Annual Tech Fest Registration", description:"Registration is open for the annual technology festival. Participate in coding, design, and project showcases.", date:"Yesterday • 4:10 PM", icon:"✦"},
 {category:"IMPORTANT", title:"Library Timing Updated", description:"The central library will remain open until 6:00 PM on weekdays during the examination preparation period.", date:"Yesterday • 11:20 AM", icon:"◷"}
];
const notices = JSON.parse(localStorage.getItem("sc_notices") || "null") || defaultNotices;
const defaultStudents = [{id:"STU001",name:"Mayuri G.",course:"BCS",semester:"VI",email:"Mayuri@college.edu",phone:"9876543210",attendance:82}];
let students = JSON.parse(localStorage.getItem("sc_students") || "null") || defaultStudents;
function saveStudents(){localStorage.setItem("sc_students",JSON.stringify(students));}
function saveNotices(){localStorage.setItem("sc_notices",JSON.stringify(notices));}

const timetable = {
 Monday:[
  ["09:00 AM","Web Technology","Room 204","Prof. Patil"],
  ["11:00 AM","Database Management","Lab 2","Prof. Deshmukh"],
  ["01:30 PM","Artificial Intelligence","Room 301","Prof. Joshi"],
  ["03:00 PM","Software Engineering","Room 105","Prof. Kulkarni"]],
 Tuesday:[
  ["09:00 AM","Java Programming","Lab 1","Prof. Sawant"],
  ["11:00 AM","Computer Networks","Room 202","Prof. Jadhav"],
  ["01:30 PM","Web Technology","Room 204","Prof. Patil"]],
 Wednesday:[
  ["09:00 AM","Artificial Intelligence","Room 301","Prof. Joshi"],
  ["11:00 AM","Database Management","Lab 2","Prof. Deshmukh"],
  ["02:00 PM","Project Work","Project Lab","Department"]],
 Thursday:[
  ["10:00 AM","Software Engineering","Room 105","Prof. Kulkarni"],
  ["12:00 PM","Java Programming","Lab 1","Prof. Sawant"],
  ["02:00 PM","Computer Networks","Room 202","Prof. Jadhav"]],
 Friday:[
  ["09:00 AM","Database Management","Lab 2","Prof. Deshmukh"],
  ["11:00 AM","Project Work","Project Lab","Department"],
  ["02:00 PM","Seminar / Activity","Seminar Hall","Department"]]
};
const attendance = [
 ["Database Management",92],["Web Technology",88],["Artificial Intelligence",80],["Software Engineering",76],["Computer Networks",74]
];
const events = [
 {date:"18 OCT 2026",title:"Annual Tech Fest 2026",icon:"💻",description:"A day of coding challenges, project showcases, technology talks, and creative innovation.",time:"10:00 AM",place:"Main Auditorium"},
 {date:"24 OCT 2026",title:"Campus Cultural Day",icon:"🎭",description:"Celebrate campus culture with music, dance, performances, and student activities.",time:"2:00 PM",place:"College Ground"},
 {date:"02 NOV 2026",title:"Placement Preparation Workshop",icon:"🚀",description:"Build confidence with resume tips, interview practice, and career-readiness guidance.",time:"11:00 AM",place:"Seminar Hall"}
];
let selectedDay = "Monday";
let toastTimer;
function showToast(message){const toast=document.getElementById("toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2600);}
function goTo(view){
 document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
 const target=document.getElementById(view+"View"); if(target) target.classList.add("active");
 document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
 const labels={dashboard:["DASHBOARD","Good morning, Mayuri! ☀️","Here’s what’s happening on your campus today."],notices:["NOTICES","Campus notices","The latest updates from your campus."],timetable:["TIMETABLE","Weekly timetable","Plan your week and stay prepared for every class."],attendance:["ATTENDANCE","Attendance tracker","Keep an eye on your subject-wise attendance."],events:["CAMPUS EVENTS","Campus events","Explore activities and opportunities around campus."],assistant:["AI ASSISTANT","Meet Campus Buddy ✧","Your friendly demo assistant for campus information."]};
 const info=labels[view]||labels.dashboard;document.getElementById("crumb").textContent=info[0];document.getElementById("pageTitle").textContent=info[1];document.getElementById("pageSubtitle").textContent=info[2];
 window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>goTo(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>goTo(b.dataset.go)));
document.getElementById("helpBtn").addEventListener("click",()=>goTo("assistant"));
document.getElementById("notificationBtn").addEventListener("click",()=>{goTo("notices");showToast("Showing the latest campus notices.");});
function scheduleMarkup(item,index){return `<div class="schedule-item"><div class="time-block">${item[0]}</div><div class="schedule-marker"></div><div class="schedule-info"><strong>${item[1]}</strong><small>${item[2]} &nbsp;·&nbsp; ${item[3]}</small></div><span class="class-tag">${index===0?"Class":index===1?"Lecture":"Session"}</span></div>`;}
document.getElementById("todaySchedule").innerHTML=timetable.Monday.map(scheduleMarkup).join("");
function noticeMarkup(n){return `<div class="notice-item"><div class="notice-symbol">${n.icon}</div><div class="notice-info"><span class="category ${n.category}">${n.category}</span><strong>${n.title}</strong><p>${n.description}</p><small>${n.date}</small></div></div>`;}
document.getElementById("latestNotices").innerHTML=notices.slice(0,3).map(noticeMarkup).join("");
function renderNotices(){const q=document.getElementById("noticeSearch").value.toLowerCase();const filter=document.getElementById("noticeFilter").value;const list=notices.filter(n=>(filter==="all"||n.category===filter)&&(`${n.title} ${n.description} ${n.category}`).toLowerCase().includes(q));document.getElementById("allNotices").innerHTML=list.length?list.map(noticeMarkup).join(""):'<div class="panel">No notices match your search.</div>';}
document.getElementById("noticeSearch").addEventListener("input",renderNotices);document.getElementById("noticeFilter").addEventListener("change",renderNotices);renderNotices();
function renderDay(day){selectedDay=day;document.getElementById("selectedDayTitle").textContent=day+"’s classes";document.getElementById("daySchedule").innerHTML=(timetable[day]||[]).map(scheduleMarkup).join("");document.querySelectorAll(".day-tab").forEach(b=>b.classList.toggle("active",b.dataset.day===day));}
document.getElementById("dayTabs").innerHTML=Object.keys(timetable).map(d=>`<button class="day-tab ${d===selectedDay?"active":""}" data-day="${d}">${d}</button>`).join("");
document.querySelectorAll(".day-tab").forEach(b=>b.addEventListener("click",()=>renderDay(b.dataset.day)));renderDay("Monday");
document.getElementById("attendanceRows").innerHTML=attendance.map(([name,pct])=>`<div class="attendance-row"><strong>${name}</strong><div class="progress"><i style="width:${pct}%;${pct<75?'background:#efb05c':''}"></i></div><span class="pct ${pct<75?'low':''}">${pct}%</span></div>`).join("");
document.getElementById("eventsGrid").innerHTML=events.map(e=>`<article class="event-card"><div class="event-cover">${e.icon}</div><div class="event-body"><span class="event-date">${e.date}</span><h3>${e.title}</h3><p>${e.description}</p><div class="event-meta">◷ ${e.time}<br><br>⌖ ${e.place}</div><button data-register="${e.title}">Register interest →</button></div></article>`).join("");
document.querySelectorAll("[data-register]").forEach(b=>b.addEventListener("click",()=>showToast("Interest noted for "+b.dataset.register+" (demo only).")));
const chatMessages=document.getElementById("chatMessages");
function addMessage(text,who){const wrap=document.createElement("div");wrap.className="message "+who;const avatar=document.createElement("div");avatar.className="message-avatar";avatar.textContent=who==="bot"?"✧":"MG";const body=document.createElement("div");const bubble=document.createElement("div");bubble.className="bubble";bubble.textContent=text;const small=document.createElement("small");small.textContent=who==="bot"?"Campus Buddy • Just now":"You • Just now";body.append(bubble,small);wrap.append(avatar,body);chatMessages.appendChild(wrap);chatMessages.scrollTop=chatMessages.scrollHeight;}
function answerQuestion(q){
 const s=q.toLowerCase();
 if(s.includes("attendance"))return "Your overall attendance is 82%. Database Management is 92%, Web Technology 88%, Artificial Intelligence 80%, Software Engineering 76%, and Computer Networks 74%. Keep an eye on Computer Networks, which is just below the 75% requirement.";
 if(s.includes("next class")||s.includes("timetable")||s.includes("schedule"))return "Your Monday schedule includes Web Technology at 9:00 AM in Room 204, Database Management at 11:00 AM in Lab 2, Artificial Intelligence at 1:30 PM in Room 301, and Software Engineering at 3:00 PM in Room 105.";
 if(s.includes("notice")||s.includes("announcement"))return "There are 3 new notices. The most important is the Internal Examination Schedule release. You can also check the AI project report deadline and Annual Tech Fest registration in the Notices section.";
 if(s.includes("event"))return "Upcoming events include Annual Tech Fest on 18 October at the Main Auditorium, Campus Cultural Day on 24 October at the College Ground, and a Placement Preparation Workshop on 2 November in the Seminar Hall.";
 if(s.includes("dbms")||s.includes("database")||s.includes("where"))return "Database Management is scheduled at 11:00 AM in Lab 2 on Monday with Prof. Deshmukh.";
 if(s.includes("hello")||s.includes("hi "))return "Hello! 😊 I can help with attendance, your timetable, notices, and campus events. What would you like to know?";
 if(s.includes("help"))return "I can answer questions about your demo attendance, weekly timetable, campus notices, and upcoming events. Try one of the quick question buttons.";
 return "I can help with campus attendance, class schedules, important notices, and upcoming events. Try asking “What is my attendance?” or “What is my next class?”";
}
function sendQuestion(q){const value=q.trim();if(!value)return;addMessage(value,"user");setTimeout(()=>addMessage(answerQuestion(value),"bot"),220);}
document.getElementById("chatForm").addEventListener("submit",e=>{e.preventDefault();const input=document.getElementById("chatInput");sendQuestion(input.value);input.value="";});
document.querySelectorAll("[data-question]").forEach(b=>b.addEventListener("click",()=>{goTo("assistant");sendQuestion(b.dataset.question);}));
document.getElementById("clearChat").addEventListener("click",()=>{chatMessages.innerHTML="";addMessage("Chat cleared. Hi Kaustubh! What campus information can I help you find?","bot");});


/* Role-based login and admin management */
let loginRole = "student";
let currentUser = null;
const loginScreen = document.getElementById("loginScreen");
const appShell = document.getElementById("studentApp");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const credentialHint = document.getElementById("credentialHint");

document.querySelectorAll(".role-tab").forEach(btn=>btn.addEventListener("click",()=>{
  loginRole=btn.dataset.role;
  document.querySelectorAll(".role-tab").forEach(b=>b.classList.toggle("active",b===btn));
  credentialHint.textContent=loginRole==="admin"?"Admin: admin / admin123":"Student: student / student123";
  loginError.textContent="";
}));
function getStudentLogin(){
  const username=document.getElementById("loginUsername").value.trim().toLowerCase();
  return students.find(s=>s.id.toLowerCase()===username || (username==="student" && s.id==="STU001"));
}
function login(role,user){
  currentUser=user; loginScreen.style.display="none"; appShell.classList.add("authenticated"); document.body.classList.toggle("is-admin",role==="admin");
  const name=role==="admin"?"Campus Administrator":user.name;
  document.getElementById("topAvatar").textContent=role==="admin"?"AD":(user.name||"MG").split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase();
  document.querySelector(".student-mini strong").textContent=name;
  document.querySelector(".student-mini small").textContent=role==="admin"?"Administrator":""+(user.course||"BCS")+" Student";
  document.getElementById("pageTitle").textContent=role==="admin"?"Welcome, Administrator! 🛡️":"Good morning, "+(user.name||"Student")+"! ☀️";
  if(role==="admin"){goTo("admin");renderAdmin();} else {goTo("dashboard");refreshStudentDashboard();}
  showToast("Login successful");
}
loginForm.addEventListener("submit",e=>{
 e.preventDefault();
 const username=document.getElementById("loginUsername").value.trim(); const password=document.getElementById("loginPassword").value;
 if(loginRole==="admin" && username.toLowerCase()==="admin" && password==="admin123"){login("admin",{name:"Campus Administrator"});return;}
 if(loginRole==="student" && password==="student123"){
   const user=getStudentLogin(); if(user){login("student",user);return;}
 }
 loginError.textContent="Invalid login details. Please use the demo credentials shown below.";
});
document.getElementById("logoutBtn").addEventListener("click",()=>{
 currentUser=null; appShell.classList.remove("authenticated"); document.body.classList.remove("is-admin"); loginScreen.style.display="grid"; loginForm.reset(); loginRole="student"; document.querySelectorAll(".role-tab").forEach((b,i)=>b.classList.toggle("active",i===0)); credentialHint.textContent="Student: student / student123"; showToast("Logged out successfully");
});
document.getElementById("adminShortcut").addEventListener("click",()=>{goTo("admin");renderAdmin();});

function refreshStudentDashboard(){
 if(!currentUser)return;
 const n=currentUser.name||"Student"; document.querySelector(".student-mini strong").textContent=n; document.getElementById("pageTitle").textContent="Good morning, "+n+"! ☀️";
 const initials=n.split(/\s+/).map(x=>x[0]).slice(0,2).join("").toUpperCase(); document.querySelector(".student-mini .avatar").textContent=initials; document.getElementById("topAvatar").textContent=initials;
 const pct=Number(currentUser.attendance)||0;
 const cards=document.querySelectorAll(".stat-card"); if(cards[0]){cards[0].querySelector(".stat-value").innerHTML=pct+"<span>%</span>";cards[0].querySelector(".progress i").style.width=pct+"%";cards[0].querySelector("small").textContent=pct>=75?"Minimum required: 75%":"Below minimum required: 75%";}
 const attendanceBig=document.querySelector(".attendance-big"); if(attendanceBig){attendanceBig.querySelector("strong").innerHTML=pct+"<small>%</small>";attendanceBig.querySelector(".progress i").style.width=pct+"%";attendanceBig.querySelector("p").textContent=pct>=75?"You're above the 75% minimum requirement.":"Your attendance is below the 75% minimum requirement.";}
}

function renderAdmin(){
 const stats=document.getElementById("adminStats"); const avg=students.length?Math.round(students.reduce((a,s)=>a+(Number(s.attendance)||0),0)/students.length):0;
 stats.innerHTML=`<div class="admin-stat"><span>Total students</span><strong>${students.length}</strong></div><div class="admin-stat"><span>Average attendance</span><strong>${avg}%</strong></div><div class="admin-stat"><span>Total notices</span><strong>${notices.length}</strong></div><div class="admin-stat"><span>Important notices</span><strong>${notices.filter(n=>n.category==="IMPORTANT").length}</strong></div>`;
 renderStudents(); renderAdminNotices();
}
function renderStudents(){
 const q=(document.getElementById("studentSearch").value||"").toLowerCase();
 const list=students.filter(s=>`${s.id} ${s.name} ${s.course} ${s.email}`.toLowerCase().includes(q));
 document.getElementById("studentTableBody").innerHTML=list.length?list.map(s=>`<tr><td><strong>${s.name}</strong><span class="student-contact">${s.semester?"Semester "+s.semester:""}</span></td><td>${s.id}</td><td>${s.course}</td><td><span class="attendance-pill ${Number(s.attendance)<75?"low":""}">${s.attendance}%</span></td><td><span class="student-contact">${s.email||"—"}<br>${s.phone||"—"}</span></td><td><button class="table-action" data-edit="${s.id}">Edit</button><button class="table-action delete" data-delete="${s.id}">Delete</button></td></tr>`).join(""):'<tr><td colspan="6" style="text-align:center;color:#9999aa">No students found.</td></tr>';
 document.querySelectorAll("[data-edit]").forEach(b=>b.addEventListener("click",()=>editStudent(b.dataset.edit)));
 document.querySelectorAll("[data-delete]").forEach(b=>b.addEventListener("click",()=>deleteStudent(b.dataset.delete)));
}
function clearStudentForm(){document.getElementById("studentForm").reset();document.getElementById("editStudentId").value="";document.getElementById("studentCourse").value="BCS";document.getElementById("studentSemester").value="VI";document.getElementById("studentAttendance").value=75;}
function editStudent(id){const s=students.find(x=>x.id===id);if(!s)return;document.getElementById("editStudentId").value=s.id;document.getElementById("studentId").value=s.id;document.getElementById("studentName").value=s.name;document.getElementById("studentCourse").value=s.course;document.getElementById("studentSemester").value=s.semester;document.getElementById("studentEmail").value=s.email||"";document.getElementById("studentPhone").value=s.phone||"";document.getElementById("studentAttendance").value=s.attendance;document.getElementById("studentName").focus();}
function deleteStudent(id){if(id==="STU001"){showToast("Demo primary student cannot be deleted.");return;}if(!confirm("Delete this student record?"))return;students=students.filter(s=>s.id!==id);saveStudents();renderAdmin();showToast("Student deleted");}
document.getElementById("studentForm").addEventListener("submit",e=>{e.preventDefault();const oldId=document.getElementById("editStudentId").value;const item={id:document.getElementById("studentId").value.trim(),name:document.getElementById("studentName").value.trim(),course:document.getElementById("studentCourse").value.trim(),semester:document.getElementById("studentSemester").value.trim(),email:document.getElementById("studentEmail").value.trim(),phone:document.getElementById("studentPhone").value.trim(),attendance:Number(document.getElementById("studentAttendance").value)};if(!item.id||!item.name)return;if(oldId){const i=students.findIndex(s=>s.id===oldId);if(i>=0)students[i]=item;}else{if(students.some(s=>s.id.toLowerCase()===item.id.toLowerCase())){showToast("Student ID already exists");return;}students.push(item);}saveStudents();clearStudentForm();renderAdmin();showToast(oldId?"Student updated":"Student added");});
document.getElementById("clearStudentForm").addEventListener("click",clearStudentForm);
document.getElementById("studentSearch").addEventListener("input",renderStudents);
document.getElementById("noticeForm").addEventListener("submit",e=>{e.preventDefault();notices.unshift({category:document.getElementById("adminNoticeCategory").value,title:document.getElementById("adminNoticeTitle").value.trim(),description:document.getElementById("adminNoticeDescription").value.trim(),date:"Just now",icon:document.getElementById("adminNoticeCategory").value==="IMPORTANT"?"⚑":document.getElementById("adminNoticeCategory").value==="EVENT"?"✦":"▤"});saveNotices();e.target.reset();renderAdmin();renderNotices();document.getElementById("latestNotices").innerHTML=notices.slice(0,3).map(noticeMarkup).join("");showToast("Notice published successfully");});
function renderAdminNotices(){document.getElementById("adminNoticeList").innerHTML=notices.map((n,i)=>`<div class="admin-notice-row"><span class="category ${n.category}">${n.category}</span><div><strong>${n.title}</strong><small>${n.date}</small></div><button class="admin-delete" data-notice-index="${i}">Delete</button></div>`).join("");document.querySelectorAll("[data-notice-index]").forEach(b=>b.addEventListener("click",()=>{const i=Number(b.dataset.noticeIndex);if(!confirm("Delete this notice?"))return;notices.splice(i,1);saveNotices();renderAdmin();renderNotices();document.getElementById("latestNotices").innerHTML=notices.slice(0,3).map(noticeMarkup).join("");showToast("Notice deleted");}));}
