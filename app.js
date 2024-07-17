

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
        infos.textContent = 'Démarrez le jeu ou sélectionnez un joueur.';
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
            /*  toast(); */
            toast()
             return; // Cell already occupied
 
         }
        if (grid[row][col] !== "") {
           /*  toast(); */
           toast()
            return; // Cell already occupied

        }

        grid[row][col] = currentPlayer;
       /*  console.table(grid) */
       /*  currentPlayer === 'x' ? event.target.classList.add('rond') : event.target.classList.add('cross');

        event.target.textContent = currentPlayer; */
        let el = document.createElement('img');
        el.classList.add(currentPlayer === 'x' ? 'cross' : 'rond');
        el.src = currentPlayer === 'x' ? './img/cancel.png' : './img/rec.png';
        event.target.appendChild(el);

        
          
        if (checkWinner()) {
            infos.textContent = "Partie terminée.";
            messageElement.textContent = `${currentPlayer} a gagné !`;
            endGame();
        }else   if(isArrayFull(row,col)){
            messageElement.textContent = "Match nul !";
            endGame();
        }else { 
            infosInput.textContent = currentPlayer === "x" ? " C'est à o de jouer." : "C'est à x de jouer.";
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
      
        // Aucun gagnant
        return null;
      }
    
        
        /* let count = 0;
        for (let i = 0; i > row; i++) {
            for (let j = 0; j > col; j++) {
                if (grid[i][j] !== "") {
                    count++;
                    }
            }
        }
        count === row*col*1 ? console.log('Mach terminé (nul)') : console.log('Mach continue'); 
        return count === row*col*1 ? true : false; */
    
        function isArrayFull() {
            /* 
            for (let i = 0; i < row+1; i++) {
                for (let j = 0; j < col+1; j++) {
                    if (grid[i][j] === "") {
                        console.log('not full');
                        return false;
                        
                        }
                }
            } 
            console.log('full');
            return true; */
           
            return(grid.flat().every(cell => cell !== ""));

          }
    

          function toast() {
            // Get the snackbar DIV
            var x = document.getElementById("snackbar");
          
            // Add the "show" class to DIV
            x.className = "show";
          
            // After 3 seconds, remove the show class from DIV
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
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