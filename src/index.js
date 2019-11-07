document.addEventListener('DOMContentLoaded', function() {
    
    const quotesUrl = 'http://localhost:3000/quotes';
    const quotesLikesUrl = 'http://localhost:3000/quotes?_embed=likes';
    const likesUrl = 'http://localhost:3000/likes';

    quotesData();
    newQuote();
 

    function fetchQuotes() {
        return fetch(quotesLikesUrl)
        .then(function(response){
            return response.json();
        })
    }
    
    function quotesData() {
        fetchQuotes()
        .then(function(quotes){
            singleQuote(quotes)
        })
    }

    function singleQuote(quotes) {
        for(let i = 0; i < quotes.length; i++){
            renderQuotes(quotes[i])
        }
    }
    
    
    function renderQuotes(quote) {
        const parentEl = document.querySelector('body');
        const quoteEl = document.createElement('div');
        const ulEl = document.createElement('ul');
        const liEl = document.createElement('li');
        const blockEl = document.createElement('blockquote');
        const pEl = document.createElement('p');
        const footerEl = document.createElement('footer');
        const brEl = document.createElement('br');
        const likeBtn = document.createElement('button');
        const spanEl = document.createElement('span');
        const dltBtn = document.createElement('button');

        liEl.className = 'quote-card';
        blockEl.className = 'blockquote';
        pEl.className = 'mb-0';
        pEl.innerText = quote.quote
        footerEl.className = 'blockquote-footer';
        footerEl.innerText = quote.author
        likeBtn.className = 'btn-success';
        likeBtn.dataset.likeButtonId = quote.id
        likeBtn.innerText = 'Likes: ';
        spanEl.innerText = quote.likes ? quote.likes.length : 0
        dltBtn.className = 'btn-danger';
        dltBtn.dataset.deleteButtonId = quote.id
        dltBtn.innerText = 'Delete'

        parentEl.append(quoteEl);
        likeBtn.appendChild(spanEl);
        blockEl.append(pEl, footerEl, brEl, likeBtn, dltBtn);
        quoteEl.append(liEl);
        liEl.append(blockEl)

        likeBtn.addEventListener('click', likeQuote);
        dltBtn.addEventListener('click', deleteQuote);
    }

    // function likeQuote(e) {
    //     const quoteId = e.target.id
    //     const newLike = {
    //         quoteId: parseInt(quoteId)
    //     }

    //     const configObj = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify(newLike)
    //     }

    //     return fetch(likesUrl, configObj)
    //     .then(function(response) {
    //         return response.json()
    //     })
    //     .then(function(like) {
    //         const updateLike = e.target.parentNode.querySelector('span').innerText
    //         const toUpdate = parseInt(updateLike) + 1
    //         return toUpdate
    //     })
    // }

    // function deleteQuote(e) {
    //     const quoteId = e.target.dataset.deleteButtonId

    //     const configObj = {
    //         method: "DELETE"
    //     }

    //     return fetch(`${quotesUrl}/${quoteId}`, configObj)
    //     .then(function(response) {
    //         return response.json()
    //     })
    //     .then(function(quote) {
    //         e.target.parentNode.remove()
    //     })
    // }

    function newQuote() {
        const submitButton = document.querySelector('.btn-primary');
        submitButton.addEventListener('click', function(e) {
            e.preventDefault()
            const newEntry = {
                quote: submitButton.parentNode.querySelector('input[id="new-quote"]').value,
                author: submitButton.parentNode.querySelector('input[id="author"]').value
            }

            const configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newEntry)
            }

            return fetch(quotesUrl, configObj)
            .then(function(response) {
                return response.json()
            })
            .then(function(quote) {
                renderQuotes(quote)
            })
        })
    }

})