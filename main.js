// OLDER/DEBUG VERSION:

// var sum = window.prompt("Gib die Magische Konstante an","478");
// var a = 0;
//
//
// var one = [64,	63,	3,	4,	5,	6, a + 58,	57];
// var two = [56,	55,	11,	12,	13, a +	14,	50,	49];
// var three = [17, a + 18, 46, 45,	44,	43,	23,	24];
// var four = [25,	26, 38,	37,	a +	36,	35,	31,	32];
// var five = [33,	34,	a +	30,	29,28,	27,	39,	40];
// var six = [41,	42,	22,	a +	21,	20,	19,	47,	48];
// var seven = [ a + 16,	15,	51,	52,	53,	54,	10,	9];
// var eight = [8,	7,	59,	60,	61,	62,	2,	a + 1];
//
// var solSquare = [one, two, three, four, five , six, seven, eight];
// check(solSquare);

function check(square) {
  // Check if the sum of the rows, colmns and diagonals equals the magic number.
  console.log(square);

  sum = square.length * (square.length * square.length + 1) / 2;
  console.log(sum);

  // Check the rows.
  for (row of square){
      x = 0;
      for (i of row){
          x = x + i;
      }
      if (x != sum){
        console.log ("fehler!!!!!!!!!!");
        console.log(x);
        console.log(row);
        return false;
      }
  }
  // Check the colmns.
  for (column in square){
    x = 0;
    for (row of square){
      x = x + row[column];
    }
    if (x != sum){
      console.log ("fehler!!!!!!!!!!");
      console.log(x);
      console.log(column);
      return false;
    }
  }

  // Check the diagonal(from right top to left buttom).
  count = 0;
  x = 0;
  for (row of square){
    x = x + row[count];
    count = count + 1;
  }
  if (x != sum){
    console.log ("fehler!!!!!!!!!!");
    return false;
  }


  // Check the diagonal(from left top to right buttom).
  count = 0
  x = 0
  for (row of square){
    x = x + row[row.length - count - 1];
    count = count + 1;
  }
  if (x != sum){
      console.log ("fehler!!!!!!!!!!");
      return false;
  }
  return true;
}


function displaySquare(square) {
  // Displays the array square in html.
  var quadrat = document.getElementById('quadrat');

  // removing the old square
  childNodes = quadrat.childNodes
  while (quadrat.childNodes.length != 0) {
    for (i of quadrat.childNodes) {
      quadrat.removeChild(i);
    }

  }

  for (row of square){
    addRow(square);

    function addRow(square) {
      // Adds rows in the quadrat.
      addedRow = document.createElement("p");
      quadrat.appendChild(addedRow);
      addedRow.class = "row";
      addCells(addedRow);
    }

    function addCells(htmlRow) {
      // Adds cells in the added row and fills them with the numbers of square.

      for (column of row){
        addedCell = document.createElement('span');
        addedCell.innerHTML = column;
        htmlRow.appendChild(addedCell);
        addedCell.class = "cell";
      }
    }
  }
}

function calcMSquare() {
  x = document.getElementById('size').value;
  if (x % 2 == 0) {
    if (x % 4 == 0) {
        var square = evenerMSquare(x);
    }
    else {
      alert("is not implemented yet");
    }
  }
  else {
    var square = oddMSquare(x);
  }
  check(square);
  // if (check(square)) {
    displaySquare(square);
  // }
  return false;
}

function evenerMSquare(x) {


  // create retSquare
  retSquare = [];
  // for (var i = 0; i < x; i++) {
  //   newRow = [];
  //   for (var i = 0; i < x; i++) {
  //     newRow.push();
  //   }
  //   retSquare.push(newRow);
  // }

  // calculate retSquare
  for (var i = 0; i < (x * x); i++) {
    if ((i % x) == 0) {
      newRow = [];
      retSquare.push(newRow);
    }
    if ( ((i % x < x / 4) || i % x >= x - x / 4)
    && ((retSquare.length <= x / 4) || retSquare.length > x - x / 4)  ){
        newRow[i % x] = i + 1;
    }
    else if ( !((i % x < x / 4) || i % x >= x - x / 4)
    && !((retSquare.length <= x / 4) || retSquare.length > x - x / 4) ){
        newRow[i % x] = i + 1;
    }
    else {
      newRow[i % x] = (x * x) - i;
    }
  }
  return retSquare;
}

function isCellempty(square, column, row) {

  if (column >= square.length) {
    column = square.length % column;
  }
  else if (column < 0) {
    column = 0 - column;
    column = square.length - column;
  }
  if (column >= square.length) {
    column = square.length % column;
  }
  else if (row < 0) {
    row = 0 - row;
    row = square.length - row;
  }

  y = square[row];
  if (y[column] != null) {
    return false;
  }
  return true;
}

function oddMSquare(x) {
  // create retSquare
  retSquare = [];
  for (var i = 0; i < x; i++) {
    newRow = [];
    for (var u = 0; u < x; u++) {
      newRow.push();
    }
    retSquare.push(newRow);
  }
  console.log(retSquare);


  row = 0;
  column = Math.round( x / 2 ) -1;
  console.log(column);
  for (var i = 1; i <= x * x; i++) {
    y = retSquare[row];
    y[column] = i;
    if(isCellempty(retSquare, column +1, row -1)){
      column++;
      row--;
    }
    else {
        row++;
    }

    if (column >= retSquare.length) {
      column = retSquare.length % column;
    }
    else if (column < 0) {
      column = 0 - column;
      column = retSquare.length - column;
    }
    if (row >= retSquare.length) {
      row = retSquare.length % row;
    }
    else if (row < 0) {
      row = 0 - row;
      row = retSquare.length - row;
    }
  }
  console.log(retSquare);
  return retSquare;
}

function cevenMSquare() {

}
