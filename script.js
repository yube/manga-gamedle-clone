let gameIsActive = true;
let lives = 3;

const mangaList = [
  {
    title: "Naruto",
    yearBegin: 1999,
    yearEnd: 2014,
    demographic: "Shonen",
    genre: ["Action", "Adventure", "Supernatural"],
    serializationStyle: "Weekly",
    serializationMagazine: "Weekly Shonen Jump",
    author: "Masashi Kishimoto",
    artist: "Masashi Kishimoto",
    volumes: 72,
    chapters: 700
  },
  {
    title: "Sailor Moon",
    yearBegin: 1991,
    yearEnd: 1997,
    demographic: "Shojo",
    genre: ["Drama", "Fantasy", "Mahou Shoujo", "Romance"],
    serializationStyle: "Monthly",
    serializationMagazine: "Nakayoshi",
    author: "Naoko Takeuchi",
    artist: "Naoko Takeuchi",
    volumes: 18,
    chapters: 52
  },
  {
    title: "Bleach",
    yearBegin: 2001,
    yearEnd: 2016,
    demographic: "Shonen",
    genre: ["Action", "Adventure", "Supernatural"],
    serializationStyle: "Weekly",
    serializationMagazine: "Weekly Shonen Jump",
    author: "Tite Kubo",
    artist: "Tite Kubo",
    volumes: 74,
    chapters: 706
  },
  {
    title: "Jojo",
    yearBegin: 1986,
    yearEnd: "Ongoing",
    demographic: "Shonen",
    genre: ["Action", "Adventure"],
    serializationStyle: "Weekly",
    serializationMagazine: "Weekly Shonen Jump",
    author: "Hirohiko Araki",
    artist: "Hirohiko Araki",
    volumes: 132,
    chapters: 954
  },
  {
    title: "Baki",
    yearBegin: 1991,
    yearEnd: "Ongoing",
    demographic: "Shonen",
    genre: ["Action", "Sports"],
    serializationStyle: "Weekly",
    serializationMagazine: "Weekly Shonen Champion",
    author: "Keishuke Itagaki",
    artist: "Keishuke Itagaki",
    volumes: 149,
    chapters: 1312
  },
  {
    title: "Dr. Stone",
    yearBegin: 2017,
    yearEnd: 2022,
    demographic: "Shonen",
    genre: ["Action", "Adventure", "Comedy", "Sci-Fi"],
    serializationStyle: "Weekly",
    serializationMagazine: "Weekly Shonen Jump",
    author: "Riichiro Inagaki",
    artist: "Boichi",
    volumes: 26,
    chapters: 232
  }

  // Add more manga entries here
];

function displayLives() {
  const livesElement = document.getElementById("lives");
  let hearts = '';
  for (let i = 0; i < lives; i++) {
    hearts += '❤️';
  }
  for (let i = 0; i < (3 - lives); i++) {
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
  
  lives = 3;  // Reset lives
  displayLives();  // Update displayed lives
  
  // Clear the previous game's information table
  const tableBody = document.getElementById("infoTable").getElementsByTagName('tbody')[0];
  tableBody.innerHTML = "";
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
      const correctYear = mangaToGuess[key] === "Ongoing" ? currentYear : mangaToGuess[key];
      const guessedYear = guessedManga[key] === "Ongoing" ? currentYear : guessedManga[key];
      
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

    if (key === 'yearEnd') {
      const currentYear = new Date().getFullYear();
      const correctYear = mangaToGuess[key] === "Ongoing" ? currentYear : mangaToGuess[key];
      const guessedYear = guessedManga[key] === "Ongoing" ? currentYear : guessedManga[key];
      
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
      const correctGenres = mangaToGuess.genre;
      const guessedGenres = guessedManga.genre;

      if (Array.isArray(guessedGenres) && Array.isArray(correctGenres)) {
        const intersection = guessedGenres.filter(g => correctGenres.includes(g));
        
        if (intersection.length === guessedGenres.length && guessedGenres.length === correctGenres.length) {
          cell.style.backgroundColor = 'green';
        } else if (intersection.length > 0) {
          cell.style.backgroundColor = 'yellow';
        } else {
          cell.style.backgroundColor = 'red';
        }
      }
      return;
    }

    if (key === 'volumes') {
      if (guessedManga[key] === mangaToGuess[key]) {
        cell.style.backgroundColor = 'green';
      } else {
        const diff = guessedManga[key] - mangaToGuess[key];
        if(Math.abs(diff) <= 10) {
          cell.style.backgroundColor = 'yellow';
          cell.innerHTML += ` ${diff < 0 ? '&#9650;' : '&#9660;'}`;
        } else {
          cell.style.backgroundColor = 'red';
          cell.innerHTML += ` ${diff < 0 ? '&#9650;' : '&#9660;'}`;          
        }
      }
      return;
    }

    if (key === 'chapters') {
      if (guessedManga[key] === mangaToGuess[key]) {
        cell.style.backgroundColor = 'green';
      } else {
        const diff = guessedManga[key] - mangaToGuess[key];
        if(Math.abs(diff) <= 50) {
          cell.style.backgroundColor = 'yellow';
          cell.innerHTML += ` ${diff < 0 ? '&#9650;' : '&#9660;'}`;
        } else {
          cell.style.backgroundColor = 'red';
          cell.innerHTML += ` ${diff < 0 ? '&#9650;' : '&#9660;'}`;          
        }
      }
      return;
    }


    if (guessedManga[key] === mangaToGuess[key]) {
      cell.style.backgroundColor = 'green';
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

window.onload = function() {
  resetGame();
};

resetGame();
