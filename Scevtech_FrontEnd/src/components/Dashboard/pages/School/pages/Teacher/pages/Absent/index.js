import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { TeacherContext } from '../../context.js';
import Loading from '../../../../../../components/Loading/';

class Absent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			from_date: '',
			to_date: '',
			add_loading: false,
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
		this.setState({ add_loading: true });
		await this.context.addSchedule({
			from_date: this.state.from_date,
			to_date: this.state.to_date,
		});
		this.setState({ add_loading: false });
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Absensi Guru</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/school/dashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/teacher/list" className="hover:underline hover:text-blue-400">guru </Link> 
							<span className="mx-1">/</span>
							<Link to="/school/teacher/absent" className="hover:underline hover:text-blue-400">absensi </Link> 
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
					<Link to="/school/teacher/list" className="button-header">Daftar Guru</Link>
				</motion.div>
				<motion.form onSubmit={this.handleSubmit} className="card"
					variants={Variants}
					initial="cardInit"
					animate="cardAnimate"
					transition={{...Variants.cardTransition , delay: .4}}
				>
					<h2>Tambah Tanggal</h2>
					<div className="-mt-2 flex flex-row gap-4">
						<div className="w-1/2 my-2">
							<label className="form-label">Dari tanggal</label>
							<input type="date" onChange={this.handleChange} name="from_date" className="form-input" />
						</div>
						<div className="w-1/2 my-2">
							<label className="form-label">Sampai tanggal</label>
							<input type="date" onChange={this.handleChange} name="to_date" className="form-input" />
						</div>
					</div>
					<div className="text-right">
						<button className="button bg-blue-400 transition duration-200 hover:bg-blue-600">Tambah</button>
					</div>
					<Loading status={this.state.add_loading} size="large" />
				</motion.form>

				{
					(this.context.get_schedules) ?
						<React.Fragment>
							<span className="mt-8"></span>
							<Loading status={this.context.get_schedules} size="large" />
						</React.Fragment>
					:
						<div className="flex flex-wrap flex-row gap-3">
							{
								this.context.schedules.map((date , key) => {
									return (
										<div key={key} className="w-32">
											<motion.div className="card text-center"
												variants={Variants}
												initial="cardInit"
												animate="cardAnimate"
												transition={{...Variants.cardTransition , delay: .1 + (key * 1/10)}}
											>
												<h1 className="text-6xl font-bold">{date.day}</h1>
												<div className="flex flex-row gap-4">
													<div className="font-semibold flex flex-row w-1/2 items-center text-green-500">
														<svg className="w-1/2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
														  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
														</svg>
														<span className="text-lg w-1/2">{date.already}</span>
													</div>
													<div className="font-semibold flex flex-row w-1/2 items-center text-red-500">
														<svg className="w-1/2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
														  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
														</svg>
														<span className="text-lg w-1/2">{date.notyet}</span>
													</div>
												</div>
											</motion.div>
										</div>
									)
								})
							}
						</div>
				}
			</React.Fragment>
		);
	}
}

Absent.contextType = TeacherContext;
export default Absent;
	