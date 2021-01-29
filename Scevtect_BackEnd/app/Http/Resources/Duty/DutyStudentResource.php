<?php

namespace App\Http\Resources\Duty;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Subject;

class DutyStudentResource extends JsonResource
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
        $thumbnail = 'storage/duty/covers/' . $this->thumbnail;
        $files = collect([]);

        foreach ($this->file->where('type' , 'document') as $file) {
            $files->push([
                'id'        => $file->id,
                'size'      => round($file->size / 1028 , 1),
                'name'      => $file->value,
                'extension' => $file->extension,
            ]);
        }

        $do = ($this->response_at) ? true : false;

        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'thumbnail'   => $thumbnail,
            'teacher'     => $this->teacher->user->name,
            'subject'     => $subject->subject,
            'deadline'    => $this->deadline,
            'description' => $this->description,
            'created_at'  => $this->created_at->diffForHumans(),
            'files'       => $files,
        ];
    }
}
