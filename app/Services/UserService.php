<?php

	namespace App\Services;

	use Illuminate\Support\Facades\Hash;
	use Illuminate\Support\Str;
	use Illuminate\Foundation\Auth\AuthenticatesUsers;
	use App\User;
	use App\Role;
	use App\role_user;
	class UserService
	{
		public function login($email,$password)
		{
			$user = User::where([
						['email', '=', $email],
					])
				   ->first();
			if($user != null){
				if(Hash::check($password, $user->password)){
					$result['code'] = 200;
					$result['id'] = $user->id;
					$result['name'] = $user->name;
					$result['email'] = $user->email;
					$result['api_token'] = $user->api_token;
					$user_role = role_user::where([
						['user_id', '=', $user->id],
					])->first();
					$role = Role::where([
						['id', '=', $user_role->role_id],
					])->first();
					$result['role_id'] = $role->id;
					$result['role_name'] = $role->role_name;
				}else{
					$result['code'] = 401;
					$result['message'] = "Email Address or Password incorrect";
				}
			}else{
				$result['code'] = 401;
				$result['message'] = "Email Address or Password incorrect";
			}
			return $result;
		}

	    public function create($email, $name, $role_id,$group_id)
	    {

			$count = User::where(['email' => $email])->count();

			if($count >=1 ){

				$result['code'] = 400;
				$result['message'] = 'Email Address is already existed';
			}else{
				$user = User::create([
					'name' => $name,
					'email' => $email,
					'password' => Hash::make('1234abcd'),
					'api_token' => Str::random(150),
				]);
				$role_user = role_user::create([
					'user_id' => $user['id'],
					'role_id' => $role_id,
				]);

				if(!isset($user) || !isset($role_user)){
					$result['code'] = 400;
					$result['message'] = 'Error Registering New User.';
                } else
                {
                    // Add the New user to group specified by group_id
                    if(isset($group_id) && !empty($group_id)){
                        if($group_id != -1){
                            $user->groups()->attach($group_id);
                        }
                    }
					$role = Role::where([
						['id', '=', $role_user->role_id],
					])->first();

					$result['user_id'] = $user->id;
					$result['email'] = $user->name;
					$result['api_token'] = $user->api_token;
					$result['role_name'] = $role->role_name;
					$result['code'] = 201;
				}
			}

			return $result;
		}

		public function GetAllStudents(){

			$result = [];

			$students = Role::with(['users' => function($query){
				$query->select('id','name','email','users.created_at');
			}])->where('role_name','like','ROLE_STUDENT')->first();

			$result['code'] = 200;
			$result['students'] = $students->users;

			return response($result, 200, ['Content-Type' => 'application/json']);
		}

		public function GetAllTeachers(){

			$result = [];

			$teachers = Role::with(['users' => function($query){
				$query->select('id','name','email','users.created_at');
			}])->where('role_name','like','ROLE_TEACHER')->first();

			$result['code'] = 200;
			$result['teachers'] = $teachers->users;

			return response($result, 200, ['Content-Type' => 'application/json']);
		}
	}

?>
