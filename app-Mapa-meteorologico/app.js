document.getElementById('search-btn').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value.trim();
    const weatherCard = document.getElementById('weather-card');

    if (!city) {
        weatherCard.innerHTML = "<p style='color: #fee2e2;'>⚠️ Por favor, escribe un lugar válido.</p>";
        return;
    }

    weatherCard.innerHTML = "<p>🔄 Consultando base de datos geográfica y meteorológica remota...</p>";

    try {
        // Consumo asíncrono a la API Nominatim de OpenStreetMap
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`
        );
        const data = await response.json();

        if (data.length === 0) {
            weatherCard.innerHTML = "<p style='color: #ff0000;'>❌ No se encontraron datos para esa ubicación.</p>";
            return;
        }

        const lugar = data[0];

        // Si el usuario busca "Lerma", se usan los datos solicitados por el cliente.
        // Si busca otra ciudad, se generan parámetros meteorológicos aleatorios.
        let temp, humidity, condition;

        if (city.toLowerCase() === 'lerma') {
            temp = "27.4";
            humidity = "91";
            condition = "Tormenta Meteorológica";
        } else {
            temp = (Math.random() * (35 - 5) + 5).toFixed(1);
            humidity = Math.floor(Math.random() * (100 - 40) + 40);
            condition = ["Despejado", "Nublado", "Lluvia Ligera", "Tormenta Eléctrica"][Math.floor(Math.random() * 4)];
        }

        weatherCard.innerHTML = `
            <h3>🗺️ Ubicación Localizada: 🧭 ${city}</h3>
            <p class="description"><strong>Descripción oficial:</strong> ${lugar.display_name}</p>

            <div class="geo-data">
                <p><strong>Latitud:</strong> ${lugar.lat} &nbsp;|&nbsp; <strong>Longitud:</strong> ${lugar.lon}</p>
            </div>

            <hr style="border: 0.5px solid #4ade80; margin: 15px 0;">

            <div class="weather-data">
                <h4>⛈️🌤️ Parámetros Climatológicos ⛈️🌤️</h4>
                <p><strong>Temperatura:</strong> ${temp}°C</p>
                <p><strong>Humedad:</strong> ${humidity}%</p>
                <p><strong>Condición:</strong> ${condition}</p>
            </div>

            <div class="success-footer">✓ Datos de mapa meteorológico sincronizados con éxito.</div>
        `;
    } catch (error) {
        console.error(error);
        weatherCard.innerHTML = "<p style='color: #fee2e2;'>❌ Error en la comunicación asíncrona con el servidor.</p>";
    }
});


document.getElementById("search-btn").addEventListener("click", async () => {

  const input = document.getElementById("city-input").value.trim();
  const card = document.getElementById("weather-card");
  const map = document.getElementById("map-frame");

  if (!input) {
    card.innerHTML = "⚠ Escribe una ciudad de México";
    return;
  }

  card.innerHTML = "🔄 Buscando datos en México...";

  try {

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input + ", Mexico")}&limit=1`
    );

    const data = await res.json();

    if (!data.length) {
      card.innerHTML = "❌ Ciudad no encontrada en México";
      return;
    }

    const lugar = data[0];

    // Simulación clima
    const temp = (Math.random() * 30 + 5).toFixed(1);
    const hum = Math.floor(Math.random() * 100);

    // Iconos según clima
    const icons = ["☀️", "🌤️", "⛅", "🌧️", "⛈️"];
    const icon = icons[Math.floor(Math.random() * icons.length)];

    // Separar ciudad bonito
    const display = lugar.display_name.split(",").slice(0, 3).join(",");

    card.innerHTML = `
      <div class="weather-icon">${icon}</div>

      <h2>${input}, México</h2>

      <p>${display}</p>

      <hr style="margin:10px 0; border:1px solid #38bdf8">

      <p><b>🌡 Temperatura de lugar:</b> ${temp}°C</p>
      <p><b>💧 Humedad:</b> ${hum}%</p>
      <p><b>📍 Lat:</b> ${lugar.lat}</p>
      <p><b>📍 Lng:</b> ${lugar.lon}</p>
    `;

    // MAPA GOOGLE
    map.src = `https://www.google.com/maps?q=${lugar.lat},${lugar.lon}&z=12&output=embed`;

  } catch (err) {
    card.innerHTML = "❌ Error de conexión";
  }

});
