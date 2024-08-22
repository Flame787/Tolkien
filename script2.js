// Za parsiranje podataka (ali ne radi na Goodreads stranici):


// Koristite Fetch API za dohvaćanje HTML-a stranice pretrage
fetch('https://www.goodreads.com/search?utf8=%E2%9C%93&query=tolkien'), {
    mode: 'no-cors'
}
    .then(response => response.text())  // Pretvorite odgovor u tekst
    .then(html => {
        // Parsirajte HTML u DOM objekt
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');

        // Pronađite sve elemente koji sadrže informacije o knjigama
        let bookElements = doc.querySelectorAll('.bookCover');

        bookElements.forEach(book => {
            // Pronađite naslov knjige
            let titleElement = book.querySelector('.bookTitle span');
            let title = titleElement ? titleElement.textContent.trim() : 'Unknown title';

            // Pronađite ocjenu knjige
            let ratingElement = book.querySelector('.minirating');
            let ratingText = ratingElement ? ratingElement.textContent.trim() : 'No rating available';

            console.log(`Title: ${title}, Rating: ${ratingText}`);
        });
    })
    .catch(error => {
        console.error('Error fetching the page:', error);
    });