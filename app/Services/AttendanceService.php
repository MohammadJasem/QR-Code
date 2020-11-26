<?php

    namespace App\Services;
    use App\User;
    use App\Attendance;
    use App\Schedule;

    class AttendanceService {

        protected function checkUserinGroup($user,$group){

            $group->load('users:id,name,email');
            return $group->users->contains($user);
        }

        public function register($api_token,$qr_token)
        {
            $result = [];

            $user = User::select('id','name','email')
                ->where('api_token', 'like',$api_token)->first();

            $schedule = Schedule::where('qr_token','like',$qr_token)->first();

            if(isset($schedule) && !empty($schedule))
            {
                $schedule->load('group.subject');

                // Check if student belongs the group
                if(!$this->checkUserinGroup($user,$schedule->group)){
                    $result['code'] = 400;
                    $result['err'] = 'you do not belong to this group!';

                    return response($result, $result['code'], [
                        'Content-Type' => 'application/json'
                    ]);
                }

                $attendance = Attendance::where([
                    'schedule_id' => $schedule->id,
                    'user_id' => $user->id
                ])->first();

                if(isset($attendance) && !empty($attendance)){

                    $result['code'] = 400;

                    $result['err'] = 'You have already Registered for this Schedule';

                    return response($result, $result['code'], ([
                        'Content-Type' => 'application/json'
                    ]));
                }

                $attendance = new Attendance([
                    'registered_at' => now(),
                    'schedule_id' => $schedule->id
                ]);

                $user->attendances()->save($attendance);

                $result['code'] = 200;
                $result['user'] = $user;
                $result['schedule'] = $schedule;
            }else{
                $result['code'] = 400;
                $result['user'] = $user;
                $result['err'] = 'You have missed the schedule!';
            }

            return response($result, $result['code'], [
                'Content-Type' => 'application/json'
            ]);
        }
    }
?>
