import { header } from "./headers.js";

const form = document.getElementById('search-form')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    getLord();
});

async function getLord() {
    try {
        const lord = await fetch('https://openlibrary.org/search.json?title=the+lord+of+the+rings', {
            headers: header
        });
        const lordData = await lord.json();
        console.log(lordData.docs[0].title);
    } catch (error) {
        console.error({ error: error.message });
    };
};