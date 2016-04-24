//////////////////////////
//
// Authentication
// See "Logging the user in" on https://developers.facebook.com/mobile
//
//////////////////////////
var user = [];
var text1, user_id = null,
    entry = 0;
var userallData = null;

//Detect when Facebook tells us that the user's session has been returned
function authUser() {
    FB.Event.subscribe('auth.statusChange', handleStatusChange);
}

function handleStatusChange(session) {
        console.log('Got the user\'s session: ', session);

        if (session.authResponse) {
            document.body.className = 'connected';

            //Fetch user's id, name, and picture
            FB.api('/me/', function(response) {
                console.log(JSON.stringify(response));

                if (!response.error) {
                    if (entry == 0) {
                        //user = response;
                        //userallData="Welcome "+user.name+" your Facebook ID="+user.id+" Gender="+user.gender+" Email="+user.email;
                        // alert("Welcome "+user.name+" your ID="+user.id+" Gender="+user.gender+" Email="+user.email);
                        // remove previous user details from localStorage 
                        localStorage.facebookName = "";
                        localStorage.facebookFirstName = "";
                        localStorage.facebookLastName = "";
                        localStorage.facebookGender = "";
                        localStorage.facebookEmail = "";
                        localStorage.facebookId = "";
                        localStorage.facebookProfilePicture = "";



                        //gettingDefault();
                        // get user data and store in localStorage
                        localStorage.facebookName = response.name;
                        localStorage.facebookFirstName = response.first_name;
                        localStorage.facebookLastName = response.last_name;
                        localStorage.facebookGender = response.gender;
                        localStorage.facebookEmail = response.email;
                        localStorage.facebookId = response.id;
                        console.log('Got the user\'s name and picture: ');
                        console.log(JSON.stringify(response));
                        // set it for auto facebook login.
                        localStorage.facebookLogin = "true";
                        // use this fucntion for sending message to user 
                        //facebook_send_message();

                        //alert("Successful Login="+localStorage.facebookLogin);

                        // $photo.append('<img class=\"fb-photo1234 img-polaroid\" src='+user.picture.data.url+'\">');
                        //Update display of user name and picture in your html page via tags
                        /* if (document.getElementById('user-name')) {
              document.getElementById('user-name').innerHTML = user.name;
			  document.getElementById('user-id').innerHTML = 'id ='+user.id;
			  document.getElementById('user-location').innerHTML = 'location ='+user.location['name'];
			  document.getElementById('user-gender').innerHTML = 'gender ='+user.gender;
			  document.getElementById('user-email').innerHTML = 'email ='+user.email;
    }
            if (document.getElementById('user-picture')) {
              if (user.picture.data) {
			      document.getElementById('user-picture').style.display = 'block';
                  document.getElementById('user-picture').src = user.picture.data.url;
              } else {
                  document.getElementById('user-picture').src = user.picture;
              }
            }*/

                        entry = 1;
                    }
                    //clearAction();

                    //logout();
                    // use this for getting user profile image in different resolution
                    getProfileImage();
                } else {
                    document.body.className = 'not_connected';
                    //clearAction();
                }
            });
        }
        //logout();

    }
    //Prompt the user to login and ask for the 'email' permission
function promptLogin() {
    FB.login(null, {
        scope: 'email'
    });
}

function getProfileImage() {
        // getting html elements
        var $photo = $('.photo'),
            $btn = $('.btn-fb'),
            $fbPhoto = $('img.fb-photo');
        // change height and width in this FB.api call
        FB.api("/me/picture?width=180&height=180", function(response) {
            var profileImage = response.data.url.split('https://')[1],
                //remove https to avoid any cert issues
                randomNumber = Math.floor(Math.random() * 256);
            //remove if there and add image element to dom to show without refresh
            if ($fbPhoto.length) {
                $fbPhoto.remove();
            }
            //add random number to reduce the frequency of cached images showing

            // store image url in localstorage for future use so you dont need to call FB.api again
            localStorage.facebookProfilePicture = profileImage;
            logout();
            // you can redirect user to new page with the help of window.location.href="abc.html";
            //window.location.href="abc.html";
            $("#photo").empty();
        });
    }
    // this function can you use to share any content on your news feed via your phonegap application
function facebook_send_message() {
        alert("will send message");
        /*FB.ui({ method: 'send',
             link: 'http://www.google.com', to: '1016921448',
            description: 'This is test in app message from me -deep '
        });*/
        FB.ui({
            method: 'feed',
            caption: 'Message From Google',
            picture: 'http://laughingsquid.com/wp-content/uploads/google-classic-20090405-154952.jpg',
            description: ' this is to make not that google updating new this'
        }, function(response) {});


        alert("sent");
    }
    // can call this function to get by default values of user.
function gettingDefault() {
        FB.api("/me/", function(response) {
            console.log(JSON.stringify(response));
            localStorage.facebookName = response.name;
            localStorage.facebookFirstName = response.first_name;
            localStorage.facebookLastName = response.last_name;
            localStorage.facebookGender = response.gender;
            localStorage.facebookEmail = response.email;
            localStorage.facebookId = response.id;
            console.log('Got the user\'s name and picture: ');
            console.log(JSON.stringify(response));
            localStorage.facebookLogin = "true";


        });


    }
    //This will prompt the user to grant you acess to their Facebook Likes
function promptExtendedPermissions() {
    FB.login(function() {
        setAction("The 'user_likes' permission has been granted.", false);

        setTimeout('clearAction();', 2000);

        document.body.className = 'permissioned';
    }, {
        scope: 'user_likes'
    });
}

//See https://developers.facebook.com/docs/reference/rest/auth.revokeAuthorization/
/*function uninstallApp() {
  FB.api({method: 'auth.revokeAuthorization'},
    function(response) {
     // window.location.reload();
     // To clear the local storage cache and native session, call logout
     logout();
    });
}*/

//See https://developers.facebook.com/docs/reference/javascript/FB.logout/
function logout() {
    FB.logout(function(response) {
        console.log("Logout");
        window.location.reload();
    });
}
