export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
  cart = [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 3
    }
  ];
}


function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

let totalCartQuantity = 0;
let timeOutId;
let isTimeOutRunning = false;

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
        quantity: addNewCartQuatity(productId)
      });
    }
    saveToStorage();
}

function addNewCartQuatity(productId) {
  const selectorElement = document.querySelector(`.js-quatity-selector-${productId}`);
  return Number(selectorElement.value);
}

// calculate total cart quantity
export function updateCartQuantity(productId) {
    totalCartQuantity += addNewCartQuatity(productId);
    document.querySelector('.js-cart-quantity').innerHTML = totalCartQuantity;
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
