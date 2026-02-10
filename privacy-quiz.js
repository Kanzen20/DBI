document.addEventListener('DOMContentLoaded', function () {
  var startBtn = document.getElementById('startQuizBtn');
  var area = document.getElementById('quizArea');
  var result = document.getElementById('quizResult');

  var quiz = [
    {
      q: 'Co to jest 2FA?',
      options: ['Dodatkowe hasło wysyłane SMS', 'Dwuskładnikowe uwierzytelnianie', 'Szyfrowanie plików'],
      a: 1,
      explain: '2FA to dwuskładnikowe uwierzytelnianie — wymaga dwóch niezależnych metod potwierdzenia tożsamości.'
    },
    {
      q: 'Czy warto używać menedżera haseł?',
      options: ['Tak, ułatwia unikalne hasła', 'Nie, lepiej zapamiętać jedno hasło', 'Tylko na telefonie'],
      a: 0,
      explain: 'Menedżer haseł ułatwia tworzenie i przechowywanie unikalnych haseł dla wielu usług.'
    },
    {
      q: 'Co zrobić przy podejrzanym mailu?',
      options: ['Kliknąć link i sprawdzić', 'Zignorować i usunąć', 'Sprawdzić nadawcę i nie klikać linków bez weryfikacji'],
      a: 2,
      explain: 'Najbezpieczniej jest zweryfikować nadawcę i nie klikać linków bez potwierdzenia autentyczności.'
    },
    {
      q: 'Jak zabezpieczyć urządzenia IoT?',
      options: ['Zostawić domyślne hasło', 'Aktualizować firmware i zmienić hasła', 'Wyłączyć urządzenie na noc'],
      a: 1,
      explain: 'Zmieniaj domyślne hasła i regularnie aktualizuj oprogramowanie urządzeń IoT.'
    }
  ];

  function renderQuiz() {
    if (!area) return;
    var html = '';
    for (var i = 0; i < quiz.length; i++) {
      var item = quiz[i];
      html += '<div class="qblock">';
      html += '<p><strong>' + (i + 1) + '. ' + item.q + '</strong></p>';
      for (var j = 0; j < item.options.length; j++) {
        html += '<label><input type="radio" name="q' + i + '" value="' + j + '"> ' + item.options[j] + '</label><br>';
      }
      html += '</div>';
    }
    area.innerHTML = html;
  }

  function gradeQuiz() {
    var score = 0;
    var feedback = '';
    for (var i = 0; i < quiz.length; i++) {
      var sel = document.querySelector('input[name="q' + i + '"]:checked');
      var chosen = sel ? parseInt(sel.value, 10) : null;
      if (chosen === quiz[i].a) score++;
      feedback += '<p><strong>' + (i + 1) + '. ' + quiz[i].q + '</strong><br>Twoja odpowiedź: ' + (chosen === null ? 'brak' : quiz[i].options[chosen]) + '<br>Poprawna: ' + quiz[i].options[quiz[i].a] + '<br>Wyjaśnienie: ' + quiz[i].explain + '</p>';
    }
    if (result) {
      result.innerHTML = '<p>Twój wynik: <strong>' + score + '/' + quiz.length + '</strong></p>' + feedback + '<p>Porada: powtórz sekcje o 2FA i zabezpieczeniu urządzeń, jeśli wynik był niski.</p>';
    }
  }

  function attachSubmitHandler() {
    var submitBtn = document.getElementById('submitQuiz');
    if (submitBtn) {
      submitBtn.onclick = null;
      submitBtn.addEventListener('click', function () {
        gradeQuiz();
      });
    }
  }

  if (startBtn) {
    startBtn.addEventListener('click', function () {
      renderQuiz();
      if (result) {
        result.innerHTML = '<button id="submitQuiz">Zakończ quiz</button>';
      }
      setTimeout(attachSubmitHandler, 50);
    });
  }
});