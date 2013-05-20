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
 	$modulname = 'Redactor-Texteditor';
	$install = rex_request('install', 'integer', 0);
	$modulid = rex_request('modul_id', 'integer', 0);
	
	// evtl. bestehendes Modul ermitteln
	if ($modulid == 0)
	{
		$query = 'SELECT id, name from ' . $REX['TABLE_PREFIX'] . 'module WHERE name = \'' . $modulname . '\' ';
		$sql = new rex_sql;
		$sql->debugsql=0;
		$sql->setQuery($query);
		if ($sql->getRows() == 1)
		{
			$modulid = $sql->getValue('id');
		}
	}

	// Modul installieren/aktualisieren
	if ($install == 1)
	{
		$modul_input = rex_get_file_contents($REX["INCLUDE_PATH"] . '/addons/redactor/modul_input.txt');
		$modul_output = rex_get_file_contents($REX["INCLUDE_PATH"] . '/addons/redactor/modul_output.txt');	
		
		$sql = new rex_sql;
		$sql->debugsql=0;
		$sql->setTable($REX['TABLE_PREFIX'] . 'module');
		$sql->setValue('eingabe', addslashes($modul_input));
		$sql->setValue('ausgabe', addslashes($modul_output));	
		
		if ($modulid == 0)
		{
			$sql->setValue('name', $modulname);
			$sql->addGlobalCreateFields();			
			$sql->insert();
			$modulid = (int) $sql->getLastId();		
			echo rex_info($I18N->msg('redactor_modul_added', $modulname));
		}
		else
		{
			$sql->addGlobalUpdateFields();
			$sql->setWhere('id = \'' . $modulid . '\' ');
			$sql->update();		
			echo rex_info($I18N->msg('redactor_modul_updated', $modulname));
		}
	}
?>

<div class="rex-addon-output">

  <h2 class="rex-hl2"><?php echo $I18N->msg('redactor_title'); ?></h2>

  <div class="rex-addon-content">
    <p class="rex-tx1">
    <?php echo $I18N->msg('redactor_versinfo'); ?>
    </p>
    <p class="rex-tx1">
    <?php echo $I18N->msg('redactor_shorthelp'); ?>
    </p>
    <p class="rex-tx1">
    <?php echo $I18N->msg('redactor_longhelp'); ?>
    </p>
    <p class="rex-tx1">
    <?php echo $I18N->msg('redactor_nodel_notice'); ?>
    </p>

  </div>

</div>

<div class="rex-addon-output">

  <h2 class="rex-hl2"><?php echo $I18N->msg('redactor_title_module'); ?></h2>

  <div class="rex-addon-content">
    <p class="rex-tx1">
      <ul><li>
<?php
	if ($modulid == 0)
	{
		echo $I18N->msg('redactor_modul_install', $modulname);
	}
	else
	{
		echo $I18N->msg('redactor_modul_update', $modulname, $modulid);
	}
?>		 
	 </li></ul><br />
    </p>

    <p class="rex-tx1">
	 <strong><?php echo $I18N->msg('redactor_title_module_input'); ?></strong><br /><br />
    <?php echo $I18N->msg('redactor_help_module_input'); ?>
    </p>
    <?php rex_highlight_string(rex_get_file_contents($REX['INCLUDE_PATH'].'/addons/redactor/modul_input.txt')); ?><br />
	 
    <p class="rex-tx1">
	 <strong><?php echo $I18N->msg('redactor_title_module_output'); ?></strong><br /><br />
    <?php echo $I18N->msg('redactor_help_module_output'); ?>
    </p>
    <?php rex_highlight_string(rex_get_file_contents($REX['INCLUDE_PATH'].'/addons/redactor/modul_output.txt')); ?>
  </div>
  
</div>

