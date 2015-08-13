<?php
$pageNo = 100;
?>

{
	list:[
	<?php for ($i=0; $i<100; $i++) { ?>
	a,
	<?php } ?>
	],
	page:{
		pageNo:<?=$pageNo?>,
		pageCount:200,
		listCount:100
	},
	msg:""
}	