// ==========================================
// 1. PRELOADER KALDIRMA (GÜVENLİ VERSİYON)
// ==========================================
function kaldirPreloader() {
    document.body.classList.add('yuklendi');
}

// Sayfa tamamen yüklendiğinde 1.5 saniye bekle ve kaldır
window.addEventListener('load', () => {
    setTimeout(kaldirPreloader, 1500); 
});

// GÜVENLİK (Failsafe): Eğer dışarıdan gelen bir resim veya API hata verip sayfayı takılı bırakırsa, 
// sonsuza kadar bekleme, 4 saniye sonra ekranı ZORLA aç.
setTimeout(kaldirPreloader, 4000);


// ==========================================
// 2. DİNAMİK HAVA DURUMU API
// ==========================================
window.addEventListener('load', function() {
    const apiAnahtari = 'dc6e5076ecff43cac0a1e4ef7710f889'; 
    const sehir = 'Dortmund'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${sehir}&appid=${apiAnahtari}&units=metric&lang=en`;

    const sehirElement = document.getElementById('sehir');
    const sicaklikElement = document.getElementById('sicaklik');
    const aciklamaElement = document.getElementById('aciklama');
    const ikonElement = document.getElementById('hava-ikon');

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("API Error");
            return response.json(); 
        })
        .then(data => {
            sehirElement.textContent = data.name;
            sicaklikElement.textContent = `${Math.round(data.main.temp)}°C`;
            aciklamaElement.textContent = data.weather[0].description.toUpperCase();
            
            const ikonKodu = data.weather[0].icon;
            ikonElement.className = ''; 
            ikonElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${ikonKodu}@2x.png" alt="Weather Icon">`;
        })
        .catch(error => {
            console.error('Weather API Hatası:', error);
            sehirElement.textContent = "Error!";
            aciklamaElement.textContent = "API Key Pending...";
            ikonElement.className = 'fas fa-exclamation-triangle'; 
        });
});


// ==========================================
// 3. İKONLU TEMA DEĞİŞTİRİCİ
// ==========================================
const temaButonu = document.getElementById('tema-butonu');
const temaIkon = document.getElementById('tema-ikon');

temaButonu.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        temaIkon.classList.remove('fa-moon');
        temaIkon.classList.add('fa-sun');
    } else {
        temaIkon.classList.remove('fa-sun');
        temaIkon.classList.add('fa-moon');
    }
});


// ==========================================
// 4. DAKTİLO EFEKTİ
// ==========================================
const daktiloMetinleri = ["Frontend Developer", "Software Enthusiast", "Always Learning New Things"];
let metinIndex = 0;
let harfIndex = 0;
let siliniyorMu = false;
const daktiloElementi = document.getElementById("daktilo");

function daktiloEt() {
    if (!daktiloElementi) return; // Eğer element yoksa hata verme
    const guncelMetin = daktiloMetinleri[metinIndex];
    
    if (siliniyorMu) {
        daktiloElementi.textContent = guncelMetin.substring(0, harfIndex - 1);
        harfIndex--;
    } else {
        daktiloElementi.textContent = guncelMetin.substring(0, harfIndex + 1);
        harfIndex++;
    }

    let beklemeSuresi = siliniyorMu ? 50 : 100;

    if (!siliniyorMu && harfIndex === guncelMetin.length) {
        beklemeSuresi = 2000; 
        siliniyorMu = true;
    } else if (siliniyorMu && harfIndex === 0) {
        siliniyorMu = false;
        metinIndex = (metinIndex + 1) % daktiloMetinleri.length;
        beklemeSuresi = 500;
    }

    setTimeout(daktiloEt, beklemeSuresi);
}
document.addEventListener("DOMContentLoaded", daktiloEt);


// ==========================================
// 5. SCROLL ANİMASYONLARI VE İLERLEME ÇUBUĞU
// ==========================================
const gozlemci = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('goster');
        }
    });
});
document.querySelectorAll('section').forEach((el) => gozlemci.observe(el));

window.addEventListener('scroll', () => {
    const sayfaYuksekligi = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const kaydirilanMiktar = document.documentElement.scrollTop;
    const yuzde = (kaydirilanMiktar / sayfaYuksekligi) * 100;
    const ilerlemeCubugu = document.getElementById('ilerleme-cubugu');
    if(ilerlemeCubugu) ilerlemeCubugu.style.width = yuzde + '%';
});


// ==========================================
// 6. TERMİNAL SİMÜLASYONU
// ==========================================
const terminalCikti = document.getElementById('terminal-cikti');
const terminalVerileri = [
    { type: 'komut', text: 'whoami' },
    { type: 'cikti', text: 'Alperen BAYIR - Future Developer' },
    { type: 'komut', text: 'ls skills/' },
    { type: 'cikti', text: 'HTML.md  CSS.md  JavaScript.js  React.jsx' },
    { type: 'komut', text: 'cat goals.txt' },
    { type: 'cikti', text: '-> Constantly learning and making a difference with modern technologies.' },
    { type: 'yukleniyor', text: 'Booting portfolio_v2.0...' },
    { type: 'basari', text: 'System Status: OPTIMAL. Ready to explore.' }
];
let satirIndex = 0;

function terminalYaz() {
    if (!terminalCikti) return;
    if (satirIndex < terminalVerileri.length) {
        const veri = terminalVerileri[satirIndex];
        const yeniSatir = document.createElement('span');
        yeniSatir.classList.add('terminal-satir');

        if (veri.type === 'komut') {
            yeniSatir.innerHTML = `<span class="komut">alperen@cv:~$</span> ${veri.text}`;
        } else if (veri.type === 'cikti') {
            yeniSatir.textContent = veri.text;
        } else if (veri.type === 'yukleniyor') {
            yeniSatir.classList.add('yukleniyor');
            yeniSatir.textContent = `> ${veri.text}`;
        } else if (veri.type === 'basari') {
            yeniSatir.classList.add('basari');
            yeniSatir.textContent = `[OK] ${veri.text}`;
        }

        terminalCikti.insertBefore(yeniSatir, terminalCikti.lastElementChild);
        satirIndex++;
        setTimeout(terminalYaz, veri.type === 'komut' ? 1000 : 500);
    }
}
window.addEventListener('load', () => setTimeout(terminalYaz, 1500));


// ==========================================
// 7. ÖZEL İMLEÇ (CUSTOM CURSOR) VE MANYETİK BUTONLAR
// ==========================================
const imlecNokta = document.getElementById('imlec-nokta');
const imlecCember = document.getElementById('imlec-cember');

if (window.innerWidth > 768) { // Sadece bilgisayarlarda çalışsın
    document.addEventListener('mousemove', (e) => {
        if(imlecNokta) {
            imlecNokta.style.left = `${e.clientX}px`;
            imlecNokta.style.top = `${e.clientY}px`;
        }
        if(imlecCember) {
            setTimeout(() => {
                imlecCember.style.left = `${e.clientX}px`;
                imlecCember.style.top = `${e.clientY}px`;
            }, 50);
        }
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(imlecCember) {
                imlecCember.style.width = '60px';
                imlecCember.style.height = '60px';
                imlecCember.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if(imlecCember) {
                imlecCember.style.width = '40px';
                imlecCember.style.height = '40px';
                imlecCember.style.backgroundColor = 'transparent';
            }
        });
    });

    // Manyetik Buton Efekti (Sadece masaüstü)
    document.querySelectorAll('.sosyal-ikonlar a, #tema-butonu').forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const pozisyon = element.getBoundingClientRect();
            const x = e.clientX - pozisyon.left - pozisyon.width / 2;
            const y = e.clientY - pozisyon.top - pozisyon.height / 2;
            element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
            element.style.transition = 'transform 0.1s ease-out';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px) scale(1)';
            element.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; 
        });
    });
}


// ==========================================
// 8. KONAMI CODE EASTER EGG (KLAVYE + MOBİL D-PAD)
// ==========================================
const konamiKodu = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

function aktiveEtEasterEgg() {
    document.body.classList.toggle('matrix-modu');
    if (document.body.classList.contains('matrix-modu')) {
        alert('Congratulations! Hacker Mode Activated. 😎');
    } else {
        alert('Returning to normal mode.');
    }
}

function inputKonamiKey(key) {
    if (key === konamiKodu[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiKodu.length) {
            aktiveEtEasterEgg();
            konamiIndex = 0; 
        }
    } else {
        konamiIndex = 0; 
    }
}

// Masaüstü Klavye Dinleyicisi
document.addEventListener('keydown', (e) => inputKonamiKey(e.key));

// Mobil On-Screen D-pad Dinleyicisi
const keyMap = { 'up': 'ArrowUp', 'down': 'ArrowDown', 'left': 'ArrowLeft', 'right': 'ArrowRight', 'a': 'a', 'b': 'b' };
document.querySelectorAll('.konami-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const inputKey = keyMap[this.dataset.key]; 
        inputKonamiKey(inputKey);
    });
});


// ==========================================
// 9. PARTICLES.JS (ARKA PLAN AĞLARI)
// ==========================================
if(typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: "#3498db" }, 
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true, distance: 150, color: "#3498db", opacity: 0.4, width: 1
            },
            move: {
                enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false,
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" }, 
                onclick: { enable: true, mode: "push" }, 
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

// ==========================================
// 10. MOBİL EASTER EGG KONTROLCÜSÜNÜ GÖSTERME
// ==========================================
const easterEggTetikleyici = document.querySelector('.gizli-ipucu');
const mobilKontrolcu = document.getElementById('mobile-konami-controller');

if (easterEggTetikleyici && mobilKontrolcu) {
    easterEggTetikleyici.addEventListener('click', () => {
        // Sadece telefon ekranlarındayken (genişlik 768px ve altı) çalışsın
        if (window.innerWidth <= 768) {
            // Buton panelini aç/kapat
            mobilKontrolcu.classList.toggle('aktif');
            
            // Kullanıcıya ipucu metnini değiştirerek havalı bir geri bildirim verelim
            if (mobilKontrolcu.classList.contains('aktif')) {
                easterEggTetikleyici.style.color = '#64ffda';
                easterEggTetikleyici.textContent = "System Override: Enter the code using the terminal below...";
            } else {
                easterEggTetikleyici.style.color = '';
                easterEggTetikleyici.textContent = "System Notice: A glitch exists in the Matrix. Look for the classic Konami Code hints...";
            }
        }
    });
}