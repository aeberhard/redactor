
$ = jQuery;

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

// insert link
function redactor_insertLink(link, name)
{
	rfield = redactor_getURLParam('opener_input_field');

	// Linktext aus Linkmap übernehmen
	linktext = $.trim(name);

	// Link im Editor einfügen
	if (rfield==='redactor')
	{
		// Linktitel ausgeben
		title = '';
		if (window.opener.actualredactor.opts.rex_linktitle == true)
		{
			title = ' title="' + name + '"';
		}
		
		// Linktext übernehmen wenn Text markiert ist
		var seltext = window.opener.actualredactor.getSelection();
		seltext = $.trim(seltext);
		if (seltext != '')
		{
			linktext = seltext;
		}
		
		// Link einfügen
		html = '<a href="' + link + '"' + title + '>' + linktext + '</a>';
		window.opener.actualredactor.insertHtml(html);
	}
	
	// Link im Link-Popup einfügen
	if (rfield==='redactor_link_url')
	{
		if (window.opener.document.getElementById('redactor_link_url_text').value==='')
		{
			window.opener.document.getElementById('redactor_link_url_text').value=linktext;
		}
		window.opener.document.getElementById('redactor_link_url').value = link;
	}
	
	// Link im Bilder-Popup einfügen
	if (rfield==='redactor_file_link')
	{
		if (window.opener.document.getElementById('redactor_file_alt').value==='')
		{
			window.opener.document.getElementById('redactor_file_alt').value=linktext;
		}
		window.opener.document.getElementById('redactor_file_link').value = link;
	}
	
	window.close();
}
