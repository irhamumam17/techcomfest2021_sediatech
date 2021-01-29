import React , {Component} from 'react';
import {Link} from 'react-router-dom';

import schoolLogo from '../../../../../../assets/school.png';

import { SchoolContext } from '../../context.js';

class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = this.props.location.state;

		this.deleteSchool  = this.deleteSchool.bind(this);
	}

	deleteSchool() {
		this.context.removeSchool(this.state.id)
		this.props.history.push('/admin/school/list');
	}

	render() {
		return(
			<React.Fragment>
				<div className="bg-white block w-1/3 py-2 px-6 rounded uppercase shadow-md text-pink-400 border-l-4 border-pink-400">
					<h2 className="text-xl font-bold">Detail Sekolah</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/admin/school" className="hover:underline hover:text-blue-400">admin</Link> 
						<span className="mx-1">/</span>
						<Link to="/admin/school/list" className="hover:underline hover:text-blue-400">sekolah </Link> 
						<span className="mx-1">/</span>
						<Link to="/admin/school/list" className="hover:underline hover:text-blue-400">daftar </Link>
						<span className="mx-1">/</span>
						<Link to="/admin/school/detail" className="hover:underline hover:text-blue-400">detail </Link> 
					</h4>
				</div>
				<div className="flex flex-row gap-4 my-6">
					<div className="w-1/3">
						<div className="bg-white shadow-md p-6 text-center">
							<img src={schoolLogo} alt="smk n 1 kawunganten" className="w-3/5 block m-auto my-4" />
							<h1 className="font-bold text-2xl text-indigo-500">{this.state.name}</h1>
							<h2 className="capitalize font-light text-sm text-gray-500">Sekolah Menengah Kejuruan</h2>
							<span className="text-teal-400 uppercase text-sm py-1 my-2 m-auto text-white block w-1/3 rounded border-2 border-teal-300">aktif</span>
						</div>
					</div>
					<div className="w-2/3">
						<div className="card flex flex-row divide-x-4 divide-gray-300">
							<div className="w-1/2 text-center">
								<h2 className="text-5xl text-orange-500">{this.state.student}</h2>
								<p className="text-sm text-gray-500">Siswa</p>
							</div>
							<div className="w-1/2 text-center">
								<h2 className="text-5xl text-orange-500">{this.state.teacher}</h2>
								<p className="text-sm text-gray-500">Guru</p>
							</div>
						</div>
						<div className="card">
							<div className="flex flex-row py-2">
								<span className="w-2/5 text-gray-700">Nama</span>
								<span className="w-3/5 text-gray-500">{this.state.name}</span>
							</div>
							<div className="flex flex-row py-2">
								<span className="w-2/5 text-gray-700">Jenjang</span>
								<span className="w-3/5 text-gray-500">Sekolah Mengengah Kejuruan</span>
							</div>
							<div className="flex flex-row py-2">
								<span className="w-2/5 text-gray-700">Alamant</span>
								<span className="w-3/5 text-gray-500">Gunung Jaya , Kawunganten , Cilacap , Jawa Tengah.</span>
							</div>
							<div className="flex flex-row py-2">
								<span className="w-2/5 text-gray-700">Email</span>
								<span className="w-3/5 text-gray-500">smkn1kawunganten@gmail.com</span>
							</div>
							<div className="flex flex-row py-2">
								<span className="w-2/5 text-gray-700">No.HP</span>
								<span className="w-3/5 text-gray-500">+6282199205423</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-row">
					<div className="w-1/2">
						<Link to="/admin/school/list" className="button bg-gray-500" >Kembali</Link>
					</div>
					<div className="w-2/3 text-right">
						<button className="button bg-teal-400 mx-2">Edit</button>
						<button onClick={this.deleteSchool} className="button bg-red-400 mx-2 focus:outline-none">Hapus</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

Detail.contextType = SchoolContext;
export default Detail;
	