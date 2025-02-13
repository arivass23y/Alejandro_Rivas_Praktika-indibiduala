document.getElementById("sortu-pdf").addEventListener("click", datuakLortuPDF);

// API-ren JSON datuak irakurtzeko metodo bat
function datuakLortuPDF() {
  // API batetik datuak lortzen ditugu
  fetch("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json()) // JSON formatuan jasotzen dugu
    .then((data) => {
      // PDF-a sortzeko funtzioa deitzen dugu
      sortuPDF(data);
    })
    .catch((error) => {
      console.error("Errorea API-rekin:", error);
    });
}

// Funtzio bat sortzen dugu JSON datuekin sarrera parametro bezala, PDF-a sortzeko
function sortuPDF(data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // PDF-an goiburua gehitzen dugu
  doc.text("COVID-19 kasuei buruzko datuak", 60, 10);

  // Datuak PDF-an gehitzen ditugu
  data.forEach((countries, index) => {
    if (index > 0) doc.addPage();

    //const flag = "${countries.countryInfo.flag}"
    //doc.addImage(flag, "PNG", 10, 10, 50, 50); // Gehitu irudia
    doc.text(`IDa: ${countries.countryInfo._id}`, 10, 30);
    doc.text(`Herrialdea: ${countries.country}`, 10, 40);
    doc.text(`Kasuak: ${countries.cases}`, 10, 50);
    doc.text(`Heriotzak: ${countries.deaths}`, 10, 60);
    doc.text(`Errekuperatutak: ${countries.recovered}`, 10, 70);

    if (index === 5) {
      // PDF-a deskargatzen dugu
      doc.save("covid_19_kasuak.pdf"); // Gordetzen ditu lehenengo bost herrialdekoak
    }
  });
}