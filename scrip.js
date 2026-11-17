// MACAFÉ — interacciones de la página

const header = document.getElementById('siteHeader');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const icon = menuBtn.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const icon = menuBtn.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');
  });
});

// Animaciones al entrar cada bloque en pantalla
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

// Video local: videos/macafe.mp4
const brandVideo = document.getElementById('brandVideo');
const videoOverlay = document.getElementById('videoOverlay');
const playVideo = document.getElementById('playVideo');

playVideo.addEventListener('click', async () => {
  try {
    await brandVideo.play();
    videoOverlay.classList.add('hidden');
  } catch (error) {
    videoOverlay.querySelector('small').textContent =
      'No se encontró el video. Agrega tu archivo MP4 en la carpeta videos.';
  }
});

brandVideo.addEventListener('play', () => videoOverlay.classList.add('hidden'));
brandVideo.addEventListener('pause', () => videoOverlay.classList.remove('hidden'));
brandVideo.addEventListener('ended', () => videoOverlay.classList.remove('hidden'));

// Gráfico construido con los datos del anexo del proyecto MACAFÉ.
const demandCanvas = document.getElementById('demandChart');

if (demandCanvas && window.Chart) {
  const ctx = demandCanvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(240,79,131,.30)');
  gradient.addColorStop(1, 'rgba(240,79,131,0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2021','2022','2023','2024','2025','2026','2027','2028','2029','2030'],
      datasets: [{
        label: 'Demanda estimada',
        data: [4500,4725,4961,5209,5469,5699,5942,6184,6426,6668],
        borderColor: '#ef5685',
        backgroundColor: gradient,
        fill: true,
        tension: .38,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#ef5685',
        pointBorderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: { usePointStyle: true, boxWidth: 8, padding: 20, font: { family: 'DM Sans', size: 10 } }
        },
        tooltip: {
          backgroundColor: '#2b1740',
          padding: 12,
          callbacks: {
            label: context => ' Consumidores: ' + new Intl.NumberFormat('es-CO').format(context.parsed.y)
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 4000,
          grid: { color: '#f0eaf3' },
          ticks: { font: { family: 'DM Sans', size: 10 }, callback: value => new Intl.NumberFormat('es-CO').format(value) }
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: 'DM Sans', size: 10 } }
        }
      }
    }
  });
}

console.log('MACAFÉ: sitio web listo. ¡Que el sabor comience!');
