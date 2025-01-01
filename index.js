import { fetchHeader } from "./headers.js";

const body = document.querySelector('body');
const form = document.getElementById('search-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    getLord();
});

async function getLord() {
    try {
        const lord = await fetch('https://openlibrary.org/search.json?title=the+lord+of+the+rings', {
            headers: fetchHeader
        });
        const lordData = await lord.json();
        console.log(lordData.docs);
        // console.log(lordData.docs[0].title);
    } catch (error) {
        console.error({ error: error.message });
    };
    try {
        //* FETCHING COVER JSON DATA METHOD:
        // const cover = await fetch('https://covers.openlibrary.org/b/id/14625765.json', {
        //     headers: fetchHeader
        // });
        // const coverData = await cover.json();
        // console.log(coverData);
        // const coverImg = document.createElement('img');
        // coverImg.src = coverData.source_url;

        // body.appendChild(coverImg);
        const coverImg = document.createElement('img');
        coverImg.src = 'https://covers.openlibrary.org/b/id/240727-S.jpg';

        body.appendChild(coverImg);
    } catch (error) {
        console.error({ error: error.message });
    };
};