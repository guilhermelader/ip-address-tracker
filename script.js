const API_KEY = "at_PqhU0XrBktOlncqiww8RAoxh6R8Zj";

window.addEventListener("load", () => {
  init();
});

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const inputIp = document.getElementById("inputText").value;
  const ipData = await formData(inputIp);
  fillData(ipData);
});

async function init() {
  const data = await getData();
  fillData(data);
}

async function getData() {
  const response = await fetch(
    `https://geo.ipify.org/api/v1?apiKey=${API_KEY}`
  );
  const data = await response.json();
  return data;
}

function fillData(data) {
  let ip = document.querySelector("#ip");
  let location = document.querySelector("#location");
  let timezone = document.querySelector("#timezone");
  let isp = document.querySelector("#isp");
  let lat = null;
  let lng = null;

  ip.textContent = data.ip;
  location.textContent = `${data.location.city}, ${data.location.region}`;
  timezone.textContent = data.location.timezone;
  isp.textContent = data.isp;
  lat = data.location.lat;
  lng = data.location.lng;
  drawMap(lat, lng);
}

function drawMap(lat, lng) {
  document.querySelector(".map-container").innerHTML = "<div id='mapid'></div>";

  var icon = L.icon({
    iconUrl: "./images/icon-location.svg",
  });
  var mymap = L.map("mapid").setView([lat, lng], 18);
  const marker = L.marker([lat, lng], { icon: icon }).addTo(mymap);

  marker.setLatLng([lat, lng]);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mymap);
}

async function formData(ipAddress) {
  const response = await fetch(
    `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${ipAddress}`
  );
  const formData = await response.json();
  return formData;
}
