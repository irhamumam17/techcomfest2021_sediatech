import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import image1 from '../../assets/images/courses-1.jpg';
import image2 from '../../assets/images/courses-2.jpg';
import image3 from '../../assets/images/courses-3.jpg';
import image4 from '../../assets/images/courses-4.jpg';

class Courses extends Component {
	render() {
		return(
			<section id="course" className="p-8 md:p-16">
				<h2 className="text-2xl text-center uppercase md:capitalize md:text-5xl mb-2">Kursus Online</h2>
				<div className="flex flex-col md:flex-row gap-4">
					<div className="hover:shadow-lg hover:-translate-y-2 card duration-300 ease">
						<img src={image1} alt="course" className="card-img duration-200 transform hover:scale-105 " />
						<div className="card-body">
							<h2 className="text-2xl mb-1">Kursus 1</h2>
							<p>Lorem ipsum, dolor sit amet consectetur adipisicing, elit. Commodi, id.</p>
							<div className="card-footer">
								<a href="/course/detail" className="text-xs text-blue-400 w-1/2">Lihat Detail</a>
								<span className="text-xs w-1/2 text-right text-teal-400">200 siswa</span>
							</div>
						</div>
					</div>
					<div className="hover:shadow-lg hover:-translate-y-2 card duration-300 ease">
						<img src={image2} alt="course" className="card-img duration-200 transform hover:scale-105 " />
						<div className="card-body">
							<h2 className="text-2xl mb-1">Kursus 2</h2>
							<p>Lorem ipsum, dolor sit amet consectetur adipisicing, elit. Commodi, id.</p>
							<div className="card-footer">
								<a href="/course/detail" className="text-xs text-blue-400 w-1/2">Lihat Detail</a>
								<span className="text-xs w-1/2 text-right text-teal-400">200 siswa</span>
							</div>
						</div>
					</div>
					<div className="hover:shadow-lg hover:-translate-y-2 card duration-300 ease">
						<img src={image3} alt="course" className="card-img duration-200 transform hover:scale-105 " />
						<div className="card-body">
							<h2 className="text-2xl mb-1">Kursus 3</h2>
							<p>Lorem ipsum, dolor sit amet consectetur adipisicing, elit. Commodi, id.</p>
							<div className="card-footer">
								<a href="/course/detail" className="text-xs text-blue-400 w-1/2">Lihat Detail</a>
								<span className="text-xs w-1/2 text-right text-teal-400">200 siswa</span>
							</div>
						</div>
					</div>
					<div className="hover:shadow-lg hover:-translate-y-2 card duration-300 ease">
						<img src={image4} alt="course" className="card-img duration-200 transform hover:scale-105 " />
						<div className="card-body">
							<h2 className="text-2xl mb-1">Kursus 4</h2>
							<p>Lorem ipsum, dolor sit amet consectetur adipisicing, elit. Commodi, id.</p>
							<div className="card-footer">
								<a href="/course/detail" className="text-xs text-blue-400 w-1/2">Lihat Detail</a>
								<span className="text-xs w-1/2 text-right text-teal-400">200 siswa</span>
							</div>
						</div>
					</div>
				</div>
				<div className="text-center">
					<Link to="/course" className="inline-block bg-gray-200 text-gray-600 mt-12 py-2 px-6 rounded-full font-bold shadow-0 transition duration-200 transform hover:shadow-md hover:-translate-y-1 hover:bg-indigo-200 hover:text-indigo-600" >Lihat Lebih Banyak</Link>
				</div>
			</section>
		);
	}
}

export default Courses;
	