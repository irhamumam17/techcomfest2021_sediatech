<?php

namespace App\Http\Resources\Theory;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Subject;

class TheoryStudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $subject = Subject::find($this->subject_id);
        $thumbnail = 'storage/theory/covers/' . $this->thumbnail;
        $files = collect([]);

        foreach ($this->file->where('type' , 'document') as $file) {
            $files->push([
                'id'        => $file->id,
                'size'      => round($file->size / 1028 , 1),
                'name'      => $file->value,
                'extension' => $file->extension,
            ]);
        }

        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'thumbnail'   => $thumbnail,
            'teacher'     => $this->teacher->user->name,
            'subject'     => $subject->subject,
            'description' => $this->description,
            'created_at'  => $this->created_at->diffForHumans(),
            'files'       => $files,
        ];
    }
}
