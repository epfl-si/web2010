<?php
 $im = imagecreatetruecolor (300, 200);
$black = imagecolorallocate ($im, 0, 0, 0);
$white = imagecolorallocate ($im, 255, 255, 255);

imagefilledrectangle($im,0,0,399,99,$white);
imagerectangle($im,20,20,250,190,$black);

header ("Content-type: image/png");
imagepng ($im);
?>
