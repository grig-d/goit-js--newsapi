import './css/common.css';
import articlesTmpl from './templates/articles.hbs';
import NewsApiService from './js/news-service';
import LoadMoreBtn from './js/components/load-more-btn';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  //   loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

// делаем экземпляр, чтобы получить объект с методами и свойствами
const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value; // при сабмите формы при помощи сеттера получаем значение запроса

  if (newsApiService.query.trim() === '') {
    return;
  }
  loadMoreBtn.show();
  loadMoreBtn.disable();
  newsApiService.resetPage(); // сбрасываем номер страницы при изменении запроса
  newsApiService.fetchArticles().then(articles => {
    clearArticlesContainer();
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
}

// для пагинации надо сохранять searchQuery
function onLoadMore() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML(
    'beforeend',
    articlesTmpl(articles),
  );
}

// при новом запросе очищаем контейнер от предыдущих статей
function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
