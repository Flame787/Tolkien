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
  "https://openlibrary.org/works/OL8997784W.json",
  "https://openlibrary.org/works/OL17755218W.json"
];

// Lista URL-ova za ratinge knjiga (povezano po redoslijedu s bookUrls)
const ratingUrls = [
  "https://openlibrary.org/works/OL27482W/ratings.json",
  "https://openlibrary.org/works/OL27513W/ratings.json",
  "https://openlibrary.org/works/OL27479W/ratings.json",
  "https://openlibrary.org/works/OL27455W/ratings.json",
  "https://openlibrary.org/works/OL27495W/ratings.json",  // Sillmarillion
  "https://openlibrary.org/works/OL27466W/ratings.json",  // Unfinished Tales
  "https://openlibrary.org/works/OL27471W/ratings.json",  // Children of Hurin
  "https://openlibrary.org/works/OL8997784W/ratings.json", // Fall of Gondolin
  "https://openlibrary.org/works/OL17755218W/ratings.json" // Beren & Luthien
];

// Funkcija za dohvaćanje podataka za jedan URL
async function fetchBookData(bookUrl, ratingUrl) {
  try {
    const [bookResponse, ratingResponse] = await Promise.all([fetch(bookUrl), fetch(ratingUrl)]);
    if  (!bookResponse.ok || !ratingResponse.ok)  {
      throw new Error('Error fetching data');
    }

    const bookData = await bookResponse.json();
    const ratingData = await ratingResponse.json();
  

    let title = bookData.title;
    let publishDate = bookData.first_publish_date;
    let rating = ratingData.summary.average
      ? ratingData.summary.average.toFixed(2)
      : "No rating";
    let summary;

    // Obrada summary-a
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

    // Prikazivanje podataka
   const data = `<div class='fetchedData'>
      <div class='bookTitle'><strong>${title}</strong></div><br>
      Published: ${publishDate}<br>
      Average rating: ${rating}<br>
      Book summary: <div class='summary'>${summary}<div><br>
      </div>`;

      document.getElementById("bookDataContainer").innerHTML += data;
    } catch (error) {
      console.error('Error:', error);
      document.getElementById("bookDataContainer").innerHTML += `<div class='fetchedData'>Error loading data</div>`;
    }
  }
  

// Funkcija za dohvaćanje i prikaz trenutnog datuma i vremena
function displayLastUpdateTime() {
  const now = new Date();
  const formattedTime = now.toLocaleString(); // Prikazuje datum i vrijeme u lokalnom formatu
  const updateInfo = `<br><div><em><strong>All data provided by Open Library API, last update on: ${formattedTime}</strong></em></div><br>`;

  // Dodavanje informacije o posljednjem ažuriranju u HTML
  document.getElementById("bookDataContainer").innerHTML += updateInfo;
}

// Glavna funkcija koja pokreće API zahtjeve za sve URL-ove
async function fetchAllBooks() {
  for (let i = 0; i < bookUrls.length; i++) {
    await fetchBookData(bookUrls[i], ratingUrls[i]);
  }

  // Nakon što su svi podaci dohvaćeni, prikaži vrijeme ažuriranja
  displayLastUpdateTime();
}

// Pokreni dohvaćanje podataka nakon što se HTML učita
document.addEventListener("DOMContentLoaded", function () {
  fetchAllBooks();
});