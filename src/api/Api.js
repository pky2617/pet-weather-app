const API_KEY = "keIkcwQuwHMsCqZJawOVskNUec3ErVQq"; // jdJtjY5LHZvdj0IS8iiRqturSfo6sjq3 // cwlzjnKODPSt5tGLh63JEXDKL03vtfMB
const API_HOST = "http://dataservice.accuweather.com/";
const API_VERSION = "v1";

const LocationApiUrl = (param, group) =>
  `${API_HOST}locations/${API_VERSION}/${param}/${group}?apikey=${API_KEY}`;

const WeatherApiUrl = (key) =>
  `${API_HOST}forecasts/${API_VERSION}/daily/1day/${key}?apikey=${API_KEY}`;

const citySearchApiUrl = (city) =>
  `${API_HOST}locations/${API_VERSION}/cities/search?apikey=${API_KEY}&q=${city}`;

export function getCityLocation(city) {
  console.log("Inside get City location of Api js");
  return fetch(citySearchApiUrl(city)).then((response) => response.json());
}

export function getLocations() {
  console.log("Inside getLocations of Api js");
  return fetch(LocationApiUrl("topcities", 50)).then((response) =>
    response.json()
  );
}
export function getWeather(key) {
  console.log("Inside getWeather of Api js");
  return fetch(WeatherApiUrl(key)).then((response) => response.json());
}
