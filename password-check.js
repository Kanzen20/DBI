document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('pwdCheckBtn');
  const input = document.getElementById('pwdInput');
  const result = document.getElementById('pwdResult');

  function scorePassword(pwd){
    let score = 0;
    if(!pwd) return {score:0, suggestions:['Wpisz hasło']};
    if(pwd.length >= 16) score += 4;
    else if(pwd.length >= 12) score += 3;
    else if(pwd.length >= 8) score += 2;

    if(/[a-z]/.test(pwd)) score += 1;
    if(/[A-Z]/.test(pwd)) score += 1;
    if(/[0-9]/.test(pwd)) score += 1;
    if(/[^A-Za-z0-9]/.test(pwd)) score += 1;

    const weakPatterns = ['1234','password','qwerty','admin','letmein','haslo'];
    weakPatterns.forEach(p => { if(pwd.toLowerCase().includes(p)) score -= 2;   
    });

    const suggestions = [];
    if(pwd.length < 12) suggestions.push('Użyj co najmniej 12 znaków');
    if(!/[A-Z]/.test(pwd)) suggestions.push('Dodaj wielką literę');
    if(!/[0-9]/.test(pwd)) suggestions.push('Dodaj cyfrę');
    if(!/[^A-Za-z0-9]/.test(pwd)) suggestions.push('Dodaj znak specjalny, np. !@#');
    if(weakPatterns.some(p => pwd.toLowerCase().includes(p))) suggestions.push('Unikaj prostych słów i ciągów');

    return {score: Math.max(0, score), suggestions};
  }

  btn?.addEventListener('click', () => {
    const pwd = input.value || '';
    const res = scorePassword(pwd);
    let label = 'Słabe';
    if(res.score >= 7) label = 'Bardzo silne';
    else if(res.score >= 5) label = 'Silne';
    else if(res.score >= 3) label = 'Średnie';

    result.innerHTML = `<p><strong>Ocena:</strong> ${label} (punkty: ${res.score})</p>
      <p><strong>Sugestie:</strong> ${res.suggestions.join('; ') || 'Brak'}</p>
      <p><strong>Porada:</strong> używaj menedżera haseł i unikalnych haseł dla każdej usługi.</p>`;
  });
}); 