import '../App.css';
import React, { PureComponent } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import Button from './button.jsx';
import TextField from './textfield.jsx';
import PatientsList from './patientslist';

export class App extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      entryLimit: 20,
      entries: [],
      showButton: true,
      genderCount: []
    }
	}

  generateGenderStatistics(){
    let localGCount={};
    this.state.entries.map(patientInfo => {
      let gender = patientInfo.resource.gender;
      if (gender == null){gender = "null";} else {gender = gender.toLowerCase();}
      if (gender in localGCount){localGCount[gender] += 1} else {localGCount[gender] = 1}
      let formattedLocalGCount=[];
      for (const [key, value] of Object.entries(localGCount)) {
       formattedLocalGCount.push({name: key, value: value});
      }
      this.setState({genderCount: formattedLocalGCount});
    })
  }

	render(props) {
    
		return (
      <div className="app">
        <body className="appContent">
          

          {this.state.showButton ?
            <div>
              <TextField changeHandler={e => this.setState({entryLimit: e.target.value})}></TextField>
              <Button disabled={!this.state.showButton} clickHandler={() => {fetch('http://hapi.fhir.org/baseR4/Patient?birthdate=lt2021-06-26&_count='+this.state.entryLimit)
                                          .then(response => response.json())
                                          .then(data => this.setState({entries: data['entry']}))
                                          .then(() => console.log(this.state.entries))
                                          .then(() => this.setState({showButton: false}))
                                          .then(() => this.generateGenderStatistics())
                                          }} />
            </div>
            : 
            <div>
              <PatientsList entries={this.state.entries}/>

              Gender Spread
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={this.state.genderCount}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
              </div>}
          

        </body>
      </div>
    );
	}
}

export default App;
