let nowPlayer = 0, sizeBoard = 0, isActive = true;


function startGame(){
    let chooseBoard = document.querySelector(".choose__board")
    chooseBoard.style.visibility = "visible"

    let fieldsGame = document.querySelector(".fields__game")
    fieldsGame.style.visibility = "hidden"

    let endGame = document.querySelector(".end__game")
    endGame.style.visibility = "hidden"
}

function endGame(winner){
    let endGame = document.querySelector(".end__game")

    let text = document.createElement("p")
    text.className = "winner__text"
    text.textContent = `Winner ${winner}`
    
    let newGameButton = document.createElement("button")
    newGameButton.className = "new__game"
    newGameButton.textContent = "New Game"

    endGame.append(text)
    endGame.append(newGameButton)
    
    endGame.style.visibility = "visible"
    newGameListeners()
    
}

function newGame(){
    nowPlayer = 0;
    sizeBoard = 0;
    isActive = true;

    // удаляю все клетки с поля игры
    // let cells = document.querySelectorAll(".cell")
    // for (let cell of cells){
    //     if (cell.parentNode){
    //         cell.parentNode.removeChild(cell);
    //     }
    // }
    let rows = document.querySelectorAll(".row")
    for (let row of rows){
        if (row.parentNode){
            row.parentNode.removeChild(row)
        }
    }

    let newGameButtons = document.querySelectorAll(".new__game")
    for (let button of newGameButtons){
        if (button.parentNode){
            button.parentNode.removeChild(button)
        }
    }
    
    // удаляю окно для показа победителя
    try{
        let winnerText = document.querySelector(".winner__text")
        if (winnerText.parentNode){
            winnerText.parentNode.removeChild(winnerText)
        }
    }
    catch{}
    startGame()
}

function setGame(text_button){
    size = Number(text_button.split('')[0]);
    sizeBoard = size
    let chooseBoard = document.querySelector(".choose__board")
    chooseBoard.style.visibility = "hidden"
    let fieldsGame = document.querySelector(".fields__game")
    fieldsGame.style.visibility = "visible"
    setGameBoard(size)
}

function checkIsWin(){
    let rows = document.querySelectorAll(".row")
    // проверка по горизонтали для каждого поля
    // return rows[0].childNodes[0].textContent
    for (let row of rows){
        for (let i = 0; i < sizeBoard - 2; i++){
            if (row.childNodes[i].textContent === row.childNodes[i + 1].textContent && 
                row.childNodes[i + 1].textContent === row.childNodes[i + 2].textContent && row.childNodes[i].textContent !== ""){
                return row.childNodes[i].textContent
            }
        }
    }

    // проверка по вертикали для каждого поля
    for (i = 0; i < rows.length - 2; i ++){
        for (let j = 0; j < sizeBoard; j ++){
            if (rows[i].childNodes[j].textContent === rows[i + 1].childNodes[j].textContent && 
                rows[i + 1].childNodes[j].textContent === rows[i + 2].childNodes[j].textContent && rows[i].childNodes[j].textContent !== ""){
                return rows[i].childNodes[j].textContent
            }
        }
    }

    // проверка по диагонали с лево на право для каждого поля

    for (let i = 0; i < sizeBoard - 2; i ++){
        for (let j = 0; j < sizeBoard - 2; j ++){
            if (rows[i].childNodes[j].textContent === rows[i + 1].childNodes[j + 1].textContent && 
                rows[i + 1].childNodes[j + 1].textContent === rows[i + 2].childNodes[j + 2].textContent && rows[i + 1].childNodes[j + 1].textContent !== ""){
                return rows[i].childNodes[j].textContent
            }
        }
    }


    for (let i = 0; i < sizeBoard - 2; i ++){
        for (let j = 0; j < sizeBoard - 2; j ++){
            if (rows[i].childNodes[sizeBoard - 1 - j].textContent === rows[i + 1].childNodes[sizeBoard - j - 2].textContent 
                && rows[i + 1].childNodes[sizeBoard - j - 2].textContent === rows[i + 2].childNodes[sizeBoard- j - 3].textContent && rows[i].childNodes[sizeBoard - j - 1].textContent !== ""){
                return rows[i].childNodes[sizeBoard - 1 - j].textContent
            }
        }
    }

    // проверка по диагонали с право на левор для каждого поля

    return ""
}

function addCellListeners(){
    const cells = document.querySelectorAll(".cell")
    for (let cell of cells){
        cell.addEventListener('click', ()=>{
            if (isActive === true){
                if (nowPlayer == 0){
                    cell.textContent = "X"
                }else{
                    cell.textContent = "O"
                }
                nowPlayer = (nowPlayer + 1) % 2
                let result = checkIsWin()

                if (result != ""){
                    isActive = false
                    endGame(result)
                }
            }  
        })
    }
}

function addButtonsListeners(){
    const chooseButtons = document.querySelectorAll(".choose__button")
    for (let button of chooseButtons){
        button.addEventListener("click", () => {
            setGame(button.textContent)
        })
    }
}

function newGameListeners(){
    const newGameButtons = document.querySelectorAll(".new__game")
    for (let button of newGameButtons){
        button.addEventListener("click", newGame)
    }
}


function setGameBoard(size){
    const block_fields = document.querySelector(".fields__game")
    for (let j = 0; j < size; j++){
        let row = document.createElement("div")
        row.className = "row"
        for (let i = 0; i < size; i++){
            let cell = document.createElement("div")
            cell.className = "cell"
            row.append(cell)
        }
        block_fields.append(row)
    }

    let restartGame = document.createElement("button")
    restartGame.className = "new__game"
    restartGame.textContent = "Restart"

    block_fields.append(restartGame)

    addCellListeners()
    newGameListeners()
}

startGame()
addButtonsListeners()
