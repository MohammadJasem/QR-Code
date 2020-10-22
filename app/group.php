<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{

    protected $fillable = ['name'];
    protected $hidden = ['created_at', 'updated_at'];

    public function subject(){
        return $this->belongsTo('App\Subject', 'subject_id');
    }

    public function schedules(){
        return $this->hasMany('App\Schedule', 'group_id', 'id');
    }

    public function users(){
        return $this->belongsToMany('App\User', 'student_groups', 'group_id', 'user_id');
    }
}
