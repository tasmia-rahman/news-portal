const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))

}
loadCategories();

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryList = document.createElement('li');
        categoryList.classList.add('nav-link');
        categoryList.innerText = category.category_name;
        categoriesContainer.appendChild(categoryList);
        categoryList.addEventListener('click', function () {
            loadNews(category.category_id);
        });
    });

}

const loadNews = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error))
}

const displayNews = (news) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    news.forEach(singleNews => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
            <div class="card mb-3 p-4">
                <div class="row g-0">
                    <div class="col-md-3">
                    <img src="${singleNews.thumbnail_url}" class="rounded-start" alt="News">
                    </div>
                    <div class="col-md-9">
                    <div class="card-body ps-0">
                        <h5 class="card-title">${singleNews.title}</h5>
                        <p class="card-text">${singleNews.details}</p>
                        <div class="more-info d-flex justify-content-between align-items-center">
                            <div class="author-info d-flex">
                                <img src="${singleNews.author.img}" class="rounded-circle" alt="Author">
                                <p class="ps-2 pt-2">${singleNews.author.name}</p>
                            </div>
                            <div class="total-view d-flex">
                                <i class="fa fa-solid fa-eye pt-1 pe-2"></i>
                                <p>${singleNews.total_view}</p>
                            </div>
                            <i class="fa fa-solid fa-arrow-right"></i>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        `
        newsContainer.appendChild(newsDiv);
    })
}