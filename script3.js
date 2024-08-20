// Tolkien API-page na Open libraryju - popis svih djela po autoru (moguće npr. prikazati prvih 20 i sl.):

https://openlibrary.org/search.json?author=tolkien

// -> tu se može uzeti i number_of_ pages_median za svako djelo...


// Kako uzeti oznaku za neku knjigu, npr. Hobbita - odemo na stranicu posvećenu toj knjizi na Open library:

https://openlibrary.org/works/OL27482W/The_Hobbit?edition=key%3A/books/OL33891995M

// OL27482W - je jedinstvena oznaka za knjigu Hobbit, to je jedinstveni key za pojedine 'works'


// Hobbit - API -> endpoint je 'description', trebamo njegov value iz ovog API-linka:

https://openlibrary.org/works/OL27482W.json
{
"description": "The Hobbit is a tale of high adventure, undertaken by a company of dwarves in search of dragon-guarded gold. A reluctant partner in this perilous quest is Bilbo Baggins, a comfort-loving unambitious hobbit, who surprises even himself by his resourcefulness and skill as a burglar. Encounters with trolls, goblins, dwarves, elves, and giant spiders, conversations with the dragon, Smaug, and a rather unwilling presence at the Battle of Five Armies are just some of the adventures that befall Bilbo. Bilbo Baggins has taken his place among the ranks of the immortals of children’s fiction. Written by Professor Tolkien for his children, The Hobbit met with instant critical acclaim when published.",
}

// prosječna ocjena knjige - summary -> average  -> prosječni rating za hobbita je 4.27619... (zaokruženo na 2 decimale je 4.28), na linku:

https://openlibrary.org/works/OL27482W/ratings.json

{
    "summary": {
    "average": 4.276190476190476,
    "count": 420,
    "sortable": 4.1800193928283145
    },
    ...
}



// rating za 1. dio trilogije, The fellowship of the ring:

https://openlibrary.org/works/OL27513W/ratings.json

// opis radnje za 1. dio trilogije: description -> value:

https://openlibrary.org/works/OL27513W.json

"description": {
  "type": "/type/text",
  "value": "One Ring to rule...

// rating za 2. dio trilogije, Two towers:

https://openlibrary.org/works/OL27479W/ratings.json

// opis radnje za 2. dio trilogije: description:

https://openlibrary.org/works/OL27479W.json

// rating za 3. dio trilogije:

https://openlibrary.org/works/OL27455W/ratings.json

// description za 3. dio trilogije:

https://openlibrary.org/works/OL27455W.json


// Sillmarillion - opis radnje -> description:

https://openlibrary.org/works/OL27495W.json

// Sillmarillion - average rating:

https://openlibrary.org/works/OL27495W/ratings.json

// Sillmarillion - preview:

https://openlibrary.org/works/OL27495W/The_Silmarillion?edition=key%3A/books/OL51711297M#bookPreview

// Unfinished tales:

https://openlibrary.org/works/OL27466W.json

https://openlibrary.org/works/OL27466W/ratings.json

// The Children of Húrin:

https://openlibrary.org/works/OL27471W.json

https://openlibrary.org/works/OL27471W/ratings.json

// The Fall of Gondolin:

https://openlibrary.org/works/OL8997784W.json

https://openlibrary.org/works/OL8997784W/ratings.json

// Beren and Lúthien

https://openlibrary.org/works/OL17755218W.json

https://openlibrary.org/works/OL17755218W/ratings.json


// napraviti da se kod svake knjige odmah prikazuje Average rating on Open library (promjenjivo ovisno o api-ju), 
// a da se može i dodatno otvoriti Summary / Description te knjige.


// i na kraju:

// dodati direktan link na Preview svake knjige na Open libraryju, i direktan link na Get full book info

