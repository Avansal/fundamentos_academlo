const baseUrl ="https://ecommercebackend.fundamentos-29.repl.co/";
// mostrar uocultar carrito variables
const carToogle= document.querySelector('.car_toggle');
const carBlock = document.querySelector('.car_block');
// dibujar en la web los productos
const productList = document.querySelector('#products-container');
 //carrito
 const car= document.querySelector('#car');
 const car_List = document.querySelector('#car_List');
 let carProducts =[];

 //!mostrar u ocultar carrito, lógica
  carToogle.addEventListener('click',() => {
    carBlock.classList.toggle('nav_car_visible');
  })
//! se crea función para escuchar los eventos
eventListenersLoader();

function eventListenersLoader(){
  productList.addEventListener('click', addProduct);
}

function getProducts(){
  axios.get(baseUrl)
  .then(function(response){
    const products = response.data;
    printProducts(products);
  }).catch(function(e){
    console.log(e);
  });
}
getProducts();

function printProducts(products){
let html = '';
products.forEach(element => {
  html += `<div class ="products_container">
             <div class ="products_container_img">
              <img src ="${element.image}" alt="image">
             </div>
             <div class ="products_container_name" alt="name">
              <p>${element.name}</p>
             </div>
             <div class = "products_container_price" alt="price">
              <p>$ ${element.price.toFixed(2)} </p>
             </div>
             <div class ="products_container_button"> 
              <button class="car__button add__to__car" id="add__to__car" data-id="${element.id}">Add To Car</button>
             </div>
           </div>`
 });
 productList.innerHTML = html;
}
//* agregar productos al carrito

function addProduct(event){
  if(event.target.classList.contains('add_to_car')){
    const product = event.target.parentElement.parentElement;
    carProductsElements(product);
  }
}
function carProductsElements(product){
  const infoProduct ={
    id: product.querySelector('button').getAtrribute('data-id'),
    image: product.querySelector('img').src,
    name: product.querySelector('.product_container_name p').textContent,
    name: product.querySelector('product_container_price p').textContent,
    quantity :1
  }
  //?agregar un contador
  if(carProducts.some(product => product.id === infoProduct,id)){
    const product = carProducts.map(product =>{
     if(product.id === infoProduct.id){
        product.quantity++;
        return product
      }else{
        return product;
      }  
    })
    carProducts = [...product];
  }else{
    carProducts = [...product, infoProduct];
  }
  console.log(carProducts);
  carElementsHTML();
}
function carElementsHTML (){
  carList.innerHTML = '';
  for(let carP of carProducts){
    const div = document.createElement('div');

    div.innerHTML = `
    <div class="car__product">
      <div class="car__product__image">
        <img src="${carP.image}">
      </div>
      <div class="car__product__description">
        <p>${carP.name}</p>
        <p>Precio: ${carP.price}</p>
        <p>Cantidad: ${carP.quantity}</p>
      </div>
      <div class="car__product__button">
        <button class="delete__product" data-id="${carP.id}">
          Delete
        </button>
      </div>
    </div>
    <hr>
  `;
  carList.appendChild(div);
  }

}





