
$ = jQuery;

var imagesrc = '%IMAGE_SRC%';

function redactor_getURLParam(strParamName)
{
	var strReturn = "";
	var strHref = window.location.href;
	if ( strHref.indexOf("?") > -1 )
	{
		var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
		var aQueryString = strQueryString.split("&");
		for ( var iParam = 0; iParam < aQueryString.length; iParam++ )
		{
			if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 )
			{
				var aParam = aQueryString[iParam].split("=");
				strReturn = aParam[1];
				break;
			}
		}
	}
	return unescape(strReturn);
}

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
	rfield = redactor_getURLParam('opener_input_field');

	// Link im Editor einfügen
	if (rfield==='rex_media_ins')
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
	
	if (rfield==='redactor_link_file')
	{
		// Linktext aus Medienpool übernehmen
		linktext = $.trim(name);
		
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

		if (window.opener.document.getElementById('redactor_link_file_text').value==='')
		{
			window.opener.document.getElementById('redactor_link_file_text').value=linktext;
		}
		window.opener.document.getElementById('redactor_link_file').value = './%MEDIAFOLDER%/' +media;
		
		window.close();
	}
}
