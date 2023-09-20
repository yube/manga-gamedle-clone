const mangaList = [
  {
    title: "Naruto",
    yearPublished: 1999,
    demographic: "Shonen",
    genre: ["Action", "Adventure", "Supernatural"],
    serializationPeriod: "Weekly",
    serializationMagazine: "Weekly Shonen Jump",
    author: "Masashi Kishimoto",
    volumes: 72,
    chapters: 700
  },
  {
    title: "Sailor Moon",
    yearPublished: 1991,
    demographic: "Shojo",
    genre: ["Drama", "Fantasy", "Mahou Shoujo", "Romance"],
    serializationPeriod: "Monthly",
    serializationMagazine: "Nakayoshi",
    author: "Naoko Takeuchi",
    volumes: 18,
    chapters: 52
  },
  {
    title: "Bleach",
    yearPublished: 2001,
    demographic: "Shonen",
    genre: ["Action", "Adventure", "Supernatural"],
    serializationPeriod: "Weekly",
    serializationMagazine: "Weekly Shonen Jump",
    author: "Tite Kubo",
    volumes: 74,
    chapters: 706
  },
  {
    title: "Jojo",
    yearPublished: 1986,
    demographic: "Shonen",
    genre: ["Action", "Adventure"],
    serializationPeriod: "Weekly",
    serializationMagazine: "Weekly Shonen Jump",
    author: "Hirohiko Araki",
    volumes: 132,
    chapters: 954
  },
  {
    title: "Baki",
    yearPublished: 1991,
    demographic: "Shonen",
    genre: ["Action", "Sports"],
    serializationPeriod: "Weekly",
    serializationMagazine: "Weekly Shonen Champion",
    author: "Keishuke Itagaki",
    volumes: 149,
    chapters: 1312
  }

  // Add more manga entries here
];

function populateDataList() {
  const dataList = document.getElementById("manga-titles");
  
  mangaList.forEach(manga => {
    const option = document.createElement("option");
    option.value = manga.title;
    dataList.appendChild(option);
  });
}

// Call the function to populate the datalist
populateDataList();

const randomIndex = Math.floor(Math.random() * mangaList.length);
const mangaToGuess = mangaList[randomIndex];

function checkGuess() {
  const input = document.getElementById("guess");
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
    if (key === 'yearPublished') {
      if (guessedManga[key] === mangaToGuess[key]) {
        cell.style.backgroundColor = 'green';
      } else {
        const diff = guessedManga[key] - mangaToGuess[key];
        if (Math.abs(diff) <= 10) {
          cell.style.backgroundColor = 'yellow';
          cell.innerHTML += ` ${diff < 0 ? '&#9650;' : '&#9660;'}`;
        } else {
          cell.style.backgroundColor = 'red';
          cell.innerHTML += ` ${diff < 0 ? '&#9650;' : '&#9660;'}`;          
        }
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
    alert("Congratulations! You've guessed the manga!");
  }

  input.value = "";
}
