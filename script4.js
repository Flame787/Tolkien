let prevScrollPos = window.scrollY;
const navbar = document.querySelector(".navbar-section");

window.onscroll = function () {
  let currentScrollPos = window.scrollY;

  if (prevScrollPos > currentScrollPos) {
    // Ako skrolamo prema gore, prikaži navigacijsku traku
    navbar.style.top = "0";
  } else {
    // Ako skrolamo prema dolje, sakrij navigacijsku traku
    navbar.style.top = "-100px"; // Visina navigacijske trake - prilagodite po potrebi
  }

  prevScrollPos = currentScrollPos;
};

// Prikazivanje navigacijske trake kad miš pređe preko njenog područja
navbar.addEventListener("mouseenter", () => {
  navbar.style.top = "0";
});

// Sakrivanje navigacijske trake kad miš napusti njeno područje i korisnik skrola prema dolje
navbar.addEventListener("mouseleave", () => {
  let currentScrollPos = window.scrollY;
  if (prevScrollPos < currentScrollPos) {
    navbar.style.top = "-100px";
  }
});
