import '../App.css';
import React from 'react';
import { PieChart, Pie, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Button from './button.jsx';
import TextField from './textfield.jsx';
import PatientsList from './patientslist';
let {AgeFromDateString} = require('age-calculator');

export class App extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      entryLimit: 20,
      entries: [],
      showButton: true,
      genderCount: [],
      ageCount: []
    }
	}

  generateGenderStatistics(){
    let localGCount={};
    this.state.entries.map(patientInfo => {
      let gender = patientInfo.resource.gender;
      if (gender == null || gender == ""){gender = "unknown";} else {gender = gender.toLowerCase();}
      if (gender in localGCount){localGCount[gender] += 1} else {localGCount[gender] = 1}
    })
    let formattedLocalGCount=[];
    for (const [key, value] of Object.entries(localGCount)) {
     formattedLocalGCount.push({name: key, value: value});
    }
    this.setState({genderCount: formattedLocalGCount});
  }

  generateAgeStatistics(){
    let localACount={"Unknown": 0, "0-20": 0, "20-40": 0, "40-60": 0, "60-80": 0, "80-100": 0, "100+": 0};
    this.state.entries.map(patientInfo => {
      if (patientInfo.resource.birthDate == null || patientInfo.resource.birthDate == "") {localACount["Unknown"] += 1;}
      else{
        let age = new AgeFromDateString(patientInfo.resource.birthDate).age;
        switch(Math.floor(age/20)){
          case 0:
            localACount["0-20"] += 1;
            break;
          case 1:
            localACount["20-40"] += 1;
            break;
          case 2:
            localACount["40-60"] += 1;
            break;
          case 3:
            localACount["60-80"] += 1;
            break;
          case 4:
            localACount["80-100"] += 1;
            break;
          default:
            localACount["100+"] += 1;
            break;

        }
      }
    })
    let formattedLocalACount=[];
    for (const [key, value] of Object.entries(localACount)) {
     formattedLocalACount.push({name: key, numPatients: value});
    }
    this.setState({ageCount: formattedLocalACount});
  }

	render(props) {
    
		return (
      <body className="app">
        <div className="appContent">
          

          {this.state.showButton ?
            <div>
              <TextField changeHandler={e => {if(e.target.value < 1){e.target.value = 1; this.setState({entryLimit: 1})} else{this.setState({entryLimit: e.target.value})}}}></TextField>
              <Button disabled={!this.state.showButton} clickHandler={() => {fetch('http://hapi.fhir.org/baseR4/Patient?birthdate=lt2021-06-26&_count='+this.state.entryLimit)
                                          .then(response => response.json())
                                          .then(data => this.setState({entries: data['entry'], showButton: false}))
                                          .then(() => this.generateGenderStatistics())
                                          .then(() => this.generateAgeStatistics())
                                          }} />
            </div>
            : 
            <div>
              <PatientsList entries={this.state.entries}/>

              Gender Spread
              <PieChart width={400} height={400} >
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={this.state.genderCount}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={(entry) => entry.name}
                />
                <Tooltip />
              </PieChart>

              Age Spread

              <BarChart
                width={1000}
                height={500}
                data={this.state.ageCount}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="numPatients" fill="#8884d8" />
              </BarChart>
              </div>}
          

        </div>
      </body>
    );
	}
}

export default App;
