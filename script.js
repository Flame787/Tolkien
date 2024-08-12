// Load environment variables from .env file
require('dotenv').config();

// Access environment variables
const apiKey = process.env.API_KEY;

document.addEventListener("DOMContentLoaded", function () {      // čim se html loada:
    // šalje se Ajax zahtjev da se dohvate korisnički podaci i slike:
    var xhttp = new XMLHttpRequest();
  
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // deklariramo nove varijable, kod nabrajanja varijabli istog tipa obavezno idu zarezi(!), a ne točka-zarez (jedino na kraju cijelog nabrajanja ide točka-zarez):
        var podaci = "", korisnickoIme, imePrezime, email, slikaKorisnika;
  
        // zahtjev dohvaća podatke u JSON-formatu:
        var jsonData = JSON.parse(this.responseText);
        // iteracija kroz listu/kolekciju da dohvatimo svaki element:
        for (let i = 0; i < jsonData.length; i++) {
          korisnickoIme = jsonData[i].korisnickoIme;
          imePrezime = jsonData[i].imePrezime;
          email = jsonData[i].email;
          slikaKorisnika = jsonData[i].slikaKorisnika;
  
          // otvaramo novi div za dohvaćene podatke, koji u sebi sadrži još jedan div:
          podaci += "<div class='galerija'><div>";
          // ime korisnika i username - istaknuti pomoću <strong> i <span>:
          podaci +=
            "<span><strong>" +
            imePrezime +
            " (" +
            korisnickoIme +
            ")</strong></span>";
          // ugradnja slika (u xml-dokumentu u bazi je već hardkodirana putanja do slike svakog korisnika):
          podaci +=
            "<img src='" + slikaKorisnika + "' alt='" + imePrezime + "'/>";
          // dodavanje email-adresa korisnika:
          podaci += "<hr /><span>" + email + "</span>";
          // zatvaramo oba <div>-elementa:
          podaci += "</div></div>";
        }                          // tu završava for-petlja
  
        // popunjavamo predviđeni spremnik (section) za podatke u html-u s dohvaćenim podacima:
        document.getElementById("svi-korisnici").innerHTML = podaci;
  
      }                             // tu završava if-loop
    };                             // tu završava xhttp.onreadystatechange-funkcija
  
    // metode .open(GET...) i send():
  
    //  alternativan link:   xhttp.open("GET", "http://hlapcic-education.atwebpages.com/korisnici-json.php", true);
    xhttp.open("GET", "https://frodo.ess.hr/api/korisnici-json.php", true);
    xhttp.send();
  });


//   json-metoda:
  
  document.addEventListener("DOMContentLoaded", function(){

    const spremnik = document.getElementById("spremnik");
    const polje1 = document.getElementById("godina-min");
    const polje2 = document.getElementById("godina-max");

    document.getElementById("btn-trazi").addEventListener("click", function(){
        const godinaMin = polje1.value.trim();
        const godinaMax = polje2.value.trim();

        if(godinaMin != "" && godinaMax != ""){
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    var nazivFilma, godinaIzlaska, nazivZanra, rezultat;
                    const podaci = JSON.parse(this.responseText);
                    // console.log(podaci);
                    if(podaci.length > 0){
                        rezultat = "<table border='1'><tr><th>Naziv filma</th><th>Godina izlaska</th><th>Naziv žanra</th></tr>";
                        for(let i = 0; i < podaci.length; i++){
                            nazivFilma = podaci[i].nazivFilma;
                            godinaIzlaska = podaci[i].godinaIzlaska;
                            nazivZanra = podaci[i].nazivZanra;
                            rezultat += "<tr><td>" + nazivFilma + "</td><td>" + godinaIzlaska + "</td><td>" + nazivZanra + "</td></tr>";
                        }
                        rezultat += "</table>";
                    }
                    else {
                        rezultat = "<h3>Nije pronađen niti jedan film.</h3>";
                    }
                    spremnik.innerHTML = rezultat;
                }
            }

            xhttp.open("GET", `https://frodo.ess.hr/api/ponavljanje/filmovi-json.php?godinamin=${godinaMin}&godinamax=${godinaMax}`, true);
            // xhttp.open("GET", "https://frodo.ess.hr/api/ponavljanje/filmovi-json.php?godinamin=" + godinaMin + "&godinamax=" + godinaMax, true);

            xhttp.send();
        }
        else {
            spremnik.innerHTML = "<h3>Za uspješnu pretragu filmova upišite obje godine.</h3>";
        }
    });

});


// metodfa fetch:

document.addEventListener("DOMContentLoaded", function(){

    const spremnik = document.getElementById("spremnik");
    const polje1 = document.getElementById("godina-min");
    const polje2 = document.getElementById("godina-max");

    // definicija funkcije za rukovanje podacima:
    const rukujPodacima = function(podaci){
        var nazivFilma, godinaIzlaska, nazivZanra, rezultat = "";
        if(podaci.length > 0){
            rezultat += "<table border='1'><tr><th>Naziv filma</th><th>Godina izlaska</th><th>Naziv žanra</th></tr>";
            for(let i = 0; i < podaci.length; i++) {
                nazivFilma = podaci[i].nazivFilma;
                godinaIzlaska = podaci[i].godinaIzlaska;
                nazivZanra = podaci[i].nazivZanra;
                rezultat += "<tr><td>" + nazivFilma + "</td><td>" + godinaIzlaska + "</td><td>" + nazivZanra + "</td></tr>";
            }
            rezultat += "</table>";
        }
        else{
            rezultat = "<h3>Nije pronađen niti jedan film.</h3>";
        }
        spremnik.innerHTML = rezultat;
    }

  // definicija funkcije za rukovanje greškom:
  const rukujGreskom = function(greska){
    spremnik.innerHTML = "<p>Greška kod obrade zahtjeva: " + greska + "</p>";
  }

  // AJAX - dohvaćanje filmova po godini izlaska:
    document.getElementById("btn-trazi").addEventListener("click", function(){
        const godinaMin = polje1.value.trim();
        const godinaMax = polje2.value.trim();

        if (godinaMin != "" && godinaMax != "") {
            fetch(`https://frodo.ess.hr/api/ponavljanje/filmovi-json.php?godinamin=${godinaMin}&godinamax=${godinaMax}`)
            .then(odgovor => odgovor.json())
            .then(podaci => rukujPodacima(podaci))
            .catch(greska => rukujGreskom(greska.toString()));
        }
        else{
            spremnik.innerHTML = "<h3>Za uspješnu pretragu filmova upišite obje godine.</h3>";
        }
    });

});




document.addEventListener("DOMContentLoaded", function () {
    const listaAutora = document.getElementById("lista-autora");
    const rezultat = document.getElementById("rezultat");
  
    listaAutora.addEventListener("change", function () {
      // treba nam odabrani value iz select-dropdowna:
      const autor = listaAutora.value;
  
      const xhttp = new XMLHttpRequest();
  
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var podaci = "";
          // ovo smo mogli i staviti iza svega, kao else-uvjet na koji se sve resetira - ako se ne nađu podaci. Tada se jednostavno ništa ne ispiše na sučelju, pa ni prvi redak tablice (<th>).
  
          // da bismo rezultate dobili kao JS-niz s objektima, koristi se metoda .parse() objekta JSON:
          const jsonData = JSON.parse(this.responseText);
          // console.log(podaci);
          // provjera je li nešto vraćeno, je li duljina niza 'jsonData' (ili kako ga već nazvali) veća od 0:
          if (jsonData.length > 0) {
            // deklariramo varijable:
            var naslovKnjige,
              godinaIzdanja,
              cijena,
              // za zbroj cijena knjiga dajemo 0 kao početnu vrijednost, jer planiramo kasnije na to zbrajati nove brojke (inače bi bilo zbroj = undefined, a undefined + neki broj = NaN):
              zbroj = 0;
            // zaglavlje tabele:
            podaci =
              "<table border ='1'><tr><th>Naslov knjige</th><th>Godina izdanja</th><th>Cijena</th></tr>";
            // for-petlja s brojačem, ili forEach-metoda (svejedno):
            for (let i = 0; i < jsonData.length; i++) {
              // dohvaćamo svaki element iz niza, i to vrijednost svakog svojstva elementa:
              naslovKnjige = jsonData[i].naslovKnjige;
              godinaIzdanja = jsonData[i].godinaIzdanja;
              cijena = jsonData[i].cijena;
              // uvećavamo zbroj cijena za svaku dohvaćenu knjigu (svaki element u nizu):
              zbroj = zbroj + parseFloat(cijena); // zbroj += parseFloat(cijena);
              podaci +=
                "<tr><td>" +
                naslovKnjige +
                "</td><td>" +
                godinaIzdanja +
                "</td><td class='posljednjistupac'>" +
                cijena +
                "</td></tr>";
            }
            // spojimo 2 ćelije (kroz 2 stupca/kolumne) u jednu širu, preko atributa colspan (column span)
            podaci +=
              "<tr class='posljednjired'><td colspan='2'>Ukupno: </td><td>" +
              zbroj +
              "</td></tr></table>";
          }
          rezultat.innerHTML = podaci;
        }
      };
      xhttp.open(
        "GET",
        `https://frodo.ess.hr/api/knjige-json.php?autor=${autor}`,
        true
      );
      xhttp.send();
    });
  });
  


//   You can perform a volumes search by sending an HTTP GET request to the following URI:

//   https://www.googleapis.com/books/v1/volumes?q=search+terms
  
//   q - Search for volumes that contain this text string. There are special keywords you can specify in the search terms to search in particular fields, such as:
  
//   intitle: Returns results where the text following this keyword is found in the title.
  
//   inauthor: Returns results where the text following this keyword is found in the author.
  
//   inpublisher: Returns results where the text following this keyword is found in the publisher.
  
//   subject: Returns results where the text following this keyword is listed in the category list of the volume.
  
//   isbn: Returns results where the text following this keyword is the ISBN number.
  
//   lccn: Returns results where the text following this keyword is the Library of Congress Control Number.
  
//   oclc: Returns results where the text following this keyword is the Online Computer Library Center number.


  //Here is an example of searching for Daniel Keyes’ “Flowers for Algernon”:

GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey

// ili ovako - metodom fetch:

fetch(`https://www.googleapis.com/books/v1/volumes?q=search-terms&key=your-API-key)
  .then(response => response.json())
  .then(result => {
this.setState({ books: result.items})
})}