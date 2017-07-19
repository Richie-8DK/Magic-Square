function constructMSquare() {
  size = document.getElementById('size').value; // squaresize

  // choose generatinalgorithm depending on squaresize( odd, even or doubleeven(evener))
  if (size % 2 == 0) {
    if (size % 4 == 0) {
      var square = evenerMSquare(size);
    } else {
      var square = evenMSquare(size);
    }
  } else {
    var square = oddMSquare(size);
  }

  console.log(square);
  if (check(square)) {
    displaySquare(square);
  }

  return false;

}

function isCellempty(square, column, row, squaresize, startX,  startY) {
  // default arguments

  // yes inefficient, but otherwise it is not working :( why?
  if (squaresize == undefined) {
    squaresize = square.length;
  }

  if (startX == undefined) {
    startX = 0;
  }

  if (startY == undefined) {
    startY = 0;
  }

  // check if the cell is empty

  // if column is not in the square put it back in
  if (column >= squaresize) {
    var column = squaresize % column;
  } else if (column < 0) {
    if (column < 0) {
      column = 0 - column;
    }

    var column = squaresize - column;
  }
  // if row is not in the square put it back in
  if (row >= squaresize) {
    var row = squaresize % row;
  } else if (row < 0) {
    var row = 0 - row;
    var row = squaresize - row;
  }

  // add start position to column and row to find the position in the big square
  var column = column + startX;
  var row = row + startY;

  // check if this position is empty
  var cell = square[row];
  if (cell[column] != null) {
    return false;
  }

  return true;
}

function oddMSquare(size) {
  // constracts magic squares with an odd size (http://www.1728.org/magicsq1.htm)

  // create an empty Square
  var square = [];
  for (var i = 0; i < size; i++) {
    var newRow = [];
    for (var u = 0; u < size; u++) {
      newRow.push();
    }

    square.push(newRow);
  }

  // fill the magic square
  var row = 0;
  var column = Math.round(size / 2) - 1; //start in the middle

  // counts till the number of cells
  for (var i = 1; i <= size * size; i++) {
    // fill the count in the cell
    var c = square[row];
    c[column] = i;

    // if the cell top right is empty set current "cell" to that position
    // else set it to the position below
    if (isCellempty(square, column + 1, row - 1)) {
      column++;
      row--;
    } else {
      row++;
    }

    // if column is not in the square put it back in
    if (column >= size) {
      column = size % column;
    } else if (column < 0) {
      column = 0 - column;
      column = size - column;
    }

    // if row is not in the square put it back in
    if (row >= size) {
      row = size % row;
    } else if (row < 0) {
      row = 0 - row;
      row = size - row;
    }
  }

  return square;
}

function evenMSquare(size) {
  // constracts magic squares with an even size (http://www.1728.org/magicsq3.htm)

  // create an empty square
  var square = [];
  for (var i = 0; i < size; i++) {
    var newRow = [];
    for (var u = 0; u < size; u++) {
      newRow.push();
    }

    square.push(newRow);
  }

  var y = size / 2; // size of the "mini magic squares"
  var i = 1; // counter

  // counts the mini magic sqaures
  for (var b = 1; b <= 4; b++) {
    // choose "mini magic square"
    switch (b) {
      case 1:
        // upper left
        var startX = 0;
        var startY = 0;
        break;
      case 2:
        // lower right
        var startX = y;
        var startY = y;
        break;
      case 3:
        // upper right
        var startX = y;
        var startY = 0;
        break;
      case 4:
        // lower left
        var startX = 0;
        var startY = y;
        break;
    }

    var row = 0;
    var column = (Math.round(y / 2) - 1); //start in the middle

    // counts till the number of cells of the "mini magic square"
    for (var a = 1; a <= y * y; a++ && i++) {
      // fill the count in the cell
      var c = square[row + startY];
      c[column + startX] = i;

      // if the cell top right is empty set current "cell" to that position
      // else set it to the position below
      if (isCellempty(square, column + 1, row - 1, y, startX, startY)) {
        column++;
        row--;
      } else {
        row++;
      }

      // if column is not in the square put it back in
      if (column >= y) {
        column = y % column;
      } else if (column < 0) {
        if (column < 0) {
          column = 0 - column;
        }

        column = y - column;
      }

      // if column is not in the square put it back in
      if (row >= y) {
        row = y % row;
      } else if (row < 0) {
        if (row < 0) {
          row = 0 - row;
        }

        row = y - row;
      }
    }

  }

  function swapAandB(posX, posY) {
    // swap the cell(posX, posY) with the cell at the upper mini magic square
    var cRow = square[posX];
    var a = cRow[posY];
    cRow = square[posX + y];
    var b = cRow[posY];
    cRow[posY] = a;
    cRow = square[posX];
    cRow[posY] = b;

  }

  // swap the right corners
  for (var i = 0; i < Math.floor(y / 2); i++) {
    for (var row = 0; row < y / 2; row++) {
      swapAandB(row, i);
      swapAandB(y - row - 1, i);

    }
  }

  // swap in the middle row beginning from the second cell till the lenght of the corners
  for (var i = 1; i < y / 2; i++) {
    swapAandB(Math.floor(y / 2), i);
  }

  // swap the last ( (squaresize - 6(size of the first single even magic square))
  //                  / 4(distance to next single even magic square) ) columns
  for (var i = 1; i <= (size - 6) / 4; i++) {
    for (var row = 0; row < y; row++) {
      swapAandB(row, size - i);
    }
  }

  return square;
}

function evenerMSquare(size) {
  // create square
  var square = [];

  // calculate square
  for (var i = 0; i < (size * size); i++) {

    // if i is greater than the length of the square create a new row
    if ((i % size) == 0) {
      var newRow = [];
      square.push(newRow);
    }

    /* if i is in a corners(cornersize = squaresize/4)
    or in the middle write the count in the square
    else write the count backwards in the square */
    if (((i % size < size / 4) || i % size >= size - size / 4) && ((square.length <= size / 4) || square.length > size - size / 4)) {
      newRow[i % size] = i + 1;
    } else if (!((i % size < size / 4) || i % size >= size - size / 4) && !((square.length <= size / 4) || square.length > size - size / 4)) {
      newRow[i % size] = i + 1;
    } else {
      newRow[i % size] = (size * size) - i;
    }
  }

  return square;
}

function check(square) {
  // Check if the sum of the rows, columns and diagonals equals the magic number.

  // defines the magic number
  sum = square.length * (square.length * square.length + 1) / 2;
  console.log('magic number: ', sum);

  // Check the rows.
  for (row in square) {
    row = square[row];
    var x = 0;
    for (i in row) {
      i = row[i];
      x = x + i;
    }

    if (x != sum) {
      console.log('fehler!!!!!!!!!!');
      console.log(x);
      console.log(row);
      return false;
    }
  }

  // Check the columns.
  for (column in square) {
    var x = 0;
    for (row in square) {
      row = square[row];
      x = x + row[column];
    }

    if (x != sum) {
      console.log('fehler!!!!!!!!!!');
      console.log(x);
      console.log(column);
      return false;
    }
  }

  // Check the diagonal(from right top to left buttom).
  count = 0;
  x = 0;
  for (row in square) {
    row = square[row];
    x = x + row[count];
    count = count + 1;
  }

  if (x != sum) {
    console.log('fehler!!!!!!!!!!');
    return false;
  }

  // Check the diagonal(from left top to right buttom).
  count = 0;
  x = 0;
  for (row in square) {
    row = square[row];
    x = x + row[row.length - count - 1];
    count = count + 1;
  }

  if (x != sum) {
    console.log('fehler!!!!!!!!!!');
    return false;
  }

  return true;
}

function displaySquare(square) {
  // Displays the array square in html.
  var quadrat = document.getElementById('quadrat');

  // removing the old square
  childNodes = quadrat.childNodes;
  while (quadrat.childNodes.length != 0) {
    for (var i in quadrat.childNodes) {
      i = quadrat.childNodes[i];
      try {
        quadrat.removeChild(i);
      }
      catch (e) {
        console.log('catched');
      }
    }
  }

  function addRow(square) {
    // Adds rows in the quadrat (html).
    addedRow = document.createElement('p');
    quadrat.appendChild(addedRow);
    addedRow.class = 'row';
    addCells(addedRow);
  }

  function addCells(htmlRow) {
    // Adds cells in the added row and fills them with the numbers of square.

    // for every cell in the row
    for (cell in row) {
      cell = row[cell];
      addedCell = document.createElement('span');
      addedCell.innerHTML = cell;
      htmlRow.appendChild(addedCell);
      addedCell.class = 'cell';
    }
  }

  // for every row of the square
  for (row in square) {
    row = square[row];
    addRow(square);

  }
}
