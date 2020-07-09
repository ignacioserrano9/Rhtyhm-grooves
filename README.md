# _Rhythm & Grooves

_Feel the music with the final and best app to help you track your vynils and disks collection!

## Install

- npm i

## Deployment

- The app is here : https://rhtyhm-grooves.herokuapp.com, feel free to use it.

## Endpoints


| Method  	    | Path  	|  Description 	|
|---	|---	|---	|
|GET  	| /  	| Goes to the main  page  	|
| GET  	| /auth/signup  	| Shows the form to sign up 	|
| POST  	|  /auth/signup 	| Saves the user in the DDBB  	|
| GET  	| auth/login  	| Shows the form to log in  	|
| POST  	|  auth/login 	| Starts a new session of the user  	|
| GET  	| auth/logout  	| Ends the current session  	|
| GET  	| /profile 	| Redirect the current user to his profile  	|
| POST 	|   /editdata/:_id	| Edit user information  	|
| GET  	| /user/:_id/edit' 	|  Shows a form to edit user info	|
|  GET 	|   /record-search	|  Search for any artist or record 	|
| POST 	|  /user/:_id/edit 	| Edit user avatar|
| GET  	|  /record/:id 	| Show record info 	|
| POST  	| /record/addcollection  	|  add record to collection 	|
| POST 	| /record/delete  	| Delete record from DB  	|
|POST   	|  	/record/addwishlist| Add record to wishlist  	|
| GET|/user/:_id/collection |Show user own collection|
|GET |/user/:_id/wishlist | Show user own wishlist|
| GET|/community' |Show all users|
| GET|/community/:id |Show other user details |
