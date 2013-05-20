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

$table = $REX['TABLE_PREFIX'] . 'redactor_profiles';
$func = rex_request('func', 'string', '');
$entry_id = rex_request('entry_id', 'int', -1);
$fieldSet = $I18N->Msg('redactor_fieldset');

// Hinzufügen / Bearbeiten
if ($func == 'add' || $func == 'edit')
{

  echo '<div class="rex-toolbar"><div class="rex-toolbar-content">';
  echo '<p><a class="rex-back" href="index.php?page='.$page.'&amp;clang='.$REX['CUR_CLANG'].'&amp;subpage='.$subpage.'">'.$I18N->Msg('redactor_back').'</a></p>';
  echo '</div></div>';

  echo '<div class="rex-addon-output-v2">';

  require_once $REX['INCLUDE_PATH'] . '/addons/redactor/classes/class.form.inc.php';

  $form = new rex_form_redactor($table, $fieldSet, 'id='. $entry_id, 'post', false, 'rex_form_redactor');
  //$form = rex_form::factory($table, $fieldSet, 'id='. $entry_id, 'post', false, 'rex_form_redactor');

  if($func == 'edit')
  {
    $form->addParam('entry_id', $entry_id);
  }

  $field = &$form->addTextField('name');
  $field->setAttribute('maxlength', '30');
  $field->setLabel($I18N->Msg('redactor_name'));

  $field = &$form->addTextField('description');
  $field->setLabel($I18N->Msg('redactor_description'));

  $field = &$form->addSelectField('lang');
  $field->setLabel($I18N->Msg('redactor_lang'));
  $select = &$field->getSelect();
  $select->addOption($I18N->Msg('redactor_select'), 0);
  $select->addOption('---', -1);
  if ($handle = opendir($REX['MEDIAFOLDER'].'/addons/redactor/redactor/lang'))
  {
    while (false !== ($file = readdir($handle)))
    {
      if ($file != "." && $file != "..")
	   {
		  $va = explode('.', $file);
        $select->addOption($va[0], $va[0]);
      }
    }
    closedir($handle);
  }
  $select->setSize(1);
  
  $field = &$form->addTextAreaField('configuration');
  $field->setLabel($I18N->Msg('redactor_configuration'));
  $field->setAttribute('style', 'height:300px;font-family:\'Courier New\';');

  $form->show();

  echo '</div>';
}


// Löschen
if ($func == 'delete')
{
  if ($entry_id==2)
  {
    $func = '';
    echo rex_warning($I18N->Msg('redactor_profile_notdeleted'));
  }
  else
  {
    $query = "DELETE from $table WHERE id='".$entry_id."' ";
    $delsql = new rex_sql;
    $delsql->debugsql=0;
    $delsql->setQuery($query);
    $func = '';
    echo rex_info($I18N->Msg('redactor_profile_deleted'));
  }
}


// Liste
if ($func == '')
{
  echo '<div class="rex-addon-output-v2">';

  // SQL
  $sql = 'SELECT id, name, description, lang FROM '.$table.' WHERE ptype = 0 ORDER BY name ASC ';
  if ($REX['VERSION'] . $REX['SUBVERSION'] <= '40')
  {
    $list = new rex_list($sql);
  }
  else
  {
    $list = rex_list::factory($sql);
  }

  $list->addParam('clang', $REX['CUR_CLANG']);

  // <Caption tag>
  $list->setCaption($I18N->Msg('redactor_listtitle'));
  // summary Attribut bei einer neuartigen Tabellen definiton
  $list->addTableAttribute('summary', $I18N->Msg('redactor_listsummary'));

  // ICON
  $img = '<img src="../files/addons/redactor/redactor.gif" alt="###id### ###name###" title="###id### ###name###" />';
  $imgAdd = '<img src="../files/addons/redactor/redactor_plus.gif" alt="'.$I18N->Msg('redactor_addentry').'" title="'.$I18N->Msg('redactor_addentry').'" />';

  // ICON um eine neue Sprachersetzung zu definieren
  $imgHeader = '<a href="'. $list->getUrl(array('page'=>$page, 'clang'=>$REX['CUR_CLANG'], 'subpage'=>$subpage, 'func' => 'add')) .'">'. $imgAdd .'</a>';

  // Das ist das ICON welches in der ICON-Spalte angezeigt wird.
  $list->addColumn($imgHeader, $img, 0, array('<th class="rex-icon">###VALUE###</th>','<td class="rex-icon">###VALUE###</td>'));
  $list->setColumnParams($imgHeader, array('page'=>$page, 'clang'=>$REX['CUR_CLANG'], 'subpage'=>$subpage, 'func' => 'edit', 'entry_id' => '###id###'));
  
  if ($REX['VERSION'] . $REX['SUBVERSION'] <= '40')
  {
  }
  else
  {  
    $list->removeColumn('id');
    $list->addTableColumnGroup(array(40, '*', '*', 60, 80));

    $list->setColumnLabel('name', $I18N->msg('redactor_name'));
    $list->setColumnParams('name', array('page'=>$page, 'clang'=>$REX['CUR_CLANG'], 'subpage'=>$subpage, 'func' => 'edit', 'entry_id' => '###id###'));

    $list->setColumnLabel('description', $I18N->msg('redactor_description'));
    $list->setColumnParams('description', array('page'=>$page, 'clang'=>$REX['CUR_CLANG'], 'subpage'=>$subpage, 'func' => 'edit', 'entry_id' => '###id###'));

    $list->setColumnLabel('lang', $I18N->msg('redactor_lang'));
    $list->setColumnParams('lang', array('page'=>$page, 'clang'=>$REX['CUR_CLANG'], 'subpage'=>$subpage, 'func' => 'edit', 'entry_id' => '###id###'));

    $list->addColumn($I18N->msg('redactor_func'), $I18N->msg('redactor_delentry'));
    $list->setColumnParams($I18N->msg('redactor_func'), array('page'=>$page, 'clang'=>$REX['CUR_CLANG'], 'subpage'=>$subpage, 'func' => 'delete', 'entry_id' => '###id###'));

    $list->addLinkAttribute($I18N->msg('redactor_func'), 'onclick', 'return confirm(\'[###name###] - '.$I18N->msg('redactor_delentry').' ?\')');
    $list->setNoRowsMessage($I18N->Msg('redactor_profiles_nodata'));
  }

  $list->show();
  echo '</div>';
}
