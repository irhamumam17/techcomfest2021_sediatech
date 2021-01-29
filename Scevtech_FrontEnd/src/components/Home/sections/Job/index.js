import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import { LandingContext } from '../../context/LandingContext.jsx';
import company3 from '../../assets/company/company-3.svg';

class Job extends Component {
	render() {
		return(
			<section id="job" className="p-8 md:p-16">
				<h2 className="text-2xl text-center uppercase md:capitalize md:text-5xl mb-2">Lowongan Pekerjaan</h2>
				<div className="flex flex-col flex-grow md:flex-row gap-4">
					{
						this.context.jobs.map((job , key) => {
							return(
								<div className="w-full md:w-1/4" key={key}>
									<div className="hover:shadow-lg hover:-translate-y-2 card duration-300 ease">
										<img src={company3} alt="company 1" className="w-2/3 h-48 m-auto text-center" />
										<div className="card-body">
											<h2>{job.position}</h2>
											<h3>oleh: {job.company}</h3>
											<div className="mt-2">
												<span className="text-sm font-bold border-2 border-gray-400 text-gray-400 inline-block py-1 px-2 rounded mr-2" >{job.target}</span>
												<span className="text-sm font-bold border-2 border-gray-300 text-gray-400 inline-block py-1 px-2 rounded mr-2" >{job.type_time}</span>
											</div>
											<div className="card-footer mt-6">
												<a href="/job/detail" className="text-xs text-blue-400 w-1/2 pb-2 hover:text-blue-500">Lihat Detail</a>
												<span className="text-xs w-1/2 text-right text-red-400">{job.deadline}</span>
											</div>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
				<div className="text-center">
					<Link to="/course" className="inline-block bg-gray-200 text-gray-600 mt-12 py-2 px-6 rounded-full font-bold shadow-0 transition duration-200 transform hover:shadow-md hover:-translate-y-1 hover:bg-indigo-200 hover:text-indigo-600" >Lihat Lebih Banyak</Link>
				</div>
			</section>
		);
	}
}


Job.contextType = LandingContext;
export default Job;
	