console.log("lets write some javascript")
async function x(){
    let a= await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = response;

    let songLinks = tempDiv.querySelectorAll('a');
    let songs = [];

    songLinks.forEach(link => {
        let songName = link.textContent;
        let songUrl = link.href;

        // Extract only the song name without the ".mp3" and timestamp
        if (songUrl.endsWith('.mp3')) {
            // songs.push({ name: songName, url: songUrl });
            let startIndex = songName.lastIndexOf('.mp3') + 1;
            let endIndex = songName.lastIndexOf('.AM');
            let formattedSongName = songName.substring(startIndex, endIndex).trim();
            songs.push({ name: formattedSongName, url: songUrl });
        }
    });
  // Assuming you have an element with class "playList" in your HTML where you want to display the songs
let s = document.querySelector(".playList");

// Clear any existing content in the element
s.innerHTML = '';

// Iterate over the songs array
songs.forEach(song => {
    // Create a new <p> element for each song
    let songElement = document.createElement('p');
    
    // Set the inner text of the <p> element to display the song name and URL
    songElement.textContent = `${song.name}`;
    songElement.setAttribute('data-src', song.url);
    
    // Append the <p> element to the ".playList" element
    s.appendChild(songElement);
    songElement.addEventListener('click', () =>{
        const audioPlayer = document.getElementById('audioPlayer' );
        audioPlayer.src = song.url;
        audioPlayer.play();

        const downBar = document.getElementById('down-bar');
        downBar.textContent = `Now Playing: ${song.name}`;
    });

});
const playButton = document.querySelector('.playbar .fa-circle-play');
const backwardButton = document.querySelector('.playbar .fa-backward-step');
const forwardButton = document.querySelector('.playbar .fa-forward-step');
playButton.addEventListener('click', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
});

backwardButton.addEventListener('click', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.currentTime -= 10; // Skip backward by 10 seconds
});

forwardButton.addEventListener('click', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.currentTime += 10; // Skip forward by 10 seconds
});
 

// Log the songs array to console for verification
console.log(songs);

    
    


}
x();

