<?php
    include('./library/conn.php');
    $username=$_REQUEST['username'];
    $password=$_REQUEST['password'];
    $phone=$_REQUEST['phone'];
    $email=$_REQUEST['email'];
    $address=$_REQUEST['address'];

    $sql1 = "select * from user where username='$username'";
    
    $results=$mysql->query($sql1);

    // var_dump $result;
    if($results->num_rows>0){
        echo '<script>alert("注册失败!用户名已存在");</script>';
        echo '<script>location.href="../reg.html";</script>';
        $mysql->close();
        die();
    }

    $sql2="insert into user (username, password, email,phone,address) values ('$username', '$password', '$email', '$phone', '$address')";

    $res = $mysql->query($sql2);

    $mysql->close();
    echo($res);
    if($res){
      echo '<script>alert("注册成功!");</script>';
      echo '<script>location.href="https://www.baidu.com";</script>';
   }
?>