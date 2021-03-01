'use strict';

let images = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'];


const leftImg = document.getElementById( 'leftImg' );
const middleImg = document.getElementById( 'middleImg' );
const rightImg = document.getElementById( 'rightImg' );
const imgSection = document.getElementById( 'ImgSection' );
const showImgResults = document.getElementById( 'showImgResults' );

Img.allImg = [];

let newLeftImg;
let newMiddleImg;
let newRightImg;
let validClicks = 25;
let clicksCounter = 0;

function Img( name ) {
  this.name = name;
  this.img = `./assets/${name}`;
  this.shown = 0;
  this.clicks = 0;
  Img.allImg.push( this );
}

function printNewImg() {

  showImgResults.style.display = 'none';

  let leftImgIndex;
  let middleImgIndex;
  let rightImgIndex;

  do {
    leftImgIndex = randomImg ( 0, images.length -1 );
  }
  while ( leftImgIndex === rightImgIndex || leftImgIndex === middleImgIndex );
  leftImg.src = Img.allImg[leftImgIndex].img;
  leftImg.alt = Img.allImg[leftImgIndex].name;
  newLeftImg = leftImgIndex;

  Img.allImg[leftImgIndex].shown++;


  do {
    middleImgIndex = randomImg ( 0, images.length -1 );
  }
  while ( middleImgIndex === leftImgIndex || middleImgIndex === rightImgIndex );
  middleImg.src = Img.allImg[middleImgIndex].img;
  middleImg.alt = Img.allImg[middleImgIndex].name;
  newMiddleImg = middleImgIndex;

  Img.allImg[middleImgIndex].shown++;


  do {
    rightImgIndex = randomImg ( 0, images.length -1 );
  }
  while ( rightImgIndex === leftImgIndex || rightImgIndex === middleImgIndex );
  rightImg.src = Img.allImg[rightImgIndex].img;
  rightImg.alt = Img.allImg[rightImgIndex].name;
  newRightImg = rightImgIndex;

  Img.allImg[rightImgIndex].shown++;
}

function randomImg( min, max ) {
  let newIndex = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  return newIndex;
}

imgSection.addEventListener( 'click', handelClick );
function handelClick ( event ) {
  if ( clicksCounter < validClicks - 1 ) {
    const clickingElement = event.target;
    clicksCounter++;

    if ( clickingElement.id === 'leftImg' ){
      Img.allImg[newLeftImg].clicks += 1;
    }

    if ( clickingElement.id === 'middleImg' ){
      Img.allImg[newMiddleImg].clicks += 1;
    }

    if ( clickingElement.id === 'rightImg' ){
      Img.allImg[newRightImg].clicks += 1;
    }
    printNewImg();
  }

  else {
    imgSection.removeEventListener( 'click', handelClick );
    showImgResults.style.display = 'block';
  }

}


showImgResults.addEventListener( 'click', handelButtonClick );

function handelButtonClick() {
  const resultSection = document.getElementById( 'resultSection' );

  const ulElement = document.createElement( 'ul' );
  resultSection.appendChild( ulElement );
  for ( let i = 0; i < Img.allImg.length; i++ ) {
    const liElement = document.createElement( 'li' );
    ulElement.appendChild( liElement );
    liElement.textContent = `${Img.allImg[i].name.slice( 0, -4 )} had ${Img.allImg[i].clicks} votes, and was seen ${Img.allImg[i].shown} times.`;
  }

  showImgResults.removeEventListener( 'click', handelButtonClick );

}


for ( let i = 0; i < images.length; i++ ) {
  new Img ( images[i] );
}

printNewImg();
