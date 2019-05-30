////// Player audio ///////

const tracks = [
  {
    title: 'OFFENCE',
    src: '../assets/son/Offence.mp3'
  },
  {
    title: 'BOSS',
    src: '../assets/son/Boss.mp3'
  },
  {
    title: 'SELFISH',
    src: '../assets/son/Selfish.mp3'
  },
  {
    title: 'WOUNDS',
    src: '../assets/son/Wounds.mp3'
  },
  {
    title: 'VENOM',
    src: '../assets/son/Venom.mp3'
  },
  {
    title: '101FM',
    src: '../assets/son/101FM.mp3'
  },
  {
    title: 'PRESSURE',
    src: '../assets/son/Pressure.mp3'
  },
  {
    title: 'THERAPY',
    src: '../assets/son/Therapy.mp3'
  },
  {
    title: 'SHERBET SUNSET',
    src: '../assets/son/Sherbet_Sunset.mp3'
  },
  {
    title: 'FLOWERS',
    src: '../assets/son/Flower.mp3'
  }
];


const mainCtnr = document.getElementById('tracklist');

tracks.forEach((track, index) => {
  const titleP = document.createElement('p');
  titleP.innerHTML = (index + 1) + '. ' + track.title;

  const audioPlayer = document.createElement('div');
  audioPlayer.className = 'audio-player';


  const playBtn = document.createElement('i');
  playBtn.className = 'fas fa-play play-btn';

  audioPlayer.appendChild(playBtn);

  playBtn.addEventListener('click', function () {
    togglePlay(audioTag, this);
  });



  const audioWrapper = document.createElement('div');
  audioWrapper.className = 'audio-wrapper';

  const audioTag = document.createElement('audio');

  audioTag.addEventListener('timeupdate', function (e) {
    initProgressBar(e, this, smallLeft, smallRight, progressElt, playBtn);
  });

  const sourceTag = document.createElement('source');
  sourceTag.type = 'audio/mp3';
  sourceTag.src = track.src;

  audioTag.appendChild(sourceTag);

  audioWrapper.appendChild(audioTag);
  audioPlayer.appendChild(audioWrapper);


  const playerControl = document.createElement('div');
  playerControl.className = 'player-controls-scrubber';

  const seekObjContainer = document.createElement('span');
  seekObjContainer.className = 'seek-obj-container';

  const progressElt = document.createElement('progress');
  progressElt.className = 'seek-obj';
  progressElt.value = '0';
  progressElt.max = '1';

  seekObjContainer.appendChild(progressElt);


  const smallLeft = document.createElement('small');
  smallLeft.className = 'small-left';
  // playerControl.appendChild(smallLeft);

  const smallRight = document.createElement('small');
  smallRight.className = 'small-right';
  // playerControl.appendChild(smallRight);

  playerControl.appendChild(seekObjContainer);

  audioPlayer.appendChild(playerControl);



  mainCtnr.appendChild(titleP);
  mainCtnr.appendChild(audioPlayer);
});



function initProgressBar(event, player, startTime, endTime, progressBar, playBtn) {
  const length = player.duration
  const current_time = player.currentTime;

  // calculate total length of value
  const totalLength = calculateTotalValue(length)
  endTime.innerHTML = totalLength;

  // calculate current value time
  const currentTime = calculateCurrentValue(current_time);
  startTime.innerHTML = currentTime;

  progressBar.value = (player.currentTime / player.duration);
  progressBar.addEventListener("click", seek);

  if (player.currentTime >= player.duration - 1) {
    //togglePlay(player, playBtn);
    player.pause();
  }

  function seek(event) {
    const percent = event.offsetX / this.offsetWidth;
    player.currentTime = percent * player.duration;
    progressBar.value = percent / 100;
  }
}

function calculateTotalValue(length) {
  const minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString(),
    seconds = seconds_str.substr(0, 2),
    time = minutes + ':' + seconds

  return ' / ' + time;
}

function calculateCurrentValue(currentTime) {
  const current_hour = parseInt(currentTime / 3600) % 24,
    current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

  return current_time;
}


function togglePlay(player, playBtn) {

  if (player.paused === false) {
    player.pause();
    playBtn.className = 'fas fa-play play-btn';

  } else {
    player.play();
    playBtn.className = 'far fa-pause-circle play-btn';
  }
}


////// Photos ////////

function initStyle(element, left, top, position, width, height, zIndex) {
  element.className = 'img-ctnr';
  element.style.left = left;
  element.style.top = top;
  element.style.position = position;
  element.style.width = width;
  element.style.height = height;
  element.style.zIndex = zIndex;
}

const imgCtnrs = document.getElementsByClassName('img-ctnr'),
  overlay = document.getElementById('global-overlay');
let selectedImg;

for (let i = 0; i < imgCtnrs.length; i++) {
  imgCtnrs[i].addEventListener('click', function (e) {
    if (selectedImg) {
      initStyle(selectedImg, null, null, null, null, null, null);
    }

    if (selectedImg === e.target.parentElement) {
      overlay.style.display = 'none';
      selectedImg = false;
      return;
    }
    overlay.style.display = 'block';

    initStyle(e.target.parentElement, 'calc(39% - 200px)', '50px', 'absolute', '500px', '500px', '4');
    selectedImg = e.target.parentElement;

  });
}


//////// Videos //////////

overlayBoss = document.getElementById('overlayBoss');
bossOverlay = document.getElementById('bossOverlay');

overlaySelfish = document.getElementById('overlaySelfish')
selfishOverlay = document.getElementById('selfishOverlay');

overlayOffense = document.getElementById('overlayOffense');
offenseOverlay = document.getElementById('offenseOverlay');

overlayBackseat = document.getElementById('overlayBackseat');
backseatOverlay = document.getElementById('backseatOverlay');

overlayGratitude = document.getElementById('overlayGratitude');
gratitudeOverlay = document.getElementById('gratitudeOverlay');

overlayCoachella = document.getElementById('overlayCoachella');
coachellaOverlay = document.getElementById('coachellaOverlay');

overlayGreat = document.getElementById('overlayGreat');
greatOverlay = document.getElementById('greatOverlay');

overlaySonar = document.getElementById('overlaySonar');
sonarOverlay = document.getElementById('sonarOverlay');

overlayDemon = document.getElementById('overlayDemon');
demonOverlay = document.getElementById('demonOverlay');

overlayListen = document.getElementById('overlayListen');
listenOverlay = document.getElementById('listenOverlay');


function boss() {
  overlayBoss.classList.remove('d-none');
  bossOverlay.classList.remove('d-none');
}

function selfish() {
  overlaySelfish.classList.remove('d-none');
  selfishOverlay.classList.remove('d-none');
}

function offense() {
  overlayOffense.classList.remove('d-none');
  offenseOverlay.classList.remove('d-none');
}

function backseat() {
  overlayBackseat.classList.remove('d-none');
  backseatOverlay.classList.remove('d-none');
}

function gratitude() {
  overlayGratitude.classList.remove('d-none');
  gratitudeOverlay.classList.remove('d-none');
}

function coachella() {
  overlayCoachella.classList.remove('d-none');
  coachellaOverlay.classList.remove('d-none');
}

function great() {
  overlayGreat.classList.remove('d-none');
  greatOverlay.classList.remove('d-none');
}

function sonar() {
  overlaySonar.classList.remove('d-none');
  sonarOverlay.classList.remove('d-none');
}

function demon() {
  overlayDemon.classList.remove('d-none');
  demonOverlay.classList.remove('d-none');
}

function listen() {
  overlayListen.classList.remove('d-none');
  listenOverlay.classList.remove('d-none');
}




function hideBoss() {
  overlayBoss.classList.add('d-none');
  bossOverlay.classList.add('d-none');
}

function hideSelfish() {
  overlaySelfish.classList.add('d-none');
  selfishOverlay.classList.add('d-none');
}

function hideOffense() {
  overlayOffense.classList.add('d-none');
  offenseOverlay.classList.add('d-none');
}

function hideBackseat() {
  overlayBackseat.classList.add('d-none');
  backseatOverlay.classList.add('d-none');
}

function hideGratitude() {
  overlayGratitude.classList.add('d-none');
  gratitudeOverlay.classList.add('d-none');
}

function hideCoachella() {
  overlayCoachella.classList.add('d-none');
  coachellaOverlay.classList.add('d-none');
}

function hideGreat() {
  overlayGreat.classList.add('d-none');
  greatOverlay.classList.add('d-none');
}

function hideSonar() {
  overlaySonar.classList.add('d-none');
  sonarOverlay.classList.add('d-none');
}

function hideDemon() {
  overlayDemon.classList.add('d-none');
  demonOverlay.classList.add('d-none');
}

function hideListen() {
  overlayListen.classList.add('d-none');
  listenOverlay.classList.add('d-none');
}

new fullScroll({
  mainElement: 'main',
  displayDots: true,
  dotsPosition: 'right',
  animateTime: 1,
  animateFunction: 'ease',
  currentPosition: 0,
});


