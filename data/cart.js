export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
  cart = [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }
  ];
}

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

let timeOutId;
let isTimeOutRunning = false;

// get total items into cart
export function getTotalItems() {
  let count = 0;
  cart.forEach((cartItem) => {
    count += cartItem.quantity;
  })
  return count;
}

// add to cart 
export function addToCart(productId) {
  let matchingItem;
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += addNewCartQuatity(productId);
    } else { 
      cart.push({
        productId: productId,
        quantity: addNewCartQuatity(productId),
        deliveryOptionId: '1'
      });
    }
    saveToStorage();
}

function addNewCartQuatity(productId) {
  const selectorElement = document.querySelector(`.js-quatity-selector-${productId}`);
  return Number(selectorElement.value);
}

// calculate cart quantity
export function calculateCartQuantity(){
  let count = 0;
  cart.forEach((cartItem) => {
    count += cartItem.quantity;
  })
  document.querySelector('.js-cart-quantity').innerHTML = count;
}

// update cart quantity 
export function updateQuantity(productId ,newQuantity) {
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      cartItem.quantity = newQuantity;
      saveToStorage();
      document.querySelector('.js-quantity-label').innerHTML = cartItem.quantity;
    }
  })
  
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

// remove cartItem 
export function removeCartItem(productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId == cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
