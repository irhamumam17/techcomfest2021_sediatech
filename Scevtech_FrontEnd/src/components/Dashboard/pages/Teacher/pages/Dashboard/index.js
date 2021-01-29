import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../../../../axios.js';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { motion } from 'framer-motion';
import Variants from '../../../../components/Variants/';
import { AuthContext } from '../../../../contexts/AuthContext.js';
import Loading from '../../../../components/Loading/';
import CardDashboard from '../../../../components/CardDashboard/';
import DonutsChart from '../../../../components/DonutsChart/';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state  = {
			chart: {
				id: 'chartActive',
				title: 'Keaktifan',
				labels: ['Absen' , 'Tidak Absen'],
				data: [0 , 0],
			},
			loading: {
				counts: true,
				theory: true,
				duty: true,
				absent: true,
			},
			counts: [],
			theories: [],
			duties: [],
		}
	}

	componentDidMount() {
		// get data counts
		axios.get(`teacher/${this.context.id}/dashboard/count` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({
					counts: res.data,
					loading: {...this.state.loading , counts: false},
				})
			}).catch(err => console.error(err));


		// get theories
		axios.get(`teacher/${this.context.id}/dashboard/theory` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({
					theories: res.data,
					loading: {...this.state.loading , theory: false},
				})
			}).catch(err => console.error(err));

		// get duties
		axios.get(`teacher/${this.context.id}/dashboard/duty` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({
					duties: res.data,
					loading: {...this.state.loading , duty: false},
				})
			}).catch(err => console.error(err));


		// get status absent
		axios.get(`teacher/${this.context.id}/dashboard/absent` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({
					loading: {...this.state.loading , absent: false},
					chart: {...this.state.chart , data: res.data},
				});
			}).catch(err => console.error(err));
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
						<h2 className="text-xl font-bold">Dashbord Guru</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">dashboard </Link> 
						</h4>
					</div>
				</motion.div>
				<div className="flex flex-row gap-4">
				{
					(this.state.loading.counts) ?
						<Loading status={this.state.loading.counts} size="large" />
					:
						<React.Fragment>
							<CardDashboard bg="bg-blue-400" icon="theory" delay="0" value={this.state.counts.theory} name="Materi" />
							<CardDashboard bg="bg-teal-400" icon="duty" delay=".2" value={this.state.counts.duty} name="Tugas" />
							<CardDashboard bg="bg-indigo-400" icon="exam" delay=".4" value={this.state.counts.tryout} name="Latihan" />
							<CardDashboard bg="bg-purple-400" icon="exaam" delay=".6" value={this.state.counts.exam} name="Ujian" />
						</React.Fragment>
				}
				</div>
				<div className="flex flex-row gap-4 mt-4">
					<div className="w-1/3">
						{
							(this.state.loading.theory) ?
								<Loading status={this.state.loading.theory} size="large" />
							:
								<React.Fragment>
									<motion.h4 className="text-center uppercase font-bold text-lg py-2 text-indigo-500 bg-white shadow-lg rounded"
											variants={Variants}
											initial="cardInit"
											animate="cardAnimate"
											transition={{...Variants.cardTransition , delay: .2}}
										>Daftar Materi</motion.h4>
									<motion.table className="bg-white w-full shadow-lg rounded overflow-hidden my-4"
											variants={Variants}
											initial="cardInit"
											animate="cardAnimate"
											transition={{...Variants.cardTransition , delay: .5}}
										>
										<thead className="bg-indigo-500 text-white">
											<tr>
												<th className="p-2">#</th>
												<th>Materi</th>
												<th>Aksi</th>
											</tr>
										</thead>
										<tbody>
										{
											this.state.theories.map((theory , key) => {
												return(
													<tr key={key} >
														<td className="p-2 text-center text-indigo-600 font-bold">{key + 1}</td>
														<td>{theory.title}</td>
														<td className="col-badge" >
															<Tippy content="detail" delay={300}>
																<Link to={`/teacher/theory/detail/${theory.id}`} className="badge-icon bg-indigo">
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
					<div className="w-1/3">
						{
							(this.state.loading.duty) ?
								<Loading status={this.state.loading.duty} size="large" />
							:
								<React.Fragment>
									<motion.h4 className="text-center uppercase font-bold text-lg py-2 text-blue-500 bg-white shadow-lg rounded"
											variants={Variants}
											initial="cardInit"
											animate="cardAnimate"
											transition={{...Variants.cardTransition , delay: .4}}
									>Daftar Tugas</motion.h4>
									<motion.table className="bg-white w-full shadow-lg rounded overflow-hidden my-4"
											variants={Variants}
											initial="cardInit"
											animate="cardAnimate"
											transition={{...Variants.cardTransition , delay: .7}}
									>
										<thead className="bg-blue-500 text-white">
											<tr>
												<th className="p-2">#</th>
												<th>Tugas</th>
												<th>Aksi</th>
											</tr>
										</thead>
										<tbody>
										{
											this.state.duties.map((duty , key) => {
												return(
													<tr key={key} >
														<td className="p-2 text-center text-blue-600 font-bold">{key + 1}</td>
														<td>{duty.title}</td>
														<td className="col-badge" >
															<Tippy content="detail" delay={300}>
																<Link to={`/teacher/duty/detail/${duty.id}`} className="badge-icon bg-blue">
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
					<div className="w-1/3">
					{
						(this.state.loading.absent) ?
							<Loading status={this.state.loading.absent} size="large" />
						: 
							<motion.div className="card-custom"
								variants={Variants}
								initial="cardInit"
								animate="cardAnimate"
								transition={{...Variants.cardTransition , delay: .9}}
							>
								<DonutsChart id={this.state.chart.id}
											 title={this.state.chart.title}
											 labels={this.state.chart.labels}
											 data={this.state.chart.data}
								/>
								<h1 className="font-bold text-5xl text-center text-purple-500" >{this.state.chart.data[0]}%</h1>
								<h2 className="font-semibold text-xl text-center text-gray-600">Keaktifan Absen</h2>
							</motion.div>
					}
					</div>
				</div>
			</React.Fragment>
		);
	}
}


Dashboard.contextType = AuthContext;
export default Dashboard;
	