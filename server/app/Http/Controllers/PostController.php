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

        $data = ['post_type', 'post_privacy', 'post_content', 'media_file'];

        $check = Validator::make(request()->only($data), [
            'post_type' => ['in:TXT,IMG,VID', 'required'],

            'post_content' => ['nullable', 'min:3', 'string', 'max:5000', 'required_if:post_type,TXT'],
            'media_file' => [
                'nullable',
                'file',
                'required_if:post_type,IMG,VID',
                'max:40480',
                Rule::when(
                    request('post_type') === 'IMG',
                    ['mimetypes:image/jpeg,image/png,image/webp']
                ),

                Rule::when(
                    request('post_type') === 'VID',
                    ['mimetypes:video/mp4,video/quicktime,video/webm']
                ),
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

            $mediaPath = request()->file('media_file')->store('posts', 'public');
            $recordData['media_path'] = $mediaPath;

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
