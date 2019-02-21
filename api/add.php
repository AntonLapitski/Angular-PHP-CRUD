<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

require 'DatabaseHelper.php';

$dbHelper = new DatabaseHelper();
$queryWorker = $dbHelper->connect();

$title = $_REQUEST['title'];

$sql = "INSERT INTO todos (title, completed)
VALUES ('$title', 0);";

$result = $queryWorker->query($sql);

$newSql = "SELECT * FROM todos LIMIT 1";
$result = $queryWorker->query($newSql);
$result = $result->fetchAll();

echo json_encode($result);
