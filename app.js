

document.addEventListener("DOMContentLoaded", () => {
    const gridElement = document.getElementById("grid");
    const messageElement = document.getElementById("message");
    const resetButton = document.getElementById("reset");
    const players = document.querySelectorAll('#scorebar div');
    const infosInput = document.getElementById('infos');

    const size = 3;
    let grid = [];
    let currentPlayer = 'x';

    function createGrid() {
        infos.textContent = 'Start the game or select a player.';
        grid = Array(size).fill().map(() => Array(size).fill(""));
        gridElement.innerHTML = "";
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener("click", handleCellClick, true);
                gridElement.appendChild(cell);
            }
        }
    }


    function handleCellClick(event) {
        
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;
        if (row === undefined) {
            toast()
             return; 
 
         }
        if (grid[row][col] !== "") {
            return; 

        }

        grid[row][col] = currentPlayer;
      
        let el = document.createElement('img');
        el.classList.add(currentPlayer === 'x' ? 'cross' : 'rond');
        el.src = currentPlayer === 'x' ? './img/cancel.png' : './img/rec.png';
        event.target.appendChild(el);

          
        if (checkWinner()) {
            infos.textContent = "Game over.";
            messageElement.textContent = `${currentPlayer} win !`;
            endGame();
        }else   if(isArrayFull(row,col)){
            messageElement.textContent = "Draw !";
            endGame();
        }else { 
            infosInput.textContent = currentPlayer === "x" ? " It's o turn to play." : "It's x turn to play.";
            currentPlayer = currentPlayer === "x" ? "o" : "x";
            players.forEach(
                player => player.classList.toggle('turn')
            )
           
         }

        
    }

    function checkWinner() {
        const size = grid.length;
        
        // Vérifier les lignes
        for (let i = 0; i < size; i++) {
          if (grid[i][0] && grid[i].every(cell => cell === grid[i][0])) {
            return grid[i][0];
          }
        }
      
        // Vérifier les colonnes
        for (let j = 0; j < size; j++) {
          let column = [];
          for (let i = 0; i < size; i++) {
            column.push(grid[i][j]);
          }
          if (column[0] && column.every(cell => cell === column[0])) {
            return column[0];
          }
        }
      
        // Vérifier la diagonale principale
        let mainDiagonal = [];
        for (let i = 0; i < size; i++) {
          mainDiagonal.push(grid[i][i]);
        }
        if (mainDiagonal[0] && mainDiagonal.every(cell => cell === mainDiagonal[0])) {
          return mainDiagonal[0];
        }
      
        // Vérifier la diagonale secondaire
        let secondaryDiagonal = [];
        for (let i = 0; i < size; i++) {
          secondaryDiagonal.push(grid[i][size - 1 - i]);
        }
        if (secondaryDiagonal[0] && secondaryDiagonal.every(cell => cell === secondaryDiagonal[0])) {
          return secondaryDiagonal[0];
        }

        return null;
      }
    
    
        function isArrayFull() {
            return(grid.flat().every(cell => cell !== ""));

          }
    

          function toast() {
            let x = document.getElementById("snackbar");
            x.classList.add("show");
          
            // After 3 seconds, remove the show class from DIV
            setTimeout(function(){ x.classList.remove("show"); }, 3000);
          }

    function endGame() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
       
    }

    resetButton.addEventListener("click", () => {
        createGrid();
        messageElement.textContent = "";
        currentPlayer = "x";
        players.forEach(
            player => player.classList.remove('turn')
        )
        players[0].classList.add('turn');
    });

    createGrid();
    console.log(grid)


});