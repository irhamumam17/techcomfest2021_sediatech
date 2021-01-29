import React , {Component} from 'react';
import image from '../../assets/images/feature.png';

class Feature extends Component {
	render() {
		return(
			<div id="feature" className="p-8 md:p-16 bg-white">
				<h2 className="text-2xl text-center uppercase md:capitalize md:text-5xl mb-2">Fitur ScevTech</h2>
				<div className="w-full md:w-4/5 mx-auto">
					<div className="flex flex-col md:flex-row">
						<div className="w-full md:w-1/2 flex flex-row mb-4">
							<img src={image} alt="our feature" className="w-12 h-12 mr-4" />
							<p>Memantau Perkembangan siswa dalam memahami materi.</p>
						</div>
						<div className="w-full md:w-1/2 flex flex-row mb-4">
							<img src={image} alt="our feature" className="w-12 h-12 mr-4" />
							<p>Sekolah dapat mengelola data kelas dan jurusaan agar menjadi fleksibel.</p>
						</div>
					</div>
					<div className="flex flex-col md:flex-row">
						<div className="w-full md:w-1/2 flex flex-row mb-4">
							<img src={image} alt="our feature" className="w-12 h-12 mr-4" />
							<p>Memantau Keaktifan guru dalam mengisi KBM (Kegiatan Belajar Mengajar)</p>
						</div>
						<div className="w-full md:w-1/2 flex flex-row mb-4">
							<img src={image} alt="our feature" className="w-12 h-12 mr-4" />
							<p>Pengelolaan data guru dan siswa sehingga lebih fleksibel.</p>
						</div>
					</div>
					<div className="flex flex-col md:flex-row">
						<div className="w-full md:w-1/2 flex flex-row mb-4">
							<img src={image} alt="our feature" className="w-12 h-12 mr-4" />
							<p>Membuat ujian online sebagai tolak ukur siswa dalam memahami pelajaran.</p>
						</div>
						<div className="w-full md:w-1/2 flex flex-row mb-4">
							<img src={image} alt="our feature" className="w-12 h-12 mr-4" />
							<p>Membuat latihan soal sebagai bahan belajar siswa.</p>
						</div>
					</div>
					<div className="flex flex-col md:flex-row">
						<div className="w-full md:w-1/2 flex flex-row mb-4">
							<img src={image} alt="our feature" className="w-12 h-12 mr-4" />
							<p>Membuat jadwal pelajaran berdasarkan guru dan kelas yang diajar.</p>
						</div>
						<div className="w-full md:w-1/2 flex flex-row mb-4">
							<img src={image} alt="our feature" className="w-12 h-12 mr-4" />
							<p>Memantau perkembangan nilai siswa.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Feature;
	