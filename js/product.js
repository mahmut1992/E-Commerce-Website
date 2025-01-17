import elements from "./helper.js";


//! db.json a istek atarak verileri alan fonksiyon
 const fetchProducts=async()=>{
    try {
        const res= await fetch("db.json");
        const data=await res.json()
        if(!res.ok){
            throw new Error("Yanlış URL");
            
        }
        return data;
        //Eğer bir hata varsa fırlat
    } catch (error) {
        console.log(`Hataaaaa ${err}`);
        return [];
    }



}

//! Ürünleri render eden fonksiyon

 const renderProducts=(products,addToCartCallBack)=>{
    elements.productList.innerHTML=products.map((product)=>`<div class="product">
                <img class="product-image"  src="${product.image}" alt="Product-İmage">
                <div class="product-info">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-pricr">$${product.price}</p>
                    <a  class="add-to-cart" data-id="${product.id}">Add to cart</a>
                </div>
            </div>`
        ).join("")

        // Clası add-to-cart olan elemanları seç
       const addToCartButtons= document.querySelectorAll(".add-to-cart")

       for(let i=0;i<addToCartButtons.length;i++){
        const addToCartButton=addToCartButtons[i]

        addToCartButton.addEventListener("click",addToCartCallBack)
       }
    };




 export{fetchProducts,renderProducts}