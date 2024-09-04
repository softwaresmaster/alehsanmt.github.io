<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['consent'])) {
        $name = htmlspecialchars($_POST['name']);
        $phone = htmlspecialchars($_POST['phone']);
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $message = htmlspecialchars($_POST['message']);

        $to = "sahabk105@gmail.com";
        $subject = "New Contact Form Submission from $name";
        $body = "Name: $name\nPhone Number: $phone\nEmail: $email\n\nMessage:\n$message";
        $headers = "From: $email";

        if (mail($to, $subject, $body, $headers)) {
            echo "Thank you! Your message has been sent.";
        } else {
            echo "Sorry, there was an error sending your message.";
        }
    } else {
        echo "You must agree to the terms and conditions.";
    }
} else {
    echo "Invalid request.";
}
?>
