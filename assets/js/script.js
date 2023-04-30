
let btn = document.querySelector('button');

btn.onclick = async () => {

    let city = document.querySelector('input').value;

    if(!city) return;

    let url1 = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${city}`;
    
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${city}`;

    let {name, dt, main:{temp,humidity},wind:{speed}, weather:[{icon}]} = await( await fetch(url1)).json();

    current.innerHTML = `
        <h2>${name} (${new Date(dt*1000).toLocaleString()} <img src="https://openweather.com/img/w/${icon}.png>)</h2>
        <p>Temp: ${temp} °F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${speed} m/s</p>
    `

    let forecastData = await( await fetch(url2)).json();

    console.log(forecastData);

};