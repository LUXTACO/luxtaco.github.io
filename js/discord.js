class CurrentSong {
    
    constructor (song_url, playlist_url) {
        this.song_url = song_url
        this.playlist_url = playlist_url
    }

}

function parse_minutes(seconds) {
    var int_minutes = Math.floor(seconds / 60);
    var int_seconds = Math.round(seconds % 60);

    if (int_seconds < 10) {
        int_seconds = "0" + int_seconds;
    }

    return `${int_minutes}:${int_seconds}`;
}

function title_render() {
    const title = 'TAKKESHI.DISCORD';
    let index = 0;

    const loadingAnimation = () => {
        return new Promise((resolve) => {
            const intervalId = setInterval(() => {
                if (index < title.length) {
                    document.title = title.slice(0, index + 1) + '|';
                    index++;
                } else {
                    clearInterval(intervalId);
                    resolve();
                }
            }, 100);
        });
    };

    const deletingAnimation = () => {
        return new Promise((resolve) => {
            const intervalId = setInterval(() => {
                if (index >= 0) {
                    document.title = title.slice(0, index) + '|';
                    index--;
                } else {
                    clearInterval(intervalId);
                    resolve();
                }
            }, 100);
        });
    };

    loadingAnimation().then(() => {
        setTimeout(() => {
            index--;
            deletingAnimation().then(() => {
                setTimeout(title_render, 1000);
            });
        }, 1000);
    });
}

function resize_background() {
    const body = document.body;
    const bg = new Image();
    bg.src = body.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    bg.onload = function() {
        const bgAspectRatio = bg.width / bg.height;
        const screenAspectRatio = window.innerWidth / window.innerHeight;
        if (bgAspectRatio > screenAspectRatio) {
        body.style.backgroundSize = 'auto 100%';
        } else {
        body.style.backgroundSize = '100% auto';
        }
    };
}

function get_random_song() {
    const playlist_id_list = [
        'PLbALFw6Imtbgaux6YbG7dP0mDf96JHOQ1',
        'PLbALFw6ImtbhUfqAyBYBiCtxxR3OhaDmZ',
        'PLbALFw6Imtbiq2NVXayE_ZsLVddXLGrAf'
    ]

    const piped_api = 'https://pipedapi.kavin.rocks/playlists/{playlist_id}';

    const random_playlist_id = playlist_id_list[Math.floor(Math.random() * playlist_id_list.length)];
    const random_api = piped_api.replace('{playlist_id}', random_playlist_id);
    
    fetch(random_api)
        .then(response => response.json())
        .then(data => {
            const random_song = data.relatedStreams[Math.floor(Math.random() * data.relatedStreams.length)];
            const song_title = random_song.title;
            const song_artist = random_song.uploaderName;
            const song_url = random_song.url.replace("/watch?v=", "");
            const song_duration = random_song.duration;
            const song_cover = random_song.thumbnail;

            let song_cover_element = document.getElementById("song-cover");
            let song_name_element = document.getElementById("song-name")
            let song_artist_element = document.getElementById("song-artist")
            let song_duration_element = document.getElementById("song-duration")
            let song_data_holder = document.getElementById("song-data")
            song_cover_element.src = song_cover;
            song_name_element.innerHTML = song_title;
            song_artist_element.innerHTML = song_artist;
<<<<<<< HEAD
            song_duration_element.innerHTML = `Time left: ${parse_minutes(song_duration)}`;
=======
            song_duration_element.innerHTML = `Song duration: ${parse_minutes(song_duration)}`;
>>>>>>> parent of f9408e2 (Refactor CSS and add song progress bar)

            song_data_holder.url = `https://music.youtube.com/watch?v=${song_url}`;
            song_data_holder.playlist = `https://music.youtube.com/playlist?list=${random_playlist_id}`;
            song_data_holder.duration = song_duration * 1000;
        })
        .catch(error => {
            console.error('Error:', error);
            reject(error);
        });
}

function open_song_url() {

    let current_song_data = document.getElementById("song-data")

    window.open(current_song_data.url, '_blank');
}

function open_playlist_url() {
    let current_song_data = document.getElementById("song-data")

    window.open(current_song_data.playlist, '_blank');
}

<<<<<<< HEAD
let timerInterval;

function startTimer(duration) {
    clearInterval(timerInterval);
  
    let timer = duration;
    let minutes, seconds;
    const progressElement = document.getElementById("song-progress");
    const timelineWidth = document.getElementById("song-timeline").offsetWidth;
    const currentTimeElement = document.getElementById("current-time");
    const totalDurationElement = document.getElementById("total-duration");
  
    // Set the total duration
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.round(duration % 60);
    totalDurationElement.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
  
    timerInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
  
      minutes = minutes < 10 ? minutes.toString() : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      song_duration_element.textContent = `Time left: ${minutes}:${seconds}`;
  
      // Update the current time
      const currentMinutes = Math.floor((duration - timer) / 60);
      const currentSeconds = Math.round((duration - timer) % 60);
      currentTimeElement.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
  
      const progress = (duration - timer) / duration;
      progressElement.style.width = progress * timelineWidth + "px";
  
      if (--timer < 0) {
        clearInterval(timerInterval);
        get_random_song();
      }
    }, 1000);
  }

=======
>>>>>>> parent of f9408e2 (Refactor CSS and add song progress bar)
document.addEventListener('DOMContentLoaded', () => {
    title_render()
    resize_background();
    get_random_song();
    window.addEventListener('resize', resize_background);
});