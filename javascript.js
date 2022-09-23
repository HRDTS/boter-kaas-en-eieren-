// create the gameboard for Tic-Tac-Toe in a module pattern
// & tie the HTML elements to the Tic-Tac-Toe array.

const gameboard = (() => {
    const arrayA = ["","",""];
    const arrayB = ["","",""];
    const arrayC = ["","",""];
    
    return {
        arrayA,
        arrayB,
        arrayC,
        
    };
})();


const body = document.querySelector("body")
const container = document.querySelector("div")
body.appendChild(container)

const refreshPage = function () {
    document.getElementById("one").innerHTML= gameboard.arrayA[0]
    document.getElementById("two").innerHTML= gameboard.arrayA[1]
    document.getElementById("three").innerHTML= gameboard.arrayA[2]
    
    document.getElementById("four").innerHTML= gameboard.arrayB[0]
    document.getElementById("five").innerHTML= gameboard.arrayB[1]
    document.getElementById("six").innerHTML= gameboard.arrayB[2]
    
    document.getElementById("seven").innerHTML= gameboard.arrayC[0]
    document.getElementById("eight").innerHTML= gameboard.arrayC[1]
    document.getElementById("nine").innerHTML= gameboard.arrayC[2]
}

refreshPage()

// create the players with their "X" or "O" marks with the factory function
let clickNotifier = false
const player = (name, mark) => {
    


    const makeMove = (row, num1, num2) => {
        
        if(row === "A" && gameboard.arrayA[num1] === "") {gameboard.arrayA.splice(num1,num2,mark)
            clickNotifier = true
            console.log(gameboard.arrayA)
            refreshPage()
        } else if (row === "A" && gameboard.arrayA[num1] != "") {
            clickNotifier = false
        }

        if(row === "B" && gameboard.arrayB[num1] === "") {gameboard.arrayB.splice(num1,num2,mark)
            clickNotifier = true
            console.log(gameboard.arrayB)
            refreshPage()
        }else if (row === "B" && gameboard.arrayA[num1] != "") {
            clickNotifier = false
        }  
        if(row === "C" && gameboard.arrayC[num1] === "") {gameboard.arrayC.splice(num1,num2,mark)
            clickNotifier = true
            console.log(gameboard.arrayC)
            refreshPage()
        } else if (row === "C" && gameboard.arrayA[num1] != "") {
            clickNotifier = false
        }
    }
    
    return {name, mark, makeMove, clickNotifier}
}

// player creation with unputfields

let player1 = player("player1", "X")
let player2 = player("player2", "O")

let form = document.querySelector("form")

let wrapper = document.getElementsByClassName("wrapper")


form.addEventListener("submit", function (e) {
    e.preventDefault()

    let formdata = new FormData(this);
    let inputFirstName = formdata.get("playerName1")
    let inputSecondName = formdata.get("playerName2")

    player1 = player(`${inputFirstName}`, "X")
    player2 = player(`${inputSecondName}`, "O")
    
    const nameButton = document.getElementsByClassName("nameFields")
    this.remove(nameButton)
    const player1Text = document.createElement("p")
    player1Text.innerHTML = `Player 1: ${inputFirstName}`
    const player2Text = document.createElement("p")
    player2Text.innerHTML = `Player 2: ${inputSecondName}`

    const playerTextDiv = document.createElement("div")
    playerTextDiv.appendChild(player1Text)
    playerTextDiv.appendChild(player2Text)
    playerTextDiv.setAttribute("id","navText")
    wrapper[0].appendChild(playerTextDiv)
    

})

const resetButton = document.getElementsByClassName("resetButton")[0]
resetButton.addEventListener("click", function (e) {
    e.preventDefault();

    gameboard.arrayA = ["","",""];
    gameboard.arrayB = ["","",""];
    gameboard.arrayC = ["","",""];

    currentPlayer = undefined
    clickNotifier = false
    refreshPage()
})

// this function controls the flow of the game

let currentPlayer;
const gameController = (row, num1, num2) => {


    const control = () => {
    if(currentPlayer === player2.name) {
        player1.makeMove(row,num1,num2)
        if(clickNotifier === true) {
            currentPlayer = player1.name
        }
    } else if (currentPlayer === player1.name) {
        player2.makeMove(row,num1,num2)
        if(clickNotifier === true) {
            currentPlayer = player2.name
        }
    } else {
        player1.makeMove(row,num1,num2)
        console.log(player1.clickNotifier)
     if(clickNotifier === true) {
        currentPlayer = player1.name   

    }
    }
    }; 
    
    return { control }
}


// this function determines the game outcome. It's either a win, or finally a draw if all arrays are used

const gameResult = function () {
    if(gameboard.arrayA[0] === `${player1.mark}`  && gameboard.arrayA[1] === `${player1.mark}`  && gameboard.arrayA[2] === `${player1.mark}`) {
        alert(`${player1.name} (${player1.mark}) won`) //horiz top
    }else if(gameboard.arrayA[0] === `${player2.mark}`  && gameboard.arrayA[1] === `${player2.mark}`  && gameboard.arrayA[2] === `${player2.mark}`) {
        alert(`${player2.name} (${player2.mark}) won`)
    }else if(gameboard.arrayB[0] === `${player1.mark}`  && gameboard.arrayB[1] === `${player1.mark}`  && gameboard.arrayB[2] === `${player1.mark}`) {
        alert(`${player1.name} (${player1.mark}) won`) //horiz mid
    }else if(gameboard.arrayB[0] === `${player2.mark}`  && gameboard.arrayB[1] === `${player2.mark}`  && gameboard.arrayB[2] === `${player2.mark}`) {
        alert(`${player2.name} (${player2.mark}) won`)
    }else if(gameboard.arrayC[0] === `${player1.mark}`  && gameboard.arrayC[1] === `${player1.mark}`  && gameboard.arrayC[2] === `${player1.mark}`) {
        alert(`${player1.name} (${player1.mark}) won`) //horiz bot
    }else if(gameboard.arrayC[0] === `${player2.mark}`  && gameboard.arrayC[1] === `${player2.mark}`  && gameboard.arrayC[2] === `${player2.mark}`) {
         setTimeout(function() { alert(`${player2.name} (${player2.mark}) won`); }, 1000);


    }else if(gameboard.arrayA[0] === `${player1.mark}`  && gameboard.arrayB[0] === `${player1.mark}`  && gameboard.arrayC[0] === `${player1.mark}`) {
        alert(`${player1.name} (${player1.mark}) won`) //vertic left
    }else if(gameboard.arrayA[0] === `${player2.mark}`  && gameboard.arrayB[0] === `${player2.mark}`  && gameboard.arrayC[0] === `${player2.mark}`) {
        alert(`${player2.name} (${player2.mark}) won`) 
    }else if(gameboard.arrayA[1] === `${player1.mark}`  && gameboard.arrayB[1] === `${player1.mark}`  && gameboard.arrayC[1] === `${player1.mark}`) {
        alert(`${player1.name} (${player1.mark}) won`) //vertic mid
    }else if(gameboard.arrayA[1] === `${player2.mark}`  && gameboard.arrayB[1] === `${player2.mark}`  && gameboard.arrayC[1] === `${player2.mark}`) {
        alert(`${player2.name} (${player2.mark}) won`) 
    }else if(gameboard.arrayA[2] === `${player1.mark}`  && gameboard.arrayB[2] === `${player1.mark}`  && gameboard.arrayC[2] === `${player1.mark}`) {
        alert(`${player1.name} (${player1.mark}) won`) //vertic right
    }else if(gameboard.arrayA[2] === `${player2.mark}`  && gameboard.arrayB[2] === `${player2.mark}`  && gameboard.arrayC[2] === `${player2.mark}`) {
        alert(`${player2.name} (${player2.mark}) won`) 
    
    
    }else if(gameboard.arrayA[0] === `${player1.mark}`  && gameboard.arrayB[1] === `${player1.mark}`  && gameboard.arrayC[2] === `${player1.mark}`) {
        alert(`${player1.name} (${player1.mark}) won`) //diagonal left top to right bottom
    }else if(gameboard.arrayA[0] === `${player2.mark}` && gameboard.arrayB[1] === `${player2.mark}`  && gameboard.arrayC[2] === `${player2.mark}`) {
        alert(`${player2.name} (${player2.mark}) won`) 
    }else if(gameboard.arrayA[2] === `${player1.mark}`  && gameboard.arrayB[1] === `${player1.mark}`  && gameboard.arrayC[0] === `${player1.mark}`) {
        alert(`${player1.name} (${player1.mark}) won`) //diagonal left top to right bottom
    }else if(gameboard.arrayA[2] === `${player2.mark}`  && gameboard.arrayB[1] === `${player2.mark}`  && gameboard.arrayC[0] === `${player2.mark}`) {
        alert(`${player2.name} (${player2.mark}) won`) 
    } else if (gameboard.arrayA[0] != "" && gameboard.arrayA[1] != "" && gameboard.arrayA[2] != "" && gameboard.arrayB[0] != "" && gameboard.arrayB[1] != "" &&
    gameboard.arrayB[2] != "" && gameboard.arrayC[0] != "" && gameboard.arrayC[1] != "" && gameboard.arrayC[2] != "") {
        alert("draw")
    }

    
}
