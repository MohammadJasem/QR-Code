<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// public Routes
Route::post('/login', 'Auth\LoginController@login');

// Protected Routes

Route::middleware('AuthMiddleware')->group(function(){
    Route::get('/roles', 'RoleController@getRoles');
    Route::post('/register', 'Auth\RegisterController@create');
    Route::get('/students', 'UsersController@GetAllStudents');
    Route::get('/teachers', 'UsersController@GetAllTeachers');
    Route::get('subjectsByTeacher/{id}', 'SubjectController@GetSubjectsByTeacher');
    Route::post('/addSubject', 'SubjectController@addSubject');
    Route::get('/subjects', 'SubjectController@getSubjects');
    Route::post('/addGroup', 'GroupController@addGroup');
    Route::get('getGroups/{is_admin}', 'GroupController@getGroup');
    Route::post('/addSchedule', 'ScheduleController@addSchedule');
    Route::get('/schedules', 'ScheduleController@getAllSchedules');
    Route::post('/postQRCode/{qr_token}', 'AttendanceController@register');
    Route::get('/audiences/{schedule_id}', 'ScheduleController@getAudiencesByScheduleId');
});
