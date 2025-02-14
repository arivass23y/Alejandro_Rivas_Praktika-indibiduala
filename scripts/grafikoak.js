// Metodoak hasierasten ditugu grafikoak orrialdean sartzean agertzeko
sortuKasuChart();
sortuHeriotzChart();
sortuSpainChart();

// API-tik datuak lortzeko grafikoa
async function datuakLortuGrafikoak() {
  // `fetch()` metodoa erabiltzen da HTTP eskaerak egiteko.
  // Kasu honetan, GET eskaera egiten du `https://disease.sh/v3/covid-19/countries` API helbidera.
  const response = await fetch("https://disease.sh/v3/covid-19/countries");
  // `response` aldagaiak erantzuna gordetzen du.
  // `await` hitz-gakoa erabiltzen da itxaroteko eskaera amaitu arte.
  const posts = await response.json();
  return posts;
}

// Herrien 5 kasu gehien duen Chart generatzen duen metodoa 
async function sortuKasuChart() {
  const data = await datuakLortuGrafikoak();

  // Gehien kasuak dituen 5 herrialdeak hartzen ditugu
  const top5Countries = data.sort((a, b) => b.cases - a.cases).slice(0, 5);

  // Filtratzen dugu beharreko datuak
  const countriesBost = top5Countries.map((item) => item.country);
  const cases = top5Countries.map((item) => item.cases);
  const casesCtx = document.getElementById("casesChart").getContext("2d");

  // Hemen chart-en diseinua definitzen dugu
  new Chart(casesCtx, {
    type: "doughnut",
    data: {
      labels: countriesBost,
      datasets: [
        {
          label: "Kasuak",
          data: cases,
          backgroundColor: [
            "rgb(255, 205, 86)",
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(75, 192, 192)",
            "rgb(71, 227, 105)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });
}

// Heriotzaren Chart sortzeko metodoa
async function sortuHeriotzChart() {
  const data = await datuakLortuGrafikoak();

  // Lehenengo 10 herrialdeak hartzen ditugu
  const top10Countries = data.sort((a, b) => b.cases - a.cases).slice(0, 10);

  const countries = top10Countries.map((item) => item.country);
  const deaths = top10Countries.map((item) => item.deaths);
  const ctx = document.getElementById("deathChart").getContext("2d");

  // Hemen chart-en diseinua definitzen dugu
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: countries,
      datasets: [
        {
          label: "Heriotzak",
          data: deaths,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// España grafikoa sortzeko metodoa
async function sortuSpainChart() {
  const data = await datuakLortuGrafikoak();

  //Filtratzen dugu Spain izenekoak
  const spain = data.find((item) => item.country === "Spain");

  const ctx = document.getElementById("spainChart").getContext("2d");

  // Hemen chart-en diseinua definitzen dugu
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Kasuak", "Heriotzak", "Berreskuratuak"],
      datasets: [
        {
          label: "España datuak",
          data: [spain.cases, spain.deaths, spain.recovered],
          backgroundColor: [
            "rgb(255, 205, 86)",
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(75, 192, 192)",
            "rgb(71, 227, 105)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });
}