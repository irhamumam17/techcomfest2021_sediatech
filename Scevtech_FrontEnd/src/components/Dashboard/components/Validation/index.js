import React from 'react';

const cekVal = (value , array) => {
	let str;
	array.forEach(item => 
		item.includes(value) ? str = item : ''
	);
	return str 
}

const validate = (field , label , value , array) => {
	let validations = array.split('|');
	// console.log(validations);

	let response = [];
	// required
	if(validations.includes('required')) {
		if( value === '' && value === ' ' && value === undefined) {
			response.push(`${label} harus terisi.`);
		}
	}

	// email
	if(validations.includes('email')) {
		if( !value.includes('@')) {
			response.push(`${label} tidak valid.`);
		}
	}

	// min
	let keyMin = cekVal('min' , validations);
	if(keyMin !== '' && keyMin !== undefined) {
		let min = parseInt(keyMin.replace('min:' , ''));
		if(value.length < min) {
			response.push(`${label} minimal teridiri dari ${min} karakter.`)
		} 
	}

	// max
	let keyMax = cekVal('max' , validations);
	if(keyMax !== '' && keyMax !== undefined) {
		let max = parseInt(keyMax.replace('max:' , ''));
		if(value.length > max) {
			response.push(`${label} maximal terdiri dari ${max} karakter.`)
		} 
	}

	return response.toString();
}

export default validate;

export const Feedback = ({text}) => {
	return(
		<React.Fragment>
			{
				(text) ?
					<span className="invalid-feedback">{text}</span>
				: ''
			}
		</React.Fragment>
	)
}