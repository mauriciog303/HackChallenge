let mobilenet;
let classifier;
let video;
let label = 'loading model';
let ukeButton;
let whistleButton;
let trainButton;
let personName;
let msg;
let count =0;


function modelReady() {
  console.log('El modelo esta listo!!!');
  //classifier.load('data.json', customModelReady);
  msg.html("Ingresa el ID del cliente y agrega diferentes fotos de el");
}

function customModelReady() {
  console.log('El modelo personalizado está listo!!!');
  msg.html(  'Esta listo el modelo personalizado');
  classifier.classify(gotResults);
}

function videoReady() {
  console.log('El video esta listo!!!');
}

function setup() {
  // var canvas = createCanvas(400, 320);
  //canvas.parent('sketch-holder');
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);
  personName = select("#personName");

  msg= select("#msg");  

  addAnImage = select("#addAnImage"); 
  addAnImage.mousePressed(function () {
    count = count +1
    msg.html( "(" + count +  ") Toma por lo menos 10 fotos al cliente para entrenar el modelo. \n despues da click en 'Registrar Rostro' ")
    classifier.addImage( personName.value());
  });

  trainButton = select("#register");
  trainButton.mousePressed(function () {
    classifier.train(whileTraining);
    count=0;
  });

  saveButton = select("#save");
  saveButton.mousePressed(function () {
    classifier.save();
  });
}

function login(){
  //select("#buttons").hide();
  //select("#nameSection").hide()
  //trainButton.hide();
  //saveButton.hide();
  classifier.classify(gotResults);
}


function draw() {
  background(0);
  image(video, 0, 0, 400, 400);
  fill(255);
  textSize(16);
 // text(label, 10, height - 10);
}


function whileTraining(loss) {
  if (loss == null) {
    msg.html("Registro completo, haga clic en 'Iniciar sesión' para ver qué tan bueno soy")
    console.log('Entrenamiento completo');
    classifier.classify(gotResults);
  } else {
    msg.html("Por favor espere... Entrenamiento en progreso")
    console.log(loss);
  }
}

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    msg.html( "Tu eres, " + result.toUpperCase());
    label = result;
    classifier.classify(gotResults);
  }
}

