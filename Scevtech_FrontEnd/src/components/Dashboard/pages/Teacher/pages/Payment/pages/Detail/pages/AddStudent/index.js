import React , {Component} from 'react';
import { DetailContext } from '../../context.js';
import Loading from '../../../../../../../../components/Loading/';

class AddStudent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			students: [],
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
	
		if(value.length > 3) {
			let list = this.context.students.filter(student => student.name.toLowerCase().includes(value.toLowerCase()));
			this.setState({
				students: list,
			})
		} else {
			this.setState({ students: [] })
		}
	}

	handleInput(e) {
		this.setState({
			student_id: e.target.getAttribute('data-id'),
			students: [],
		});
		document.getElementById('inputName').value = e.target.innerText;
	}

	handleSubmit = (e) =>  {
		e.preventDefault();
		this.context.addStudentPayment(this.state.student_id); 
	}

	render() {
		return(
			<React.Fragment>
				<form onSubmit={this.handleSubmit} className="card">
					<div className="form-group">
						<label htmlFor="name" className="form-label">Cari Siswa</label>
						<input type="text" id="inputName" onChange={this.handleChange} placeholder="Nama Siswa" className="form-input" />
						<input type="hidden" name="student_id" />
					</div>
					<div className="form-group">
						<ul>
							{
								this.state.students.map((student , key) => {
									return (
										<li data-id={student.id} onClick={this.handleInput} className="cursor-pointer hover:underline ml-2" key={key}>{student.name}</li>
									)
								})
							}
						</ul>
					</div>
					<button className="button bg-blue">Tambah</button>
					<Loading status={this.context.loading.add_list_data} size="large" />
				</form>
			</React.Fragment>
		);
	}
}


AddStudent.contextType = DetailContext;
export default AddStudent;
	