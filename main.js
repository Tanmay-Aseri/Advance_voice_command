x = 0;
y = 0;

draw_apple = 0;
screen_width = 0;
apple ="";
speak_data = "";
to_number = 0;

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload(){
  loadImage("apple.png");
  apple = "apple.png";
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 

    to_number = Number(content);

    if(Number.isInteger(to_number)){
      draw_apple = "set";
      speak_data = "Started drawing apple";
     
      for(var i = 1; i <= to_number; i++)
      {
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 460 );
      image(apple, x, y, 50, 50);

      }

    } else{
      speak_data = "The speech has not recognized a number";
    }
}

function setup() {
 screen_width = window.innerWidth;
 screen_height = window.innerHeight;
 canvas = createCanvas(screen_width, screen_height-150, 75, 75 );
}

function draw() {
  if(draw_apple == "set")
  {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    
    speak();
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = to_number + " Apples drawn";
}
