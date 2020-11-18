<?php

namespace App\Http\Controllers;

use App\Services\SubjectService;
use Illuminate\Http\Request;

class SubjectController extends Controller
{

    protected $subjectService;

    public function __construct(SubjectService $subjectService){
        $this->subjectService = $subjectService;
    }

    public function addSubject(Request $request)
    {
        // Retrieveing title, description, credits, num_of_schedules
        $data = $request->all();

        return $this->subjectService->addSubject($data);
    }

    public function GetSubjectsByTeacher($id){
        return $this->subjectService->GetSubjectsByTeacher($id);
    }

    public function getSubjects(){
        return $this->subjectService->getSubjects();
    }
}
