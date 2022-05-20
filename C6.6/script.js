const wsUri = 'wss://echo-ws-service.herokuapp.com';
const geoUrl = 'https://www.openstreetmap.org/';

let websocket;

const btn = document.getElementById('button-send');
const btnGeolocation = document.getElementById('button-geolocation');
const chat = document.getElementsByClassName('wrapper-chat');

function createSendServer(message) {
    let serverDiv = document.createElement('div');
    serverDiv.classList.add('server-send', 'border');
    serverDiv.innerHTML = `${message}`;
    chat[0].appendChild(serverDiv);
}

function createMySend(message) {
    let myDiv = document.createElement('div');
    myDiv.classList.add('my-send', 'border');
    myDiv.innerHTML = `${message}`;
    chat[0].appendChild(myDiv);
}

function openСonnection() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
        console.log('CONNECTED');
    };
    websocket.onclose = function(evt) {
        console.log('DICSONNECTED');
    };
    websocket.onmessage = function(evt) {
        createSendServer(evt.data);
    };
    websocket.onerror = function(evt) {
        console.log('ERROR' + evt.data);
    };
};

const error = () => {
    createMySend('Невозможно получить ваше местоположение');
};

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let myGeolocation = document.createElement('a');
    myGeolocation.classList.add('my-send', 'border');
    myGeolocation.href = geoUrl + `#map=18/${latitude}/${longitude}`;
    chat[0].appendChild(myGeolocation);
    myGeolocation.textContent = `Геолокация`;
};

btn.addEventListener('click', () => {
    const mySend = document.getElementById('input-message').value;
    createMySend(mySend);

    openСonnection();
    setTimeout(() => {websocket.send(mySend)}, 1000);
});

btnGeolocation.addEventListener('click', () => {
    let myGeolocation = document.createElement('a');
    chat[0].appendChild(myGeolocation);
    if (!navigator.geolocation) {
        createMySend('Geolocation не поддерживается вашим браузером');
    } else {
        createMySend('Определение местоположения…');
        navigator.geolocation.getCurrentPosition(success, error);
    }
});
