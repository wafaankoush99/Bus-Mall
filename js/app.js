'use strict';

let imgArray = [
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
  'wine-glass.jpg',
];



const imgSection = document.getElementById( 'imgSection' );
const leftImg = document.getElementById( 'left-img' );
const middleImg = document.getElementById( 'middle-img' );
const rightImg = document.getElementById( 'right-img' );



let leftImgIndex = 0;
let middleImgIndex = 0;
let rightImgIndex = 0;
const clickCounter = 25;

function Img( name ) {
  this.name = name;
  this.img = `./assets/${name}`;
  this.clicks = 0;
  this.shown = 0;
  Img.all.push( this );


}

Img.all=[];
Img.counter = 0;








for ( let i = 0 ; i<imgArray.length; i++ ){
  new Img ( imgArray[i] );
}


function printNewImg() {


  let leftImgRandomIndex;
  let middleImgRandomIndex;
  let rightImgRandomIndex;





  do {
    leftImgRandomIndex = randomImg( 0, Img.all.length - 1 );
  }
  while ( middleImgRandomIndex === leftImgRandomIndex && leftImgRandomIndex === rightImgRandomIndex );
  leftImg.src = Img.all[leftImgRandomIndex].img;
  leftImg.alt = Img.all[leftImgRandomIndex].name;
  leftImgIndex = leftImgRandomIndex;




  do {
    middleImgRandomIndex = randomImg( 0, Img.all.length -1 );

  }
  while ( middleImgRandomIndex === leftImgRandomIndex && rightImgRandomIndex === middleImgRandomIndex );
  middleImg.src = Img.all[middleImgRandomIndex].img;
  middleImg.alt = Img.all[middleImgRandomIndex].name;
  middleImgIndex = middleImgRandomIndex;


  do {
    rightImgRandomIndex = randomImg ( 0, Img.all.length -1 );
  }
  while ( rightImgRandomIndex === middleImgRandomIndex && leftImgRandomIndex === rightImgRandomIndex );
  rightImg.src = Img.all[rightImgRandomIndex].img;
  rightImg.alt = Img.all[rightImgRandomIndex].name;
  rightImgIndex = rightImgRandomIndex;



  Img.all[leftImgIndex].shown++;
  Img.all[middleImgIndex].shown++;
  Img.all[rightImgIndex].shown++;
}



// function handelClick (event) {
//   if (Img.all <= clickCounter)
//   const clickedElement = event.target;
//   if ( clickedElement.id == '')
// }

//((Type == 2 && PageCount == 0) || (Type == 2 && PageCount == ''))

function handelClick( event ) {
  if ( Img.all < clickCounter ) {
    const clickedElement = event.target;
    if ( clickedElement.id === 'leftImg' ||
    clickedElement.id === 'rightImg' ||
    clickedElement.id === 'middleImg' ) {
      if ( clickedElement.id === 'leftImg' ) {
        Img.all[leftImgIndex].clicks++;
      }
      if ( clickedElement.id === 'middleImg' ) {
        Img.all[middleImgIndex].clicks++;
      }
      if ( clickedElement.id === 'rightImg' ) {
        Img.all[rightImgIndex].clicks++;
      }

      Img.counter++;
      printNewImg();
      console.log( Img.all );
    }

  }

}

// }



imgSection.addEventListener( 'click', handelClick );

console.log ( Img.all );

function randomImg ( min,max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;

}

printNewImg();




