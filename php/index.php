<?php 
	header("Content-type: text/html; charset=utf-8");

  	
	

	date_default_timezone_set('PRC'); 
	$time = date("Y.m.d - H:i:s");
	$data = $_POST['json'];
	$arr = json_decode($_POST['json'], true);
	$ip = $arr['ip'];




	$servername = "localhost";
	$username = "zjwdb_6190869";
	$password = "13972684Mm";
	$dbname = "zjwdb_6190869";
	 
	//创建连接
	$conn = new mysqli($servername, $username, $password, $dbname);
	 
	// 检测连接
	if ($conn->connect_error) {
	    die("连接失败: " . $conn->connect_error);
	}
// 	$sql="delete from $table_vote"; 
// mysql_query($sql, $link); 
// $sql="alter table $table_vote auto_increment=1"; 
// mysql_query($sql, $link);
// 	$sql0 = "select n from user";
// 	$result = mysql_query($sql0);
// 	$row = mysql_fetch_array($result);

	$sql = "INSERT INTO user (ip, date, data)
	VALUES ('$ip', '$time', '$data')";

	if ($conn->query($sql) === TRUE) {
	    echo "新记录插入成功";
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$conn->close();
 ?>