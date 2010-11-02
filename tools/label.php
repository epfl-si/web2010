<?php
	if (get_magic_quotes_gpc()) {
		$_REQUEST['label'] = stripslashes($_REQUEST['label']);
	}
	if ( isset($_REQUEST['label']) ) {
		$label = strtoupper(strtr(urldecode($_REQUEST['label']), 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ', 'AAAAAAAAAAAAOOOOOOOOOOOOEEEEEEEECCIIIIIIIIUUUUUUUUYNN'));
	} else {
		$label = '';
	}
	if ( isset($_REQUEST['s']) ) {
		$s = (int) $_REQUEST['s'];
	} else {
		$s = 25; // default value
	}

	$s -= 5;

	if ( isset($_REQUEST['FG']) ) {
		$fg = $_REQUEST['FG'];
	} else {
		$fg = 'FFFFFF'; // default value
	}

	if ( isset($_REQUEST['BG']) ) {
		$bg = $_REQUEST['BG'];
	} else {
		$bg = '000000'; // default value
	}

	if ( isset($_REQUEST['st']) ) {
		$st = (int) $_REQUEST['st'];
	} else {
		$st = 4; // default value
	}
	if ( isset($_REQUEST['sb']) ) {
		$sb = (int) $_REQUEST['sb'];
	} else {
		$sb = 4; // default value
	}
	if ( isset($_REQUEST['sl']) ) {
		$sl = (int) $_REQUEST['sl'];
	} else {
		$sl = 8; // default value
	}
	if ( isset($_REQUEST['sr']) ) {
		$sr = (int) $_REQUEST['sr'];
	} else {
		$sr = 8; // default value
	}

	header('Expires: '.gmdate('r', time()+31104000));
	header('Last-Modified: Sat, 3 Mar 2001 12:34:56 GMT');
	header('Cache-Control: max-age=31104000'); // one year

	header('Content-type: image/png');

	$fontpath = dirname($SCRIPT_FILENAME).'/fonts/Tgb_____.ttf';

	$size = @imagettfbbox($s,0,$fontpath,$label);
	$dx = (int) abs($size[2] - $size[0]) + 1;
	$dy = (int) abs($size[5] - $size[3]) + 1;

	$im = @imagecreate ($dx + $sl + $sr, $dy + $st + $sb);

	$brc = (int) hexdec($bg{0}.$bg{1});
	$bgc = (int) hexdec($bg{2}.$bg{3});
	$bbc = (int) hexdec($bg{4}.$bg{5});

	$frc = (int) hexdec($fg{0}.$fg{1});
	$fgc = (int) hexdec($fg{2}.$fg{3});
	$fbc = (int) hexdec($fg{4}.$fg{5});

	imagecolorallocate($im,$brc,$bgc,$bbc);
	$txt = imagecolorallocate($im, $frc,$fgc,$fbc);

	@imagettftext($im, $s, 0, $sl, $dy + $st - 1, $txt, $fontpath, $label);

	/* output image */
	imagepng($im);

	imagedestroy($im);
?>
