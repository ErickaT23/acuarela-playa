import { eventData } from './config.js';

document.addEventListener('DOMContentLoaded', () => {

  // --- Apertura del sobre ---
  const seal = document.getElementById('seal');
  const envelope = document.getElementById('envelope');
  const mainContent = document.querySelector('.main-content');
  const audioPlayer = document.getElementById('audioPlayer');
  const playPauseButton = document.getElementById('playPauseButton');

  seal.addEventListener('click', () => {
    envelope.classList.add('open');
    setTimeout(() => {
      envelope.style.display = 'none';
      mainContent.classList.remove('hidden');
      audioPlayer.play();
      playPauseButton.innerText = 'Pause';
    }, 1000);
  });

  // --- Cargar datos generales ---
  document.getElementById('couple-names').innerText = eventData.couple.names;
  document.getElementById('wedding-date').innerText = eventData.couple.date;
  document.getElementById('hero-image').src = eventData.couple.heroImage;

  // --- Música ---
  audioPlayer.src = eventData.song.file;
  document.getElementById('song-title').innerText = eventData.song.title;

  const progressBar = document.getElementById('progress-bar');
  const currentTime = document.getElementById('current-time');
  const durationTime = document.getElementById('duration-time');

  playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseButton.innerText = 'Pause';
    } else {
      audioPlayer.pause();
      playPauseButton.innerText = 'Play';
    }
  });

  audioPlayer.addEventListener('loadedmetadata', () => {
    durationTime.textContent = formatTime(audioPlayer.duration);
  });

  audioPlayer.addEventListener('timeupdate', () => {
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    currentTime.textContent = formatTime(audioPlayer.currentTime);
  });

  progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
  });

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

//--- Botón para añadir al calendario ---
window.addToCalendar = function () {
  const calendarURL = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nos+casamos+María+%26+Emanuel&dates=20260305T223000Z/&details=¡Acompáñanos+a+celebrar+el+amor+en+República+Dominicana!&location=Hotel+Grand+Bavaro+Princess&sf=true&output=xml";
  window.open(calendarURL, "_blank");
}


  // --- Itinerario ---
  // --- Ceremonia ---
  document.getElementById('ceremony-image').src = eventData.ceremony.ceremonyImage;
  document.getElementById('ceremony-place').innerText = eventData.ceremony.place;
  document.getElementById('ceremony-address').innerText = eventData.ceremony.address;
  document.getElementById('ceremony-date').innerText = eventData.ceremony.date;
  document.getElementById('ceremony-time').innerText = eventData.ceremony.time;
  document.getElementById('ceremony-map').onclick = () => window.open(eventData.ceremony.mapLink, '_blank');

    // --- Recepción ---
  document.getElementById('reception-image').src = eventData.reception.receptionImage;
  document.getElementById('reception-place').innerText = eventData.reception.place;
  document.getElementById('reception-address').innerText = eventData.reception.address;
  document.getElementById('reception-date').innerText = eventData.reception.date;
  document.getElementById('reception-time').innerText = eventData.reception.time;
  document.getElementById('reception-map').onclick = () => window.open(eventData.reception.mapLink, '_blank');

  // --- Lluvia de sobres ---
  const bankDetails = document.getElementById('bank-details');

  eventData.banks.forEach((bank, index) => {
    const button = document.createElement('button');
    button.textContent = bank.bank;
    button.className = 'bank-toggle';
    button.setAttribute('data-index', index);
  
    const details = document.createElement('div');
    details.className = 'bank-details collapse';
    details.innerHTML = `
      <p><strong>Banco Agromercantil</strong></p>
      <p><strong>Número de cuenta:</strong> ${bank.accountNumber}</p>
      <p><strong>Tipo de cuenta:</strong> ${bank.accountType}</p>
    `;
  
    button.addEventListener('click', () => {
      details.classList.toggle('open');
    });
  
    bankDetails.appendChild(button);
    bankDetails.appendChild(details);
  });
  
  document.getElementById('abroad-gift-message').innerText = eventData.abroadGiftMessage;
  document.getElementById('gift-image').src = eventData.giftImage; // ← si lo controlas desde config.js
  
  // --- Dress Code ---
  // DRESS CODE dinámico
const dresscode = eventData.dresscode;

document.getElementById('dresscode-image').src = dresscode.image;

document.getElementById('dresscode-details').innerHTML = `
  <p>${dresscode.description}</p>
`;

document.getElementById('dresscode-inspo').innerHTML = `
  <button onclick="window.open('${dresscode.inspiration.women}', '_blank')">Inspiración para Mujeres</button>
  <button onclick="window.open('${dresscode.inspiration.men}', '_blank')">Inspiración para Hombres</button>
`;

//BUENOS DESEOS
// script.js (normal, sin import)
document.getElementById('send-wish').addEventListener('click', () => {
  document.getElementById('wish-form').classList.toggle('hidden');
});

document.getElementById('submit-wish').addEventListener('click', () => {
  const name = document.getElementById('wish-name').value.trim();
  const message = document.getElementById('wish-message').value.trim();

  if (name && message) {
    guardarDeseo(name, message)
      .then(() => {
        alert("¡Deseo enviado!");
        document.getElementById('wish-name').value = '';
        document.getElementById('wish-message').value = '';
        document.getElementById('wish-form').classList.add('hidden');
      })
      .catch(err => console.error("❌ Error al guardar el deseo:", err));
  } else {
    alert("Por favor, completá ambos campos.");
  }
});

document.getElementById('show-wishes').addEventListener('click', () => {
  const container = document.getElementById('wishes-container');
  container.classList.toggle('hidden');

  if (!container.classList.contains('hidden')) {
    escucharDeseos((lista) => {
      container.innerHTML = '';
      lista.forEach(deseo => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${deseo.nombre}</strong>: ${deseo.mensaje}`;
        container.appendChild(p);
      });
    });
  }
});


  // --- Final: Foto y Frase ---
  document.getElementById('final-photo').src = eventData.finalPhoto;
  document.getElementById('final-message').innerText = eventData.finalMessage;

  // --- Confirmaciones ---
  // --- Confirmaciones --- (espera a que loads.js defina `eventData.rsvp`)
// --- Confirmaciones --- (espera a que loads.js defina eventData.rsvp)
document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('rsvp-image');
  const msg = document.getElementById('rsvpMessage');
  const btn = document.getElementById('form-confirm');

  const checkRSVP = setInterval(() => {
    const rsvp = window.eventData?.rsvp;
    if (!rsvp) return;

    // set imagen si existe (no exigimos form)
    if (rsvp.rsvpImage) {
      img.src = rsvp.rsvpImage;
      img.loading = 'lazy';
      img.alt = 'Confirmación';
      img.onerror = () => { img.style.display = 'none'; };
    }

    // mensaje
    msg.innerText = "Estamos organizando todo con mucho cariño y tu presencia es parte importante. ¿Nos confirmás si podrás acompañarnos?";

    // link de acción: prioriza form, luego whatsapp (y corrige el posible typo 'whatapp')
    const targetUrl = rsvp.form || rsvp.whatsapp || rsvp.whatapp;
    if (targetUrl) {
      btn.onclick = () => window.open(targetUrl, '_blank', 'noopener');
    } else {
      btn.disabled = true;
      btn.textContent = "Pronto habilitaremos la confirmación";
    }

    clearInterval(checkRSVP);
  }, 100);
});



  
  // --- Footer (redes sociales) ---
  const socialIcons = document.getElementById('social-icons');

/*socialIcons.innerHTML = `
  <a href="${eventData.footer.social.whatsapp}" target="_blank" aria-label="whatsapp">
    <i class="fab fa-whatsapp"></i>
  </a>
  <a href="${eventData.footer.social.facebook}" target="_blank" aria-label="Facebook">
    <i class="fab fa-facebook"></i>
  </a>
  <a href="${eventData.footer.social.instagram}" target="_blank" aria-label="Instagram">
    <i class="fab fa-instagram"></i>
  </a>
`;*/

document.getElementById('footer-logo').src = eventData.footer.logo;


  // --- Animaciones Scroll (fade-in) ---
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => {
    observer.observe(section);
  });

  // --- Contador regresivo ---
  const [day, month, year] = eventData.couple.date.split('.').map(s => s.trim());
  const weddingDate = new Date(`${year}-${month}-${day}T00:00:00`);
  const countdown = setInterval(() => {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      clearInterval(countdown);
      document.getElementById('countdown').innerHTML = "<h2>¡Hoy es el gran día!</h2>";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
  }, 1000);

});
function addToCalendar() {
    const title = encodeURIComponent('Boda de Isa & Roberto');
    const details = encodeURIComponent('¡Acompáñanos en nuestra boda!');
    const location = encodeURIComponent('Escuela de Cristo, Antigua Guatemala');
    const startDate = '20260627T170000Z'; // ⚡ Importante: Formato UTC YYYYMMDDTHHMMSSZ
    const endDate = '20260627T230000Z';   // ⚡ Final estimado
    
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}&sf=true&output=xml`;
  
    window.open(googleCalendarUrl, '_blank');
  }
  
  //OPTIMIZAR
  // Acordeón para sección de hospedaje
  document.querySelectorAll('.hotel-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.target;
      const content = document.getElementById(targetId);

      // Ocultar los demás
      document.querySelectorAll('.hotel-content').forEach(div => {
        if (div.id !== targetId) div.classList.add('hidden');
      });

      // Toggle el actual
      content.classList.toggle('hidden');
    });
  });

  
