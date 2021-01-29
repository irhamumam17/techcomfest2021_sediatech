import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { DutyContext } from '../../context.js';
import thumbnail from '../../../../../../assets/theory.jpg';

class Missed extends Component {
	render() {
		return(
			<React.Fragment>
				<div className="bg-white block w-1/3 py-2 px-6 rounded uppercase shadow-md text-pink-400 border-l-4 border-pink-400">
					<h2 className="text-xl font-bold">Tugas Terlewat</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">siswa</Link> 
						<span className="mx-1">/</span>
						<Link to="/student/duty/all" className="hover:underline hover:text-blue-400">tugas </Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/duty/expire" className="hover:underline hover:text-blue-400">terlewat </Link> 
					</h4>
				</div>
				<Link to="/student/duty/all" className="button-header transition duration-200 hover:bg-pink-600" >Semua Tugas</Link>
				<div className="my-4 flex flex-row gap-4">
					{
						this.context.getDuty(false).map((duty , key) => {
							return (
								<div className="w-1/3" key={key}>
									<div className="bg-white rounded shadow-md overflow-hidden">
										<img src={thumbnail} alt="duty thumbnail" className="w-full h-56  object-cover mb-3" />
										<div className="px-4 pb-4">
											<h2 className="font-semibold text-blue-500 text-2xl">{duty.title}</h2>
											<h3 className="lowercase mb-2 -mt-1 text-purple-400">{duty.subject}</h3>
											<p className="text-sm text-gray-600">{duty.description}</p>
											<div className="flex flex-row justify-between items-center mt-2 pt-2 border-t-2 border-gray-200">
												<a href="/teacher/duty/detail" className="text-white py-1 px-4 bg-blue-400 rounded inline-block mt-2 uppercase font-semibold texts-sm transition duration-200 hover:bg-blue-500">Detail</a>
												<p className="text-sm text-gray-500">{duty.created_at}</p>
											</div>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
			</React.Fragment>
		);
	}
}

Missed.contextType = DutyContext;
export default Missed;
	