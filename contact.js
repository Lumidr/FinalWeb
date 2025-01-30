$(document).ready(function () {

    
    $('#contact-form').submit(function (e) {
        e.preventDefault();  
        
        const name = $('#name').val();
        const email = $('#email').val();
        const message = $('#message').val();

        
        if (name === '' || email === '' || message === '') {
            alert("Please fill in all fields.");
            return;
        }

       
        alert("Your message has been sent. Thank you for contacting us!");

        
        $('#contact-form')[0].reset();
    });

    
    $('#newsletter-form').submit(function (e) {
        e.preventDefault();  

        
        const newsletterEmail = $('#newsletter-email').val();

        
        if (newsletterEmail === '') {
            alert("Please enter your email.");
            return;
        }

        
        alert("Thank you for subscribing to our newsletter!");

        
        $('#newsletter-form')[0].reset();
    });

});
