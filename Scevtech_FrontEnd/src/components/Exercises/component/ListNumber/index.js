import React , {useEffect , useState} from 'react';

function ListNumber({numbers , change , submit , on_submit , active , results}) {
	let [numberActive , setActive] = useState(0);
	let [numberAnswered] = useState([]);
	let [bgBtn , setBtn] = useState('bg-teal');

	let dataNumbers = [];
	for (var i = 0; i < numbers.length; i++) {
		dataNumbers.push({number: i+1 , id: numbers[i].id});
	}

	useEffect(() => {
		setActive(active);
	},[active])

	useEffect(() => {
		results.forEach(data => {
			let status = numberAnswered.includes(data.question);
			if(!status) { numberAnswered.push(data.question) } 
		});
	} , [results]);

	useEffect(() => {
		(submit) ? setBtn('bg-teal') : setBtn('bg-teal-400');
	}, [on_submit])

	let getBg = (number , id) => {
		if(number === numberActive + 1) {
			return 'bg-purple';
		} else if(numberAnswered.includes(id)) {
			return 'bg-blue';
		} else {
			return 'bg-gray';
		}
	}

	return(
		<div className="card">
			<h2 className="text-center uppercase font-semibold text-lg">Nomor</h2>
			<div className="my-3 flex flex-wrap flex-row">
				{
					dataNumbers.map((number , key) => {
						return(
							<button onClick={() => change(number.number)} className={`inline-block rounded m-1 w-12 h-12 font-semibold  text-white ${
									getBg(number.number , number.id)
								}`} key={key} data-id={number.id} >{number.number}</button>
						)
					})
				}
			</div>
			<button onClick={submit} className={`${bgBtn} block w-full py-2 rounded uppercase text-white font-semibold`}>Kirim</button>
		</div>
	)
}

export default ListNumber;