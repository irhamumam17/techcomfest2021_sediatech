import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { ScheduleContext } from '../../context.js';

class Add extends Component {
	constructor(props) {
		super(props);

		this.state = {
			day: '',
		}

		this.handleClass = this.handleClass.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleClass(e) {
		let value = e.target.value;
		this.setState({ class_id: value });
		this.context.getSubject(value);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value,
		});
	}

	async handleSubmit(e) {
		e.preventDefault();
		let subjectsId = [];
		for(let [key , value] of Object.entries(this.state)) {
			console.log(value);
			if(key.includes('subject_id_')) {
				let subjectId = key.replace('subject_id_' , '');
				subjectId = parseInt(subjectId);
				subjectsId.push(subjectId);
			}
		}
		let newSchedule = {
			class_id: this.state.class_id,
			day: this.state.day,
			subjectsId: subjectsId,
		}
		let status = await this.context.addSchedule(newSchedule);
		if(status === 200) {
			this.props.history.push('/school/schedule/list');
		}
	}

	render() {
		return(
			<React.Fragment>
				<motion.div className="dashboard-title"
					variants={ Variants }
					initial="tInit"
					animate="tAnimate"
					transition="tTransition"
				>
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Buat Jadwal</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/school/d ashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/schedule/list" className="hover:underline hover:text-blue-400">jadwal pelajaran </Link> 
							<span className="mx-1">/</span>
							<Link to="/school/schedule/add" className="hover:underline hover:text-blue-400">buat</Link> 
						</h4>
					</div>
				</motion.div>
				<motion.div 
					variants={Variants}
					initial="btnHeadInit"
					animate="btnHeadAnimate"
					transition="btnHeadTransition"
					className="inline-block"
				>
					<Link to="/school/schedule/list" className="button-header">Lihat jadwal pelajaran</Link>
				</motion.div>
				<motion.form onSubmit={this.handleSubmit} className="card"
					variants={Variants}
					initial="cardInit"
					animate="cardAnimate"
					transition={{...Variants.cardTransition , delay: .5}}
				>
					<div className="my-2">
						<label htmlFor="class_id" className="form-label">Pilih Kelas</label>
						<select onChange={this.handleClass} name="class_id" id="class_id" className="form-input">
							<option value="">-- Pilih Kelas --</option>
							{
								this.context.classes.map((value , key) => {
									return <option key={key} value={value.id}>{value.class_name}</option>
								})
							}
						</select>
					</div>
					<div className="my-2">
						<label htmlFor="day" className="form-label">Hari</label>
						<select onChange={this.handleChange} name="day" id="day" className="form-input">
							<option value="">-- Pilih Hari --</option>
							<option value="Monday">Senin</option>
							<option value="Tuesday">Selasa</option>
							<option value="Wednesday">Rabu</option>
							<option value="Thursday">Kamis</option>
							<option value="Friday">Jumat</option>
							<option value="Saturday">Sabtu</option>
							<option value="Sunday">Minggu</option>
						</select>
					</div>
					<div className="my-2">
						<label htmlFor="subject_id" className="form-label">Pilih Pelajaran</label>
						{
							this.context.subjects.map((subject, key) => {
								return (
									<div key={key} className="flex flex-row items-center">
										<input type="checkbox" name={`subject_id_${subject.id}`} onChange={this.handleChange} />
										<span className="ml-2">{subject.subject}</span>
									</div>	
								)
							})
						}
					</div>
					<button className="button bg-blue">Buat Jadwal</button>
				</motion.form>
			</React.Fragment>
		);
	}
}



Add.contextType = ScheduleContext;
export default Add;
	