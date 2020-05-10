<?php
	$name = filter_input(INPUT_POST, 'name');
	$date = filter_input(INPUT_POST, 'date');
	$time = filter_input(INPUT_POST, 'time');
	$phone = filter_input(INPUT_POST, 'phone');
	$date = filter_input(INPUT_POST, 'date');
	$party_size = filter_input(INPUT_POST, 'party_size');

	$host = "localhost";
	$dbusername = "root";
	$dbpassword = "";
	$dbname = "reservation";


	$conn = new mysqli ($host, $dbusername, $dbpassword, $dbname);

	if (mysqli_connect_error()){
		die('Connect Error ('.mysqli_connect_errno().')'.mysqli_connect_error());
	}
?>