import React, { Component } from "react"; // this helps import components
import "./App.css"; // this imports css so that the js file can use it

// In this project we will allow the user to provide us a City name
// and we will display all of the associated zip codes to the user.

function City({ data }) {
	// data is being passed to a component, when it is destructed
	return (
		<div>
			Zip Code: {data.Zipcode}
			<br />
			State: {data.State}
			<ul>
				<li>Population: {data.EstimatedPopulation}</li>
			</ul>
		</div>
	);
}

function CitySearchField(props) {
	//prop is being passed to a component

	return (
		<div>
			City Name :
			<input type="text" onChange={props.changeHandler} />
			{/* pass this change handler as a prop to component */}
		</div>
	);
}

class App extends Component {
	//Use of ES6 Class that extends, also the (parent) component
	state = {
		cityName: "", //to store City Name
		zipcode: [], // to store x amount of cities
	};
	CityChanged = (event) => {
		console.log(event.target.value); // console log the user input
		this.setState({ cityName: event.target.value }); //sets the cityName value to user input doesn't happen right away
		var letters = /^[A-Za-z]+$/;
		if (event.target.value.match(letters)) {
			// if value matches the pattern
			fetch("http://ctp-zip-api.herokuapp.com/city/" + event.target.value) //the best way because it's there
				//can also use fetch("http://ctp-zip-api.herokuapp.com/zip/"`${this.state.cityName}`) string literall
				//^^^string literally is computed at a different rate then the fetch.
				.then((res) => res.json()) // call that sets the state when it is valid
				.then((data) => {
					console.log(data);
					this.setState({ zipcode: data }); //save the data to zipcode
				})
				.catch((err) => {
					console.log("No Results");
					this.setState({ zipcode: [] });
				});
			//if there is no data say no results in console, and sets state to empty.
		}
	};

	render() {
		//renders the state of change at DOM,returns JSX
		return (
			<div className="App">
				{/* Creates a class name for App, enables css access */}
				<div className="App-header">
					{/* Creates a class name for the header of App, enables css access */}
					<h2>City Name Search</h2>
				</div>
				<CitySearchField //child component
					cityName={this.state.cityName}
					changeHandler={this.CityChanged}
					// changeHandler is defined by CityChanged
				/>
				<div>Current City is {this.state.cityName}</div>
				{/* component that is for the input of search field */}
				<div>
					{this.state.zipcode.map((zipC) => (
						<p>{zipC}</p>
					))}
				</div>
			</div>
		);
	}
}

export default App;

// cd  city-search
