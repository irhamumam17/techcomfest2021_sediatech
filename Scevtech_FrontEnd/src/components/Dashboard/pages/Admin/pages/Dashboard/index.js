import React , {Component} from 'react';
import axios from '../../../../../../axios.js';
import { Link } from 'react-router-dom';
import Loading from '../../../../components/Loading/';
import { motion } from 'framer-motion';
import Variants from '../../../../components/Variants/';
import CardDashboard from '../../../../components/CardDashboard/';
import UIChart from '../../../../components/UIChart/';
import { AuthContext } from '../../../../contexts/AuthContext.js';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chart: {
				schools: {
					id: 'chart',
					title: 'Grafik Sekolah',
					labels: ['Jan' , 'Feb' , 'March' , 'April' , 'Mei' , 'Juni'],
					data: [86,67,91 , 85,74,65],
				},
				earnings: {
					id: 'chart2',
					title: 'Grafik Pendapatan',
					labels: ['Jan' , 'Feb' , 'March' , 'April' , 'Mei' , 'Juni'],
					data: [86,67,91 , 85,74,65],
				},
			},
			loading: {
				counts: true,
				schools: true,
			},
			counts: [],
			schools: [],
		}
	}

	componentDidMount() {
		// get data counts
		axios.get(`admin/${this.context.id}/dashboard/count` , { headers: {
			Authorization: `Bearer ${this.context.token}`
		}})
			.then(res => {
				this.setState({
					counts: res.data,
					loading: {...this.state.loading , counts: false},
				})
			});

		// get schools
		axios.get(`admin/${this.context.id}/dashboard/school` , { headers: {
			Authorization: `Bearer ${this.context.token}`
		}})
			.then(res => {
				this.setState({
					schools: res.data,
					loading: {...this.state.loading , schools: false},
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
						<h2 className="text-xl font-bold">Dashbord Admin</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Dashboard </Link> 
						</h4>
					</div>
				</motion.div>
				<div className="flex flex-row gap-4">
				{
					(this.state.loading.counts) ?
						<Loading status={this.state.loading.counts} size="large" />
					:
						<React.Fragment>
							<CardDashboard bg="bg-blue-400" icon='admin' delay="0" value={this.state.counts.admin} name="Admin" />
							<CardDashboard bg="bg-teal-400" icon='school' delay=".2" value={this.state.counts.school} name="Sekolah" />
							<CardDashboard bg="bg-indigo-400" icon='teacher' delay=".4" value={this.state.counts.teacher} name="Guru" />
							<CardDashboard bg="bg-purple-400" icon='student' delay=".6" value={this.state.counts.student} name="Siswa" />
						</React.Fragment>
				}
				</div>
				<div className="flex flex-row gap-4">
					<motion.div className="w-1/2 p-4 bg-white shadow-lg rounded"
						variants={Variants}
						initial="cardInit"
						animate="cardAnimate"
						transition={{...Variants.cardTransition , delay: .2}}	
					>
						<UIChart id={this.state.chart.schools.id} 
								 title={this.state.chart.schools.title} 
								 labels={this.state.chart.schools.labels} 
								 data={this.state.chart.schools.data} />
					</motion.div>
					<motion.div className="w-1/2 p-4 bg-white shadow-lg rounded"
						variants={Variants}
						initial="cardInit"
						animate="cardAnimate"
						transition={{...Variants.cardTransition , delay: .4}}	
					>
						<UIChart id={this.state.chart.earnings.id} 
								 title={this.state.chart.earnings.title} 
								 labels={this.state.chart.earnings.labels} 
								 data={this.state.chart.earnings.data} />
					</motion.div>
				</div>
				<div className="flex flex-row gap-4">
					<div className="mt-4 w-1/2 ">
						{
							(this.state.loading.schools) ?
								<Loading status={this.state.loading.schools} size="large" />
							:
								<React.Fragment>
									<motion.h4 className="text-center uppercase font-bold text-lg py-2 text-indigo-500 bg-white shadow-lg rounded"
										variants={Variants}
										initial="cardInit"
										animate="cardAnimate"
										transition={{...Variants.cardTransition , delay: .7}}
										>Daftar Sekolah</motion.h4>
									<motion.table className="bg-white w-full shadow-lg rounded overflow-hidden my-4"
										variants={Variants}
										initial="cardInit"
										animate="cardAnimate"
										transition={{...Variants.cardTransition , delay: .9}}
									>
										<thead className="bg-indigo-500 text-white">
											<tr>
												<th className="p-2">#</th>
												<th>Sekolah</th>
												<th>Tgl.Gabung</th>
											</tr>
										</thead>
										<tbody>
											{
												this.state.schools.map((school , key) => {
													return(
														<tr key={key} >
															<td className="p-2 text-center text-indigo-600 font-bold">{key + 1}</td>
															<td>{school.name}</td>
															<td>{school.join_at}</td>
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
						<motion.h4 className="text-center uppercase font-bold text-lg py-2 text-indigo-500 bg-white shadow-lg rounded"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .8}}
						>Pembayaran Terbaru</motion.h4>
						<motion.table className="w-full bg-white shadow-lg rounded overflow-hidden my-4"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: 1}}
						>
							<thead className="bg-blue-500 text-white">
								<tr>
									<th className="p-2">#</th>
									<th>Invoice</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="p-2 text-center text-blue-600 font-bold">1</td>
									<td><a href="/" className="hover:text-blue-400">#INV20192</a></td>
									<td>Rp200.000,00</td>
								</tr>
								<tr>
									<td className="p-2 text-center text-blue-600 font-bold">2</td>
									<td><a href="/" className="hover:text-blue-400">#INV20212</a></td>
									<td>Rp1.000.000,00</td>
								</tr>
								<tr>
									<td className="p-2 text-center text-blue-600 font-bold">3</td>
									<td><a href="/" className="hover:text-blue-400">#INV20192</a></td>
									<td>Rp1.500.000,00</td>
								</tr>
								<tr>
									<td className="p-2 text-center text-blue-600 font-bold">4</td>
									<td><a href="/" className="hover:text-blue-400">#INV29482</a></td>
									<td>Rp2.400.000,00</td>
								</tr>
								<tr>
									<td className="p-2 text-center text-blue-600 font-bold">5</td>
									<td><a href="/" className="hover:text-blue-400">#INV59393</a></td>
									<td>Rp700.000,00</td>
								</tr>
							</tbody>
						</motion.table>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

Dashboard.contextType = AuthContext;
export default Dashboard;
	