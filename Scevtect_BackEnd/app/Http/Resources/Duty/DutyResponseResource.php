<?php

namespace App\Http\Resources\Duty;

use Illuminate\Http\Resources\Json\JsonResource;

class DutyResponseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $files = collect([]);
        foreach ($this->file as $file) {
            $files->push([
                'id'   => $file->id,
                'name' => $file->name,
                'size' => round($file->size / 1028),
            ]);
        }

        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'files'       => $files,
        ];
    }
}
