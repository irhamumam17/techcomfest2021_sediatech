import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../../components/Loading/';
import { AnnouncementContext } from '../../context.js';

class List extends Component {
	render() {
		return(
			<React.Fragment>
				<div className="bg-white block w-1/3 py-2 px-6 rounded uppercase shadow-md text-pink-400 border-l-4 border-pink-400">
					<h2 className="text-xl font-bold">Daftar Pengumuman</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/announcement" className="hover:underline hover:text-blue-400">pengumuman </Link> 
					</h4>
				</div>
				<Link to="/teacher/announcement/add" className="button-header">Buat Pengumuman</Link>
				<Loading status={this.context.loading.remove} size="small" />
				<Loading status={this.context.loading.announcements} size="large" />
				{
					this.context.announcements.map((announce , key) => {
						return(
							<div className="card" key={key} >
								<div className="flex flex-row justify-between">
									<div>
										<h2 className="font-semibold">{announce.title}</h2>
										<h4 className="text-sm text-gray-400 mb-2">{announce.author}</h4>
									</div>
									<div>
										<button onClick={() => this.context.removeData(announce.id)} className="bg-red text-white">
											<svg className="w-8 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
										</button>
									</div>
								</div>
								<p>{announce.description}</p>
							</div>
						)
					})
				}
			</React.Fragment>
		);
	}
}


List.contextType = AnnouncementContext;
export default List;
	