// Keep this entry independent of React and app dependencies so the static
// loading screen remains useful while the main bundle loads or fails.
const loading = document.getElementById('boot-loading');
const status = document.getElementById('boot-status');
const description = document.getElementById('boot-description');
const reload = document.getElementById('boot-reload');

try {
  if (localStorage.getItem('sessions-box-theme') === 'light') {
    loading.dataset.theme = 'light';
  }
} catch {
  // Storage can be unavailable; the loading screen still works.
}

reload.addEventListener('click', () => window.location.reload());

const slowStart = window.setTimeout(() => {
  if (!loading.isConnected) return;
  status.textContent = 'Still starting…';
  description.textContent = 'This is taking a little longer. You can keep waiting while the app opens.';
}, 12000);

function ready() {
  window.clearTimeout(slowStart);
  window.removeEventListener('sessions-box-ready', ready);
}
window.addEventListener('sessions-box-ready', ready);

import('./main.jsx').catch(error => {
  ready();
  console.error('[boot] Could not load Sessions Box:', error);
  if (!loading.isConnected) return;
  loading.dataset.state = 'error';
  loading.setAttribute('aria-busy', 'false');
  status.textContent = 'Could not open Sessions Box';
  description.textContent = 'Something went wrong while starting the app. Please try again.';
  reload.hidden = false;
});
