import React, { Component } from "react";
import "./App.css";

function City({ data }) {
	return (
		<div>
			City Name: {data.City}
			<br />
			State: {data.State}
			<ul>
				<li>Population: {data.EstimatedPopulation}</li>
			</ul>
		</div>
	);
}
// onChange checks the users change every single time
function ZipSearchField(props) {
	return (
		<div>
			Zip Code:
			<input type="text" onChange={props.changeHandler} />
		</div>
	);
}

class App extends Component {
	state = {
		zipCode: "",
		cities: [],
	};
	// by using a arrow function you don't need to define a constructor
	//promise is doing work asynchronosly which means it give it later
	zipChanged = (event) => {
		console.log(event.target.value);
		this.setState({ zipCode: event.target.value });
		// console.log(this.state.zipCode);

		// fetches data from api
		if (event.target.value.length === 5) {
			fetch("http://ctp-zip-api.herokuapp.com/zip/" + event.target.value)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					this.setState({ cities: data });
				})
				.catch((err) => {
					console.log("No Results");
					this.setState({ cities: [] });
				});
		}
	};

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h2>Zip Code Search</h2>
				</div>
				<ZipSearchField
					zipCode={this.state.zipCode}
					changeHandler={this.zipChanged}
				/>
				<div>Current Zip is {this.state.zipCode}</div>
				<div>
					{this.state.cities.length === 0 ? <h1>No Result</h1> : null}
					{this.state.cities.map((city) => (
						<City data={city} />
					))}
				</div>
			</div>
		);
	}
}

export default App;

//cd zip-code-react-lab
// cd  zip-search
