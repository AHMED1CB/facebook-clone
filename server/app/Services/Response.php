<?php

namespace App\Services;



class Response
{

    static public function json($data, string $message = "", int $status = 200)
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
            'status' => $status < 400 ? "Success" : "Fail",
            'statusCode' => $status
        ], $status);

    }

}