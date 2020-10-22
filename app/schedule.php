<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = ['date_scheduled','qr_token','group_id'];
    protected $hidden = ['created_at', 'updated_at'];

    public function group(){
        return $this->belongsTo('App\Group', 'group_id');
    }

    public function attendances(){
        return $this->hasMany('App\Attendance','schedule_id', 'id');
    }
}
