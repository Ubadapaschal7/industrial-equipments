function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // prevent duplicates
    const existing = cart.find(item => item.id === product.id);
    if (!existing) {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Now attach the click listener
const addBtn = document.querySelector('.add-to-cart');

if (addBtn) {
    addBtn.addEventListener('click', function () {

        const container = document.querySelector('.single_order_text_container');

        const product = {
            id: container.dataset.id,
            name: container.dataset.name,
            condition: container.dataset.condition,
            price: parseFloat(container.dataset.price),
            image: container.dataset.image
        };

        addToCart(product);

        window.location.href = "cart.html";
    });
}

// ADD TO CART BTN CHECK
const singleContainer = document.querySelector('.single_order_text_container');
const addToBtn = document.querySelector('.add-to-cart');

if (singleContainer && addToBtn) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const exists = cart.find(item => item.id === singleContainer.dataset.id);

    if (exists) {
        addToBtn.disabled = true;
        addToBtn.innerText = "Already Added";
    }
}


const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartBody = document.getElementById('cart-body');

if (cartBody) {
    let total = 0;

    cart.forEach(item => {
        const priceFormatted = item.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        const row = `
            <tr>
                <td>
                    <img src="${item.image}" width="80">
                </td>
                <td>
                    <div class="description_details">
                        <p class="product_name">${item.name}</p>
                        <p class="product_name">${item.condition}</p>
                        <p onclick="removeItem('${item.id}' )" style="color: #ff0404; cursor:pointer">Remove</p>
                    </div>
                </td>
                <td>
                    <p>
                        $${priceFormatted}
                    </p>
                </td>
            </tr>
        `;

        cartBody.innerHTML += row;

        total += item.price;
    });

    const totalFormatted = total.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    document.querySelector('.cart_price').innerText = `$${totalFormatted}`;
    document.querySelector('.cart_total p:last-child').innerText = `$${totalFormatted}`;
}



// REMOVE ITEM
function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem('cart', JSON.stringify(cart));

    location.reload();
}


// empty cart
const emptySection = document.querySelector('.empty_cart_section');
const showCartSection = document.querySelector('.add_to_cart_section');

if (emptySection && showCartSection) {
    if (cart.length > 0) {
        emptySection.style.display = "none";
        showCartSection.style.display = "block";
    } else {
        emptySection.style.display = "block";
        showCartSection.style.display = "none";
    }
}