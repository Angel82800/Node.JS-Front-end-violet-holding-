<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */
 
return array(
  '*' => array(
    'omitScriptNameInUrls' => true,
    'preserveImageColorProfiles' => true,
    'backupDbOnUpdate' => false,
    'generateTransformsBeforePageLoad' => true,
    'maxUploadFileSize' => 33554432,
    'siteUrl' => '//'.$_SERVER['HTTP_HOST'].'/',
    'siteUrl' => array(
        'uk' => '//'.$_SERVER['HTTP_HOST'].'/uk/',
        'jp' => '//'.$_SERVER['HTTP_HOST'].'/jp/'
    ),
    'rootUrl' => '//'.$_SERVER['SITE_URL'],
    'environmentVariables' => array(
        'baseUrl' => '//'.$_SERVER['SITE_URL'].'/',
        'basePath' => $_SERVER['DOCUMENT_ROOT'].'/',
        'assetsUrl' => '//'.$_SERVER['SITE_URL'].'/'
    )
  ),
  $_SERVER['SITE_URL'] => array (
    'devMode' => $_SERVER['DEV_MODE'] === 'true' ? true: false,
  )
);