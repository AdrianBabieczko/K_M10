/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';

  const select =
  {
    containerOf:
    {
      booksList: '.books-list',
      filters: '.filters',
    },
  };

  const templates =
  {
    templateBook: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  const classNames =
  {
    book:
    {
      favorite: 'favorite',
      bookImage: 'book__image',
      hidden: 'hidden',
    },
  };

  const app =
  {
    init()
    {
      const thisApp = this;

      thisApp.dom = {};

      thisApp.favoriteBooks = [];
      thisApp.filters = [];

      thisApp.initData();
      thisApp.render();
      thisApp.initActions();
    },

    initData()
    {
      const thisApp = this;

      thisApp.data = dataSource;
    },

    render()
    {
      const thisApp = this;

      thisApp.dom.booksList = document.querySelector(select.containerOf.booksList);

      for (const book of thisApp.data.books)
      {
        book.ratingBgc = determineRatingBgc(book.rating);
        book.ratingWidth = Math.round(book.rating * 10);

        const generatedHTML = templates.templateBook(book);

        const generatedDOM = utils.createDOMFromHTML(generatedHTML);

        thisApp.dom.booksList.appendChild(generatedDOM);
      }
    },

    initActions()
    {
      const thisApp = this;

      favoriteBooks(classNames, thisApp);

      thisApp.dom.filters = document.querySelector(select.containerOf.filters);

      setFilters(classNames, thisApp);
    },
  };

  app.init();
}

function filterBooks(thisApp, classNames)
{
  const data = thisApp.data.books;
  const filters = thisApp.filters;


  for(const bookData in data)
  {
    let shouldBeHidden = false;

    for(const filter in thisApp.filters)
    {
      if(!data[bookData].details[filters[filter]])
      {
        shouldBeHidden = true;
        break;
      }
    }

    const book = thisApp.dom.booksList.querySelector('a[data-id="' + data[bookData].id + '"]');

    shouldBeHidden?book.classList.add(classNames.book.hidden): book.classList.remove(classNames.book.hidden);
  }
}

function setFilters(classNames, thisApp)
{
  thisApp.dom.filters.addEventListener('click', function (event) {

    const target = event.target;

    if (target.tagName == 'INPUT' && target.type == 'checkbox' && target.name == 'filter') {

      if (target.checked == true) {
        thisApp.filters.push(target.value);
      }
      else {
        const index = thisApp.filters.indexOf(target.value);

        if (index > -1) {
          thisApp.filters.splice(index, 1);
        }
      }

      filterBooks(thisApp, classNames);
    }
  });
}

function favoriteBooks(classNames, thisApp)
{
  thisApp.dom.booksList.addEventListener('dblclick', function (event) {
    event.preventDefault();

    const target = event.target.offsetParent;

    if (target.classList.contains(classNames.book.bookImage)) {
      target.classList.toggle(classNames.book.favorite);

      const dataId = target.getAttribute('data-id');

      if (!thisApp.favoriteBooks.includes(dataId)) {
        thisApp.favoriteBooks.push(dataId);
      }

      else {
        const index = thisApp.favoriteBooks.indexOf(dataId);

        if (index > -1) {
          thisApp.favoriteBooks.splice(index, 1);
        }
      }
    }
  });
}

function determineRatingBgc(rating)
{
  if(rating < 6)
  {
    return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
  }
  else if(rating > 6 && rating <=8)
  {
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
  }
  else if (rating > 8 && rating <=9)
  {
    return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
  }
  else if(rating >9)
  {
    return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
  }
  else
  {
    return '';
  }
}
