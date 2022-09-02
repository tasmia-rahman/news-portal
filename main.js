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
        categoryList.classList.add('nav-link')
        categoryList.innerText = category.category_name;
        categoriesContainer.appendChild(categoryList);
        categoryList.addEventListener('click', function () {
            loadNews(category.category_id);
        })
    });

}

const loadNews = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => console.log(data.data))
}