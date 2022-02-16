<?php 

function _addError(){
    $responses['error'] = 'true';
    print json_encode($responses);
    exit;
}

define('IS_AJAX', isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');

if(!IS_AJAX){
    die('Restricted access');
}

$file = isset($_FILES['file']['tmp_name']) ? $_FILES['file']['tmp_name'] : '';
$responses = ['error' => 'false'];
$file_name = $_POST['file_name'];

if(isset($_POST['file'])){
    if($_POST['file'] === "undefined"){
        $responses[] = 'nonewfile';
    }
}

if($file !== ''){
    if(0< $_FILES['file']['error']){
        _addError();
        $responses[] = 'Upload error';
    } else {
        $authorized_format_file = [
            "image/jpeg",
            "image/jpg"
        ];
        if(!in_array($_FILES['file']['type'], $authorized_format_file)){
            $responses[] = 'Invalid file type';
            _addError();
        }
        
        $folder_user = 'imgs'.((string) rand(10000, 990000).'_'.time());

        while(is_dir($folder_user)){
            $folder_user = 'imgs'.((string) rand(10000, 990000).'_'.time());
        }

        $create_dir = mkdir($folder_user, 0755);

        if(move_uploaded_file($_FILES['file']['tmp_name'], $folder_user.'/'.$file_name)){
            $responses[] = 'Converted successfully';
        } else $responses[] = 'Converted with errors';
    }
}

if($responses['error'] = 'false'){
    unset($responses['error']);
}

print json_encode($responses);
