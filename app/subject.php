<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{

    protected $fillable = [
        'title','description','num_of_schedules','credits','user_id'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function user(){
        return $this->belongsTo('App\User', 'user_id');
    }

    public function groups(){
        return $this->hasMany('App\Group', 'subject_id', 'id');
    }
}
