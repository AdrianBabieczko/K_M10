/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';

  const select =
  {
    containerOf:
    {
      books: '.books-list'
    },
  };

  const templates =
  {
    templateBook: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  const app =
  {
    init: function()
    {
      const thisApp = this;

      thisApp.initData();
      thisApp.render();
    },

    initData: function()
    {
      const thisApp = this;

      thisApp.data = dataSource;
    },

    render: function()
    {
      const thisApp = this;

      const booksList = document.querySelector(select.containerOf.books);

      for (const book of thisApp.data.books) {

        const generatedHTML = templates.templateBook(book);

        const generatedDOM = utils.createDOMFromHTML(generatedHTML);

        booksList.appendChild(generatedDOM);
      }
    }
  };
  app.init();
}
