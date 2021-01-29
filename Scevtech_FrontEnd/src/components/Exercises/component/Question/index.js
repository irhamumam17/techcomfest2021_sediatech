import React , { useEffect }  from 'react';
import Loading from '../../../Dashboard/components/Loading/';

function Question({question , append , totalQuestion , navigation , results}) {
	let status = (question) ? true : false;

	useEffect(() => {
		let input = document.querySelectorAll('input[type="radio"]');
		let answer = undefined;
		results.forEach(data => {
			if(data.question === question.id) {
				answer = data.answer;
			}
		})
		input.forEach(e => {
			e.checked = (parseInt(e.value) === answer) ? true : false;
		});
	} , [question]);

	if(status) {
		return(
			<div className="flex">
				<div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center font-semibold text-xl text-white mt-6 mr-4">
					<span className="-ml-1">{question.number}</span>
				</div>
				<div className="w-full">
					<p className="w-full card h-32" >{question.question}</p>
					<div className="question">
						{
							question.answers.map((answer , key) => {
								return(
									<div key={key} className="card flex flex-row items-center">
										<input onClick={(event) => {
											let question = parseInt(event.target.name);
											let answer = parseInt(event.target.value);
											append(question , answer);
										}} name={question.id} value={answer.id} question={question.id} defaultChecked={'checked'} type="radio" />
										<p className="ml-2">{answer.answer}</p>
									</div>
								)
							})
						}
					</div>
					<div className={`navigationQuestion flex flex-row ${(question.number === 1) ? 'justify-end' : 'justify-between'}`}>
						{
							(question.number !== 1) ?
								<button onClick={() => navigation('previous')} className="button bg-gray">Sebelumnya</button>
							: ''
						}
						{
							(question.number !== totalQuestion) ?
								<button onClick={() => navigation('next')} className="button ml-2 bg-gray">Selanjutnya</button>
							:''
						}
					</div>
				</div>
			</div>
		)
	} else {
		return(
				<Loading status={status} size="large" />
			)
	}
}

export default Question;