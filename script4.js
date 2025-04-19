let prevScrollPos = window.scrollY;
const navbar = document.querySelector(".navbar-section");

window.onscroll = function () {
  let currentScrollPos = window.scrollY;

  if (prevScrollPos > currentScrollPos) {
    //  If scrolling up, show navbar:
    navbar.style.top = "0";
  } else {
    // If scrolling down, hide navbar:
    navbar.style.top = "-100px"; // Navbar height - adjustable
  }

  prevScrollPos = currentScrollPos;
};

// Showing navbar when hovered over with mouse:
navbar.addEventListener("mouseenter", () => {
  navbar.style.top = "0";
});

// Hiding navbar when mouse leaves navbar area and user scrolls down:
navbar.addEventListener("mouseleave", () => {
  let currentScrollPos = window.scrollY;
  if (prevScrollPos < currentScrollPos) {
    navbar.style.top = "-100px";
  }
});

document
  .getElementById("voting-form-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });

// API-request:

/*
document.addEventListener("DOMContentLoaded", function () {
  // as soon as html loads,
  // an Ajax request is sent to fetch data:
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // declaring new variables:
      // var podaci = "", korisnickoIme, imePrezime, email, slikaKorisnika;
      var data = "",
        key,
        title,
        publishDate,
        rating,
        summary;

      //  https://openlibrary.org/works/OL27482W.json - Hobbit

      // varijable s API-ja +  preview-link & full book link on Open library - puni a-linkovi

      // cover - cover pictures of each book, saved to pictures-file

      // request fetches data in JSON-format:
      var jsonData = JSON.parse(this.responseText);

      // ** iteration through the list/collection to fetch each element - alternative code is saved in script3...


// Dohvati podatke iz objekta:
key = jsonData.key;
title = jsonData.title;
publishDate = jsonData.first_publish_date;
rating = jsonData.ratings_average
  ? jsonData.ratings_average.toFixed(2)
  : "No rating";

// Obrada summary-a:
if (typeof jsonData.description === "string") {
  summary = jsonData.description;
} else if (
  typeof jsonData.description === "object" &&
  jsonData.description !== null &&
  jsonData.description.value
) {
  summary = jsonData.description.value;
} else {
  summary = "Description not available";
}


        // Showing fetched data:

        // opening new two divs for fetched data:

        data += "<div class='fetchedData'>";

        // building-in fetched data:
        // podaci += "<span><strong>" + imePrezime + " (" + korisnickoIme + ")</strong></span>";
        data +=
          "<span><strong>" +
          title +
          "</strong></span> <br>Published: " +
          publishDate +
          "<br>Average rating: " +
          rating +
          "<br>Book summary: " +
          summary;

        // closing both <div>-elements:
        data += "</div>";

      // }    // here ends the for(each)-loop, if we'd have more objects in data-structure ti search through (but in this case, we don't).

      // filling out the container in html with fetched data:

      document.getElementById("bookDataContainer").innerHTML = data;

    } 
    // here ends if-loop
  }; 
  // here ends xhttp.onreadystatechange-function

  // Methods xhttp.open(GET...) & xhttp.send():

  // xhttp.open("GET", `https://frodo.ess.hr/api/ponavljanje/filmovi-json.php?godinamin=${godinaMin}&godinamax=${godinaMax}`, true);

  xhttp.open("GET", "https://openlibrary.org/works/OL27482W.json", true);

  xhttp.send();
});

*/

// za summary dodati mogućnost da se prikaže ili sakrije (Show / Hide)

/*  svi linkovi za api-requestove po istom principu:

https://openlibrary.org/works/OL27482W.json - hobbit
https://openlibrary.org/works/OL27513W.json - lotr 1
https://openlibrary.org/works/OL27479W.json - lotr 2
https://openlibrary.org/works/OL27455W.json - lotr 3
https://openlibrary.org/works/OL27495W.json - sillmarillion
https://openlibrary.org/works/OL27466W.json - unfinished tales
https://openlibrary.org/works/OL27471W.json - children of hurin
https://openlibrary.org/works/OL8997784W.json - fall of gondolin
https://openlibrary.org/works/OL17755218W.json - beren & luthien

*/

// Lista svih URL-ova
const bookUrls = [
  "https://openlibrary.org/works/OL27482W.json",
  "https://openlibrary.org/works/OL27513W.json",
  "https://openlibrary.org/works/OL27479W.json",
  "https://openlibrary.org/works/OL27455W.json",
  "https://openlibrary.org/works/OL27495W.json",
  "https://openlibrary.org/works/OL27466W.json",
  "https://openlibrary.org/works/OL27471W.json",
  "https://openlibrary.org/works/OL17755218W.json",
  "https://openlibrary.org/works/OL8997784W.json",
];

// Lista URL-ova za ratinge knjiga (povezano po redoslijedu s bookUrls)
const ratingUrls = [
  "https://openlibrary.org/works/OL27482W/ratings.json",
  "https://openlibrary.org/works/OL27513W/ratings.json",
  "https://openlibrary.org/works/OL27479W/ratings.json",
  "https://openlibrary.org/works/OL27455W/ratings.json",
  "https://openlibrary.org/works/OL27495W/ratings.json", // Silmarillion
  "https://openlibrary.org/works/OL27466W/ratings.json", // Unfinished Tales
  "https://openlibrary.org/works/OL27471W/ratings.json", // Children of Hurin
  "https://openlibrary.org/works/OL17755218W/ratings.json", // Beren & Luthien
  "https://openlibrary.org/works/OL8997784W/ratings.json", // Fall of Gondolin
];

// List of external links for books, from Open Library:

const extLinks = [
  "https://openlibrary.org/works/OL27482W/The_Hobbit?edition=key%3A/books/OL33891995M",
  "https://openlibrary.org/works/OL27513W/The_fellowship_of_the_ring?edition=key%3A/books/OL43079986M",
  "https://openlibrary.org/works/OL27479W/The_Two_Towers",
  "https://openlibrary.org/works/OL27455W/The_Return_of_the_King?edition=key%3A/books/OL10682515M",
  "https://openlibrary.org/works/OL27495W/The_Silmarillion?edition=key%3A/books/OL51711297M",
  "https://openlibrary.org/books/OL10236383M/Unfinished_Tales_of_N%C3%BAmenor_and_Middle-earth",
  "https://openlibrary.org/works/OL27471W/The_Children_of_H%C3%BArin",
  "https://openlibrary.org/works/OL17755218W/Beren_and_L%C3%BAthien",
  "https://openlibrary.org/works/OL8997784W/The_Fall_of_Gondolin",
];

// Function for fetching data:
async function fetchBookData(bookUrl, ratingUrl, index) {
  try {
    const [bookResponse, ratingResponse] = await Promise.all([
      fetch(bookUrl),
      fetch(ratingUrl),
    ]);
    if (!bookResponse.ok || !ratingResponse.ok) {
      throw new Error("Error fetching data");
    }

    const bookData = await bookResponse.json();
    const ratingData = await ratingResponse.json();

    let title = bookData.title;
    let publishDate = bookData.first_publish_date;
    let rating = ratingData.summary.average
      ? ratingData.summary.average.toFixed(2)
      : "0.00";
    let summary;

    // Summary fetching function (according to different data structure possibilities on api-link):
    if (typeof bookData.description === "string") {
      summary = bookData.description;
    } else if (
      typeof bookData.description === "object" &&
      bookData.description !== null &&
      bookData.description.value
    ) {
      summary = bookData.description.value;
    } else {
      summary = "Description not available";
    }

    let coverImage = `<img src="pictures/cover-${index}.jpg" alt="Cover of ${title}" class="book-cover">`;

    let link = `<a href="${extLinks[index]}" target="_blank">Read more on Open Library</a>`;

    // Showing data + adding button to show/hide summary:
    const data = `<div class="card_wrap-inner fetchedData" id='product-${index}'">

      <div class="book-card">

        <div><h2 class="book-title sub-title">${title}</h2></div>    

        <div class=" book-cover">
        ${coverImage}
        </div>
    
        <div class="card_item flexible">
          <strong>Published</strong>: ${publishDate}<br><br>
          <strong>Average rating</strong>: ${rating}<br><br>
          <strong>Book summary</strong>: </br>
          <div id="summary-${index}" class='summary hidden'>${summary}</div>
          <button class="btn showButton" onclick="toggleSummary(${index})">Show summary</button><br>
        </div>

        <div class="externLinks card-footer"><strong>Link to the book:</strong><br> ${link}</div>

      </div>   
  

  </div>`; // here ends outer-div

    // Book summary: <div class='summary'>${summary}<div><br></br>

    document.getElementById("bookDataContainer").innerHTML += data;

    // Collect the data for star ratings:
    return { title, rating: parseFloat(rating) };
  } catch (error) {
    console.error("Error:", error);
    document.getElementById(
      "bookDataContainer"
    ).innerHTML += `<div class='fetchedData'>Error loading data</div>`;
  }
}

// Funkcion for showing / hiding summary data:
function toggleSummary(index) {
  const summaryDiv = document.getElementById(`summary-${index}`);
  const button = summaryDiv.nextElementSibling;

  if (summaryDiv.classList.contains("hidden")) {
    summaryDiv.classList.remove("hidden");
    button.textContent = "Hide Summary";
  } else {
    summaryDiv.classList.add("hidden");
    button.textContent = "Show Summary";
  }
}

// Funkcija za dohvaćanje i prikaz trenutnog datuma i vremena
function displayLastUpdateTime() {
  const now = new Date();
  const formattedTime = now.toLocaleString(); // Prikazuje datum i vrijeme u lokalnom formatu
  const updateInfo = `<br><div class='footer-info'>Data provided by <strong>Open Library API</strong>, last update on: <strong>${formattedTime}</strong></div><br>`;

  // Dodavanje informacije o posljednjem ažuriranju u HTML
  document.getElementById("bookDataContainer").innerHTML += updateInfo;
}

// function that calculates star number:
function displayRatingStars(rating) {
  const fullStars = Math.floor(rating); // whole number
  const partialStar = rating % 1; // decimal part of the rating
  let stars = "⭐".repeat(fullStars); // add full stars fo whole numbers

  if (partialStar >= 0.01 && partialStar < 1.0) {
    stars += "✨"; // Ako je decimalni dio veći ili jednak 0.51, dodaje se posebna zvjezdica
  }

  return stars;
}

//Fuction for displaying stars for book ratings:

function showStarRatings(bookData) {
  // Sort books by rating in descending order
  bookData.sort((a, b) => b.rating - a.rating);

  let starRatingsHTML = ""; // inicialazing new variable

  bookData.forEach((book, index) => {
    const { title, rating } = book; // destructure title and rating from book object
    const stars = displayRatingStars(parseFloat(rating)); // calculate stars
    starRatingsHTML += `<tr>
    <td>
      ${title} – ${rating}<br>
      ${stars}
    </td>
  </tr>`;
  });

  document.getElementById("star-ratings").innerHTML += starRatingsHTML;
}

// Function for displaying actual time and date:
function displayRatingTime() {
  const now = new Date();
  const formattedTime = now.toLocaleString(); // local date/time format
  const updateInfo2 = `<br><div class='footer-info'>Data provided by <strong>Open Library API</strong>, last update on: <strong>${formattedTime}</strong></div><br>`;

  // Adding info about last update time:
  document.getElementById("star-ratings").innerHTML += updateInfo2;
}

// Main function which starts API requests for all URLs:
async function fetchAllBooks() {
  const allBookData = []; // initialize an array to store all book data

  for (let i = 0; i < bookUrls.length; i++) {
    const bookData = await fetchBookData(bookUrls[i], ratingUrls[i], i);
    if (bookData) {
      allBookData.push(bookData); // add book data to the array if valid
    }
  }

  showStarRatings(allBookData);

  // After all data has been fetched, show last update time:
  displayLastUpdateTime();

  displayRatingTime();
}

// Start fetching data when the HTML loads:
document.addEventListener("DOMContentLoaded", function () {
  fetchAllBooks();
});

