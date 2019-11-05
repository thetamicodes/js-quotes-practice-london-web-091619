const quotesUri = 'http://localhost:3000/quotes';
const likesUri = 'http://localhost:3000/likes';

document.addEventListener('DOMContentLoaded', function() {
    fetchURL();
    fetchLikes();
    newQuotes();
    deleteQuote();
    destroyQuote();
    likeQuote();
})

function fetchURL(){
    fetch(quotesUri)
    .then(function(response){
        return response.json();
    })
    .then(function(quotes){
        for(let i = 0; i < quotes.length; i++){
            renderQuotes(quotes[i])
        }
    })
}

function fetchLikes(){
    fetch(likesUri)
    .then(function(response){
        return response.json();
    })
    .then(function(likes){
        for(let i = 0; i < likes.length; i++) {
            renderQuotes(likes[i])
        }
    })
}

function renderQuotes(quotes, likes) {
const parentElement = document.querySelector('body');
const quoteElement = document.createElement('div');
quoteElement.innerHTML = `
<br>
<ul>
<li class='quote-card'>
<blockquote class="blockquote">
<p class="mb-0">${quotes.quote}</p>
<footer class="blockquote-footer">${quotes.author}</footer>
<br>
<button class='btn-success'>Likes: <span>${likes}</span></button>
<button class='btn-danger'>Delete</button>
</blockquote>
</li>
</ul>
`;
parentElement.appendChild(quoteElement);
const deleteButton = document.querySelector('.btn-danger');
deleteButton.addEventListener('click', deleteQuote);
const likeButton = document.querySelector('.btn-success')
likeButton.addEventListener('click', likeQuote);
}

function newQuotes(){ 
    const submitButton = document.querySelector('.btn-primary')
    submitButton.addEventListener('click', function(e){
        e.preventDefault();
        const newQuote = {
            quote: document.querySelector('input[id="new-quote"]').value,
            author: document.querySelector('input[id="author"]').value
        }
        createQuote(newQuote)
        .then(function(quotes){
            renderQuotes(quotes);
        })
    })
}

function createQuote(newQuote){
let configObject = { 
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(newQuote, {quoteId: 0})     
}

    return fetch(quotesUri, configObject)
    .then(function(response){
        return response.json();
    })
}

function deleteQuote(e) {
    destroyQuote(e)
    .then(function(quotes) {
        quotes.parentElement.remove()
    })
}

function destroyQuote(e) {
    return fetch(`${quotesUri}/${e.target.id}`, {method: "DELETE"})
    .then(function(response){
        return response.json();
    })
}


function likeQuote(e) {
    let likedQuote = {
        quoteId: quote.id
    }
    
    updateQuotes(likedQuote, e.target.id)
    .then(function(quotes){
        e.target.querySelector('span').innerText = `${quotes.likedQuote}`
    })
}

function updateQuotes(likedQuote, quoteId){
    const configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(likedQuote)
    }
    return fetch(likesUri, configObject)
    .then(function(response){
        return response.json();
    })
}
