import React , {Component} from 'react';
import bg1 from '../../assets/images/courses-1.jpg';
import bg2 from '../../assets/images/courses-2.jpg';
import bg3 from '../../assets/images/courses-3.jpg';
import bg4 from '../../assets/images/courses-4.jpg';

import user1 from '../../assets/profiles/user (1).jpg';
import user2 from '../../assets/profiles/user (2).jpg';
import user3 from '../../assets/profiles/user (3).jpg';
import user4 from '../../assets/profiles/user (4).jpg';

class Testimoni extends Component {
	render() {
		return(
			<section id="testimoni" className="p-8 md:p-16 bg-gray-200">
				<h2 className="text-2xl text-center uppercase md:capitalize md:text-5xl mb-2">Testimoni Pengguna</h2>
				<div className="flex flex-col md:flex-row gap-6">
					<div className="hover:shadow-lg hover:-translate-y-2 card duration-300 ease">
						<img src={bg1} alt="bg1" className="card-img h-40" />
						<div className="card-body">
							<img src={user1} alt="user 1" className="relative w-32 h-32 transform scale-125 -translate-y-20 p-1 object-cover bg-white rounded-full m-auto shadow-md transition ease-in-out duration-300 hover:scale-150" />
							<div className="transform -translate-y-12 text-center">
								<h2 className="text-2xl text-indigo-400">Abdul Latif Mubasir</h2>
								<h3 className="text-sm text-gray-500 mb-4">Front End Developer at Shopee</h3>
								<p className="text-md leading-6 text-gray-600 border-b pb-4">Aplikasi ini sangat membantu dalam menyelenggarakan kegiatan pembelajaran. Fitur-fitur yang tersedia sangat bermanfaat dalam mendukung proses belajar mengajar.</p>
							</div>
								<span className="text-xs text-center text-gray-400 block -mt-6">2 November 2020</span>
						</div>
					</div>
					<div className="hover:shadow-lg hover:-translate-y-2 card duration-300 ease">
						<img src={bg2} alt="bg1" className="card-img h-40" />
						<div className="card-body">
							<img src={user2} alt="user 1" className="relative w-32 h-32 transform scale-125 -translate-y-20 p-1 object-cover bg-white rounded-full m-auto shadow-md transition ease-in-out duration-300 hover:scale-150" />
							<div className="transform -translate-y-12 text-center">
								<h2 className="text-2xl text-indigo-400">Abdul Latif Mubasir</h2>
								<h3 className="text-sm text-gray-500 mb-4">Front End Developer at Shopee</h3>
								<p className="text-md leading-6 text-gray-600 border-b pb-4">Aplikasi ini sangat menarik , apalagi ada fitur-fitur yang cukup unik dan tidak tersedia diaplikasi lain sehingga aplikasi SediaTek sangat berguna.</p>
							</div>
								<span className="text-xs text-center text-gray-400 block -mt-6">2 November 2020</span>
						</div>
					</div>
					<div className="hover:shadow-lg hover:-translate-y-2 card duration-300 ease">
						<img src={bg3} alt="bg1" className="card-img h-40" />
						<div className="card-body">
							<img src={user3} alt="user 1" className="relative w-32 h-32 transform scale-125 -translate-y-20 p-1 object-cover bg-white rounded-full m-auto shadow-md transition ease-in-out duration-300 hover:scale-150" />
							<div className="transform -translate-y-12 text-center">
								<h2 className="text-2xl text-indigo-400">Abdul Latif Mubasir</h2>
								<h3 className="text-sm text-gray-500 mb-4">Front End Developer at Shopee</h3>
								<p className="text-md leading-6 text-gray-600 border-b pb-4">Aplikasi SediaTek memiliki desain yang menarik sehingga dapat membantu memahammi materi yang diberikan guru karena tidak cepat jenuh dan bosan.!</p>
							</div>
								<span className="text-xs text-center text-gray-400 block -mt-6">2 November 2020</span>
						</div>
					</div>
					<div className="hover:shadow-lg hover:-translate-y-2 card duration-300 ease">
						<img src={bg4} alt="bg1" className="card-img h-40" />
						<div className="card-body">
							<img src={user4} alt="user 1" className="relative w-32 h-32 transform scale-125 -translate-y-20 p-1 object-cover bg-white rounded-full m-auto shadow-md transition ease-in-out duration-300 hover:scale-150" />
							<div className="transform -translate-y-12 text-center">
								<h2 className="text-2xl text-indigo-400">Abdul Latif Mubasir</h2>
								<h3 className="text-sm text-gray-500 mb-4">Front End Developer at Shopee</h3>
								<p className="text-md leading-6 text-gray-600 border-b pb-4">Aplikasi yang sangat bermanfaat. Ada fitur untuk memantau tugas yang sudah dikerjakan dan yang belum sehingga mudah mencarinya meskipun tugasnya banyak.</p>
							</div>
								<span className="text-xs text-center text-gray-400 block -mt-6">2 November 2020</span>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Testimoni;
	