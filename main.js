song="";
status1="";
persons=[];
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML="Status : Detecting persons";
}
function preload(){
   song=loadSound("nobody_but_you.mp3");
}
function draw(){
    image(video,0,0,380,380);
    if(status1 != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
        for ( i = 0; i < persons.length; i++) {
            document.getElementById("status").innerHTML="status : Object Detected";
          
            fill(r,g,b);
            percent=floor(persons[i].confidence*100);
            text(persons[i].label+" "+percent+"%", persons[i].x+15,persons[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(persons[i].x,persons[i].y,persons[i].width,persons[i].height);

            if(persons[i].label=="person"){
                document.getElementById("person").innerHTML="Baby Found";
                song.stop();
            }
            else{
                document.getElementById("person").innerHTML="Baby Not Found";
                song.play();  
            }
        }
        if(persons.length==0){
            document.getElementById("person").innerHTML="Baby Not Found";
            song.play();  
        }
    }
}
function modelLoaded(){
    console.log("Model is loaded");
    status1=true;
    
}
function gotResult(error,results){
if (error){
    console.log(error);
}
console.log(results);
persons=results;
}