<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Services\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


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



    public function uploadPost()
    {

        $data = ['post_type', 'post_privacy', 'post_content', 'post_content'];

        $check = Validator::make(request()->only($data), [
            'post_type' => ['in:TXT,IMG,VID', 'required'],
            'post_content' => [
                'required',
                Rule::when(
                    request('post_type') === 'IMG',
                    [
                        'mimetypes:image/jpeg,image/png,image/webp',
                        'file',
                        'max:40480'
                    ]
                ),

                Rule::when(
                    request('post_type') === 'VID',
                    [
                        'mimetypes:video/mp4,video/quicktime,video/webm',
                        'file',
                        'max:40480'
                    ]

                ),
                Rule::when(
                    request('post_type') === 'TXT',
                    [
                        'string',
                        'max:5000'
                    ]
                )

            ],
            'post_privacy' => ['in:PUB,PRIV,FRI'],
        ]);

        $recordData = [];

        if ($check->fails()) {

            return Response::json([
                'errors' => $check->errors()
            ], "Invalid Post Data", 400);

        }


        $postType = request()->input('post_type');

        if ($postType !== 'TXT') {

            $mediaPath = request()->file('post_content')->store('posts', 'public');
            $recordData['post_content'] = $mediaPath;

        } else {
            $recordData['post_content'] = request()->input('post_content');
        }

        $recordData['post_type'] = request()->input('post_type');
        $recordData['post_privacy'] = request()->input('post_privacy');
        $recordData['user_id'] = request()->user()->id;

        $post = Post::create($recordData);


        if ($post) {

            return Response::json([
                'post' => $post
            ], 'Post Created Successfully', 201);

        }


    }
}
