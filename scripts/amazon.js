import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

let productHTML = '';
products.forEach((product) => {
    productHTML += `
     <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class ="js-quatity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>`
});
// add data from data/product.js into html code to display on page
document.querySelector('.js-product-grid').innerHTML = productHTML;

let cartQuatity = 0;
let timeOutId;
let isTimeOutRunning = false;
document.querySelectorAll('.js-add-to-cart').forEach( (button) => {
  button.addEventListener('click', () => {
    // add product into cart
    const productId = button.dataset.productId;
    let matchingItem;
    cart.forEach((item) => {
      if (productId === item.productId){
        matchingItem = item;
      }
    })
    if (matchingItem) {
      matchingItem.quality += 1;
    } else { 
      cart.push({
        productId: productId,
        quality: 1
      });
    }

    // calculate total cart quantity
    const selectorElement = document.querySelector(`.js-quatity-selector-${productId}`);
    const selectedValue = Number(selectorElement.value);
    cartQuatity += selectedValue;
    document.querySelector('.js-cart-quantity').innerHTML = cartQuatity;
    console.log(cart);


    const addedElement = document.querySelector(`.added-to-cart-${productId}`);
   
    addedElement.classList.add('js-added-to-cart');
    if(!isTimeOutRunning) {
      timeOutId = setTimeout(() => {
        addedElement.classList.remove('js-added-to-cart');
      },1000);
      isTimeOutRunning = true;
    } else {
      clearInterval(timeOutId); // if timeout is running then clear the rest of time and run timeout again with interval with 2s 
      timeOutId = setTimeout(() => {
        addedElement.classList.remove('js-added-to-cart');
      },1000);
      isTimeOutRunning = true;
    }
  })
})
