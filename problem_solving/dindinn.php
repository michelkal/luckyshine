<?php 
// The PHP method to move string character 
function ascii_encode($str, $n) 
{ 

// new string 
	$newStr = ""; 

// iterate for every characters 
	for($i = 0; $i < strlen($str); ++$i) 
	{ 
// ASCII character value 
		$val = ord($str[$i]); 

//duplicate 
		$dup = $n; 

// if n-th character exceed 'z' 
		if($val + $n > 122) 
		{ 
			$n -= (122 - $val); 
			$n = $n % 26; 
			$newStr = $newStr.chr(96 + $n); 
		} 
		else
			$newStr = $newStr.chr($val + $n); 

		$n = $dup; 
	} 

// print out the new string 
	echo $newStr; 
} 

//Sample implementation
$str_given = "abc"; 
$n = 28; 

//call the method
ascii_encode($str_given, $n); 

?>