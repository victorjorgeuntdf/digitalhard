//Selecciono los elementos de Slider
const sliders = document.querySelectorAll('.slider');

sliders.forEach(slider => {
  const item = slider.querySelector('.item');
  const point = slider.querySelectorAll('.point');

  point.forEach((element, i) => {
    point[i].addEventListener('click', () => {
      let position = i;
      let operation = position * -100;
      item.style.transform = `translateX(${operation}%)`;

      point.forEach((element, i) => {
        point[i].classList.remove('active');
      });

      point[i].classList.add('active');
    });
  });
});

//Filtrado de productos
document.addEventListener('DOMContentLoaded', function () {
  const categoryItems = document.querySelectorAll('.category_item');
  const productItems = document.querySelectorAll('.product-item');

  categoryItems.forEach(function (item) {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      const category = item.getAttribute('category');

      productItems.forEach(function (product) {
        if (product.getAttribute('category') === category || category === 'all') {
          product.style.display = 'block';
        } else {
          //Si no es igual se oculta la categoria
          product.style.display = 'none';
        }
      });
    });
  });
});
