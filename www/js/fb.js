function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log into Facebook.';
    }
}

//called when someone finishes with the Login Button.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '1480642292229101',
        status: true,
        cookie     : true,
        xfbml      : true,
        version    : 'v2.4'
    });

    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk/debug.js";
    //js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', {fields: 'id, name, email'}, function(response) {
        console.log(response);
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
        FbLogin(response.id, response.name, response.email);
    });
}


function FbLogin(id, name, email) {
    $.nette.ajax({
        type: 'GET',
        url: fbLink,
        data: {
            fbId: id,
            name: name,
            email: email
        }
    }).done(function (payload) {

    });
}