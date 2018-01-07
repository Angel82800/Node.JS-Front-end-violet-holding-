<?php

    $firstname = isset($_GET['firstname']) ? $_GET['firstname'] : '';
    $lastname = isset($_GET['lastname']) ? $_GET['lastname'] : '';
    $email = isset($_GET['email']) ? $_GET['email'] : null;

    require_once('lib/MailChimp.php');
    $apiKeyPath = '../APIKEY';

    if (file_exists($apiKeyPath)) {
        $apiKey = file_get_contents($apiKeyPath);
        $MailChimp = new MailChimp('Dave Pullen', $apiKey);
    } else {
        throw new Exception('Missing an API key in a file called "APIKEY" in the root folder', 1);
    }

    $response = $MailChimp->addSubscriber('d504af86ef', $firstname, $lastname, $email);
    var_dump($response);

?>