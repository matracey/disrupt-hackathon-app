<?php

class ApiController extends \BaseController {

    public function getIndex()
    {
        // access this via: example.com/api
        $response_data = array(
            'test' => 'test',
            'test2' => 'test2',
        );

        return Response::json($response_data);
    }

    public function postUsers()
    {
        // command line curl:
        // curl -X POST -d 'd=d' http://local.disrupt.me/api/users
        // TODO: get lines, and duration, time @ work. sms/email

        $from_line = $_POST['transport']['directions'][0]['line'];
        $to_line = $_POST['transport']['directions'][1]['line'];
        $duration = $_POST['transport']['duration'];
        $time_at_work = $_POST['timeAtWork'];

        $sms_to = array();
        foreach ($_POST['sms'] as $cell_number) {
            $sms_to[] = $cell_number;
        }

        $email_to = array();
        foreach ($_POST['email'] as $email_address) {
            $email_to[] = $email_address;
        }

        // TODO: save this info to DB

        die('post users');
    }

    public function postProfile()
    {
        // accessed via data POSTED to example.com/profile
    }

    public function postSms()
    {
        die('smsm');
        if( !(isset($_POST["phoneNumber"]) and isset($_POST["message"])) )
        {
            // not sure why but the below doesnt work, will fix later
//            Response::abort(400, "Bad Request");
        }
        $phoneNumber = $_POST["phoneNumber"];
        $message = $_POST["message"];
    }

}