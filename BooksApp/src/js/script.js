/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
'use strict';
class BooksList
{
  constructor()
  {
    const thisBooksList = this;

    thisBooksList.initElements();
    thisBooksList.setHelpers();
    thisBooksList.initData();
    thisBooksList.render();
    thisBooksList.initActions();
  }

  initElements()
  {
    const thisBooksList = this;

    thisBooksList.helpers = {};
    thisBooksList.dom = {};
    thisBooksList.favoriteBooks = [];
    thisBooksList.filters = [];
  }

  setHelpers()
  {
    const thisBooksList = this;

    thisBooksList.helpers.select =
  {
    containerOf:
    {
      booksList: '.books-list',
      filters: '.filters',
    },
  };

    thisBooksList.helpers.templates =
  {
    templateBook: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

    thisBooksList.helpers.classNames =
  {
    book:
    {
      favorite: 'favorite',
      bookImage: 'book__image',
      hidden: 'hidden',
    },
  };
  }

  initData()
  {
    const thisApp = this;
    thisApp.data = dataSource;
  }

  render()
  {
    const thisBooksList = this;

    thisBooksList.dom.booksList = document.querySelector(thisBooksList.helpers.select.containerOf.booksList);

    for (const book of thisBooksList.data.books)
    {
      book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
      book.ratingWidth = Math.round(book.rating * 10);

      const generatedHTML = thisBooksList.helpers.templates.templateBook(book);

      const generatedDOM = utils.createDOMFromHTML(generatedHTML);

      thisBooksList.dom.booksList.appendChild(generatedDOM);
    }
  }

  initActions()
  {
    const thisBooksList = this;

    thisBooksList.favoriteBooksActions();

    thisBooksList.dom.filters = document.querySelector(thisBooksList.helpers.select.containerOf.filters);

    thisBooksList.setFilters();
  }

  favoriteBooksActions()
  {
    const thisBooksList = this;

    thisBooksList.dom.booksList.addEventListener('dblclick', function (event)
    {
      event.preventDefault();

      const target = event.target.offsetParent;

      if (target.classList.contains(thisBooksList.helpers.classNames.book.bookImage)) {
        target.classList.toggle(thisBooksList.helpers.classNames.book.favorite);

        const dataId = target.getAttribute('data-id');

        if (!thisBooksList.favoriteBooks.includes(dataId)) {
          thisBooksList.favoriteBooks.push(dataId);
        }

        else {
          const index = thisBooksList.favoriteBooks.indexOf(dataId);

          if (index > -1) {
            thisBooksList.favoriteBooks.splice(index, 1);
          }
        }
      }
    });
  }

  filterBooks()
  {
    const thisBooksList = this;

    const data = thisBooksList.data.books;
    const filters = thisBooksList.filters;


    for(const bookData in data)
    {
      let shouldBeHidden = false;

      for(const filter in thisBooksList.filters)
      {
        if(!data[bookData].details[filters[filter]])
        {
          shouldBeHidden = true;
          break;
        }
      }

      const book = thisBooksList.dom.booksList.querySelector('a[data-id="' + data[bookData].id + '"]');

      shouldBeHidden?book.classList.add(thisBooksList.helpers.classNames.book.hidden): book.classList.remove(thisBooksList.helpers.classNames.book.hidden);
    }
  }

  setFilters()
  {
    const thisBooksList = this;

    thisBooksList.dom.filters.addEventListener('click', function (event) {

      const target = event.target;

      if (target.tagName == 'INPUT' && target.type == 'checkbox' && target.name == 'filter') {

        if (target.checked == true) {
          thisBooksList.filters.push(target.value);
        }
        else {
          const index = thisBooksList.filters.indexOf(target.value);

          if (index > -1) {
            thisBooksList.filters.splice(index, 1);
          }
        }

        thisBooksList.filterBooks();
      }
    });
  }

  determineRatingBgc(rating)
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
}

window.app = new BooksList();
