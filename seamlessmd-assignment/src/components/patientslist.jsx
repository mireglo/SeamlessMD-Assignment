import React from 'react';

export class PatientsList extends React.Component {
	constructor(props) {
		super(props);
	}

	render(props) {
		let tableHeaders = []
		if (this.props.entries.length > 0){
			tableHeaders = [<th key={1234567890}>PatientId</th>,
							<th key={1234567891}>PatientName</th>,
							<th key={1234567892}>PatientBirthDate</th>,
							<th key={1234567893}>PatientGender</th>]
		}

		return (
			<table>
				<thead>	
					<tr>
						{tableHeaders}
					</tr>
				</thead>
				<tbody>
					{this.props.entries.map(patientInfo => 
						<tr key={patientInfo.resource.id}>
							<td>{patientInfo.resource.id}</td>
							<td>{patientInfo.resource.name ? patientInfo.resource.name[0].family : "-x- Not on File -x-"}</td>
							<td>{patientInfo.resource.birthDate ? patientInfo.resource.birthDate : "-x- Not on File -x-"}</td>
							<td>{patientInfo.resource.gender ? patientInfo.resource.gender : "-x- Not on File -x-"}</td>
						</tr>)}
				</tbody>
				
			</table>
		);
	}
}

export default PatientsList;