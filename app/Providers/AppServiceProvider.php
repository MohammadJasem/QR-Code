<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('\App\Services\UserService', function($app){
            return new \App\Services\UserService();
        });

        $this->app->singleton('\App\Services\SubjectService', function($app){
            return new \App\Services\SubjectService();
        });

        $this->app->singleton('\App\Services\GroupService', function($app){
            return new \App\Services\GroupService();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    }
}
