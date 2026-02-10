document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('privacyCheckBtn');
  const out = document.getElementById('privacyResult');

  function analyzeLocalPrivacy(){
    const issues = [];
    const tips = [];


    try {
      const isSecure = location.protocol === 'https:' || location.hostname === 'localhost';
      if(!isSecure) {
        issues.push('Połączenie nie jest szyfrowane (brak HTTPS). Unikaj logowania się na stronach bez HTTPS.');
        tips.push('Używaj stron z https://; rozważ instalację rozszerzenia wymuszającego HTTPS.');
      } else {
        tips.push('Połączenie jest szyfrowane (HTTPS).');
      }
    } catch(e){}


    try {
      if(navigator.cookieEnabled) {
        tips.push('Cookies są włączone — to normalne, ale sprawdź ustawienia ciasteczek w przeglądarce i usuń ciasteczka stron trzecich.');
      } else {
        issues.push('Cookies są wyłączone — niektóre serwisy mogą nie działać poprawnie.');
      }
    } catch(e){}


    try {
      const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
      if(dnt === '1' || dnt === 1) {
        tips.push('Masz włączone Do Not Track — nie wszystkie serwisy respektują tę opcję.');
      } else {
        tips.push('Do Not Track jest wyłączone. Możesz rozważyć włączenie lub użycie rozszerzeń blokujących śledzenie.');
      }
    } catch(e){}


    try {
      if('serviceWorker' in navigator) {
        tips.push('Przeglądarka obsługuje Service Worker — przydatne dla PWA, ale sprawdzaj uprawnienia instalowanych rozszerzeń.');
      } else {
        tips.push('Brak obsługi Service Worker — starsza przeglądarka może mieć ograniczenia.');
      }
    } catch(e){}


    try {
      const rtcSupport = !!(window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection);
      if(rtcSupport) {
        tips.push('Przeglądarka obsługuje WebRTC — w niektórych konfiguracjach może ujawniać lokalne IP. VPN + ustawienia przeglądarki mogą pomóc.');
      } else {
        tips.push('Brak wsparcia WebRTC — mniejsze ryzyko wycieku lokalnego IP przez WebRTC.');
      }
    } catch(e){}


    try {
      const ua = navigator.userAgent || 'brak';
      tips.push(`Informacje o przeglądarce: ${ua.split(')')[0]})`);
    } catch(e){}

    if(issues.length === 0) issues.push('Brak krytycznych problemów wykrytych lokalnie — to nie gwarantuje pełnego bezpieczeństwa.');

    return {issues, tips};
  }

  btn?.addEventListener('click', () => {
    out.innerHTML = '<p>Analizuję ustawienia lokalne...</p>';
    setTimeout(() => {
      const res = analyzeLocalPrivacy();
      out.innerHTML = '<h4>Wykryte problemy</h4><ul>' + res.issues.map(i => `<li>${i}</li>`).join('') + '</ul>'
        + '<h4>Wskazówki</h4><ul>' + res.tips.map(t => `<li>${t}</li>`).join('') + '</ul>'
        + '<p><strong>Uwaga:</strong> to narzędzie wykonuje jedynie lokalną, edukacyjną analizę. Nie zastępuje audytu bezpieczeństwa.</p>';
    }, 300);
  });
});