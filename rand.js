/*

Javascript implementation of the Box-Muller transform

*/

function box_muller(mu, sigma) {
  
  var x, y, r, v = 0;
    
  do {
    x = 2*Math.random() - 1;
    y = 2*Math.random() - 1;
    r = x*x + y*y;
  }
  while (r >= 1);
    
  co = Math.sqrt( -2 * Math.log(r) / r);
  v = x*co;

  return v*sigma + mu;
}