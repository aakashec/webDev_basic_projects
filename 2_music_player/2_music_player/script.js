
const apt = fetch("song.json")
let a = 0;
let pause = true;
let audio = new Audio();

apt.then((data) => {
    return data.json()
})
    .then((data) => {

        forwardBackword(data)
        domManipulation(data)
        controlbus(data)
        songLi(data)
    })
    .catch(() => {
        console.log("error");
    })

function domManipulation(data) {
    audio.src = (data[a].dir);
    const img = document.querySelector(".thumbnial");
    img.src = data[a].img;
    const name = document.querySelector(".mName");
    name.textContent = data[a].name;
}

function controlbus(data) {
    const play = document.getElementById("play");
    play.addEventListener("click", () => {
        if (pause === true) {
            audio.play();
            pause = false;
            play.innerHTML = `
            ⏸
                    `
        }
        else {
            audio.pause();
            pause = true;
            play.innerHTML = `
              ▶
            `

        }
    })
}

function forwardBackword(data) {

    const forw = document.getElementById("forward");
    forw.addEventListener("click", () => {
        setTimeout(function () {
            if (a < data.length - 1) {
                a++;
                domManipulation(data)
                audio.play();
                pause = false;
                play.innerHTML = `
            ⏸
            `
            }
            else {
                a = 0;
                domManipulation(data)
                audio.play();
                pause = false;
                    play.innerHTML = `
            ⏸
            `
            }
        }, 500)


    })

    const back = document.getElementById("backword");
    back.addEventListener("click", () => {
        setTimeout(function () {
            if (a > 0) {
                a--;
                domManipulation(data)
                audio.play();
                pause = false;
            }
            else {
                a = data.length - 1;
                domManipulation(data)
                audio.play();
                pause = false;
                play.innerHTML = `
            ⏸
            `
            }

        }, 500)

    })
}


function songLi(data) {
    const list = document.getElementById("list");

    

    data.forEach((song, index) => {
        list.innerHTML += `
            <p data-index="${index}">
                ${index + 1}. ${song.name}
            </p>
        `;
    });

    list.addEventListener("click", (e) => {
        if (e.target.tagName === "P") {
            a = e.target.dataset.index;
            domManipulation(data);
            audio.play();
            pause = false;
            play.innerHTML = "⏸";
        }
    });
}

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

audio.addEventListener("timeupdate", () => {

    const current = audio.currentTime;
    const duration = audio.duration;

    // Update progress bar
    progress.value = (current / duration) * 100;

    // Format time
    currentTimeEl.textContent = formatTime(current);
    durationEl.textContent = formatTime(duration);
   
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

function formatTime(time){
    if(isNaN(time)) return "0:00";

    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    return `${minutes}:${seconds}`;
}


