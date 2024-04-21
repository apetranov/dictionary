function playSound() {
    const sound = document.getElementById("sound");
    if (sound) {
        sound.play();
    } else {
        console.error("Element with id 'sound' not found.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    const result = document.getElementById("wordContainer");
    const btn = document.querySelector("button");

    btn.addEventListener("click", () => {
        let inpWord = document.getElementById("searchInput").value; // Get the value of the input field
        fetch(`${url}${inpWord}`)
        .then((response) => response.json()) // Call response.json() instead of accessing response.json
        .then((data) => {
            console.log(data);
            result.innerHTML = `<div class="m-5 flex items-center justify-center">
            <h1 id="word" class="text-5xl">${inpWord}</h1>
            <img onclick="playSound('${data[0].phonetics[0].audio}')" src="static/speaker-filled-audio-tool.png" id="sound" class="max-w-5 ml-2" alt="">
        </div>
        <div style="color:gray" class="flex items-center justify-center">
            <p><i>${data[0].meanings[0].partOfSpeech} <i id="transcription">${data[0].phonetic}</i></i></p>
        </div>

        <div class="m-5 flex items-center justify-center">
            <p id="definition">${data[0].meanings[0].definitions[0].definition}</p>
        </div>
        
        <div class="m-5 flex items-center justify-center">
            <p id="example"><i>${data[0].meanings[0].definitions[0].example || ""}</i></p>
        </div>`;
        })
        .catch((error) => console.error("Error fetching data:", error)); // Handle any errors
    });

    
});

function playSound(audioUrl) {
    try {
        const sound = new Audio(audioUrl);
        sound.play();
    } catch (error) {
        console.error("Error playing sound:", error);
    }
}