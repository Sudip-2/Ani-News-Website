//Api
const apiKey = "c397f3198da24019b75d69a30008438c"
const url = 'https://newsapi.org/v2/everything?q='

window.addEventListener('load', () => {
    fetchNews("Anime", "2024-07-11", "2024-07-11")
})
async function fetchNews(query, date, date2) {
    let response = await fetch(`${url}${query}&from=${date}&to=${date2}&apiKey=${apiKey}`)
    const data = await response.json()
    bindData(data.articles)
}
function bindData(article) {
    const newsContainer = document.querySelector('.cardsContainer')
    const cardTemplate = document.querySelector('#newsCard')
    newsContainer.innerHTML = ''
    article.forEach(element => {
        if (!element.urlToImage) return
        const clone = cardTemplate.content.cloneNode(true)
        fillData(element, clone)
        newsContainer.appendChild(clone)
    });
}
function fillData(articles, clone) {
    let image = clone.querySelector('#cardImg')
    let title = clone.querySelector('.news-title')
    let publisherName = clone.querySelector('.publisherName')
    let description = clone.querySelector('.newsDesc')
    const date = new Date(articles.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })
    image.src = articles.urlToImage
    title.innerHTML = `${articles.title.substring(0, 80)}...`
    description.innerHTML = `${articles.description.substring(0, 100)}...`
    publisherName.innerHTML = `${articles.source.name}.${date}`
    clone.firstElementChild.addEventListener("click",() => {
        window.open(articles.url,"_blank")
    })
}

// Search Functionality
let searchBtn = document.querySelector('#search-btn')
let searchicon = document.querySelector('.search-icon')
searchBtn.addEventListener('click', () => {
    let searchContent = document.querySelector('.searchinputbox').value
    fetchNews(searchContent)
})
searchicon.addEventListener('click',() => {
    let searchContent = document.querySelector('.searchinputbox').value
    fetchNews(searchContent)
})
// Current upcoming Previous
let current = document.querySelector('#current')
let previous = document.querySelector('#previous')
current.style.color = "blue"

current.addEventListener('click', () => {
    current.style.color = "blue"
    previous.style.color = "black"
    fetchNews("Anime", "2024-07-11", "2024-07-11")
})
previous.addEventListener('click', () => {
    previous.style.color = "blue"
    current.style.color = "black"
    fetchNews("Anime", "2024-07-11", "2020-07-08")
})

//Hammenu
const hamMenu = document.querySelector('.spanForNav')
const hamStyle = document.querySelector('.navbars')
hamMenu.addEventListener('click', (e) => {
    hamStyle.classList.toggle('active')
})

const searchButton = document.querySelector('.search-icon')
const searchBar = document.querySelector('.searchbox input ')
searchButton.addEventListener('click', (e) => {
    searchBar.classList.toggle('active')
})
