<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{

    protected $fillable= ['user_id','schedule_id','registered_at'];
    public $timestamps = false;

    public function schedule(){
        return $this->belongsTo('App\Schedule', 'schedule_id');
    }

    public function user(){
        return $this->belongsTo('App\User', 'user_id');
    }
}
