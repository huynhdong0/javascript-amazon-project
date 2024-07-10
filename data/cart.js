const cart = [];

let cartQuatity = 0;
let timeOutId;
let isTimeOutRunning = false;


// add to cart 
export function addToCart(productId) {
  let matchingItem;
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId){
        matchingItem = cartItem;
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
}

// calculate total cart quantity
export function updateCartQuantity(productId) {
    const selectorElement = document.querySelector(`.js-quatity-selector-${productId}`);
    cartQuatity += Number(selectorElement.value);
    document.querySelector('.js-cart-quantity').innerHTML = cartQuatity;
}

// control time appear 'added' when u click add to cart
export function controlTimeOut(productId) {
    const addedElement = document.querySelector(`.added-to-cart-${productId}`);
    
    addedElement.classList.add('js-added-to-cart');
    if(!isTimeOutRunning) {
      timeOutId = setTimeout(() => {
        addedElement.classList.remove('js-added-to-cart');
      },1000);
      isTimeOutRunning = true;
    } else {
      /* if timeout is running then clear the rest of time 
         and run timeout again with interval with 2s */
      clearInterval(timeOutId);  
      timeOutId = setTimeout(() => {
        addedElement.classList.remove('js-added-to-cart');
      },1000);
      isTimeOutRunning = true;
    }
}