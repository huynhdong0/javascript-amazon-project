import * as cartModule from '../data/cart.js';
import * as productModule from '../data/products.js';

// load data into html file add data from data/product.js to display on page
document.querySelector('.js-product-grid').innerHTML = productModule.loadData();



// make interactive when u click on buton add to cart
document.querySelectorAll('.js-add-to-cart').forEach( (button) => {
  button.addEventListener('click', () => {
    // get productId of each product for interaction
    const productId = button.dataset.productId;
    cartModule.addToCart(productId);
    cartModule.updateCartQuantity(productId);
    cartModule.controlTimeOut(productId);
  })
});
