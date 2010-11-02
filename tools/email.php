<?php
	if (get_magic_quotes_gpc()) {
		$_REQUEST['label'] = stripslashes($_REQUEST['label']);
	}
	if ( isset($_REQUEST['domain']) ) {
		$domain = strtr(urldecode($_REQUEST['domain']), 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ', 'AAAAAAAAAAAAOOOOOOOOOOOOEEEEEEEECCIIIIIIIIUUUUUUUUYNN');
	} else {
		$domain = 'epfl.ch';
	}

	if ( isset($_REQUEST['label']) ) {
		$label = strtr(urldecode($_REQUEST['label']), 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ', 'AAAAAAAAAAAAOOOOOOOOOOOOEEEEEEEECCIIIIIIIIUUUUUUUUYNN');
	} else {
		$label = 'your.email';
	}
	
	$label .= '@' . $domain;
	
	if ( isset($_REQUEST['s']) ) {
		$s = (int) $_REQUEST['s'];
	} else {
		$s = 9; // default value
	}

	if ( isset($_REQUEST['FG']) ) {
		$fg = $_REQUEST['FG'];
	} else {
		$fg = '000000'; // default value
	}

	if ( isset($_REQUEST['BG']) ) {
		$bg = $_REQUEST['BG'];
	} else {
		$bg = 'ffffff'; // default value
	}

	if ( isset($_REQUEST['st']) ) {
		$st = (int) $_REQUEST['st'];
	} else {
		$st = 1; // default value
	}
	if ( isset($_REQUEST['sb']) ) {
		$sb = (int) $_REQUEST['sb'];
	} else {
		$sb = 1; // default value
	}
	if ( isset($_REQUEST['sl']) ) {
		$sl = (int) $_REQUEST['sl'];
	} else {
		$sl = 0; // default value
	}
	if ( isset($_REQUEST['sr']) ) {
		$sr = (int) $_REQUEST['sr'];
	} else {
		$sr = 0; // default value
	}

	$uid = './graphics/email_'.md5($label.$s.$fg.$bg).$st.$sb.$sl.$sr.'.png';

	header('Expires: '.gmdate('r', time()+31104000));
	header('Last-Modified: Sat, 3 Mar 2001 12:34:56 GMT');
	header('Cache-Control: max-age=31104000'); // one year

	header('Content-type: image/png');

	if (empty($nocache) && file_exists($uid) ) {
		@readfile($uid);
		exit;
	} else {
		$fontpath = dirname($_SERVER['SCRIPT_FILENAME']).'/fonts/arial.ttf';

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

		/* save image to cache */
		@imagepng($im, $uid);
		/* output image */
		imagepng($im);

		imagedestroy($im);
	}
?>
