let cart = 0;

let allProducts = [];

const cartCount = document.getElementById("cart-count");

const buttons = document.querySelectorAll(".product-card button");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

cart++;

cartCount.innerText=cart;

});

});

/*=========================
DARK MODE
=========================*/

const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

});

/*=========================
WISHLIST
=========================*/

let wishlist = 0;

const wishlistBtn = document.getElementById("wishlist-btn");
const wishlistCount = document.getElementById("wishlist-count");

wishlistCount.textContent = wishlist;

wishlistBtn.addEventListener("click", () => {

    wishlist++;

    wishlistCount.textContent = wishlist;

    wishlistBtn.classList.add("active");

   

});

/* =========================================
   LOAD PRODUCTS FROM API
========================================= */

const productGrid = document.getElementById("product-grid");

async function loadProducts() {

    try {

        const res = await fetch("https://dummyjson.com/products?limit=20");

        const data = await res.json();

        allProducts = data.products.filter(product =>

    ![
        "groceries"
    ].includes(product.category.toLowerCase())

);

displayProducts(allProducts);

        

    } catch (err) {

        console.log(err);

    }

}

function displayProducts(products){

    document.getElementById("productCount").innerHTML =
    `${products.length} Products Found`;

    productGrid.innerHTML="";

    if(products.length===0){

    productGrid.innerHTML=`

    <h2 style="text-align:center;grid-column:1/-1;color:#10b981;">

    No Product Found 😢

    </h2>

    `;

    return;

}

    products.forEach(product=>{

        productGrid.innerHTML += `

        <div class="product-card">

            <span class="discount">-${product.discountPercentage.toFixed(0)}%</span>

            <img src="${product.thumbnail}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p>${
{
    smartphones:"Mobiles",
    laptops:"Laptops",
    "mens-shirts":"Men Fashion",
    "mens-shoes":"Shoes",
    "womens-dresses":"Women Fashion",
    "womens-shoes":"Women Shoes",
    "womens-bags":"Bags",
    beauty:"Beauty",
    furniture:"Furniture",
    "home-decoration":"Home Decor",
    tops:"Fashion",
    sunglasses:"Accessories",
    automotive:"Automotive",
    motorcycle:"Bike",
    lighting:"Lighting",
    skincare:"Skincare"
}[product.category] || product.category
}</p>

            <div class="rating">

                ⭐ ${product.rating}

            </div>

            <h4>

                ₹${Math.round(product.price*85)}

            </h4>

            <button
            class="add-cart"
            onclick="addToCart('${product.title}', ${Math.round(product.price*85)})">

            Add To Cart

          </button>

        </div>

        `;

    });

}

loadProducts();

/*=============================
SEARCH
=============================*/

const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

   const filtered = allProducts.filter(product =>

    product.title.toLowerCase().includes(value)

    ||

    product.category.toLowerCase().includes(value)

);
    displayProducts(filtered);

});


/*=========================
ADD TO CART
=========================*/

let cartItems = [];

document.getElementById("cart-count").textContent = cartItems.length;

function addToCart(name, price) {

    cartItems.push({
        name,
        price
    });

    

    document.getElementById("cart-count").textContent = cartItems.length;

    alert(name + " added to cart!");

}

/*=========================
CATEGORY FILTER
=========================*/

const categoryFilter = document.getElementById("categoryFilter");

categoryFilter.addEventListener("change",()=>{

    if(categoryFilter.value==="all"){

        displayProducts(allProducts);

        return;

    }

    const filtered = allProducts.filter(product=>

        product.category===categoryFilter.value

    );

    displayProducts(filtered);

});