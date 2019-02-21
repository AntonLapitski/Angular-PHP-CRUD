<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

require 'DatabaseHelper.php';

$dbHelper = new DatabaseHelper();
$queryWorker = $dbHelper->connect();

$sql = "SELECT * FROM todos";

$result = $queryWorker->query($sql);

$result = $result->fetchAll();

echo json_encode($result);
