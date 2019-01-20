<!-- foreach function in PHP -->
<!-- GNU nano 2.3.1               File: foreach1.php                                       -->

<?php

$fred[2] = 3;
$fred[3] = 5;
$fred[4] = 7;

foreach($fred as $ethel) {
        print "$ethel<br>";
}

foreach($fred as $lucy => $ethel) {
        print "$lucy = $ethel<br>";
}

?>


<!-- output:
3
5
7
2 = 3
3 = 5
4 = 7 -->


<?php
        $courseList['523'] = 'Haas';
        $courseList['760'] = 'Capra';
        $courseList['509'] = 'Arguello';

        print_r($courseList);

        ksort($courseList);
        print_r($courseList);

        asort($courseList);
        print_r($courseList);
?>


<!-- // exercise_2.php -->
<?php
     	$courseList['523'] = 'Haas';
        $courseList['760'] = 'Capra';
        $courseList['509'] = 'Arguello';

        print_r($courseList);

        ksort($courseList);
        print_r($courseList);

        asort($courseList);
        print_r($courseList);

        $sem['spring'] = $courseList;
        $sem['fall'] = $courseList;
        print_r($sem);
        echo $sem['spring'][509];
?>


