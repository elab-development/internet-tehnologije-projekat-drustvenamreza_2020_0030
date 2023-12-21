<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserFollowController;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


//login i registracija
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);

Route::get('posts', [PostController::class, 'index']);
Route::get('posts/{id}', [PostController::class, 'show']); 

Route::get('/userfollows', [UserFollowController::class, 'index']);

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::post('posts', [PostController::class, 'store']);
    Route::put('posts/{id}', [PostController::class, 'update']); 
    Route::patch('posts/{id}', [PostController::class, 'updateStatus']);
    Route::delete('posts/{id}', [PostController::class, 'destroy']); 

    Route::resource('comments', CommentController::class);

    Route::post('/userfollows/zaprati', [UserFollowController::class, 'zaprati']);
    Route::delete('/userfollows/otprati', [UserFollowController::class, 'otprati']);

    Route::post('logout', [AuthController::class, 'logout']);
});