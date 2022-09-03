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
            toggleSpinner(true);
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
    sortByView(news);
    displayFoundItems(news.length);
    const noNewsFoundDiv = document.getElementById('no-news-found');
    if (news.length === 0) {
        noNewsFoundDiv.classList.remove('d-none');
        toggleSpinner(false);
    } else {
        noNewsFoundDiv.classList.add('d-none');
    }
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
                        <p class="card-text my-4">${singleNews.details.substring(0, 500).concat('...')}</p>
                        <div class="more-info d-flex justify-content-between align-items-center">
                            <div class="author-info d-flex">
                                <img src="${singleNews.author.img ? singleNews.author.img : "Not available"}" class="rounded-circle" alt="Author">
                                <p class="ps-2 pt-2">${singleNews.author.name ? singleNews.author.name : "Not available"}</p>
                            </div>
                            <div class="total-view d-flex">
                                <i class="fa fa-solid fa-eye pt-1 pe-2"></i>
                                <p>${singleNews.total_view ? singleNews.total_view : "Not available"}</p>
                            </div>
                            <i onclick="loadNewsDetails('${singleNews._id}')" class="fa fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#newsModal"></i>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        `
        newsContainer.appendChild(newsDiv);
        toggleSpinner(false);
    })
}

const displayFoundItems = (length) => {
    const foundItemsContainer = document.getElementById('found-items-container');
    foundItemsContainer.innerHTML = `
        <p class="mb-0">${length} items found</p>
    `
}

const sortByView = (news) => {
    news.sort((a, b) => {
        return b.total_view - a.total_view;
    })
}

const loadNewsDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch(error => console.log(error))
}

const displayNewsDetails = (newsDetails) => {
    const modalTitle = document.getElementById('newsModalLabel');
    modalTitle.innerText = newsDetails.title;
    const modalBodyDetails = document.getElementById('modal-body-details');
    modalBodyDetails.innerHTML = `
        <p>News detail: ${newsDetails.details}</p>
        <hr>
        <p>Published date: ${newsDetails.published_date ? newsDetails.published_date : "Not available"}</p>
        <p>Total view: ${newsDetails.total_view ? newsDetails.total_view : "Not available"}</p>
        <p>Rating: ${newsDetails.rating.badge ? newsDetails.rating.badge : "Not available"}</p>
    `
}

const toggleSpinner = (isLoading) => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    } else {
        spinnerSection.classList.add('d-none');
    }
}