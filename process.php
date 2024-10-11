<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Очищення та перевірка email
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $answers = json_decode($_POST['answers'], true);

    // Валідація електронної пошти
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 'Invalid email format';
        exit;
    }

    // Валідація відповідей: перевірка, що це масив і він заповнений
    if (!is_array($answers) || count($answers) !== 7) {
        echo 'Answer all questions';
        exit;
    }

    // Перевірка на пусті значення у відповідях
    foreach ($answers as $answer) {
        if (empty($answer)) {
            echo 'Answer all questions';
            exit;
        }
    }

    // Якщо валідація успішна
    echo 'success';
    exit;
}
?>
