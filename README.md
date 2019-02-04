# Full-Stack Review
Weekly morning review to introduce technologies and concepts to students as they learn them. Covering React, Redux, Node.js, Express, MassiveJS, PostgreSQL, RESTful APIs.
## Part 1 Steps - Basic Front End and Server set up
### Back End
1. Run Create React App from the command line and install necessary dependencies to create an Express server.
2. Create a server folder with an index file and a controller folder. Inside the controller folder, create a controller file.
3. Set up a basic server and have it listening on desired port.
4. Create two functions in the controller file that will handle GET requests using the below API base URL. One get request needs to get the characters and the other needs to get the epiodes.
	- Base URL - https://rickandmortyapi.com/api/
	- Refer to the [docs](https://rickandmortyapi.com/) to figure out correct endpoints.
5. Define two variables (characters, episodes) at the top of your controller set equal to an empty array. Set characters equal to your response from the character GET request. Follow the same steps for your episodes array.
6. Create our endpoints in the index file and import the functions to handle our GET requests.
7. Test those endpoints in Postman to make sure you are getting the correct data back.
### Front End
1. Define our state on App.js with characters and episodes keys that are set to empty arrays. Set a display key equal to the string "Characters".
2. Create components called Header, Card and Episode.
3. Set up our app to when the component mounts it will send API calls to endpoints we set up in the previous steps.
4. Below our render method and above our return statement map over our characters array and passdown a character object through props to our Card component.
	- Inside the Card component render the character's name, species, and photo.
5. Do the same for the episode array but pass down an episode object and map over the Episode component.
	- Inside the Episode component render the episode's name and information (episode key).
6. Create a Header component that has the name of our app and a button. Include it in our App component.
	- Add a display property to state in our App that is defaulted to false. 
	- Add a method that will toggle this property between true and false and pass it down into our Header component.
	- This method will be called with our button's onClick event listener.
7. When our property created in the previous step is false the characters list should be rendered and if it's true, the episode list should be rendered in our App component. 

## Part 2 Steps - Adding DELETE and PUT requests
### Back End

 1. Create edit and delete functions in the controller file but only for our characters. You will not need to make an external API call as we do not have access to edit the API. Work with your character array defined in your controller to delete and edit an item.
	 - Remember that these functions will have data coming in from the front end that you will need to handle.
	 - For both functions, you'll want to find the index of the item in your array that matches the id you will get from the front end. 
	 - From there, you'll interact with that item to delete or edit it.
	 - Make sure to send a response back to front end.
2. Define your DELETE and PUT enpoints in your index file.
3. Import your delete and edit functions from your controller.
4. Pass the functions in with the endpoints to handle the requests.
5. Test endpoints in Postman to ensure they are working.
### Front End
1. Go to your App component and create two methods to handle your DELETE and EDIT requests.
	- DELETE and EDIT requests always need an id to pinpoint the exact item they are trying to manipulate. 
	- EDIT requests need the updated data to send to the backend as well.
2. Pass these methods down to your Card component through props.
3. In your Card component, change it from a functional component to a class component.
4. Add 3 properties on state called name, speices, and edit.
	- Name and species will be equal to the name and species on our props. Edit will be set equal to false.
	- We'll use edit to toggle between diplaying the character info and showing the character info with input fields for the user to edit.
	- We'll use the name and species properties as values on our input fields.
5. Create a method that will toggle edit in our state between true and false and create a handle change method to handle name and species inputs.
6. Create a button in our Card component that has an onClick event listener that fires off our delete method. Be sure to pass in the id.
7. Create another button that also has an onClick but it will fire off our toggle edit method.
8. Now conditionally render the info in our card component if edit is false and render a form with name and species inputs and a submit input. 
	- As mentioned previously, give the inputs a value of name and species respectively. 
	- Use the onSubmit event listener in our form to fire off the edit method we created. 
	- With the onSubmit and a input type of submit, the user can press enter or click the button to submit the edits. 
9. We'll also need to change the edit status back to false when firing off the edit method. Since the edit property exists in state on our Card component, we'll have to do this inline when calling our edit method.
## Part 3 Steps - Add Routing
### Front End
1. Install react-router-dom in your command line. 
2. Create a new component called Home and export all of your code in your App component into the Home component. The App component should look like the below:
```
import  React, { Component } from  'react';
import  './App.css';

class  App  extends  Component {

	render() {
		return (
			<div  className="App">
			</div>
		);
	}
}

export  default  App;
```
3. Now create a file called routes.js in your src folder and import React from react and Switch and Route from react-router-dom.
4. Write two routes - one with the path of '/' that uses the Home component and a route with the path of '/episodes' that uses the Episode. Wrap your routes with the Switch component we imported.
5. Go to the App component and import BrowserRouter from react-router-dom then wrap the contents of App with BrowserRouter. 
6. Change the button in the Header component to be Links that route to either the Home component or the Episode component. 
## Part 4 Steps - Adding our Database
### Back End
1. In your terminal, install massive and dotenv then require them in your index file. Also, create a .gitignore and .env file in the root of your project.
2. Next add your .env file to your gitignore then put your database connection string inside your .env.
3. Connect to your database using massive invoked with the connection string and then set your database on your app.
4. Once you have your database set up create a database folder at the root of your project. 
5. Set up a table called characters with an id, name, species, and image column and insert 3-5 characters to have data to work with.
6. Inside of the controller file we're going to change all of our functions to interact with our database.
7. Instead of our GET call to our external API, make a call to get all of the characters from our database. You'll need to create a SQL file in your database folder and connect the database in your controller to that file. 
8. Now follow the same steps for the DELETE and PUT functions to change the vanilla JS to database calls. 
9. Test endpoints in Postman to make sure all data is coming in as expected.
## Part 5 Steps - Adding Redux
### Front End
1. In your terminal install redux, react-redux, and redux-promise middleware.
2. Create a folder in your src folder called ducks. Add 3 files - one called store.js, another called epReducer, the last named charReducer. 
3. In our store import createStore, applyMiddleWare and combineReducers from redux. Also, import promiseMiddleware from redux-promise-middleware and import our reducers.
4. Set a variable equal to combineReducers invoked with an object that includes your two reducers. 
5. Now export createStore invoked and pass in the variable from the previous step as the first parameter, then applyMiddleware invoked as the second parameter. Inside of applyMiddleware, pass in promiseMiddleware invoked. Should look like the below: 
```
export default createStore(reducers, applyMiddleware(promiseMiddleware()));
```
6. Go into the charReducer and create a variable called initialState that is equal to an object that has a key of characters equal to an empty array, a key of isLoading equal to false, and a key of err equal to false. Also, import axios.
7. Define an action type called GET_CHARACTERS equal to the same name as the action type but in a string. 
8. Create and export a function called getChars that will return an object with a type key equal to the action type in our previous step and payload key equal to an API call to our GET endpoint in our server.
9. Create and export a function called charReducer that takes in state as the first parameter defaulted to initialState and action as the second parameter. Then create a switch statement inside the function that takes in action.type.
10. The cases are going to be your action type with _PENDING, _FULFILLED, or _REJECTED appended to it. With all of these cases, state will need to be passed in with other values that have changed so use object.assign or a spread operator. 
	- Pending should return an object with state (from reducer's first param) and isLoading equal to true.
	- Fulfilled should return an object with state, isLoading equal to false, and characters equal to our action's payload.
	- Rejected should return an object with state, isLoading equal to false, and err equal to true.
11. Now we need to give app access to the store and reduces we created. Go to our App component and import Provider from react-redux and our store from our ducks folder. 
12. Wrap the contents of App (including BrowserRouter) in the Provider component from redux. Provider has a store attribute that takes in the store we imported.
13. Go to our Home component and import connect from react-redux and the function we created in our charReducer.
14. At the bottom of the component create a function called mapStateToProps that takes in state and returns the characters array from our charReducer.
15. Now in our export statement, use the connect component from react-redux. Invoke connect and pass in mapStateToProps as the first argument and our getChars function in an object as the second argument. Right next to connect invoked, add Home in parenthesis. 
```
export default connect(...)(Home);
```
16. Delete our characters array on state and our API call in our componentDidMount. Call the getChars function in our componentDidMount from props. 
17. Be sure to update the map function to map over characters in props not in state.
## Part 6 Steps - Adding Sessions
### Back End
1. Install an npm package called express-session and require it in your server's index file. 
2. Now have your app use the session middleware in your index file that takes in an object with a secret key, a resave key, and a saveUninitialized key. 
	- Secret should be equal to a variable defined in your .env file
	- Resave and saveUninitialized should both be equal to false
3. Now create a file in your controller folder called auth controller. We'll then create register, login, singout, and getUser functions. 
4. Register should add a user to the database then after adding that user,  create a new user key on req.session and set it equal to the response. Then create a POST endpoint that handles this register function.
5. Login should get all the users from our database and compare then usernames and passwords to the username and password we'll be getting from our request body. If there is a match, then return that user otherwise return a message letting the user know to register. We will need a POST endpoint for this as well.
6. GetUser should get the user from our session and return it, this will be a GET endpoint.
7. Signout should terminate the user session and return a new session object, this will be a POST endpoint as well. 