document.getElementById("check").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          // Funkcija za proveru nepravilnih reči
          if (typeof highlightInvalidWords === "function") {
            highlightInvalidWords();
          } else {
            console.error("Funkcija highlightInvalidWords nije definisana.");
          }
        },
      });
    });
  });