const q=document.getElementById("question"), result=document.getElementById("result"), logBox=document.getElementById("log");
const log=x=>{logBox.textContent+="\n"+x;logBox.scrollTop=logBox.scrollHeight};

function analyze(text){
 const x=text.toLowerCase(), h=[];
 if(/(capital|ibukota)/.test(x))h.push("Cari kota yang berfungsi sebagai pusat pemerintahan.");
 if(/(define|definition|pengertian|apa yang dimaksud)/.test(x))h.push("Fokus pada istilah inti dan cocokkan definisinya dengan pilihan.");
 if(/(calculate|hitung|berapa|persen|%|\+|\-|×|÷|=)/.test(x))h.push("Identifikasi angka dan operasi, lalu hitung langkah demi langkah.");
 if(/(cause|penyebab|mengapa|why)/.test(x))h.push("Cari hubungan sebab-akibat yang paling langsung berdasarkan materi.");
 if(/(effect|akibat|dampak|result)/.test(x))h.push("Bedakan penyebab dari akibat dan perhatikan konteks pertanyaan.");
 if(!h.length)h.push("Cari kata kunci soal, pahami konteks, lalu bandingkan pilihan berdasarkan materi.");
 return h;
}

document.getElementById("analyze").onclick=()=>{
 const text=q.value.trim();
 if(!text){result.textContent="Masukkan soal atau teks halaman terlebih dahulu.";return}
 const h=analyze(text);
 result.innerHTML="<b>Study guidance</b><ul>"+h.map(v=>"<li>"+v+"</li>").join("")+"</ul>"+
 (document.getElementById("explain").checked?"<p>Gunakan petunjuk ini untuk mengerjakan sendiri. Aplikasi tidak memilih atau mengirim jawaban ke situs.</p>":"");
 log("[ANALYZE] Local analysis completed.");
 localStorage.setItem("sa_last",text);
};

document.getElementById("clear").onclick=()=>{q.value="";result.textContent="Belum ada analisis.";log("[CLEAR] Input cleared.")};
document.getElementById("theme").onclick=()=>{document.body.classList.toggle("light")};

document.getElementById("bookmarklet").onclick=async()=>{
 const code=`javascript:(()=>{const t=[...document.querySelectorAll('body *')].filter(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return s.display!='none'&&s.visibility!='hidden'&&r.width&&r.height}).map(e=>e.innerText||'').join(' ').replace(/\\\\s+/g,' ').slice(0,4000);prompt('Copy teks halaman ini lalu kembali ke Study Assistant:',t)})()`;
 try{await navigator.clipboard.writeText(code);document.getElementById("copymsg").textContent="Bookmarklet disalin. Buat bookmark baru di Chrome lalu jadikan kode tersebut sebagai URL bookmark.";log("[BOOKMARKLET] Copied.")}catch(e){document.getElementById("copymsg").textContent="Salin kode bookmarklet dari README.txt.";log("[BOOKMARKLET] Clipboard blocked.")}};

const saved=localStorage.getItem("sa_last");if(saved)q.value=saved;
