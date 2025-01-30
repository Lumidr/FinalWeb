$(document).ready(function () {
    
    $('#loginbtnpg').on('click', function (event) {
        event.preventDefault();
        login();
    });

    
    $('#signup1st').on('click', function (event) {
        event.preventDefault();
        showSignUpForm();
    });

    
    $('#signupbtn').on('click', function (event) {
        event.preventDefault();
        signUp();
    });

    
    function showSignUpForm() {
        $('#emailform').show(); 
        $('#signupbtnspan').show(); 
        $('#loginbtnpg').hide(); 
        $('#signup1st').hide(); 
    }

    
    function login() {
        var username = $('#username').val();
        var password = $('#password').val();

        if (!username || !password) {
            alert('Username and password are required.');
            return;
        }

        $.ajax({
            url: 'https://localhost:7107/api/Login/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                email: "", 
                password: password
            }),
            success: function (response) {
                if (response.success) {
                    window.location.href = 'basicstructure.html';
                } else {
                    alert('Login failed: ' + response.message);
                }
            },
            error: function (xhr, status, error) {
                alert('Login failed: ' + error);
            }
        });
    }

    
    function signUp() {
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();

        if (!username || !email || !password) {
            alert('Username, email, and password are required.');
            return;
        }

        $.ajax({
            url: 'https://localhost:7107/api/Login/Register', 
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
            success: function (response) {
                if (response.success) {
                    alert('Sign-up successful! Please log in.');
                    window.location.href = 'loginpage.html'; 
                } else {
                    alert('Sign-up failed: ' + response.message);
                }
            },
            error: function (xhr, status, error) {
                alert('Sign-up failed: ' + error);
            }
        });
    }
});