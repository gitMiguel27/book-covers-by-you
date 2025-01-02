import { fetchHeader } from "./headers.js";

const body = document.querySelector('body');
const form = document.getElementById('search-form');
const input = document.getElementById('form-input');
const listContainerDiv = document.createElement('div');
listContainerDiv.classList.add('list-group');


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const search = input.value.replace(/\s/g, "+");
    body.appendChild(listContainerDiv);
    while(listContainerDiv.firstChild) {
        listContainerDiv.removeChild(listContainerDiv.lastChild);
    };
    getSearch(search);
});

async function getSearch(title) {
    try {
        const books = await fetch(`https://openlibrary.org/search.json?title=${title}`, {
            headers: fetchHeader
        });
        const booksData = await books.json();
        const filteredData = booksData.docs.filter((book) => book.cover_i);

        let iterate = 0;
        while (iterate <= 10) {
            console.log(filteredData[iterate]);
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('d-flex', 'justify-content-between');

            const coverImg = getCoverImage(filteredData[iterate]);

            const coverOption = document.createElement('button');
            coverOption.classList.add('list-group-item', 'list-group-item-action');
            coverOption.type = 'button';
            coverOption.textContent = `${filteredData[iterate].title} by ${filteredData[iterate].author_name[0]}`;

            optionDiv.appendChild(coverImg);
            optionDiv.appendChild(coverOption);
            listContainerDiv.appendChild(optionDiv);
            iterate++;
        };
        iterate = 0;
    } catch (error) {
        console.error({ error: error.message });
    };
};

function getCoverImage(option) {
    try {
        const coverImg = document.createElement('img');
        coverImg.src = `https://covers.openlibrary.org/b/id/${option.cover_i}-S.jpg`;
        coverImg.alt = `${option.title}`;

        return coverImg;

        //* FETCHING COVER JSON DATA METHOD:
        // const cover = await fetch('https://covers.openlibrary.org/b/id/14625765.json', {
        //     headers: fetchHeader
        // });
        // const coverData = await cover.json();
        // console.log(coverData);
        // const coverImg = document.createElement('img');
        // coverImg.src = coverData.source_url;

        // body.appendChild(coverImg);
    } catch (error) {
        console.error({ error: error.message });
    };
};