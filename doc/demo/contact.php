<?php
foreach ($_POST as $key => $val) {
    $$key = $val;
}
$to = 'nabeel@lava-brands.com';
$message_sent = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if ((!empty($email) == "") && (!empty($message) !== "")) {

        $headers = "From: $name<$email>\r\nReturn-path: $email";

        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

        $message = "<h2>Contact from BERTO Template</h2>";
        $message .= "First name: " . $name . '<br>';
        $message .= "Email Address: " . $email . '<br>';;
        $message .= "City: " . $city . '<br>';;
        $message .= "Existing Customer of SIB: " . $is_customer . '<br>';;

        $subj = "BERTO Template - $subject";

        if (mail($to, $subj, $message, $headers)) {
            $message_sent = true;
        } else {
            $message_sent = false;
        }
    }
}

?><!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Berto - Personal Template</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="google" content="notranslate"/>

    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <!-- Place favicon.ico in the root directory -->

    <link rel="stylesheet" href="css/normalize.css">

    <!--Bootstrap CSS CDN -->
    <!--==================================================-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Font Icons
   ================================================== -->
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <!--<link rel="stylesheet" href="css/et-line-font.css">
    <link rel="stylesheet" href="css/ionicons.min.css">-->

    <!-- magnific-popup
    ================================================== -->
    <link rel="stylesheet" href="css/magnific-popup.css">


    <!-- Main CSS
       ================================================== -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/main.css" title="white">
    <link rel="stylesheet" href="css/main-black.css" title="black">

    <link rel="stylesheet" href="css/main-amber.css" title="amber">
    <link rel="stylesheet" href="css/main-blue.css" title="blue">
    <link rel="stylesheet" href="css/main-green.css" title="green">
    <link rel="stylesheet" href="css/main-orange.css" title="orange">
    <link rel="stylesheet" href="css/main-pink.css" title="pink">
    <link rel="stylesheet" href="css/main-purple.css" title="purple">
    <link rel="stylesheet" href="css/main-red.css" title="red">
    <link rel="stylesheet" href="css/main-teal.css" title="teal">

    <link rel="stylesheet" href="css/main-image-dark.css" title="image_dark">
    <link rel="stylesheet" href="css/main-image-light.css" title="image_light">


    <script src="js/vendor/modernizr-2.8.3.min.js"></script>


    <!-- Google web font
   ================================================== -->
    <link href='https://fonts.googleapis.com/css?family=Lato:400,300' rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Lekton:400,700|Vidaloka" rel="stylesheet">

    <!--[if lte IE 10]>
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Lekton:400"/>
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Lekton:700"/>
    <![endif]-->

</head>
<body>
<!--[if lt IE 8]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
    your browser</a> to improve your experience.</p>
<![endif]-->

<!--<div class="loading" >Berto</div>-->

<!-- Navigation section
================================================== -->
<nav class="navbar navbar-default full-page-nav-container">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <div class="logo"><a href="index.html">BERTO</a></div>
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse collapsed" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li><a href="index.html#about">About <span><span>About</span></span></a></li>
                <li><a href="index.html#resume">Resume <span>Resume</span></a></li>
                <li><a href="index.html#portfolio">Portfolio <span><span>Portfolio</span></span></a></li>
                <li><a href="index.html#contact">Contact <span>Contact</span></a></li>
            </ul>

        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>

<div class="wrap">
    <!-- Home section
    ================================================== -->
    <section id="home">
        <div class="container-fluid">
            <div class="row">

                <div class="col-md-12 text-center">
                    <!--<img src="images/profile-img.jpg" class="img-circle img-responsive" alt="Profile">-->

                    <?php if ($message_sent) { ?>
                        <div id="typed-title">
                            <p>Thank you for contacting us.</p>
                        </div>

                        <div id="typed-sub-title">
                            <p>We will get back to you as soon as possible.</p>
                        </div>

                    <?php } else { ?>
                        <div id="typed-title">
                            <p>Something went wrong.</p>
                        </div>

                        <div id="typed-sub-title">
                            <p>please try again later.</p>
                        </div>

                    <?php } ?>
                    <h1 class="title "><span class="typed"></span></h1>
                    <div class="sub-title"><span class="sub-typed"></span></div>

                </div>

            </div>
        </div>
    </section>


</div>

<a href="#0" class="back-to-top floating  fa fa-chevron-circle-up hidden-xs hidden-sm"></a>
<!-- Footer section
================================================== -->
<footer>
    <div class="container-fluid ">
        <div class="row">

            <ul class="social-icon text-center">
                <li><a href="#" class="fa fa-facebook"></a></li>
                <li><a href="#" class="fa fa-twitter"></a></li>
                <li><a href="#" class="fa fa-dribbble"></a></li>
                <li><a href="#" class="fa fa-behance"></a></li>
            </ul>

            <p class="copy">Berto Copyright © 2016.</p>

        </div>
    </div>
</footer>


<!-- jQuery CDN -->
<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<!-- jQuery local fallback -->
<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.12.0.min.js"><\/script>')</script>


<!-- Bootstrap JS CDN -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
        crossorigin="anonymous"></script>
<!-- Bootstrap JS local fallback -->
<script>if (typeof($.fn.modal) === 'undefined') {
        document.write('<script src="js/vendor/bootstrap.min.js"><\/script>')
    }</script>


<script src="js/plugins.js"></script>
<script src="js/main.min.js?v=4"></script>

<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
<script>
    (function (b, o, i, l, e, r) {
        b.GoogleAnalyticsObject = l;
        b[l] || (b[l] =
            function () {
                (b[l].q = b[l].q || []).push(arguments)
            });
        b[l].l = +new Date;
        e = o.createElement(i);
        r = o.getElementsByTagName(i)[0];
        e.src = 'https://www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e, r)
    }(window, document, 'script', 'ga'));
    ga('create', 'UA-XXXXX-X', 'auto');
    ga('send', 'pageview');
</script>


<!-- Bootstrap CSS local fallback -->
<script>
    $(document).ready(function () {
        var bodyColor = $('body').css('color');
        if (bodyColor != 'rgb(51, 51, 51)') {
            $("head").prepend('<link rel="stylesheet" href="css/bootstrap.min.css">');
        }
    });
</script>


<!--Font Awesome fallback-->
<script>
    /*    $(document).ready(function () {

     var $span = $('<span class="fa" style="display:none"></span>').appendTo('body');
     console.log($span.css('fontFamily'));
     if ($span.css('fontFamily') !== 'FontAwesome') {
     // Fallback Link
     console.log('falllback');
     $('head').append('<link href="/css/font-awesome.min.css" rel="stylesheet">');
     }
     $span.remove();
     });*/
</script>

<div class="switcher toggled">
    <h3>Choose color</h3>
    <div class="color-panel clearfix">
        <a href="javascript:void(0)" data-rel="white" class="color styleswitch" style="background-color:#fff"> </a>
        <a href="javascript:void(0)" data-rel="black" class="color styleswitch" style="background-color:#000"> </a>

        <a href="javascript:void(0)" data-rel="purple" class="color styleswitch" style="background-color:#AB47BC;"> </a>
        <a href="javascript:void(0)" data-rel="amber" class="active color styleswitch"
           style="background-color:#FFCA28;"> </a>
        <a href="javascript:void(0)" data-rel="orange" class="color styleswitch" style="background-color:#FFA726"> </a>
        <a href="javascript:void(0)" data-rel="blue" class="color styleswitch" style="background-color:#29B6F6;"> </a>
        <a href="javascript:void(0)" data-rel="green" class="color styleswitch" style="background-color:#66BB6A;"> </a>
        <a href="javascript:void(0)" data-rel="pink" class="color styleswitch" style="background-color:#EC407A;"> </a>
        <a href="javascript:void(0)" data-rel="red" class="color styleswitch" style="background-color:#EF5350;"> </a>


        <div class="clearfix"></div>
        <div class="switcher-title">Image Option</div>

        <a href="javascript:void(0)" data-rel="image_dark" class="color styleswitch img-dark"
           style="background-color:#131313;"> </a>
        <a href="javascript:void(0)" data-rel="image_light" class="color styleswitch img-light"
           style="background-color:#ffffff;"> </a>

    </div>
    <div class="switcher-control"><i class="fa fa-gear"></i></div>
</div>
</body>
</html>
