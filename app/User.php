<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','api_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','pivot'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function subjects(){
        return $this->hasMany('App\Subject', 'user_id', 'id');
    }

    public function news(){
        return $this->hasMany('App\News', 'user_id', 'id');
    }

    public function attendances(){
        return $this->hasMany('App\Attendance', 'user_id', 'id');
    }

    public function roles(){
        return $this->belongsToMany('App\Role', 'role_users','user_id','role_id');
    }

    public function groups(){
        return $this->belongsToMany('App\Group', 'student_groups', 'user_id', 'group_id');
    }
}
