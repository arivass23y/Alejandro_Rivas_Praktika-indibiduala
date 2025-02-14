document.getElementById("sortu-pdf").addEventListener("click", datuakLortuPDF);

// API-ren JSON datuak irakurtzeko metodo bat
function datuakLortuPDF() {
  // API batetik datuak lortzen ditugu
  fetch("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json()) // JSON formatuan jasotzen dugu
    .then((data) => {
      const top10 = data.sort((a, b) => b.cases - a.cases).slice(0, 10);
      // PDF-a sortzeko funtzioa deitzen dugu
      sortuPDF(top10);
    })
    .catch((error) => {
      console.error("Errorea API-rekin:", error);
    });
}

// Funtzio bat sortzen dugu JSON datuekin sarrera parametro bezala, PDF-a sortzeko
async function sortuPDF(data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // PDF-an goiburua gehitzen dugu
  doc.text("COVID-19 kasuei buruzko datuak", 60, 10);

  // Datuak PDF-an gehitzen ditugu
  for (let i = 0; i < data.length; i++) {
    if (i > 0) doc.addPage(); // Horri berri bat herrialde bakoitzerako

    const country = data[i];
    const flagUrl = country.countryInfo.flag;

    // Saiatzen gara argazkiak Base64 bihurtzen, beztela mezu bat aterako da
    try {
      const flagBase64 = await getBase64Image(flagUrl);
      doc.addImage(flagBase64, "PNG", 120, 40, 60, 30); // Argazkia Base64 bezala gehitu
    } catch (error) {
      console.error("Errorea irudia kargatzean:", error);
      doc.text("Ezin da bandera kargatu", 120, 50);
    }

    // Datuak JSON-etik hartzen ditugu
    doc.text(`IDa: ${country.countryInfo._id}`, 10, 30);
    doc.text(`Herrialdea: ${country.country}`, 10, 40);
    doc.text(`Kasuak: ${country.cases}`, 10, 50);
    doc.text(`Heriotzak: ${country.deaths}`, 10, 60);
    doc.text(`Errekuperatutak: ${country.recovered}`, 10, 70);
    doc.text(`Testak: ${country.tests}`, 10, 80);
    doc.text(`Populazioa: ${country.population}`, 10, 90);
    doc.line(10, 105, 200, 105); // Linea bat politagoa geratzeko
  }

  doc.save("covid_19_kasuak.pdf"); // Gordetzen ditu lehenengo bost herrialdekoak
}

// Base64 bihurtzeko argazkiak metodoa, beztela ez dira PDF-an kargatzen
function getBase64Image(url) {
  return fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }));
}