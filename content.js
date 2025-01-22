// Lista validnih srpskih reči na ćirilici (ovo je primer, dodaj više reči prema potrebi)
const validWords = ["пример", "реч", "текст", "провера", "ћирилица"];

// Funkcija za proveru reči
function highlightInvalidWords() {
  const regex = /[А-Яа-я]+/g; // Regularni izraz za ćirilične reči
  const bodyText = document.body.innerHTML;

  // Zamenjujemo nevalidne reči sa obeleženim verzijama
  const updatedText = bodyText.replace(regex, (word) => {
    if (!validWords.includes(word)) {
      return `<span style="background-color: yellow;">${word}</span>`;
    }
    return word;
  });

  document.body.innerHTML = updatedText;
}

// Pokreni funkciju nakon učitavanja stranice
document.addEventListener("DOMContentLoaded", highlightInvalidWords);
