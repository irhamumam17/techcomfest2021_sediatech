<?php 
namespace App\Queries;

use App\Http\Resources\Exercises\ExamResource;
use App\Models\Exam;
use App\Models\ExamStudent;
use App\Models\ExamSAnswer;
use App\Models\Teacher;
use App\Models\Subject;

class ExamQuery
{
    public static function getSlim($teacherId)
    {
        $exams = Exam::where('teacher_id' , $teacherId)->get();
        $response = ExamResource::collection($exams);

        return $response;
    }

    public static function byStudent($studentId)
    {
    	$data = ExamStudent::where('student_id' , $studentId)->get();
    	$exams = collect([]);
    	foreach ($data as $exam) {
    		$exams->push($exam->exam);
    	}
    	$response = ExamResource::collection($exams);

    	return $response;
    }

    public static function do($id)
    {
        $exam    = Exam::find($id);
        $teacher = Teacher::find($exam->teacher_id)->user->name;
        $subject = Subject::find($exam->subject_id)->subject;
        $dataExam    = $exam->only(['id' , 'title' , 'start_time' , 'finish_time']);
        $dataExam = collect($dataExam);
        $dataExam->put('teacher' , $teacher);
        $dataExam->put('subject' , $subject); 


        // get questions and answers
        $questions = collect([]);
        foreach ($exam->question as $question) {
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
            'exam'      => $dataExam,
            'questions' => $questions,
        ]);

        return $collections;
    }

    public static function storeAnswer($id , $results)    
    {
        foreach ($results as $result) {
            ExamSAnswer::create([
                'result_id'   => $id,
                'question_id' => $result['question'],
                'answer_id'   => $result['answer'],
            ]);
        }
    }
}
