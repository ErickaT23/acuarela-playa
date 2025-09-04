const guests = [
  { id: "guest1", name: "Ana y Luis", passes: 2 },
  { id: "guest2", name: "Carlos", passes: 1 },
  { id: "guest3", name: "María y José", passes: 2 },
];

document.addEventListener("DOMContentLoaded", () => {
  function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split("&");
    for (const pair of pairs) {
      const [key, value] = pair.split("=");
      params[decodeURIComponent(key)] = decodeURIComponent((value || '').replace(/\+/g, ' '));
    }
    return params;
  }

  const queryParams = getQueryParams();
  const guestId = queryParams.id;
  const guest = guests.find(g => g.id === guestId);

  if (guest) {
    // Sección: guest-name
    const guestNameSection = document.getElementById('guest-name');
    const message = guest.passes > 1
      ? "Este momento no estaría completo sin ustedes."
      : "Este momento no estaría completo sin usted.";
  
    guestNameSection.innerHTML = `
      <span class="guest-title">¡${guest.name}!</span><br>
      <span class="guest-message">${message}</span>
    `;
  
    // Sección: passes
    const passesSection = document.getElementById('passes');
    passesSection.textContent =
      `${guest.passes} ${guest.passes === 1 ? 'lugar reservado con cariño.' : 'lugares reservados con cariño.'}`;

      if (!window.eventData) window.eventData = {};

window.eventData.rsvp = {
  rsvpImage: "/images/rsvp.png",
  form: `https://docs.google.com/forms/d/e/1FAIpQLSdAcHTQU0WBzqMlkJ4tIUVqY60DOG9GiDr0mCbFcBDhxmjITw/viewform?usp=pp_url&entry.42292443=${encodeURIComponent(guest.name)}&entry.800985369=${guest.passes}`
};
  
  } else {
    document.getElementById('guest-name').textContent = `¡Invitado no encontrado!`;
    const invitationInfo = document.querySelector('.invitation-info-section');
    if (invitationInfo) invitationInfo.style.display = 'none';
  }  
});

  