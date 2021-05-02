// здесь вся логика работы с api
// класс или его экземпляры отвечает за запросы на api
const API_KEY = '63ebcc132b6facffbf06521c4cabec2e'; // ключ нельзя хранить на клиенте
export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  // этот метод отвечает за http запросы
  fetchArticles() {
    const url = `https://gnews.io/api/v4/search?q=${this.searchQuery}&lang=en&max=5&page=${this.page}&token=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data.articles;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

