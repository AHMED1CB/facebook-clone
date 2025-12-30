<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Services\Response;


class PostController extends Controller
{
    public function getPostDetails($postId)
    {
        # Will Change When Add Reactions And Comments
        $targetPost = Post::find(($postId));


        if (!$targetPost) {

            return Response::json([], "Post Not Found", 404);

        }


        return Response::json([
            'post' => $targetPost
        ], "Post Found Successfully", 200);


    }
}
