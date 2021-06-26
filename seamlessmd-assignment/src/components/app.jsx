import React from 'react';
import '../App.css';
import Button from './button.jsx';
import $ from 'jquery'; 
import PatientsList from './patientslist';

export class App extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      entries: []
    }
	}

	render(props) {
		return (
      <div className="App">
        <header className="App-header">
          <PatientsList entries={this.state.entries}/>
          <Button clickHandler={() => {fetch('http://hapi.fhir.org/baseR4/Patient')
                                      .then(response => response.json())
                                      .then(data => this.setState({entries: data['entry']}))
                                      .then(() => console.log(this.state.entries));
                                      }} />
        </header>
      </div>
    );
	}
}

export default App;
