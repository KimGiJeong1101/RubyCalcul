// 그래프 초기 설정
const ctx = document.getElementById("rubyChart").getContext("2d");
let rubyChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["루비 사용량", "획득 루비"], // ← 던전 횟수 제거
    datasets: [
      {
        label: "수치",
        data: [0, 0], // ← 던전 횟수 제거
        backgroundColor: ["#b388eb", "#66ff99"], // ← 던전 색 제거
      },
    ],
  },
  options: {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          color: "#ffffff",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});
