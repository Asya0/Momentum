const time = document.querySelector('.time');
const data = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const bgNum  = getRandom().toString().padStart(2, "0");
const body = document.getElementsByTagName('body')[0];
let randomNum = parseInt(bgNum);
const timeOfDay = getTimeOfDay();



// show time in page
function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();

    time.textContent = currentTime;
    showDate();
    showGreeting();
    setInterval(showTime, 0);
  }
  showTime();



// show date in page
function showDate() {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-En', options);

  data.textContent = currentDate;
}
showDate()

//greeting
function getTimeOfDay() {
  
  const date = new Date();
  let partOfDay = ['morning', 'afteroon', 'evening', 'night']
  let hours = date.getHours();
  
    if (hours < 13 ) { 
        return hours = partOfDay[0];
    } else if (hours < 18 ) {
        return  hours = partOfDay[1];
    } else if (hours < 22 ) {
       return hours = partOfDay[2];
    } else {
       return hours = partOfDay[3];
    }
  }
getTimeOfDay();

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText;
}
showGreeting();



// save name user using localStorage
function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)


// image change slider

function getRandom() {
  return Math.floor(Math.random() * (20 - 1 + 1)) + 1;
}

function setBg() {
  const img = new Image();
  const timeOfDay = getTimeOfDay();
  const bgNum  = getRandom().toString().padStart(2, "0");
  const body = document.getElementsByTagName('body')[0];
  img.src = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/"+timeOfDay+"/"+bgNum+".jpg";
  img.onload = () => {      
    body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/"+timeOfDay+"/"+bgNum+".jpg')";
  }; 
}
console.log(bgNum);
setBg();


// image flipping slider next & prev

function getSlideNext() {
  slideNext.addEventListener('click', getSlideNext => {
      if(randomNum + 1  < 10) {
        randomNum += 1;
        body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/"+timeOfDay+"/"+0+""+randomNum+".jpg')";
        console.log(randomNum)
      
      } else if(randomNum + 1  > 9 && randomNum + 1  <= 20) {
        randomNum += 1;
        body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/"+timeOfDay+"/"+randomNum+".jpg')";
        console.log(randomNum)
      
      } else if (randomNum = 20) {
        randomNum = 1;
        body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/"+timeOfDay+"/"+0+""+randomNum+".jpg')";
        console.log(randomNum)
      
      } else
      body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/"+timeOfDay+"/01.jpg')";
  })
}
getSlideNext();


function getSlidePrev() {
  slidePrev.addEventListener('click', getSlidePrev => {
      if(randomNum - 1  < 10 && randomNum - 1  > 0) {
        randomNum -= 1;
        body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/"+timeOfDay+"/"+0+""+randomNum+".jpg')";
        // console.log(randomNum)
      
      } else if(randomNum - 1  > 0 && randomNum - 1  <= 20 ) {
        randomNum -= 1;
        body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/"+timeOfDay+"/"+randomNum+".jpg')";
        // console.log(randomNum)
      
      } else if (randomNum = 1) {
        randomNum = 20;
        body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/"+timeOfDay+"/"+randomNum+".jpg')";
        // console.log(randomNum)
      
      } else
      body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/"+timeOfDay+"/01.jpg')";
  })
}
getSlidePrev();

//get Weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const windDescription = document.querySelector('.wind-description');
const humidity = document.querySelector('.humidity');
const humidityDescription = document.querySelector('.humidity-description');



const city = document.querySelector('.city');

async function getWeather() {
  const defaultCity = 'Omsk';
  city.value = defaultCity;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&lang=en&appid=e886c80087ae231689546cb8c0b8857b&units=metric`;
  let res = await fetch(url);
  let data = await res.json(); 

  let degrees = Math.ceil(data.main.temp);
  wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${degrees}°C`;
  weatherDescription.textContent = data.weather[0].description;

  console.log(data.weather[0].id, data.wind.speed, data.main.temp);
}
getWeather();

city.addEventListener("change", async getWeather => {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=e886c80087ae231689546cb8c0b8857b&units=metric`;
  let res = await fetch(url);
  let weatherData = await res.json();
  let degrees = Math.ceil(weatherData.main.temp);
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);
  temperature.textContent = `${degrees}°C`;
  weatherDescription.textContent = weatherData.weather[0].description;
});

// quote of day
async function getQuotes() {  
  const quote = document.querySelector(".quote");
  const author = document.querySelector(".author");

  const quotes = '/assets/data.json';
  const res = await fetch(quotes);
  const data = await res.json(); 
    
  quote.innerHTML = data[0].text;  
  author.innerHTML = data[0].author; 

  const btn = document.querySelector(".change-quote");

  btn.addEventListener("click", getQuotes => {

  let randomQuoteIndex = Math.floor(Math.random() * (data.length - 2 + 1)) + 1;
    console.log(randomQuoteIndex);
    quote.innerHTML = data[randomQuoteIndex].text;  
    author.innerHTML = data[randomQuoteIndex].author; 
    
  });
}
getQuotes();

