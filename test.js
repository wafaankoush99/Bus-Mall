
localStorage.setItem( 'firstName', objLocalStorage );
console.log( localStorage.getItem( 'firstName' ) );

let localObj = localStorage.getItem( 'firstName' );

console.log( localObj );
console.log( JSON.parse( localObj ) );
console.log( typeof localStorage.getItem( 'firstName' ) );

console.log( obj );
