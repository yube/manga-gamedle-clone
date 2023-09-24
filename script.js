let gameIsActive = true;
let lives = 5;
let correctCategories = [];

let mangaList = [];

// Load data from the JSON file
fetch('series_info.json')
    .then(response => {
        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Update the mangaList with data from the JSON file
        mangaList = data;
        // Initialize the game after loading the data
        initGame();
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

function initGame() {
    populateDataList();
    resetGame();
}


function displayLives() {
  const livesElement = document.getElementById("lives");
  let hearts = '';
  for (let i = 0; i < lives; i++) {
    hearts += '❤️';
  }
  for (let i = 0; i < (5 - lives); i++) {
    hearts += '🤍';
  }
  livesElement.innerHTML = hearts;
}

displayLives();


function populateDataList() {
  const dataList = document.getElementById("manga-titles");
  
  mangaList.forEach(manga => {
    const option = document.createElement("option");
    option.value = manga.title;
    dataList.appendChild(option);
  });
}

populateDataList();

function getRandomManga() {
  const randomIndex = Math.floor(Math.random() * mangaList.length);
  return mangaList[randomIndex];
}

let mangaToGuess = getRandomManga();

function resetGame() {
  gameIsActive = true;
  mangaToGuess = getRandomManga();  // Generate a new manga to guess
  
  const input = document.getElementById("guess");
  const guessButton = document.getElementById("guessButton");
  
  input.disabled = false;
  guessButton.disabled = false;
  
  lives = 5;  // Reset lives
  displayLives();  // Update displayed lives
  
  // Clear the previous game's information table
  const tableBody = document.getElementById("infoTable").getElementsByTagName('tbody')[0];
  tableBody.innerHTML = "";
}

function giveHint() {
  if (!gameIsActive) return; // Don't provide hints if the game is over

  // Hide the button
  document.getElementById("hintButton").style.display = "none";
  
  // Calculate the list of categories that have not been guessed correctly yet
  const unguessedCategories = Object.keys(mangaToGuess).filter(category => {
    return !correctCategories.includes(category) && category !== 'title' && category !== 'author' && category !== 'artist';
  });
  
  // Pick a random unguessed category to provide a hint for
  const randomCategoryIndex = Math.floor(Math.random() * unguessedCategories.length);
  const hintCategory = unguessedCategories[randomCategoryIndex];
  
  // Provide a hint based on the category
  const tableBody = document.getElementById("infoTable").getElementsByTagName('tbody')[0];
  const newRow = tableBody.insertRow();
  
  Object.keys(mangaToGuess).forEach((key, i) => {
    const cell = newRow.insertCell(i);
    if (key === hintCategory) {
      cell.innerText = mangaToGuess[hintCategory];
      cell.style.backgroundColor = 'green'; // You can choose another color for hints
    } else {
      cell.innerText = " "; // Empty cell for all other categories
      cell.style.backgroundColor = 'red'
    }
  });
}

function checkGuess() {
  if (!gameIsActive) return;

  const input = document.getElementById("guess");
  const guessButton = document.getElementById("guessButton");
  const guess = input.value.toLowerCase();

  const validTitles = mangaList.map(manga => manga.title.toLowerCase());
  if (!validTitles.includes(guess)) {
    alert("Please enter a valid title from the list");
    return;
  }

  const guessedManga = mangaList.find(manga => manga.title.toLowerCase() === guess);
  const tableBody = document.getElementById("infoTable").getElementsByTagName('tbody')[0];
  const newRow = tableBody.insertRow();

  Object.keys(mangaToGuess).forEach((key, i) => {
    const cell = newRow.insertCell(i);
    cell.innerText = guessedManga[key];

    // Special handling for each category
    if (key === 'yearBegin') {
      const currentYear = new Date().getFullYear();
      const correctYear = parseInt(mangaToGuess[key] === "Ongoing" ? currentYear : mangaToGuess[key]);
      const guessedYear = parseInt(guessedManga[key] === "Ongoing" ? currentYear : guessedManga[key]);
            
      if (guessedYear === correctYear) {
        cell.style.backgroundColor = 'green';
      } else if (typeof guessedYear === "number" && typeof correctYear === "number") {
        const diff = guessedYear - correctYear;
        if (Math.abs(diff) <= 5) {
          cell.style.backgroundColor = 'yellow';
          cell.innerHTML += ` ${diff < 0 ? '&#9650;' : '&#9660;'}`;
        } else {
          cell.style.backgroundColor = 'red';
          cell.innerHTML += ` ${diff < 0 ? '&#9650;' : '&#9660;'}`;
        }
      } else {
        cell.style.backgroundColor = 'red';
      }
      return;
    }
    
    if (key === 'genre') {
      const correctGenres = mangaToGuess.genre.split(', ');
      const guessedGenres = guessedManga.genre.split(', ');
  
      const intersection = guessedGenres.filter(g => correctGenres.includes(g));
      
      if (intersection.length === guessedGenres.length && guessedGenres.length === correctGenres.length) {
          cell.style.backgroundColor = 'green';
      } else if (intersection.length > 0) {
          cell.style.backgroundColor = 'yellow';
      } else {
          cell.style.backgroundColor = 'red';
      }
      return;
    }
  
    if (guessedManga[key] === mangaToGuess[key]) {
      cell.style.backgroundColor = 'green';
      // Add the category to the list of correct categories if it's not already there
      if (!correctCategories.includes(key)) {
        correctCategories.push(key);
      }
    } else {
      cell.style.backgroundColor = 'red';
    }
  });

  if (guess === mangaToGuess.title.toLowerCase()) {
    setTimeout(function() {
      alert("Congratulations! You've guessed the manga!");
      gameIsActive = false;
      input.disabled = true;
      guessButton.disabled = true;
      // Optionally reset the game or proceed to the next round
    }, 300);
  } else {
    lives--;
    displayLives();

    if (lives <= 0) {
      setTimeout(function() {
        alert("Game over!");
        gameIsActive = false;
        input.disabled = true;
        guessButton.disabled = true;
        // Optionally reset the game
      }, 300);
    }
  }
  input.value = "";
}

window.onload = function () {
  // This is now empty because initGame is called after loading the data
};


resetGame();
