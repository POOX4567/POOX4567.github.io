// app.js
const rssUrl = 'https://rss2json.com/api.json?rss_url=https://techcrunch.com/feed/';

const newsContainer = document.getElementById('news-container');

// Obtener noticias
async function fetchNews() {
    try {
        const response = await fetch(rssUrl);
        const data = await response.json();
        displayNews(data.items);
    } catch (error) {
        console.error("Error al obtener noticias", error);
    }
}

// Mostrar las noticias 
function displayNews(articles) {
    newsContainer.innerHTML = ''; 
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-article');

        const imageUrl = article.enclosure?.link ? article.enclosure.link : '';

        articleElement.innerHTML = `
            ${imageUrl ? `<img src="${imageUrl}" alt="${article.title}">` : ''}
            <div class="news-content">
                <h2 class="news-title">${article.title}</h2>
                <p class="news-description">${article.description || 'Sin descripción disponible.'}</p>
                <center><a href="${article.link}" target="_blank" class="news-link">Leer más</a></center>
            </div>
        `;

        newsContainer.appendChild(articleElement);
    });
}

fetchNews();
