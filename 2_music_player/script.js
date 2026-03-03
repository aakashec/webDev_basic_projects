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
       
    })
    .catch(() => {
        console.log("error");

    })

function domManipulation(data)
 { 
    audio.src = (data[a].dir);
    
    const img = document.querySelector(".thumbnial");
    img.src = data[a].img;

    const name = document.querySelector(".mName");
    name.textContent = data[a].name;

    
}

function controlbus(data)
{
    
    const play = document.getElementById("play");
    play.addEventListener("click", () => {
        if(pause === true){
            audio.play();
            pause = false;
            play.innerHTML = `
            ⏸
            `
        }
        else{
            audio.pause();
            pause = true;
             play.innerHTML = `
              ▶
            `
            
    }
    })
}

function forwardBackword(data){

     const forw = document.getElementById("forward");
     forw.addEventListener("click",()=>{
       setTimeout(function(){
        if(a < data.length -1){
            a++;
        domManipulation(data)
         audio.play();
            pause = false;
              play.innerHTML = `
            ⏸
            `

        }
        else{
             a = 0;
        domManipulation(data)
         audio.play();
            pause = false;
        }
       },500) 
        

     })

     const back = document.getElementById("backword");
     back.addEventListener("click",()=>{
      setTimeout(function(){
        if(a > 0){
            a--;
        domManipulation(data)
         audio.play();
            pause = false;
        }
        else{
             a = data.length -1;
        domManipulation(data)
         audio.play();
            pause = false;
               play.innerHTML = `
            ⏸
            `
        }

      },500)  
        
     })
}

