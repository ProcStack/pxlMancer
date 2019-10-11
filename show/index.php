<?php
if(isset($_GET['file'])){
if(!stristr($_GET['file'], '/') && stristr($_GET['file'], '.txt')){
if(isset($_POST['pass'])){
	$fp=fopen($_POST['file'], 'w');
	fwrite($fp,(stripslashes($_POST['textsave'])));
	fclose($fp);
}
?>
<html>
<body>

<form action="index.php?file=<?php if(isset($_GET['file'])){ echo $_GET['file']; } ?>" method="post">
<input type="hidden" name="pass" value=1>
<input type="hidden" name="file" value="<?php if(isset($_GET['file'])){ echo $_GET['file']; } ?>">
<textarea name="textsave" rows="60" cols="260">
<?php
if(isset($_GET['file'])){
	echo stripslashes(file_get_contents($_GET['file']));
} ?>
</textarea>
<br>
<input type="submit">
</form>
</body>
</html>

<?php 
}else{
header("Location: http://pxlmancer.com");
exit();
}
}else{
header("Location: http://pxlmancer.com");
exit();
} ?>
