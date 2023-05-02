let store;
let history = document.getElementById('history');

const getStore = () => { 
    store = localStorage.cities ? JSON.parse(localStorage.cities) : [];

    if(store.length) {

        history.innerHTML = '';
        
        store.forEach(city => {
            history.innerHTML += `
                <button>${city}</button>
            `;
        });
    };
};

getStore();

let btn = document.querySelector('button');

btn.onclick = async () => {

    let city = document.querySelector('input').value;

    if(!city) return;

    let url1 = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${city}`;
    
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${city}`;

    let {name, dt, main:{temp,humidity},wind:{speed}, weather:[{icon}]} = await( await fetch(url1)).json();

    current.innerHTML = `
        <h1>${name} (${new Date(dt*1000).toDateString()}) <img src="https://openweathermap.org/img/w/${icon}.png"></h1>
        <p>Temp: ${temp} °F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${speed} m/s</p>
    `

    let { list } = await( await fetch(url2)).json();

    x = list;
    
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