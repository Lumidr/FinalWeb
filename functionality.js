$(document).ready(function () {
    //let cartCount = 0;
    //let favCount = 0;

   
    

    // Update Favorites Count
    $('.fav-icon').click(function () {
        favCount++;
        $('#fav-count').text(favCount);
        alert("Item added to favorites!");
    });

    // Community Link Alert
    $('.community-link').click(function (event) {
        event.preventDefault();
        alert("Welcome to our community page! Feature under development.");
    });
});