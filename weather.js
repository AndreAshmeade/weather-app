const searchSect = document.getElementById("searchSect");
const weatherSect = document.getElementById("weatherSect");
const API_KEY = "ec630aebe4f1475bbca234120232608";

searchSect.innerHTML = `
<header>
  <form class="search-bar" id="search-form">
    <input id="search"  type"text"  placeholder="search location"/>
	</form>
</header>

<main class="container">
  <div class="search-display"></div>
	<div class="posts-container"></div>
</main>
`;

document
	.getElementById("search")
	.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			event.preventDefault(); //Prevent the default form submission

			const searchTerm = this.value;


			fetch(
				`http://api.weatherapi.com/v1/current.json?key=ec630aebe4f1475bbca234120232608&q=${encodeURIComponent(searchTerm)}`
			)
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error("NETWORK RESPONSE ERROR");
					}
				})
				.then((data) => {
					return renderWeatherData(data);
				})
				.catch((error) => console.error("FETCH ERROR:", error));
		}
	});

const renderWeatherData = (data) => {
	weatherSect.innerHTML = `

<div id="weather_wrapper">
	<div class="weatherCard">
		<div class="currentTemp">
			<span class="temp">${data.current.dewpoint_f}&deg;</span>
			<span class="location">${data.location.name}</span>
		</div>
		<div class="currentWeather">
			<img src="https:${data.current.condition.icon}" width="160" height="150" />
			<div class="info">
				<span class="rain"> ${data.current.precip_mm} MM</span>
				<span class="wind"> ${data.current.windchill_f} MPH</span>
			</div>
		</div>
	</div>
</div>


<div id="weather_wrapper">
	<div class="weatherCard">
		<div class="currentTemp">
			<span class="temp">${data.current.dewpoint_f}&deg;</span>
			<span class="location">${data.location.name}</span>
		</div>
		<div class="currentWeather">
			<img src="https:${data.current.condition.icon}" width="160" height="150" />
			<div class="info">
				<span class="rain"> ${data.current.precip_mm} MM</span>
				<span class="wind"> ${data.current.windchill_f} MPH</span>
			</div>
		</div>
	</div>
</div>


<div id="weather_wrapper">
	<div class="weatherCard">
		<div class="currentTemp">
			<span class="temp">${data.current.dewpoint_f}&deg;</span>
			<span class="location">${data.location.name}</span>
		</div>
		<div class="currentWeather">
			<img src="https:${data.current.condition.icon}" width="160" height="150" />
			<div class="info">
				<span class="rain"> ${data.current.precip_mm} MM</span>
				<span class="wind"> ${data.current.windchill_f} MPH</span>
			</div>
		</div>
	</div>
</div>

`;
};
