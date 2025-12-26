<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::prefix('auth')->group(function (){

    Route::middleware('auth.facebook')->group(function (){

        Route::get('user' , [AuthController::class , 'getUserDetails']);
    });

    Route::post('register' , [AuthController::class , 'register']);
    Route::post('login' , [AuthController::class , 'login']);

});