import React from 'react';

export class PatientsList extends React.Component {
	constructor(props) {
		super(props);
	}

	render(props) {
		let tableHeaders = []
		if (this.props.entries.length > 0){
			tableHeaders = [<th>PatientId</th>,
							<th>PatientName</th>,
							<th>PatientBirthDate</th>]
		}

		return (
			<table>
				<tr>
					{tableHeaders}
				</tr>
				{this.props.entries.map(patientInfo => 
					<tr key={patientInfo.resource.id}>
						<td>{patientInfo.resource.id}</td>
						<td>{patientInfo.resource.name ? patientInfo.resource.name[0].family : "-x- Not on File -x-"}</td>
						<td>{patientInfo.resource.birthDate ? patientInfo.resource.birthDate : "-x- Not on File -x-"}</td>
					</tr>
				)}
				
			</table>
		);
	}
}

export default PatientsList;