import elements from "./helper.js"
import { calculateCartTotal, getFromLocalStorage, saveToLocalStorage, updateCartIcon } from "./utils.js"

let cart=getFromLocalStorage()



// ! Sepete Ekleme Yapan Fonksiyon

export const addToCart=(e,products)=>{
 const productId=parseInt(e.target.dataset.id)

 
  const product= products.find((product)=>product.id===productId)
  if(product){
    const exitingItem=cart.find((item)=>item.id===productId)
   if(exitingItem){
       exitingItem.quantity++
   }else{
    const cartItem={
        id:product.id,
        title:product.title,
        image:product.image,
        price:product.price,
        quantity:1,
     }
     cart.push(cartItem)
    }
 }
  saveToLocalStorage(cart)

  e.target.textContent="Added"

  setTimeout(() => {
    e.target.textContent="Add To cart"
  }, 2000);
  updateCartIcon(cart)
    
}

//! Sepetten ürünleri silecek fonksiyon

const removeFromCart=(e)=>{
 const productId=parseInt( e.target.dataset.id)
 cart=cart.filter((item)=>item.id!=productId)

 // sepetten ürünü sildin locali güncelle
 saveToLocalStorage(cart)
 renderCartItems()
 displayCartTotal()
 updateCartIcon(cart)

 
}
//! Sepetteki ütün miktarını güncelleyen fonksiyon

const onQuantitiyChanged=(e)=>{
  
  const productId=+e.target.dataset.id
  const newQuantity=+e.target.value

  if(newQuantity>0){
   const cartItem= cart.find((item)=>item.id===productId)
  cartItem.quantity=newQuantity
   saveToLocalStorage(cart)

   displayCartTotal()
   updateCartIcon(cart)
  }


  
}

//! Sepetteki ürünleri render eden fonk
export const renderCartItems=()=>{
  elements.cartItemsList.innerHTML=cart.map((item)=>` <div class="cart-item">
                            <img src="${item.image}" alt="">
                            <div class="cart-item-info">
                                <h2 class="cart-item-title">${item.title}</h2>
                                <input type="number" data-id="${item.id}" min="1" max="10" class="cart-item-quantity"  value="${item.quantity}">
                            </div>
                            <h2 class="cart-item-price">$ ${item.price}</h2>
                            <button class="remove-from-cart" data-id="${item.id}" >Remove</button>
                        </div>`).join("")
       // remove-from-cart clasına sahip elemanlara eriş
       const removeButtons=document.querySelectorAll(".remove-from-cart")
      for(let i =0;i<removeButtons.length;i++){
        const removeButton=removeButtons[i]
       removeButton.addEventListener("click",removeFromCart)
        
      }

      // Miktar İnputlarına (.cart-item-quantitiy) eriş
      const quantitiyInputs=document.querySelectorAll(".cart-item-quantity")
         for(let i =0;i<quantitiyInputs.length;i++){
          const quantitiyInput=quantitiyInputs[i]
          quantitiyInput.addEventListener("change",onQuantitiyChanged)
         }               
}

// Sepetteki toplam ürün miktarını render eden fonksiyon
export const displayCartTotal=()=>{
  const total=calculateCartTotal(cart);
  elements.cartTotal.textContent=`Total : $ ${total.toFixed(2)}`
  
}
