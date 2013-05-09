
$ = jQuery;

var imagesrc = '%IMAGE_SRC%';

// insert image
function redactor_selectMedia(media, name)
{
	// Linktext aus Medienpool übernehmen
	linktext = $.trim(name);
	
	// Linktitel ausgeben
	title = '';
	if (window.opener.actualredactor.opts.rex_mediatitle == true)
	{
		title = ' title="' + linktext + '"';
	}
	
	// Bild einfügen
	html = '<img src="' + imagesrc + media + '"' + title + ' />';
	window.opener.actualredactor.insertHtml(html);

	window.close();
}

// insert filelink
function redactor_selectFile(media, name)
{
// Linktext aus Medienpool übernehmen
	linktext = $.trim(name);

	// Linktitel ausgeben
	title = '';
	if (window.opener.actualredactor.opts.rex_filetitle == true)
	{
		title = ' title="' + media + '"';
	}

	// Linktext übernehmen wenn Text markiert ist
	var seltext = window.opener.actualredactor.getSelection();
	seltext = $.trim(seltext);
	if (seltext != '')
	{
		linktext = seltext;
	}
	if (linktext == '')
	{
		linktext = media;
	}
	
	// Dateilink einfügen
	html = '<a href="./%MEDIAFOLDER%/' + media + '"' + title + '>' + linktext + '</a>';
	window.opener.actualredactor.insertHtml(html);

	window.close();
}
