$(document).ready(function () {
    let cartCount = 0;
    let favCount = 0;

    fetchCategories();

    
    function fetchProductsByCategory(category) {
        $.ajax({
            url: `https://localhost:7107/api/Products/GetProductsByCategory?category=${category}`,
            method: "GET",
            success: function (response) {
                renderProducts(response);
            },
            error: function (error) {
                console.error("Error fetching products:", error);
            },
        });
    }

    function fetchCategories(){
        $.ajax({
            url:'https://localhost:7107/api/Products/GetCategories',
            method: "GET",
            success: function (response) {
                renderCategories(response);
            },
            error: function (error) {
                console.error("Error fetching categories:", error);
            },

        })
    }

    function renderCategories(categories) {
        $('.category-section').empty(); 
        categories.forEach(category => {
            $('.category-section').append(`
                <button class="category-btn" data-category="${category}">${category}</button>
            `);
        });
    }

   
    function renderProducts(products) {
        $('.product-list').empty();
        products.forEach(product => {
            $('.product-list').append(`
                <div class="product-item" data-product-id="${product.id}">
                    <h4>${product.name}</h4>
                    <p>$${product.price}</p>
                    <button class="view-details-btn">View Details</button>
                    <button class="add-to-cart">Add to Cart</button>
                    <button class="add-to-fav">Add to Favorites</button>
                </div>
            `);
        });
    }

    
    function showProductDetails(product) {
        $('#product-name').text(product.name);
        $('#product-price').text(product.price);
        $('#product-description').text(product.description);
        $('#product-details').text(product.details);
        $('#product-details-modal').show();
    }

   
    $('.close').click(function () {
        $('#product-details-modal').hide();
    });

    $(document).mouseup(function (e) {
        var modal = $(".modal-content");
        if (!modal.is(e.target) && modal.has(e.target).length === 0) {
            $("#product-details-modal").fadeOut(300); 
        }
    });

    $(document).on('click', '.add-to-cart', function () {
        const productId = $(this).closest('.product-item').data('product-id');
        const productName = $(this).siblings('h4').text();
        const productPrice = parseFloat($(this).siblings('p').text().replace('$', ''));
    
        
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
        
        const existingProduct = cartItems.find(item => item.id === productId);
    
        if (existingProduct) {
            
            existingProduct.quantity++;
        } else {
            
            cartItems.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }
    
        
        localStorage.setItem('cart', JSON.stringify(cartItems));
    
     
        cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        $('#cart-count').text(cartCount);
    
        alert("Item added to the cart!");
    });


    
    $('.category-btn').click(function () {
        const category = $(this).data('category');
        fetchProductsByCategory(category);
    });

    
    $(document).on('click', '.view-details-btn', function () {
        const productId = $(this).closest('.product-item').data('product-id');
        $.ajax({
            url: `https://localhost:7107/api/Products/GetProductById?productId=${productId}`,
            method: "GET",
            success: function (response) {
                showProductDetails(response);
            },
            error: function (error) {
                console.error("Error fetching product details:", error);
            },
        });
    });

    
    $(document).on('click', '.add-to-cart', function () {
        cartCount++;
        $('#cart-count').text(cartCount);
        alert("Item added to the cart!");
    });

   
    $(document).on('click', '.add-to-fav', function () {
        favCount++;
        $('#fav-count').text(favCount);
        alert("Item added to favorites!");
    });

    
    fetchProductsByCategory('new');

    $(document).on('click', '.category-btn', function () {
        const category = $(this).data('category'); 
        fetchProductsByCategory(category); 
    });

    
});