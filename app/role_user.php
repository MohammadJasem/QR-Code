<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class role_user extends Model
{
    protected $fillable = [
        'user_id', 'role_id',
    ];
}
