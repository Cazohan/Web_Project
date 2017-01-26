<?php
    header('WWW-Authenticate: Basic');
    header('HTTP/1.0 401 Unauthorized');
if ($_SERVER['PHP_AUTH_USER'] == "zaz" && $_SERVER['PHP_AUTH_USER'] == "jaimelespetitsponeys")
?><html><body>Good</body></html>