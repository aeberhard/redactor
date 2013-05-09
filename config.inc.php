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

// Versionsnummer, auch in den Language-Files ändern
$REX['ADDON']['version'][$mypage] = '0.5';

// Fix für REDAXO < 4.2.x
if (!isset($REX['FRONTEND_FILE'])) 
{
  $REX['FRONTEND_FILE'] = 'index.php';
}

// Fix für REDAXO < 4.5.x
if (!isset($REX['MEDIA_DIR'])) 
{
  $REX['MEDIA_DIR'] = 'files';
}

// Backend
if ($REX['REDAXO'])
{

  if (!isset($I18N))
  {
    $I18N = new i18n($REX['LANG'],$REX['INCLUDE_PATH'] . '/addons/' . $mypage . '/lang/');
  }
  
  // I18N, Addon-Titel für die Navigation
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
    $REX['ADDON']['page'][$mypage] = $mypage;
    $REX['ADDON']['name'][$mypage] = $I18N->msg('redactor_menu_link');
  }

  // Addoninfos, Perms usw.
  $REX['ADDON']['perm'][$mypage] = $mypage.'[]';

  $REX['ADDON']['author'][$mypage] = 'Andreas Eberhard';
  $REX['ADDON']['supportpage'][$mypage] = 'forum.redaxo.de';
  $REX['PERM'][] = $mypage.'[]';

  // Subpages
  $REX['ADDON'][$mypage]['SUBPAGES'] = array();
  $REX['ADDON'][$mypage]['SUBPAGES'][] = array ('', $I18N->msg('redactor_menu_info'));
  $REX['ADDON'][$mypage]['SUBPAGES'][] = array ('settings', $I18N->msg('redactor_menu_settings'));
  $REX['ADDON'][$mypage]['SUBPAGES'][] = array ('profiles', $I18N->msg('redactor_menu_profiles'));
  $REX['ADDON'][$mypage]['SUBPAGES'][] = array ('css', $I18N->msg('redactor_menu_css'));
}


// Konfiguration

// --- DYN
$REX['ADDON']['redactor']['backend'] = '1';
$REX['ADDON']['redactor']['frontend'] = '1';
$REX['ADDON']['redactor']['excludecats'] = 'redactor';
$REX['ADDON']['redactor']['excludeids'] = '';
$REX['ADDON']['redactor']['imageparams'] = '%FRONTEND_FILE%?redactorimg=';
// --- /DYN


// Img-Source
$REX['redactor']['IMAGE_SRC'] = str_replace('%FRONTEND_FILE%', $REX['FRONTEND_FILE'], $REX['ADDON']['redactor']['imageparams']);
if (trim($REX['ADDON']['redactor']['imageparams'])=='')
{
	$REX['redactor']['IMAGE_SRC'] = $REX['HTDOCS_PATH'] . $REX['MEDIA_DIR'].'/';
}

// Include Functions
include($REX['INCLUDE_PATH'] . '/addons/' . $mypage . '/functions/functions.inc.php');

// Request page/redactor
$page = rex_request('page', 'string', '');
if ($page === 'medienpool')
{
  $page = 'mediapool';
}

$redactor = rex_request('redactor', 'string', '');
if (($redactor == '') and (isset($_COOKIE['redactor_mediapool'])))
{
  $redactor = $_COOKIE['redactor_mediapool'];
  setcookie('redactor_mediapool', '');
}

// OUTPUT_FILTER - redactor-Scripte einbinden, Mediapool + Linkmap anpassen
if (($REX['REDAXO'] and $REX['ADDON']['redactor']['backend'] === '1') or (!$REX['REDAXO'] and $REX['ADDON']['redactor']['frontend'] === '1'))
{
  rex_register_extension('OUTPUT_FILTER', 'redactor_output_filter');
}

// Extension-Point für Hinzufügen+übernehmen
if ((($page === 'mediapool') or ($page === 'linkmap')) and ( $redactor === 'true'))
{
  rex_register_extension('OUTPUT_FILTER', 'redactor_opf_media_linkmap');
  rex_register_extension('MEDIA_ADDED', 'redactor_media_added');
}

// JavaScript für Backend und Frontend generieren
// Einbindung redactor mit verschiedenen Profilen
if (rex_request('redactorinit', 'string', '') === 'true')
{
  redactor_generate_script();
}

// JavaScript für Mediapool generieren
if (rex_request('redactormedia', 'string', '') === 'true')
{
  redactor_generate_mediascript();
}

// JavaScript für Linkmap generieren
if (rex_request('redactorlink', 'string', '') === 'true')
{
  redactor_generate_linkscript();
}

// CSS generieren
if (rex_request('redactorcss', 'string', '') === 'true')
{
  redactor_generate_css();
}

// Ausgabe Images
if (rex_request('redactorimg', 'string', '') <> '')
{
  redactor_generate_image();
}
