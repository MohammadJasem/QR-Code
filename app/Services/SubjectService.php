<?php

    namespace App\Services;
    use App\Subject;
    use App\User;

    class SubjectService
    {
        public function addSubject($data)
        {
            $result = [];

            // $subject = Subject::create([]);

            $subject = new Subject([
                'title' => $data['title'],
                'description' => $data['description'],
                'credits' => $data['credits'],
                'num_of_schedules' => $data['num_of_schedules']
            ]);

            if($subject != null)
            {
                $user = User::where('id', $data['teacher_id'])->first();

                // Assciate each Subject to a teacher

                $user->subjects()->save($subject);

                $subject->user()->associate($user);
                $subject->save();

                $result['code'] = 201;
                $result['message'] = 'Subject Created Successfully!';
            }else{
                $result['code'] = 500;
                $result['err'] = 'Server Error. Please Try again later';
            }

            return response($result, 201, [
                'Content-Type' => 'application/json'
            ]);
        }

        public function GetSubjectsByTeacher($id) {

            $result = [];

            $user = User::with('subjects')->where('id', $id)->first();

            $result['code'] = 200;
            $result['subjects'] = $user->subjects;

            return $result;
        }

        public function getSubjects(){

            $result = [];

            $subjects = Subject::with('user:id,name,email')->get();

            $result['code'] = 200;
            $result['subjects'] = $subjects;

            return $result;
        }
    }
?>
