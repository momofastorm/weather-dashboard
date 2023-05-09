//local storage for storing cities
let store;
let history = document.getElementById('history');

const getStore = () => { 
    store = localStorage.cities ? JSON.parse(localStorage.cities) : [];

    if(store.length) {

        history.innerHTML = '';
        
        store.forEach(city => {
            history.innerHTML += `
                <button class="histBtn" onclick="handleHist('${city}')">${city}</button>
            `;
        });
    };
};
//Current weather for the city using the API key
getStore();

let btn = document.querySelector('button');

btn.onclick = searchCity;

async function searchCity(){

    let city = document.querySelector('input').value;

    if(!city) return;

    let url1 = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${city}`;
    
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${city}`;

    //display current date and  weather. data
    let {name, dt, main:{temp,humidity},wind:{speed}, weather:[{icon}]} = await( await fetch(url1)).json();

    current.innerHTML = `
        <h1>${name} (${new Date(dt*1000).toDateString()}) <img src="https://openweathermap.org/img/w/${icon}.png"></h1>
        <p>Temp: ${temp} °F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${speed} m/s</p>
    `;

    if(!store.includes(city)) {
        store.push(city);
        localStorage.setItem('cities', JSON.stringify(store));
        getStore();
    } 
    
//display 5 day forecast
    let { list } = await( await fetch(url2)).json();

    x = list;
    forecast.innerHTML = '';
    
    for(let i = 0; i < list.length; i=i+8) {

        let {name, dt, main:{temp,humidity},wind:{speed}, weather:[{icon}]} = list[i];
        
        forecast.innerHTML += `
            <div class="card">
                <h3>${new Date(dt*1000).toUTCString().slice(0,11)}</h3>
                <img src="https://openweathermap.org/img/w/${icon}.png">
                <p>Temp: ${temp} °F</p>
                <p>Wind: ${speed} m/s</p>
                <p>Humidity: ${humidity}%</p>
            </div>
        `;
    };
};

function handleHist(city) {
    document.querySelector('input').value = city;
    searchCity();
};