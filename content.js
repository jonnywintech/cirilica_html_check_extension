// Lista validnih srpskih reči (učitava se iz .dic fajla)
let validWords = [];

// Funkcija za učitavanje rečnika sa lokalnog servera ili sačuvanog fajla
async function loadDictionary() {
  try {
    const response = await fetch(chrome.runtime.getURL("sr.dic")); // Učitaj rečnik
    const text = await response.text();
    validWords = text.split("\n").map((word) => word.trim()); // Obradi reči u listu
    console.log("Rečnik uspešno učitan:", validWords.length, "reči.");
  } catch (error) {
    console.error("Greška pri učitavanju rečnika:", error);
  }
}

// Funkcija za proveru da li je reč validna
function isWordValid(word) {
  return validWords.includes(word);
}

// Funkcija za obeležavanje nepravilnih reči
// Funkcija za obeležavanje nepravilnih reči
// Funkcija za obeležavanje nepravilnih reči
function highlightInvalidWords() {
  console.log("Pokrenuto obeležavanje nepravilnih reči.");
  const regex = /[А-Яа-я]+/g; // Regularni izraz za pronalaženje ćiriličnih reči
  const elements = document.body.querySelectorAll("*:not(script):not(style)"); // Selektuj sve elemente osim <script> i <style>

  elements.forEach((element) => {
    if (element.children.length === 0) { // Proverava samo tekstualne čvorove
      const originalText = element.innerText; // Učitaj samo tekst, bez HTML-a
      if(originalText === undefined){
        return;
      }
      const updatedText = originalText.replace(regex, (word) => {
        // Pretvaramo reč u lowercase i proveravamo da li je validna
        const wordLowerCase = word.toLowerCase();
        if (!isWordValid(wordLowerCase)) {
          return `<span style="background-color: yellow; color: black;">${word}</span>`;
        }
        return word; // Ako je reč validna, ne menjaj ništa
      });
      
      // Ažuriraj samo ako je tekst promenjen
      if (originalText !== updatedText) {
        // Element mora imati innerHTML da bi mogao da se zameni stil
        element.innerHTML = updatedText.replace(/\n/g, '<br>'); // Zameni newline sa <br> za očuvanje formata
      }
    }
  });

  console.log("Obeležavanje završeno.");
}

  

// Automatski pokreni učitavanje rečnika
(async function () {
  await loadDictionary();
})();
