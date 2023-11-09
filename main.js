const btn = document.querySelector('.btn')
const meaning = document.querySelector('#results')

async function findMeaning(word) {
    try {
        meaning.innerHTML = `<img src="loading.svg" alt="loadingImg" class="mx-auto d-block">`
        const response = await fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${word}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5faa9092fbmshbabb7e62d89b504p102d07jsn0d8b8fc1d306',
                'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com\n'
            }
        });

        if (response.ok) {
            const result = await response.json();
            const array = result.list;
            if (array.length === 0){
                meaning.innerHTML = `<p class="text-center">Please enter the correct word!</p>`
                return;
            }
            let str = `<h3 class="text-center">Results</h3><p class="text-muted">Following are the meanings of the word <b>${word}</b>.</p>`
            str += `<ul>`
            for (let i = 0; i < array.length; i++) {
                str += `<li>${array[i].definition}</li>`
            }
            str += `</ul>`
            meaning.innerHTML = str
        }
    } catch (err) {
        meaning.innerHTML = err;
    }
}



btn.addEventListener('click', (e) => {
    e.preventDefault();
    const word = document.querySelector('input').value

    findMeaning(word)
})
