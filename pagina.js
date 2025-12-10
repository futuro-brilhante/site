// 🔥 Modo escuro
document.getElementById("darkToggle").onclick = ()=>{
    document.body.classList.toggle("dark");
};

// 🚪 Botão Sair
document.getElementById("exit").onclick = ()=>{
    window.location.href="pagina.html"; 
};

// 📌 Integração preparada para Firebase
/*  
firebase.initializeApp({ apiKey:"", authDomain:"", projectId:"" });

firebase.auth().onAuthStateChanged(user=>{
    if(!user) return location.href="login.html";
    document.getElementById("userFoto").src = user.photoURL || "avatar.png";
});
*/

// 📌 Integração Node + MySQL exemplo
/*
fetch("/api/userInfo")
.then(r=>r.json())
.then(d=>{
    document.getElementById("progresso").style.width=d.progresso+"%";
    document.getElementById("textoProgresso").innerHTML=d.progresso+"% concluído";
    userFoto.src=d.avatar;
});
*/

/* ===== Manutenção: controle e título/aba ===== */
(function(){
  const maintenance = document.getElementById('maintenance');
  const btnClose = document.getElementById('maintenance-close');

  // mostra o painel (remova se quiser que fique sempre oculto)
  function showMaintenance(){ maintenance.classList.remove('maintenance-hidden'); maintenance.style.display='block'; }
  function hideMaintenance(){ maintenance.classList.add('maintenance-hidden'); maintenance.style.display='none'; }

  // abrir por padrão
  showMaintenance();

  btnClose.addEventListener('click', hideMaintenance);

  // animação do título da aba (alternando)
  const baseTitle = document.title || 'Futuro Brilhante';
  const msg = '⏳ Em manutenção — volte em breve';
  let on = true;
  setInterval(()=> {
    document.title = on ? msg : baseTitle;
    on = !on;
  }, 1800);

  // define favicon simples (SVG data URL com ampulheta)
  function setSvgFavicon(color = '#ffd34d'){
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='12' fill='none'/><text x='50' y='60' font-size='48' text-anchor='middle' fill='${color}'>⏳</text></svg>`;
    const url = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    let link = document.querySelector("link[rel~='icon']");
    if(!link){
      link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link);
    }
    link.href = url;
  }
  setSvgFavicon();

  // se quiser esconder em telas pequenas automaticamente:
  // if(window.innerWidth < 420) hideMaintenance();

})();

