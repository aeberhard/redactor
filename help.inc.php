<?php

/**
 * redactor Addon
 *
 * @author andreaseberhard[at]gmail[dot]com Andreas Eberhard
 * @author <a href="http://www.redaxo.de">www.redaxo.de</a>
 *
 * @package redaxo4
 * @version svn:$Id$
 */

$mypage = 'redactor';

if (isset($I18N) && is_object($I18N))
{
  if ($REX['VERSION'] . $REX['SUBVERSION'] < '42')
  {
    $I18N->locale = $REX['LANG'];
    $I18N->filename = $REX['INCLUDE_PATH'] . '/addons/' . $mypage . '/lang/'. $REX['LANG'] . ".lang";
    $I18N->loadTexts();
  }
  else
  {
    $I18N->appendFile($REX['INCLUDE_PATH'] . '/addons/' . $mypage . '/lang/');
  }
}
?>

<h3><?php echo $I18N->msg('redactor_title'); ?></h3>
<br />
<p>
<?php echo $I18N->msg('redactor_versinfo'); ?>
<br /><br />
<?php echo $I18N->msg('redactor_shorthelp'); ?>
</p>
