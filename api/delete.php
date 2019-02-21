<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require 'DatabaseHelper.php';

$dbHelper = new DatabaseHelper();
$queryWorker = $dbHelper->connect();

$id = $_REQUEST['id'];
$sql = "DELETE FROM todos WHERE id = '$id'";
$result = $queryWorker->query($sql);
