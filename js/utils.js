import elements from "./helper.js"

const saveToLocalStorage=(cart)=>{
    localStorage.setItem("cart",JSON.stringify(cart))
}


const getFromLocalStorage=()=>{
    const strData=localStorage.getItem("cart")
    return strData ? JSON.parse(strData):[]
}
const calculateCartTotal=(cart)=>{
return cart.reduce((sum,item)=>sum+item.price*item.quantity,0)
}
const updateCartIcon=(cart)=>{
// Sepetteki Toplam Ürün Miktarını hesapla
let totalQuantity=cart.reduce((sum,item)=>{
    return sum+item.quantity;
},0);

// sepetteki ürün miktarını dinamik şikilde render et
elements.icon.setAttribute("data-quantity",totalQuantity);
};



export {saveToLocalStorage,getFromLocalStorage,calculateCartTotal,updateCartIcon}