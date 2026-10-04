const $ = id => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  $("year").textContent = new Date().getFullYear();
  const saved = JSON.parse(localStorage.getItem("gamingToolsCustom") || "null");
  if (saved) applyCustom(saved);
});

function openCustomizer(){ $("customizer").classList.add("show"); }
function closeCustomizer(){ $("customizer").classList.remove("show"); }

function applyCustom(data){
  document.documentElement.style.setProperty("--accent", data.accent || "#b6ff00");
  document.querySelector(".logo").innerHTML = `<span>GT</span> ${data.siteName || "Gaming Tools"}`;
  const h = document.querySelector(".hero h1");
  if (h && data.heroHeading) {
    const words = data.heroHeading.trim().split(" ");
    const last = words.pop();
    h.innerHTML = `${words.join(" ")} <span>${last}</span>`;
  }
  $("siteName").value = data.siteName || "Gaming Tools";
  $("heroHeading").value = data.heroHeading || "Level Up Your Gaming";
  $("accent").value = data.accent || "#b6ff00";
}

function saveCustom(){
  const data = {
    siteName: $("siteName").value.trim() || "Gaming Tools",
    heroHeading: $("heroHeading").value.trim() || "Level Up Your Gaming",
    accent: $("accent").value
  };
  localStorage.setItem("gamingToolsCustom", JSON.stringify(data));
  applyCustom(data);
  closeCustomizer();
  toast("Customization saved on this browser.");
}

function resetCustom(){
  localStorage.removeItem("gamingToolsCustom");
  applyCustom({siteName:"Gaming Tools",heroHeading:"Level Up Your Gaming",accent:"#b6ff00"});
  toast("Customization reset.");
}

function showTool(name){
  toast(name + " — इस demo में tool page अभी placeholder है.");
}

function toast(message){
  const t = $("toast");
  t.textContent = message;
  t.style.display = "block";
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(()=>t.style.display="none", 2500);
}

$("customizer").addEventListener("click", e => {
  if(e.target.id === "customizer") closeCustomizer();
});
