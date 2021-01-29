<?php 
namespace App\Queries;

use App\Http\Resources\Exercises\TryoutResource;
use App\Models\Tryout;
use App\Models\TryoutStudent;
use App\Models\TryoutSAnswer;
use App\Models\TryoutQuestion;
use App\Models\TryoutResult;
use App\Models\Teacher;
use App\Models\Subject;

class TryoutQuery
{
    public static function getSlim($teacherId)
    {
        $tryouts = Tryout::where('teacher_id' , $teacherId)->get();
        $response = TryoutResource::collection($tryouts);

        return $response;
    }

    public static function byStudent($studentId)
    {
    	$data = TryoutStudent::where('student_id' , $studentId)->get();
    	$tryouts = collect([]);
    	foreach ($data as $tryout) {
    		$tryouts->push($tryout->tryout);
    	}
    	$response = TryoutResource::collection($tryouts);
    	
    	return $response;
    }

    public static function do($id)
    {
        $tryout    = Tryout::find($id);
        $teacher = Teacher::find($tryout->teacher_id)->user->name;
        $subject = Subject::find($tryout->subject_id)->subject;
        $dataTryout    = $tryout->only(['id' , 'title' , 'deadline' , 'duration']);
        $dataTryout = collect($dataTryout);
        $dataTryout->put('teacher' , $teacher);
        $dataTryout->put('subject' , $subject); 


        // get questions and answers
        $questions = collect([]);
        foreach ($tryout->question as $question) {
            $data = collect([
                'id'       => $question->id,
                'number'   => $question->number,
                'question' => $question->question,
                'score'    => $question->score,
            ]);

            $answers = collect([]);
            foreach ($question->answer as $answer) {
                $answers->push([
                    'id'     => $answer->id,
                    'answer' => $answer->answer,
                ]);
            }

            $data->put('answers' , $answers);
            $questions->push($data);
        }

        $collections = collect([
            'tryout'      => $dataTryout,
            'questions' => $questions,
        ]);

        return $collections;
    }

    public static function getCorrect($questionId , $answerId)
    {
        $question = TryoutQuestion::find($questionId);
        $answer = $question->answer->where('id' , $answerId)->first()->correct;
        $correct= ($answer === 'true') ? 'true' : 'false';
        return $correct;
    }

    public static function storeAnswer($id , $results)    
    {
        $true = 0;
        $false = 0;
        foreach ($results as $result) {
            $correct = self::getCorrect($result['question'] , $result['answer']);
            TryoutSAnswer::create([
                'result_id'   => $id,
                'question_id' => $result['question'],
                'answer_id'   => $result['answer'],
                'correct'     => $correct,
            ]);
            ($correct === 'true') ? $true++ : $false++;
        }
        $score = $true / ($true + $false) * 100;
        TryoutResult::where('id' , $id)->update(['score' => $score]);
        return round($score,1);
    }
}
