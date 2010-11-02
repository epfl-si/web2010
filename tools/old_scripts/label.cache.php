<?

require "Cache/Graphics.php";

$cache = new Cache_Graphics();

if(!isset($s)) $s=25;
if(!$FG) $FG="FFFFFF";

$label = urldecode($label);
//$label=strtr($label,"бвайкиоыфФ","aaaeeeiuoO");

$label = strtoupper(stripcslashes($label));

$id = md5(serialize(array($s, $label, $FG,$BG)));
#echo $label;
header('Content-type: image/png'); 

if (!($img = $cache->getImage($id, 'png'))) {

    $size = imagettfbbox($s,0,"fonts/Tgb_____.ttf",$label);
    $dx = abs($size[2]-$size[0]);
    $dy = abs($size[5]-$size[3]);
    $xpad=10;
    $ypad=10;

    $im = @ImageCreate ($dx+$xpad-1,$dy+$ypad-1);

    $BGColor["red"]   = hexdec(substr($BG,0,2));
    $BGColor["green"] = hexdec(substr($BG,2,2));
    $BGColor["blue"]  = hexdec(substr($BG,4,2));

    $FGColor["red"]   = hexdec(substr($FG,0,2));
    $FGColor["green"] = hexdec(substr($FG,2,2));
    $FGColor["blue"]  = hexdec(substr($FG,4,2));

    $blue  = ImageColorAllocate($im,$BGColor["red"],$BGColor["green"],$BGColor["blue"]);
    $black = ImageColorAllocate($im, 0,0,0);
    $white = ImageColorAllocate($im, $FGColor["red"],$FGColor["green"],$FGColor["blue"]);

    ImageTTFText($im, $s, 0, (int)($xpad/2), $dy+(int)($ypad/2)-1, $white, "fonts/Tgb_____.ttf", $label);

    $img =  $cache->cacheImage($id, $im, 'png');
}
    //$img =  $cache->getImage($id,'png');

   print $img;
?>
