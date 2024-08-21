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
