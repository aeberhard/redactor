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
$js = rex_request('js', 'string');

// Update
if ($func == 'update')
{
  $sqlu = new rex_sql();
  $sqlu->debugsql=0;

  $query = 'SELECT configuration FROM '.$table.' WHERE id = \'4\' AND ptype = \'1\' ';
  $sql = new rex_sql;
  $sql->debugsql=0;
  $sql->setQuery($query);
  if ($sql->getRows() > 0)
  {
    $sqlu->setTable($table);
    $sqlu->setValue('id', '4');
    $sqlu->setValue('configuration', $js);
    $sqlu->setWhere('id = \'4\' AND ptype = \'1\'');
    if($sqlu->update())
    {
      echo rex_info($I18N->msg('redactor_js_saved'));
    }
    else
    {
      echo rex_warning($I18N->msg('redactor_js_not_saved'));
    }
  }
  else
  {
    $sqlu->setTable($table);
    $sqlu->setValue('id', '4');
    $sqlu->setValue('name', 'js');
    $sqlu->setValue('ptype', '1');
    $sqlu->setValue('description', 'JS fuer den Redactor');
    $sqlu->setValue('configuration', $js);
    if($sqlu->insert())
    {
      echo rex_info($I18N->msg('redactor_js_saved'));
    }
    else
    {
      echo rex_warning($I18N->msg('redactor_js_not_saved'));
    }
  }
}

// JS aus Tabelle bereitstellen
  $query = 'SELECT configuration FROM '.$table.' WHERE id = \'4\' AND ptype = \'1\' ';
  $sql = new rex_sql;
  $sql->debugsql=0;
  $sql->setQuery($query);
  if ($sql->getRows() > 0)
  {
    $js = $sql->getValue('configuration');
  }
?>

<div class="rex-addon-output">
<div class="rex-form">
  <h2 class="rex-hl2"><?php echo $I18N->msg('redactor_js_title'); ?></h2>

  <form action="index.php" method="post">
  <fieldset class="rex-form-col-1">

  <div class="rex-form-wrapper">
    <input type="hidden" name="page" value="<?php echo $page; ?>" />
    <input type="hidden" name="subpage" value="<?php echo $subpage; ?>" />
    <input type="hidden" name="func" value="update" />

    <div class="rex-form-row rex-form-element-v1">
      <p class="rex-form-text">
        <label for="js"><?php echo $I18N->msg('redactor_js_text'); ?></label>
        <textarea class="rex-form-text" id="js" name="js" cols="50" rows="12" style="width:550px;height:300px;font-family:'Courier New';"><?php echo $js; ?></textarea>
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

  <h2 class="rex-hl2"><?php echo $I18N->msg('redactor_js_infotitle'); ?></h2>

  <div class="rex-addon-content">
    <p class="rex-tx1">
    <?php echo $I18N->msg('redactor_js_info'); ?>
    </p>
  </div>

</div>
