const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
  }
  

navigator.getUserMedia = 
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia ;
    
//select  everything in html
const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
let model;

//opeinig webcam
handTrack.startVideo(video)
.then(status => {
    if(status){
        navigator.getUserMedia({video: {}}, stream => { //stream is the info from webcam
           video.srcObject = stream;
           setInterval(runDetection, 1000); //every one second run detection
        },
        err => console.log(err)
        );
    }
});
//now we can use the model and we can check our webcam to see if our hand is in there
function runDetection(){
    model.detect(video).then(predictions => { //detects hand
       console.log(predictions[0]);
       model.renderPredictions(predictions, canvas, context, video);
       //it shows the video which detects hand
       if(predictions.length > 0){
        document.getElementById('hello').textContent = 'hello';

       }
    });
}


// Load the model.
handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
  });