<?php
    namespace App\Services;
    use App\Schedule;
    use App\User;
    use Illuminate\Support\Str;

    class ScheduleService
    {
        public function getAllSchedules($token)
        {

            $result = [];
            $schedules_arr = [];

            $teacher = User::where('api_token','like',$token)->first();

            $schedules = Schedule::with('group.subject')->get();

            $schedules = $schedules->reject(function($schedule) use ($teacher)
            {
                return $schedule->group->subject->user_id !== $teacher->id;
            });

            foreach($schedules as $schedule){
                array_push($schedules_arr, $schedule);
            }

            $result['code'] = 200;
            $result['schedules'] = $schedules_arr;

            return $result;
        }

        public function addSchedule($data)
        {
            $result = [];
            $schedule = new Schedule([
                'date_scheduled' => $data['date_scheduled'],
                'qr_token' => Str::random(50),
                'group_id' => $data['group_id']
            ]);
            if(isset($schedule) && !empty($schedule) )
            {
                $schedule->save();

                $result['code'] = 201;
                $result['qr_token'] = $schedule->qr_token;
                $result['message'] = 'Schedule Created Successfully!';
            }else{
                $result['code'] = 500;
                $result['err'] = 'Server Error. Please Try again later';
            }

            return response($result, 201, [
                'Content-Type' => 'application/json'
            ]);
        }

        public function getAudiencesByScheduleId($schedule_id){

            $result = [];

            $schedule = Schedule::find($schedule_id);

            if(!isset($schedule) || empty($schedule)){
                $result['code'] = 404;
                $result['err'] = 'Schedule Not Found!';

                return response($result, $result['code'], [
                    'Content-Type' => 'application/json'
                ]);
            }

            $schedule->load('group:id,name')
                ->load('group.subject:id,title,description','group.users:id,name,email')
                ->load('attendances:id,user_id,registered_at')
                ->load('attendances.user:id,name,email');

            $users = [];
            $audiences = [];

            // get all users in a group
            foreach($schedule->group->users as $user){
                array_push($users, $user);
            }

            // get all audiences for a specific schedule
            foreach($schedule->attendances as $attendance){
                array_push($audiences, $attendance->user);
            }

            $missing = array_values(array_diff($users,$audiences));

            $result['code'] = 200;
            $result['data'] = [
                'schedule_date' => $schedule->date_scheduled,
                'group' => $schedule->group,
                'audiences' => $schedule->attendances,
                'missing' => $missing
            ];

            return response($result, $result['code'], [
                'Content-Type' => 'application/json'
            ]);
        }
    }
?>
