import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../../../../axios.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';
import Loading from '../../../../components/Loading/';
import { motion } from 'framer-motion';
import Variants from '../../../../components/Variants/';
import CardDashboard from '../../../../components/CardDashboard/';
import UIChart from '../../../../components/UIChart/';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chart: {
				teachers: {
					id: 'chartTeacher',
					title: 'Grafik Keaktifan Guru',
					labels: ['Jan' , 'Feb' , 'March' , 'April' , 'Mei' , 'Juni'],
					data: [86,67,91 , 85,74,65],
				},
				students: {
					id: 'chartStudent',
					title: 'Grafik Keaktifan Siswa',
					labels: ['Jan' , 'Feb' , 'March' , 'April' , 'Mei' , 'Juni'],
					data: [86,67,91 , 85,74,65],
				}
			},
			loading: {
				counts: true,
				teachers: true,
				students: true,
			},
			counts: [],
			teachers: [],
			students: [],
		}
	}

	componentDidMount() {
		// get data counts
		axios.get(`school/${this.context.id}/dashboard/count` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({
					counts: res.data,
					loading: {...this.state.loading , counts: false},
				})
			});

		// get list teacher
		axios.get(`school/${this.context.id}/dashboard/teacher` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({
					teachers: res.data,
					loading: {...this.state.loading , teachers: false},
				})
			})

		// get list students
		axios.get(`school/${this.context.id}/dashboard/student` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({
					students: res.data,
					loading: {...this.state.loading , students: false},
				})
			})
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Dashbord Sekolah</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/school/dashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/dashboard" className="hover:underline hover:text-blue-400">Dashboard </Link> 
						</h4>
					</div>
				</motion.div>
				<div className="flex flex-row gap-4">
				{
					(this.state.loading.counts) ?
						<Loading status={this.state.loading.counts} size="large" />
					:
						<React.Fragment>
							<CardDashboard bg="bg-blue-400" delay="0.4" icon='teacher' value={this.state.counts.teacher} name="Guru" />
							<CardDashboard bg="bg-teal-400" delay=".6" icon='student' value={this.state.counts.student} name="Siswa" />
							<CardDashboard bg="bg-indigo-400" delay=".8" icon='class' value={this.state.counts['class']} name="Kelas" />
							<CardDashboard bg="bg-purple-400" delay="1" icon='course' value={this.state.counts.course} name="Jurusan" />
						</React.Fragment>
				}
				</div>
				<div className="flex flex-row gap-4">
					<motion.div className="w-1/2 p-4 bg-white shadow-lg rounded"
						variants={Variants}
						initial="cardInit"
						animate="cardAnimate"
						transition={{...Variants.cardTransition , delay: .1}}
					>
						<UIChart id={this.state.chart.teachers.id} 
								 title={this.state.chart.teachers.title} 
								 labels={this.state.chart.teachers.labels} 
								 data={this.state.chart.teachers.data} />
					</motion.div>
					<motion.div className="w-1/2 p-4 bg-white shadow-lg rounded"
						variants={Variants}
						initial="cardInit"
						animate="cardAnimate"
						transition={{...Variants.cardTransition , delay: .3}}
					>
						<UIChart id={this.state.chart.students.id} 
								 title={this.state.chart.students.title} 
								 labels={this.state.chart.students.labels} 
								 data={this.state.chart.students.data} />
					</motion.div>
				</div>
				<div className="flex flex-row gap-4">
					<div className="mt-4 w-1/2 ">
					{
						(this.state.loading.teachers) ?
							<Loading status={this.state.loading.teachers} size="large" />
						:
							<React.Fragment>
								<motion.h4 className="text-center uppercase font-bold text-lg py-2 text-indigo-500 bg-white shadow-lg rounded"
									variants={Variants}
									initial="cardInit"
									animate="cardAnimate"
									transition={{...Variants.cardTransition , delay: .6}}
								>Daftar Guru</motion.h4>
								<motion.table className="bg-white w-full shadow-lg rounded overflow-hidden my-4"
									variants={Variants}
									initial="cardInit"
									animate="cardAnimate"
									transition={{...Variants.cardTransition , delay: .8}}
								>
									<thead className="bg-indigo-500 text-white">
										<tr>
											<th className="p-2">#</th>
											<th>Guru</th>
											<th>Aksi</th>
										</tr>
									</thead>
									<tbody>
									{
										this.state.teachers.map((teacher , key) => {
											return(
												<tr key={key} >
													<td className="p-2 text-center text-indigo-600 font-bold">{key + 1}</td>
													<td>{teacher.name}</td>
													<td className="col-badge" >
														<Tippy content="detail" delay={300}>
															<Link to="/school/teacher/list" className="badge-icon bg-indigo">
																<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
																  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
																</svg>
															</Link>
														</Tippy>
													</td>
												</tr>
											)
										})
									}
									</tbody>
								</motion.table>
							</React.Fragment>
					}
					</div>
					<div className="mt-4 w-1/2 ">
					{
						(this.state.loading.students) ?
							<Loading status={this.state.loading.students} size="large" />
						:
							<React.Fragment>
								<motion.h4 className="text-center uppercase font-bold text-lg py-2 text-blue-500 bg-white shadow-lg rounded"
									variants={Variants}
									initial="cardInit"
									animate="cardAnimate"
									transition={{...Variants.cardTransition , delay: .7}}
								>Daftar Siswa</motion.h4>
								<motion.table className="bg-white w-full shadow-lg rounded overflow-hidden my-4"
									variants={Variants}
									initial="cardInit"
									animate="cardAnimate"
									transition={{...Variants.cardTransition , delay: .9}}
								>
									<thead className="bg-blue-500 text-white">
										<tr>
											<th className="p-2">#</th>
											<th>Siswa</th>
											<th>Aksi</th>
										</tr>
									</thead>
									<tbody>
									{
										this.state.students.map((student , key) => {
											return(
												<tr key={key} >
													<td className="p-2 text-center text-blue-600 font-bold">{key + 1}</td>
													<td>{student.name}</td>
													<td className="col-badge" >
														<Tippy content="detail" delay={300}>
															<Link to="/school/student/list" className="badge-icon bg-blue">
																<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
																  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
																</svg>
															</Link>
														</Tippy>
													</td>
												</tr>
											)
										})
									}
									</tbody>
								</motion.table>
							</React.Fragment>
					}
					</div>
				</div>
			</React.Fragment>
		);
	}
}


Dashboard.contextType = AuthContext;
export default Dashboard;
	