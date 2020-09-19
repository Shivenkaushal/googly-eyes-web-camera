let pose;
let skeleton;
let bnt;
let tnt;
let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eye1X, eye1Y, eye2X, eye2Y;

function setup() {
  filterModes = [ 
    GRAY, 
    OPAQUE, 
    INVERT, 
    POSTERIZE, 
    BLUR, 
    ERODE, 
    DILATE, 
    BLUR, 
    THRESHOLD 
  ]; 
  index = 0; 
  currFilterMode = filterModes[index]; 
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  bnt=createButton("capture image");
  btn = createButton("Change filter"); 
  btn.position(400, 400); 
  bnt.position(700, 200); 
  btn.mousePressed(changeFilter); 
  bnt.mousePressed(saveCanvas);
}

function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    noseX = poses[0].pose.keypoints[0].position.x;
    noseY = poses[0].pose.keypoints[0].position.y;
    
    eye1X = poses[0].pose.keypoints[1].position.x;
    eye1Y = poses[0].pose.keypoints[1].position.y;
    
    eye2X = poses[0].pose.keypoints[2].position.x;
    eye2Y = poses[0].pose.keypoints[2].position.y;
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  image(video, 0, 0);

  fill(255, 0, 0);
  ellipse(noseX, noseY, 50);
  
  eye(eye1X, eye1Y, 80, 1);
  eye(eye2X, eye2Y, 80, -1);
  filter(currFilterMode); 
}

function eye(x, y, size, n) {
	let angle = frameCount * 0.2;
	
	fill(255);
	noStroke();
	ellipse(x, y, size, size);
	
	fill(56);
	noStroke();
	ellipse(x+cos(angle*n)*size/5, y+sin(angle*n)*size/5, size/2, size/2);
}
function changeFilter() { 
  if (index < filterModes.length - 1) 
    index++; 
  else
    index = 0; 
  currFilterMode = filterModes[index]; 
  
  console.log("Current filter: " + currFilterMode); 
}

function saveCanvas(){
     
  save('myCanvas.png');
  return false;
}

