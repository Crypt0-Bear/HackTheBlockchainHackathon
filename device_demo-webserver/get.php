<?php


$add = htmlspecialchars($_GET["q"]);

//Bad sanitizing. Hackathon POC no security in place. 
// just added basic sanitizing to prevent other teams from messing with demo while we present
$add = filter_var ( $add, FILTER_SANITIZE_STRING);


//~ echo $add;


 // create curl resource 
        $ch = curl_init(); 
        
        $url = "http://deversal.space:3000/status?q=" . $add;
        //~ echo $url;

        // set url 
        curl_setopt($ch, CURLOPT_URL, $url); 

        //return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

        // $output contains the output string 
        $output = curl_exec($ch); 

        // close curl resource to free up system resources 
        curl_close($ch);    
        
        echo $output;
        
        
        

?>

