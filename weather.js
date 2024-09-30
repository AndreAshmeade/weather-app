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
				`http://api.weatherapi.com/v1/forecast.json?key=ec630aebe4f1475bbca234120232608&q=${encodeURIComponent(searchTerm)}&days=3`
			)
				.then((response) => {
					if (response.ok) {
					return response.json();
					} else {
						throw new Error("NETWORK RESPONSE ERROR");
					}
				})
				.then((data) => {
				  console.log(data);
					return renderWeatherData(data);
				})
				.catch((error) => console.error("FETCH ERROR:", error));
		}
	});

const formatDate = (inputDate) => {
 const [year, month, day] = inputDate.split('-');
 return `${day}-${month}-${year}`;
};


const renderWeatherData = (data) => {

	const locationName = data.location.name;

	const dateOne = formatDate(data.forecast.forecastday[0].date);
	const tempDayOne = data.forecast.forecastday[0].hour[0].temp_f;
	const iconDayOne = data.forecast.forecastday[0].hour[0].condition.icon;
	const rainDayOne = data.forecast.forecastday[0].hour[0].precip_in;
	const windDayOne = data.forecast.forecastday[0].hour[0].windchill_f;

  const dateTwo = formatDate( data.forecast.forecastday[1].date);
	const tempDayTwo = data.forecast.forecastday[1].hour[1].temp_f;
	const iconDayTwo = data.forecast.forecastday[1].hour[1].condition.icon;
	const rainDayTwo = data.forecast.forecastday[1].hour[1].precip_in;
	const windDayTwo = data.forecast.forecastday[1].hour[1].windchill_f;

  const dateThree = formatDate( data.forecast.forecastday[2].date);
	const tempDayThree = data.forecast.forecastday[2].hour[2].temp_f;
	const iconDayThree = data.forecast.forecastday[2].hour[2].condition.icon;
	const rainDayThree = data.forecast.forecastday[2].hour[2].precip_in;
	const windDayThree = data.forecast.forecastday[2].hour[2].windchill_f;


weatherSect.innerHTML = `


<h1>${dateOne}</h1>
<div id="weather_wrapper">
	<div class="weatherCard">
		<div class="currentTemp">
			<span class="temp">${tempDayOne}&deg;</span>
			<span class="location">${locationName}</span>
		</div>
		<div class="currentWeather">
			<img src="https:${iconDayOne}" width="160" height="150" />
			<div class="info">
				<span class="rain"> ${rainDayOne} MM</span>
				<span class="wind"> ${windDayOne} MPH</span>
			</div>
		</div>
	</div>
</div>

<h1>${dateTwo}</h1>
<div id="weather_wrapper">
	<div class="weatherCard">
		<div class="currentTemp">
			<span class="temp">${tempDayTwo}&deg;</span>
			<span class="location">${locationName}</span>
		</div>
		<div class="currentWeather">
			<img src="https:${iconDayTwo}" width="160" height="150" />
			<div class="info">
				<span class="rain"> ${rainDayTwo} MM</span>
				<span class="wind"> ${windDayTwo} MPH</span>
			</div>
		</div>
	</div>
</div>


<h1>${dateThree}</h1>
<div id="weather_wrapper">
	<div class="weatherCard">
		<div class="currentTemp">
			<span class="temp">${tempDayThree}&deg;</span>
			<span class="location">${locationName}</span>
		</div>
		<div class="currentWeather">
			<img src="https:${iconDayThree}" width="160" height="150" />
			<div class="info">
				<span class="rain"> ${rainDayThree} MM</span>
				<span class="wind"> ${windDayThree} MPH</span>
			</div>
		</div>
	</div>
</div>





`;
};
