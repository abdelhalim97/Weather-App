const locationTrigger = document.getElementById('location')
const place = document.getElementById('place')
const desc = document.getElementById('desc')
const degr = document.getElementById('degr')
const wind = document.getElementById('wind')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const icon_one = document.getElementById('icon_one')
const day_one = document.getElementById('day_one')
const max_one = document.getElementById('max_one')
const min_one = document.getElementById('min_one')
const icon_two = document.getElementById('icon_two')
const day_two = document.getElementById('day_two')
const max_two = document.getElementById('max_two')
const min_two = document.getElementById('min_two')
const icon_three = document.getElementById('icon_three')
const day_three = document.getElementById('day_three')
const max_three = document.getElementById('max_three')
const min_three = document.getElementById('min_three')
const icon_four = document.getElementById('icon_four')
const day_four = document.getElementById('day_four')
const max_four = document.getElementById('max_four')
const min_four = document.getElementById('min_four')
const icon_five = document.getElementById('icon_five')
const day_five = document.getElementById('day_five')
const max_five = document.getElementById('max_five')
const min_five = document.getElementById('min_five')

async function getGeo(latitude,longitude) {
	const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=3726e909db454ea9ad883bd76aa17160`);
	return await res.json();
}
async function getWeather(lat,lon) {
	const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d33078b6c021f1725298bc80d02de352&units=metric
    `);
	return await res.json();
}
async function getWeatherForecast(lat,lon) {
	const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d33078b6c021f1725298bc80d02de352&units=metric
    `);
	return await res.json();
}
locationTrigger.addEventListener("click", async () => {
	await navigator.geolocation.getCurrentPosition(position => {
        var latitude  = position.coords.latitude
        var longitude = position.coords.longitude
        triggerGeo(latitude,longitude)
        triggerWeather(latitude,longitude)
})

})
const triggerWeather = async(latitude,longitude)=>{
    const data = await getWeather(latitude, longitude)
    const dataForecast = await getWeatherForecast(latitude, longitude)
    const descAPI = data.weather[0].description
    const degrAPI = data.main.temp
    const windAPI = data.wind.speed
    const sunriseAPI = data.sys.sunrise
    const sunsetAPI = data.sys.sunset
    const timeZone = data.timezone
    degr.innerHTML = degrAPI+'°C'
    desc.innerHTML = descAPI+'.'
    wind.innerHTML = windAPI
    sunrise.innerHTML = moment.utc(sunriseAPI,'X').add(timeZone,'seconds').format('HH:mm a')
    sunset.innerHTML = moment.utc(sunsetAPI,'X').add(timeZone,'seconds').format('HH:mm a')
    // forecast day1
    const max_oneAPI=dataForecast.list[0].main.temp_max
    const min_oneAPI=dataForecast.list[0].main.temp_min
    day_one.innerHTML=moment.utc(dataForecast.list[0].dt,'X').add(timeZone,'seconds').format('dd')
    max_one.innerHTML=Math.round(max_oneAPI)+'°'
    min_one.innerHTML=Math.round(min_oneAPI) +'°'
    if(dataForecast.list[0].weather[0].main='Clear'){
        icon_one.className='text-gray fa-solid fa-sun'
    }
    else{
        icon_one.className='text-gray fa-solid fa-cloud' 
    }
    //day2
    const max_twoAPI=dataForecast.list[7].main.temp_max
    const min_twoAPI=dataForecast.list[7].main.temp_min
    day_two.innerHTML=moment.utc(dataForecast.list[7].dt,'X').add(timeZone,'seconds').format('dd')
    max_two.innerHTML=Math.round(max_twoAPI)+'°'
    min_two.innerHTML=Math.round(min_twoAPI) +'°'
    if(dataForecast.list[7].weather[0].main='Clear'){
        icon_two.className='text-gray fa-solid fa-sun'
    }
    else{
        icon_two.className='text-gray fa-solid fa-cloud' 
    }
    console.log(dataForecast)

    //day3
    const max_threeAPI=dataForecast.list[15].main.temp_max
    const min_threeAPI=dataForecast.list[15].main.temp_min
    day_three.innerHTML=moment.utc(dataForecast.list[15].dt,'X').add(timeZone,'seconds').format('dd')
    max_three.innerHTML=Math.round(max_threeAPI)+'°'
    min_three.innerHTML=Math.round(min_threeAPI) +'°'
    if(dataForecast.list[15].weather[0].main='Clear'){
        icon_three.className='text-gray fa-solid fa-sun'
    }
    else{
        icon_three.className='text-gray fa-solid fa-cloud' 
    }
    //day4
    const max_fourAPI=dataForecast.list[23].main.temp_max
    const min_fourAPI=dataForecast.list[23].main.temp_min
    day_four.innerHTML=moment.utc(dataForecast.list[23].dt,'X').add(timeZone,'seconds').format('dd')
    max_four.innerHTML=Math.round(max_fourAPI)+'°'
    min_four.innerHTML=Math.round(min_fourAPI) +'°'
    if(dataForecast.list[23].weather[0].main='Clear'){
        icon_four.className='text-gray fa-solid fa-sun'
    }
    else{
        icon_four.className='text-gray fa-solid fa-cloud' 
    }
    //day5
    const max_fiveAPI=dataForecast.list[31].main.temp_max
    const min_fiveAPI=dataForecast.list[31].main.temp_min
    day_five.innerHTML=moment.utc(dataForecast.list[31].dt,'X').add(timeZone,'seconds').format('dd')
    max_five.innerHTML=Math.round(max_fiveAPI)+'°'
    min_five.innerHTML=Math.round(min_fiveAPI) +'°'
    if(dataForecast.list[31].weather[0].main='Clear'){
        icon_five.className='text-gray fa-solid fa-sun'
    }
    else{
        icon_five.className='text-gray fa-solid fa-cloud' 
    }
}
const triggerGeo = async(latitude,longitude)=>{
    const data = await getGeo(latitude, longitude)
    const CITY = data.results[0].components.city
    const STATE_DISTRICT = data.results[0].components.state_district
    place.innerHTML=STATE_DISTRICT+', '+CITY

}