async function datuakLortuGrafikoak() {
  // `fetch()` metodoa erabiltzen da HTTP eskaerak egiteko.
  // Kasu honetan, GET eskaera egiten du `https://jsonplaceholder.typicode.com/posts` API helbidera.
  const response = await fetch("https://disease.sh/v3/covid-19/countries");
  // `response` aldagaiak erantzuna gordetzen du.
  // `await` hitz-gakoa erabiltzen da itxaroteko eskaera amaitu arte.
  const posts = await response.json();
  return posts;
}

async function sortuChart() {
  const data = await datuakLortuGrafikoak();

  // Lehenengo 5 herrialdeak hartzen ditugu
  const top10Countries = data.slice(0, 10);

  const countries = top10Countries.map((item) => item.country);
  const deaths = top10Countries.map((item) => item.deaths);
  const ctx = document.getElementById("deathChart").getContext("2d");
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

  const top5Countries = data.slice(0, 5);
  const countriesBost = top5Countries.map((item) => item.country);
  const cases = top5Countries.map((item) => item.cases);
  const casesCtx = document.getElementById("casesChart").getContext("2d");
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
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  new Chart(casesCtx, {
    type: "radar",
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
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
sortuChart();