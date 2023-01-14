function fetchData() {
	fetch('https://hyades.shoutca.st:2199/external/rpc.php?&m=streaminfo.get&username=lfhh&charset=&mountpoint=&rid=lfhh&_=1673663934298').then(response => {
		return response.json();
	}).then(data => {

		$('#source').text('https://chillsky.com');
        $('#bitrate').text(data.data[0].bitrate);
        $('#serverstatus').text(data.data[0].server);
        $('#isoffline').text(data.data[0].offline);
        $('#listeners').text(data.data[0].listeners);
        $('#listenertotal').text(data.data[0].listenertotal);
        $('#artist').text(data.data[0].track.artist);
        $('#song').text(data.data[0].track.title);
        $('#album').text(data.data[0].track.album);

            if (data.data[0].track.title != 'Unknown') {
                $('#song').text(data.data[0].track.title);
            } else {
                $('#song').text('---');
            }
            
            if (data.data[0].track.album != 'Unknown') {
                $('#album').text(data.data[0].track.album);
            } else {
                $('#album').text('---');
            }
            
            if (data.data[0].track.artist != 'Unknown') {
                $('#artist').text(data.data[0].track.artist);
            } else {
                $('#artist').text('---');
            }

	}).catch(error => {
		console.log(error);
	});
}

fetchData();

const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio(
  "https://lfhh.radioca.st/stream"
);

//click on timeline to skip around
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

//check audio percentage and update time accordingly
setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);

//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector(".controls .toggle-play");
playBtn.addEventListener(
  "click",
  () => {
    if (audio.paused) {
      playBtn.classList.remove("play");
      playBtn.classList.add("pause");
      audio.play();
    } else {
      playBtn.classList.remove("pause");
      playBtn.classList.add("play");
      audio.pause();
    }
  },
  false
);

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}
