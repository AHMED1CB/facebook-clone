<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Services\Response;


class FriendsController extends Controller
{
    public function getFriendData($friendId)
    {

        $user = request()->user();
        $friend = $user->friends()->where('friend_id', $friendId)->with('friend')->first();


        if (!$friend) {
            return Response::json([], "Friend Not Found", 404);
        }

        return Response::json([
            'data' => $friend->friend
        ], "Friend Found Successfully", 200);


    }


    public function deleteFriend($friendId)
    {

        $user = request()->user();
        $friend = $user->friends()->where('friend_id', $friendId)->first();


        if (!$friend) {
            return Response::json([], "Friend Not Found", 404);
        }


        $friend->delete();
        Friend::where('user_id', $friendId)
            ->where('friend_id', $user->id)
            ->delete();
        return Response::json([], "Friend Deleted Successfully", 200);

    }
}
