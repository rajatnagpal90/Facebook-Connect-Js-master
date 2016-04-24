Facebook-Connect-Js
===================

Small js which handles facebook connect implementation for PhoneGap, JavaScript.  

##Usage
* **Login Prompt:**
 Fist of all we need to call prompt login, which will use `FB.login()` to generate in app login screen. It takes scope as parameter. [see official documentation.](https://developers.facebook.com/docs/reference/javascript/FB.login/v2.3)
```javascript
function promptLogin() {
    FB.login(null, {
        scope: 'email'
    });
}
```
* **Authenticate User After Login:** Will handle different state changes.
```javascript
function authUser() {
    FB.Event.subscribe('auth.statusChange', handleStatusChange);
}
```
* **Getting User Data:** After successful authentication call `FB.api(path, method, params, callback)` it will make Graph API call to get user details. Check response format to access data. [see official documentation.](https://developers.facebook.com/docs/javascript/reference/FB.api)
```javascript
/* /me/ will get default information of user. 
change it /me/conversations/, '/me', {fields: 'last_name'} etc as per usage */
FB.api('/me/', function(response) {
  console.log(JSON.stringify(response));
}
```
* **Get Profile Picture:** We can get different size of image by specifying width and height during `FB.api()` call.
```javascript
FB.api("/me/picture?width=180&height=180", function(response) {
  var imageurl=response.data.url;
}
```
* **Update on User Feed/Status Update:** This method is used to trigger different forms of Facebook created UI dialogs `FB.ui(params, function(response))` [see official documentation.](https://developers.facebook.com/docs/javascript/reference/FB.ui)
```javascript
FB.ui({
            method: 'feed',
            caption: 'Message From FB-Connect-JS',
            picture: 'http://www.freelargeimages.com/wp-content/uploads/2014/11/Facebook_logo-6.jpg',
            description: 'Check out this image share'
        }, function(response) {});
```
* **Logout User:** Logout Current signed user with `FB.logout()` it will delete accesstoken. [see official documentation.](https://developers.facebook.com/docs/reference/javascript/FB.logout/)  
```javascript
 function logout() {
    FB.logout(function(response) {
        console.log("Logout");
        window.location.reload();
    });
}
 ```
