import playList from "./playList.js";

const time = document.querySelector('.time');
const data = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const city = document.querySelector('.city');
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
  let partOfDay = ['morning', 'afternoon', 'evening', 'night']
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
// console.log(bgNum);
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


async function getWeather() {
  const defaultCity = (localStorage.getItem('city') ? localStorage.getItem('city') : 'Omsk');
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

}
getWeather();


function setCity() {
  const city = document.querySelector('.city');
  city.addEventListener('change', getWeather);
}

city.addEventListener("change", async getWeather => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=e886c80087ae231689546cb8c0b8857b&units=metric`;
  let res = await fetch(url);
  let weatherData = await res.json();
  let degrees = Math.ceil(weatherData.main.temp);
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);
  temperature.textContent = `${degrees}°C`;
  weatherDescription.textContent = weatherData.weather[0].description;
  if(weatherData) {
    localStorage.setItem('city', city.value);
  }
});

// quote of day
async function getQuotes() {  
  const quote = document.querySelector(".quote");
  const author = document.querySelector(".author");

  const quotes = '/assets/data.json';
  const res = await fetch(quotes);
  const data = await res.json(); 

  let randomQuoteIndex = Math.floor(Math.random() * (data.length - 2 + 1)) + 1;
  console.log(randomQuoteIndex);
  quote.innerHTML = data[randomQuoteIndex].text;  
  author.innerHTML = data[randomQuoteIndex].author; 
    
  quote.innerHTML = data[randomQuoteIndex].text;  
  author.innerHTML = data[randomQuoteIndex].author; 

  const btn = document.querySelector(".change-quote");

  btn.addEventListener("click", getQuotes => {


    
  });
}
getQuotes();

// audio player
const playItem = document.querySelectorAll(".play-item");
const playBtn = document.querySelector(".play");
const audio = document.querySelector("audio");
let isPlay = false;
let playNum = 0;  // track default


let sounds = ["./assets/sounds/moi c'est.mp3", './assets/sounds/vibranium.mp3', './assets/sounds/motive.mp3', './assets/sounds/ring.mp3']

//play audio
function playAudio() {
  audio.currentTime = 0;

  playBtn.addEventListener("click", () => {
     
      if(!isPlay) {
        playBtn.classList.add("pause");
        isPlay = true;
        audio.play();
        stylePlayItems(playNum);

      } else {
        playBtn.classList.remove("pause");
        audio.pause();
        isPlay = false;
      }
    })
}
playAudio();

//Next
const btnNext = document.querySelector(".play-next");
const btnPrev = document.querySelector(".play-prev");

function playNext() {
    playNum++;
    if (playNum > sounds.length - 1) {
      playNum = 0;
    } 
    audio.src = `${sounds[playNum]}`;
    isPlay = true;
    playBtn.classList.add("pause");
    audio.play();
    console.log(audio.src)
    stylePlayItems(playNum);
}
  btnNext.addEventListener('click', playNext);

//Prev
function playPrev() {
    playNum--;
    if (playNum < 0) {
      playNum = sounds.length - 1;
    }
    audio.src = `${sounds[playNum]}`;
    isPlay = true;
    playBtn.classList.add("pause");
    audio.play();
    stylePlayItems(playNum);
}
btnPrev.addEventListener('click', playPrev);

//autoplay
audio.addEventListener('ended', playNext);

//style active track
function stylePlayItems(playNum) {

  for(let i = 0; i < playItem.length; i++) {
    playItem[i].classList.remove('active');
  }
  playItem[playNum].classList.add("active");
}

//progress-bar
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");

// function updateProgress(e) {
  audio.addEventListener('timeupdate', (e) => {
  const currentLength = document.querySelector('.current');
  const audioLength = document.querySelector('.audio-length');
  const{duration, currentTime} = e.srcElement;

  const progressPercent = Math.floor((currentTime * 100) / duration);
  progress.style.width = `${progressPercent}%`;
  let minDuration = Math.floor(duration / 60);
  let secDuration = Math.floor(duration % 60);
  
  if(duration) {
    audioLength.innerText = `${minDuration}:${secDuration}`;
  }
  let minCurrentTime = Math.floor(currentTime / 60);
  let secCurrentTime = Math.floor(currentTime % 60);
  if(secCurrentTime < 10 ) {
    secCurrentTime = `0${secCurrentTime}`;
  }
  currentLength.innerText = `${minCurrentTime}:${secCurrentTime}`;
})
// }
// audio.addEventListener('timeupdate', updateProgress);

 
//set progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress);





// setInterval(function () {
//   const progressPrecent = (audio.currentTime / audio.duration) * 100 ;
//   progress.style.width = `${progressPrecent}%`;
// }, 1000);


