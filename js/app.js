'use strict';

let images = [
  './Bag.jpg',
  './Banana.jpg',
  './Bathroom.jpg',
  './Boots.jpg',
  './Breakfast.jpg',
  './Bubblegum.jpg',
  './Chair.jpg',
  './Cthulhu.jpg',
  './Dog-duck.jpg',
  './Dragon.jpg',
  './Pen.jpg',
  './Pet-sweep.jpg',
  './Scissors.jpg',
  './Shark.jpg',
  './Sweep.png',
  './Tauntaun.jpg',
  './Unicorn.jpg',
  './Usb.gif',
  './Water-can.jpg',
  './Wine-glass.jpg'];


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




let previous = [];

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
  previous.push( leftImgIndex );

  Img.allImg[leftImgIndex].shown++;


  do {
    middleImgIndex = randomImg ( 0, images.length -1 );
  }
  while ( middleImgIndex === leftImgIndex || middleImgIndex === rightImgIndex );
  middleImg.src = Img.allImg[middleImgIndex].img;
  middleImg.alt = Img.allImg[middleImgIndex].name;
  newMiddleImg = middleImgIndex;
  previous.push( leftImgIndex );


  Img.allImg[middleImgIndex].shown++;


  do {
    rightImgIndex = randomImg ( 0, images.length -1 );
  }
  while ( rightImgIndex === leftImgIndex || rightImgIndex === middleImgIndex );
  rightImg.src = Img.allImg[rightImgIndex].img;
  rightImg.alt = Img.allImg[rightImgIndex].name;
  newRightImg = rightImgIndex;
  previous.push( rightImgIndex );


  Img.allImg[rightImgIndex].shown++;
}


function randomImg( min, max ) {

  let newGroup = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  for( let i = 0;i < previous.length;i++ ){
    if ( newGroup === previous[i] ){
      newGroup = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
  }return( newGroup );

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
    printChart();

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



function printChart() {

  let imagesLabels = [];
  let clicksData = [];
  let shownData = [];

  for ( let i = 0 ; i < Img.allImg.length; i++ ) {
    imagesLabels.push( Img.allImg[i].name.slice( 0, -4 ) );
    clicksData.push( Img.allImg[i].clicks );
    shownData.push( Img.allImg[i].shown );
  }

  let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  let myChart = new Chart( ctx, {
    type: 'bar',
    data: {
      labels: imagesLabels,
      datasets: [{
        label: '# of Votes',
        data: clicksData,
        backgroundColor:

          'rgba(255, 206, 86, 0.2)',

        borderColor:

          'rgba(255, 206, 86, 1)',

        borderWidth: 3
      }
      ,{

        label: '# of Votes',
        data: shownData,
        backgroundColor:

          'rgba(75, 192, 192, 0.2)',

        borderColor:
          'rgba(75, 192, 192, 0.2)',

        borderWidth: 3
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  }
  );
}

localStorage.setItem( 'name', JSON.stringify( images.all ) );

function saveData() {
  const data = localStorage.getItem( 'name' );

  if( data ) {
    const objectData = JSON.parse( data );
    images.all = objectData;
    printNewImg();
  }
}

saveData();