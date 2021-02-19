/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';

  const select =
  {
    containerOf:
    {
      booksList: '.books-list',
      bookImage: '.book__image',
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
    },
  };

  const app =
  {
    init()
    {
      const thisApp = this;

      thisApp.favoriteBooks = [];

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

      const booksList = document.querySelector(select.containerOf.booksList);

      for (const book of thisApp.data.books) {

        const generatedHTML = templates.templateBook(book);

        const generatedDOM = utils.createDOMFromHTML(generatedHTML);

        booksList.appendChild(generatedDOM);
      }
    },

    initActions()
    {
      const thisApp = this;

      const booksList = document.querySelector(select.containerOf.booksList);

      booksList.addEventListener('dblclick', function(event)
      {
        event.preventDefault();

        const target = event.target.offsetParent;

        if(target.classList.contains(classNames.book.bookImage))
        {
          target.classList.toggle(classNames.book.favorite);

          const dataId = target.getAttribute('data-id');

          if(!thisApp.favoriteBooks.includes(dataId))
          {
            thisApp.favoriteBooks.push(dataId);
          }
          else
          {
            const index = thisApp.favoriteBooks.indexOf(dataId);

            if(index > -1)
            {
              thisApp.favoriteBooks.splice(index,1);
            }
          }
        }
      });
    },
  };

  app.init();
}
