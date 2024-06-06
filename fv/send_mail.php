<?php
         $to = "info@fvcom.ae";
        
      
         $subject = "Contact enquiry";
          $name = $_POST['name'];
          
          $email = $_POST['email'];
          $service = $_POST['service'];
           $mobile = $_POST['mobile'];
         
         $message = "Name:\n $name.\n<br/>".
        "Email:\n $email.\n<br>".
         "Mobile:\n $mobile.\n<br/>".
          "Message:\n $service.\n<br/>";
    
        
         
         $header = "From:info@fvcom.ae";
    
         
        
         $header .= "MIME-Version: 1.0\r\n";
         $header .= "Content-type: text/html\r\n";
         
         $retval = mail ($to,$subject,$message,$header);
       
         
         if( $retval == true ) {
            echo "Message sent successfully...";
         }
         else {
            echo "Message could not be sent...";
         }
        
      ?>