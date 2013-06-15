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

unset($_SESSION['redactor']);

$table = $REX['TABLE_PREFIX'] . 'redactor_profiles';
$page = rex_request('page', 'string');
$subpage = rex_request('subpage', 'string');
$func = rex_request('func', 'string');
$clips = rex_request('clips', 'string');

// Update
if ($func == 'update')
{
  $sqlu = new rex_sql();
  $sqlu->debugsql=0;

  $query = 'SELECT configuration FROM '.$table.' WHERE id = \'5\' AND ptype = \'1\' ';
  $sql = new rex_sql;
  $sql->debugsql=0;
  $sql->setQuery($query);
  if ($sql->getRows() > 0)
  {
    $sqlu->setTable($table);
    $sqlu->setValue('id', '5');
    $sqlu->setValue('configuration', $clips);
    $sqlu->setWhere('id = \'5\' AND ptype = \'1\'');
    if($sqlu->update())
    {
      echo rex_info($I18N->msg('redactor_clips_saved'));
    }
    else
    {
      echo rex_warning($I18N->msg('redactor_clips_not_saved'));
    }
  }
  else
  {
    $sqlu->setTable($table);
    $sqlu->setValue('id', '5');
    $sqlu->setValue('name', 'clips');
    $sqlu->setValue('ptype', '1');
    $sqlu->setValue('description', 'Clips fuer den Redactor');
    $sqlu->setValue('configuration', $clips);
    if($sqlu->insert())
    {
      echo rex_info($I18N->msg('redactor_clips_saved'));
    }
    else
    {
      echo rex_warning($I18N->msg('redactor_clips_not_saved'));
    }
  }
}

// Clips aus Tabelle bereitstellen
  $query = 'SELECT configuration FROM '.$table.' WHERE id = \'5\' AND ptype = \'1\' ';
  $sql = new rex_sql;
  $sql->debugsql=0;
  $sql->setQuery($query);
  if ($sql->getRows() > 0)
  {
    $clips = $sql->getValue('configuration');
  }
?>

<div class="rex-addon-output">
<div class="rex-form">
  <h2 class="rex-hl2"><?php echo $I18N->msg('redactor_clips_title'); ?></h2>

  <form action="index.php" method="post">
  <fieldset class="rex-form-col-1">

  <div class="rex-form-wrapper">
    <input type="hidden" name="page" value="<?php echo $page; ?>" />
    <input type="hidden" name="subpage" value="<?php echo $subpage; ?>" />
    <input type="hidden" name="func" value="update" />

    <div class="rex-form-row rex-form-element-v1">
      <p class="rex-form-text">
        <label for="clips"><?php echo $I18N->msg('redactor_clips_text'); ?></label>
        <textarea class="rex-form-text" id="clips" name="clips" cols="50" rows="12" style="width:550px;height:300px;font-family:'Courier New';"><?php echo $clips; ?></textarea>
      </p>
    </div>

    <div class="rex-form-row rex-form-element-v1">
      <p class="rex-form-submit">
        <input type="submit" class="rex-form-submit" name="sendit" value="<?php echo $I18N->msg('update'); ?>" />
      </p>
    </div>

  </div>

  </fieldset>
  </form>

</div>
</div>

<div class="rex-addon-output">

  <h2 class="rex-hl2"><?php echo $I18N->msg('redactor_clips_infotitle'); ?></h2>

  <div class="rex-addon-content">
    <p class="rex-tx1">
    <?php echo $I18N->msg('redactor_clips_info'); ?>
    </p>
  </div>

</div>
