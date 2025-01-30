
const $ProductForm = $("#ProductForm");
const $ProductNameInput = $("#ProductName");
const $ProductCategoryInput = $("#ProductCategory");
const $ProductPriceInput = $("#ProductPrice");
const $ProductIdInput = $("#ProductId");
const $addBtn = $("#addBtn");
const $updateBtn = $("#updateBtn");
const $ProductList = $("#ProductList");


function loadProducts() {
    $.ajax({
        url: "https://localhost:7107/api/Products/GetProducts",
        method: "GET",
        success: function (response) {
            displayProducts(response);
        },
        error: function (error) {
            console.error(error);
        },
    });
}


function displayProducts(products) {
    $ProductList.empty();
    products.forEach((product) => {
        const $row = $("<tr></tr>");

        $row.html(`
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-btn" data-id="${product.id}">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${product.id}">Delete</button>
            </td>
        `);

        $ProductList.append($row);
    });
}


function saveProduct(event) {
    event.preventDefault();
    const productName = $ProductNameInput.val().trim();
    const productCategory = $ProductCategoryInput.val().trim();
    const productPrice = parseFloat($ProductPriceInput.val());

    const productData = {
        name: productName,
        category: productCategory,
        price: productPrice,
    };

    if ($ProductIdInput.val()) {
        // Update product
        const id = $ProductIdInput.val();
        productData.id = parseInt(id);

        $.ajax({
            url: `https://localhost:7107/api/Products/UpdateProductById?productId=${id}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(productData),
            success: function (response) {
                loadProducts();
                resetForm();
            },
            error: function (error) {
                console.error(error);
            },
        });
    } else {
        
        $.ajax({
            url: "https://localhost:7107/api/Products/CreateProduct",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(productData),
            success: function (response) {
                loadProducts();
                resetForm();
            },
            error: function (error) {
                console.error(error);
            },
        });
    }
}


function editProduct(id) {
    $.ajax({
        url: `https://localhost:7107/api/Products/GetProductById?productId=${id}`,
        method: "GET",
        success: function (response) {
            $ProductNameInput.val(response.name);
            $ProductCategoryInput.val(response.category);
            $ProductPriceInput.val(response.price);
            $ProductIdInput.val(response.id);
            $addBtn.addClass("d-none");
            $updateBtn.removeClass("d-none");
        },
        error: function (error) {
            console.error(error);
        },
    });
}


function deleteProduct(id) {
    $.ajax({
        url: `https://localhost:7107/api/Products/DeleteProductById?productId=${id}`,
        method: "DELETE",
        success: function (response) {
            loadProducts();
        },
        error: function (error) {
            console.error(error);
        },
    });
}


function resetForm() {
    $ProductNameInput.val("");
    $ProductCategoryInput.val("");
    $ProductPriceInput.val("");
    $ProductIdInput.val("");
    $addBtn.removeClass("d-none");
    $updateBtn.addClass("d-none");
}


$ProductForm.on("submit", saveProduct);
$updateBtn.on("click", saveProduct);


$ProductList.on("click", ".edit-btn", function () {
    const id = $(this).data("id");
    editProduct(id);
});

$ProductList.on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    deleteProduct(id);
});


$(document).ready(function () {
    loadProducts();
});