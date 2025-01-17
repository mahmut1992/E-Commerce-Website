import { addToCart, displayCartTotal, renderCartItems } from "./cart.js"
import { fetchProducts, renderProducts } from "./product.js"
import { getFromLocalStorage, updateCartIcon } from "./utils.js"

const menuIcon=document.querySelector("#menu-icon")
const menu=document.querySelector(".navbar")

menuIcon.addEventListener("click",()=>{
    menu.classList.toggle("open-menu")
})
document.addEventListener("DOMContentLoaded",async()=>{
    // localStorage den cart dizisini al
   let cart= getFromLocalStorage()
    if(window.location.pathname.includes("/cart.html")){
        //Eğer sepet sayfasındaysak sepete yüklenen ürünleri renden et
        renderCartItems()
        displayCartTotal()
    
        
    }else{
        // Eğer anasayda isek API ye istek at
        const products=await fetchProducts()
        
        
        //API den gelen verileri ekrana render et
        renderProducts(products,(e)=>{
            addToCart(e,products)
            
        })
    }
    // sepet iconunu günceller
    updateCartIcon(cart)
})

