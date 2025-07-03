import emailjs from "@emailjs/browser";
import Chart from "chart.js/auto";

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
  // Send an Ajax request to fetch data:
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

      // cover images of each book, saved to pictures-file

      // request fetches data in JSON-format:
      var jsonData = JSON.parse(this.responseText);

      // ** iteration through the list/collection to fetch each element - alternative code is saved in script3...


// Fetch data from object:
key = jsonData.key;
title = jsonData.title;
publishDate = jsonData.first_publish_date;
rating = jsonData.ratings_average
  ? jsonData.ratings_average.toFixed(2)
  : "No rating";

// Handle summary:
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

        // Populate the wrapper div with fetched data:
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

      // }    // here ends the for(each)-loop, if we'd have more objects in data-structure to search through (but in this case, we don't).

      // Insert fetched data into the HTML container:

      document.getElementById("bookDataContainer").innerHTML = data;

    } 
    // here ends if-block:
  }; 
  // here ends xhttp.onreadystatechange-function

  // Methods xhttp.open(GET...) & xhttp.send():

  // xhttp.open("GET", `https://frodo.ess.hr/api/ponavljanje/filmovi-json.php?godinamin=${godinaMin}&godinamax=${godinaMax}`, true);

  xhttp.open("GET", "https://openlibrary.org/works/OL27482W.json", true);

  xhttp.send();
});

*/

/*  all links for api-requests via the same principle:

https://openlibrary.org/works/OL27482W.json - hobbit
https://openlibrary.org/works/OL27513W.json - lotr 1
https://openlibrary.org/works/OL27479W.json - lotr 2
https://openlibrary.org/works/OL27455W.json - lotr 3
https://openlibrary.org/works/OL27495W.json - silmarillion
https://openlibrary.org/works/OL27466W.json - unfinished tales
https://openlibrary.org/works/OL27471W.json - children of hurin
https://openlibrary.org/works/OL8997784W.json - fall of gondolin
https://openlibrary.org/works/OL17755218W.json - beren & luthien

*/

// List of all URLs
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

// List of all URLs for book ratings (matching the books-order in the 'bookUrls' list)
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

// Function for showing / hiding summary data - PREVIOUS VERSION:

// function toggleSummary(index) {
//   const summaryDiv = document.getElementById(`summary-${index}`);
//   const button = summaryDiv.nextElementSibling;

//   if (summaryDiv.classList.contains("hidden")) {
//     summaryDiv.classList.remove("hidden");
//     button.textContent = "Hide Summary";
//   } else {
//     summaryDiv.classList.add("hidden");
//     button.textContent = "Show Summary";
//   }
// }

// NOT USED ANYMORE - TOGGLESUMMARY:
// function toggleSummary(event) {
//   const button = event.currentTarget;
//   const index = button.dataset.index;
//   const summary = document.getElementById(`summary-${index}`);

//   if (!summary || !button) return;

//   const isHidden = summary.classList.toggle("hidden");
//   button.textContent = isHidden ? "Show Summary" : "Hide Summary";
// }

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

    // Fetch book summary (based on possible data structure variations from the API):
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

    let coverImage = `<img src="/pictures/cover-${index}.jpg" alt="Cover of ${title}" class="book-cover">`;

    let link = `<a href="${extLinks[index]}" target="_blank">Read more on Open Library</a>`;

    // Generate book card HTML to show book-data + add button to show/hide the summary:
    const data = `<div class="card_wrap-inner fetchedData" id="product-${index}">

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
          <button class="btn showButton" data-index="${index}">Show summary</button><br>
        </div>

        <div class="externLinks card-footer"><strong>Link to the book:</strong><br> ${link}</div>

      </div>   
  

  </div>`; // here ends outer-div

    // Book summary: <div class='summary'>${summary}<div><br></br>

    // document.getElementById("bookDataContainer").innerHTML += data;

    document
      .getElementById("bookDataContainer")
      .insertAdjacentHTML("beforeend", data);

    //   const button = document.querySelector(`#product-${index} .showButton`);
    // if (button) {
    //   button.addEventListener("click", toggleSummary);
    // }

    // NEW for BUTTONS:

    // const button = document.querySelector(`#product-${index} .showButton`);
    // if (button) {
    //   button.addEventListener("click", (event) => {
    //     const btn = event.currentTarget;
    //     const cardItem = btn.closest(".card_item");
    //     if (!cardItem) return;

    //     const summary = cardItem.querySelector(".summary");
    //     if (!summary) return;

    //     const isHidden = summary.classList.toggle("hidden");
    //     btn.textContent = isHidden ? "Show Summary" : "Hide Summary";
    //   });
    // }

    // Collect the data for star ratings:
    return { title, rating: parseFloat(rating) };
  } catch (error) {
    console.error("Error:", error);
    document.getElementById(
      "bookDataContainer"
    ).innerHTML += `<div class='fetchedData'>Error loading data</div>`;
  }
}

// Function for fetching and displaying current date and time:
function displayLastUpdateTime() {
  const now = new Date();
  const formattedTime = now.toLocaleString(); // Local date/time format
  const updateInfo = `<br><div class='footer-info'>Data provided by <strong>Open Library API</strong>, last update on: <strong>${formattedTime}</strong></div><br>`;

  // Adding info about last update into HTML-rendered content:
  document.getElementById("bookDataContainer").innerHTML += updateInfo;
}

// Calculate how many stars to display based on rating value:
function displayRatingStars(rating) {
  const fullStars = Math.floor(rating); // whole number
  const partialStar = rating % 1; // decimal part of the rating
  let stars = "⭐".repeat(fullStars); // add full stars for whole numbers

  if (partialStar >= 0.01 && partialStar < 1.0) {
    stars += "✨"; // If decimal part is bigger or equal to 0.51, a special star is added (but not yet a full star)
  }

  return stars;
}

//Function for displaying stars for book ratings:

function showStarRatings(bookData) {
  // Sort books by rating in descending order:
  bookData.sort((a, b) => b.rating - a.rating);

  let starRatingsHTML = ""; // initialize new variable

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

  // Adding info about last-update time:
  document.getElementById("star-ratings").innerHTML += updateInfo2;
}

// Main function which starts API requests for all URLs:
async function fetchAllBooks() {
  // NEW - CLEANING THE CONTENT:
  const bookContainer = document.getElementById("bookDataContainer");
  const ratingsContainer = document.getElementById("star-ratings");
  if (bookContainer) bookContainer.innerHTML = "";
  if (ratingsContainer) ratingsContainer.innerHTML = "";

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

// console.log(document.getElementById("bookDataContainer"));

function waitForContainerAndFetch() {
  const check = setInterval(() => {
    const container = document.getElementById("bookDataContainer");
    if (container) {
      clearInterval(check);
      fetchAllBooks();
    }
  }, 100); // checks every 100ms
}

// Start fetching data when the HTML loads:
// document.addEventListener("DOMContentLoaded", function () {
//   fetchAllBooks();
// });

// Start fetching data when the HTML loads
window.addEventListener("load", waitForContainerAndFetch);

// EMAILJS-FUNCTIONALLITY:

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// Render reCAPTCHA when the API is loaded:

window.onRecaptchaLoadCallback = function () {
  const sitekey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const container = document.getElementById("recaptcha-container");
  if (container) {
    grecaptcha.render("recaptcha-container", {
      sitekey: sitekey,
      theme: "light",
    });
  }
};

function loadRecaptchaScript() {
  const script = document.createElement("script");
  script.src =
    "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoadCallback&render=explicit";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

loadRecaptchaScript();

// Form submission with reCAPTCHA check and EmailJS:
const form = document.getElementById("email-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const token = grecaptcha.getResponse();
    if (!token) {
      alert("Please complete the CAPTCHA");
      return;
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        this
      )
      .then(
        function () {
          alert("Message sent successfully!");
          form.reset();
          grecaptcha.reset(); // reset captcha
        },
        function (error) {
          console.error("EmailJS error:", error);
          alert("Oops... Something went wrong. Please try again later.");
        }
      );
  });
}

// VOTING-POLL FOR BOOKS:

const votingForm = document.getElementById("voting-form");
const resultsBox = document.getElementById("voting-results");

const labels = {
  hobbit: "The Hobbit",
  lord: "The Lord of the Rings",
  silmarillion: "The Silmarillion",
  unfinished: "Unfinished Tales",
  children: "The Children of Húrin",
  beren: "Beren and Lúthien",
  gondolin: "The Fall of Gondolin",
  other: "something else",
};

// show results from localStorage:
function renderVoteResults() {
  const votes = JSON.parse(localStorage.getItem("voteResults")) || {};
  if (!resultsBox) return;

  document.getElementById("voteChart").classList.remove("hidden");

  // sorting (from most votes to the least votes):
  const sortedVotes = Object.entries(votes).sort((a, b) => b[1] - a[1]);

  const totalVotes = sortedVotes.reduce((sum, [, count]) => sum + count, 0);

  // displaying sorted list of voting results (from local storage):
  let resultsHTML = `<h3>Current voting results:</h3><p>Total votes: ${totalVotes}</p><ul>`;
  for (const [key, count] of sortedVotes) {
    const bookName = labels[key] || key;
    resultsHTML += `<li>${bookName}: ${count} vote(s)</li>`;
  }
  resultsHTML += "</ul>";

  resultsBox.innerHTML += resultsHTML;

  // adding a graphical visualisation:

  const chartCanvas = document.getElementById("voteChart");
  if (chartCanvas) {
    const ctx = chartCanvas.getContext("2d");

    // clean existing graph (if needed):
    if (window.voteChartInstance) {
      window.voteChartInstance.destroy();
    }

    window.voteChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: sortedVotes.map(([key]) => labels[key] || key),
        datasets: [
          {
            label: "Number of votes",
            data: sortedVotes.map(([_, count]) => count),
            backgroundColor: "rgba(9, 138, 37, 0.6)",
            borderColor: "rgb(1, 68, 10)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }
}

if (votingForm && resultsBox) {
  votingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const selected = votingForm.querySelector('input[name="fav-book"]:checked');
    if (!selected) {
      alert("Please select a book before voting!");
      return;
    }

    const choice = selected.value;
    const label = labels[choice] || "Unknown";

    // fetch results:
    const votes = JSON.parse(localStorage.getItem("voteResults")) || {};

    // add voices number for the selected book:
    votes[choice] = (votes[choice] || 0) + 1;

    // save updated results:
    localStorage.setItem("voteResults", JSON.stringify(votes));

    // show message + results:
    resultsBox.innerHTML = `<p class="subtle">You voted for: <strong>${label}</strong>. Thanks for participating!</p>`;
    renderVoteResults();

    votingForm.reset();
  });
}

// NEW: ADDED UNIQUE EVENT-LISTENER FOR ALL BUTTONS, ONCE THE PAGE IS LOADED (otherwise buttons-click doesn't work in Vite):

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("bookDataContainer");

  if (!container) return;

  container.addEventListener("click", (event) => {
    const button = event.target.closest(".showButton");
    if (!button) return;

    const cardItem = button.closest(".card_item");
    if (!cardItem) return;

    const summary = cardItem.querySelector(".summary");
    if (!summary) return;

    const isHidden = summary.classList.toggle("hidden");
    button.textContent = isHidden ? "Show Summary" : "Hide Summary";
  });
});
