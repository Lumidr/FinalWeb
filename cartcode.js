$(document).ready(function () {
    
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    
    function renderCart() {
        const $shoplist = $('.shoplist');
        $shoplist.empty(); 

        let totalAmount = 0;

        
        cartItems.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;

            $shoplist.append(`
                <div class="cart-item" data-index="${index}">
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <p>Total: $${itemTotal.toFixed(2)}</p>
                    <button class="remove-item">Remove</button>
                </div>
            `);
        });

    
        $shoplist.append(`
            <div class="cart-total">
                <h3>Total Amount: $${totalAmount.toFixed(2)}</h3>
            </div>
        `);
    }

    
    renderCart();

    
    $(document).on('click', '.quantity-btn.plus', function () {
        const index = $(this).closest('.cart-item').data('index');
        cartItems[index].quantity++;
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCart();
    });

    
    $(document).on('click', '.quantity-btn.minus', function () {
        const index = $(this).closest('.cart-item').data('index');
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCart();
        }
    });

    $(document).on('click', '.remove-item', function () {
        const index = $(this).closest('.cart-item').data('index');
        cartItems.splice(index, 1); 
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCart();
    });
});