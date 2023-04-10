export default class Section { //  отвечает за отрисовку элементов на странице.
  constructor({ items, renderer }, containerSelector, api) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._api = api;
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);

    });
  }

  addItem(element) {
    this._container.prepend(element);
  }


  saveCard(textImage, linkImage){
    this._api.addCards({
      name: textImage,
      link: linkImage
    })
    .then(data => {
      this.addItem({
        name: data.name,
        link: data.link
      })

    })
    .catch(err => {
      console.log(err)
    })
  }

}
