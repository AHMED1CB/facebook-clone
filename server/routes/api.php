<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\FriendsController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

// @@@@ TIME LIMITING @@@@
Route::middleware('throttle.json:80,1')->group(function () {
    // @@@@ AUTH  @@@@

    Route::prefix('auth')->group(function () {

        Route::middleware('auth.facebook')->group(function () {

            Route::get('user', [AuthController::class, 'getUserDetails']);
            Route::post('logout', [AuthController::class, 'logoutUser']);
            Route::post('user/edit', [AuthController::class, 'editProfile']);
        });

        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);

    });

    // @@@@ USERS  @@@@

    Route::get('/users/{id}', [UsersController::class, 'getUser'])->middleware('auth.facebook');


    // @@@@ REQUESTS  @@@@

    Route::prefix('requests')->middleware('auth.facebook')->controller(RequestsController::class)->group(function () {

        Route::post('/{userId}/toggle', 'toggleFriendRequest');

        Route::post('/{userId}/accept', 'acceptFriendRequest');

        Route::post('/{userId}/reject', 'rejectFriendRequest');

    });

    // @@@@ FRIENDS  @@@@

    Route::prefix('friends')->middleware('auth.facebook')->controller(FriendsController::class)->group(function () {

        Route::delete('/{userId}/', 'deleteFriend');

    });

    // @@@@ POSTS AND VIDEOS  @@@@

    Route::prefix('posts')->middleware('auth.facebook')->controller(PostController::class)->group(function () {

        Route::get('/', 'getSomePosts');
        Route::get('/videos', 'getSomeVideos');
        Route::get('/{postId}', 'getPostDetails');

        Route::post('/{postId}/like', 'toggeLike');

        Route::post('/', 'uploadPost');

        Route::put('/{postId}', 'updatePost');

        Route::delete('/{postId}', 'deletePost');

    });


    // @@@@ COMMENTS @@@@

    Route::prefix('comments')->middleware('auth.facebook')->controller(CommentsController::class)->group(function () {
        Route::post('/{postId}', 'commentOnPost');
        Route::delete('/{commentId}', 'deleteComment');

    });

    // @@@@ SEARCH  @@@@

    Route::get('/search/{query}', [DataController::class, 'search'])->middleware('auth.facebook');

});

