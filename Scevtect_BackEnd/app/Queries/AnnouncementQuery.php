<?php 
namespace App\Queries;
use App\Models\Announcement;
use App\Http\Resources\Announcement\StudentAnnouncementResource;

class AnnouncementQuery
{
    public static function byStudent($student)
    {
    	$schoolId = $student->school->id;
    	$announcements = collect([]);
        
        // get public
        $publics = Announcement::where('school_id' , $schoolId)
        			->get();
        foreach ($publics as $data) {
        	$announcements->push($data);
        }


        $collection = StudentAnnouncementResource::collection($announcements);
        return $collection;
    }
}
