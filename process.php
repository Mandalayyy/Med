<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "Invalid request method.";
    exit;
}

$error = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate email
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);

    if ($email) {
        // If the email is valid, redirect to Men's Health
        header("Location: https://www.menshealth.com/");
        exit;
    } else {
        // Set the error message if the email is invalid
        $error = "Please enter a valid email address.";
    }
}
?>