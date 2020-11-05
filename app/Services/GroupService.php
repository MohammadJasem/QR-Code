<?php
    namespace App\Services;

    use App\Subject;
    use App\User;
    use App\Group;

    class GroupService{

        public function addGroup($data)
        {

            $result = [];

            $group = new Group([
                'name' => $data['name']
            ]);
            $subject = Subject::find($data['subject_id']);

            if($subject != null){
                $subject->groups()->save($group);
                foreach($data['students'] as $id){
                    $group->users()->attach($id);
                }

                $result['code'] = 201;
                $result['message'] = 'Group Created Successfully';

            }else{
                $result['code'] = 500;
                $result['err'] = 'Error while creating new group!';
            }

            return response($result, 201, ['Content-Type' => 'application/json']);
        }
        public function getGroup($token,$is_admin)
        {

            $result = [];
            $groups = [];
            $user = User::where('api_token',str_replace('Bearer ', '', $token))->first();

            // Get all Subjects for a Specific Teacher
            if(!empty($user) && isset($user)){
                $subjects = Subject::where('user_id',$user->id)->get();
            }

            // Get All Groups for All Subjects for a Specific Teacher
            if(count($subjects) > 0)
            {
                foreach($subjects as $subject){
                    $groups_to_add = Group::where('subject_id','=',$subject->id)->get();

                    foreach($groups_to_add as $group){
                        array_push($groups, $group);
                    }
                }
            // Return All Groups instead for an Admin User
            } else if(boolval($is_admin)){
                $groups = Group::all();
            }

            $result['code'] = 200;
            $result['groups'] = $groups;
            return response($result, $result['code'], ['Content-Type' => 'application/json']);
        }
    }
?>
