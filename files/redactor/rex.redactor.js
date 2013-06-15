
$ = jQuery;

var actualredactor;

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

/* Open Mediapool */

function redactor_openMediaPool(id)
{
	if (typeof(id) == 'undefined')
	{
		id = '';
	}
	newPoolWindow('index.php?page=%MEDIAPOOL%&redactor=true&opener_input_field='+ id +'&clang='+redactor_getURLParam('clang'));
}


/* Datei Button */

function rex_redactor_media_ins(obj, event, key)
{
	actualredactor = this;
	redactor_openMediaPool(obj);
}

/* Image Button */

function rex_redactor_image(obj, event, key)
{
	actualredactor = this;
	redactor_openMediaPool('REDACTORIMG');
}

/* Linkmap Button */

function rex_redactor_link_ins(obj, event, key)
{
	actualredactor = this;
	openLinkMap('redactor', '&redactor=true&clang='+redactor_getURLParam('clang'));
}

/* Linkmap */

function rex_redactor_link_url(fieldid)
{
	openLinkMap(fieldid, '&redactor=true&clang='+redactor_getURLParam('clang'));
}

/* Link aus Modal einfügen */

function rex_linkProcess(link, name)
{
	var tab_selected = $('#redactor_tab_selected').val();
	var link = '', text = '', target = '', targetBlank = '';

	// url
	if (tab_selected === '1')
	{
		link = $('#redactor_link_url').val();
		text = $('#redactor_link_url_text').val();

		if ($('#redactor_link_blank').prop('checked'))
		{
			target = ' target="_blank"';
			targetBlank = '_blank';
		}

		// test url (add protocol)
		var pattern = '((xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}';
		var re = new RegExp('^(redaxo|http|ftp|https)://' + pattern, 'i');
		var re2 = new RegExp('^' + pattern, 'i');
		if (!isNaN(parseInt(link)))
		{
			link = 'redaxo://' + link;
		}
		else if (link.search('redaxo://') != 0 && link.search(re) == -1 && link.search(re2) == 0 && this.opts.linkProtocol)
		{
			link = this.opts.linkProtocol + link;
		}
	}
	// mailto
	else if (tab_selected === '2')
	{
		link = 'mailto:' + $('#redactor_link_mailto').val();
		text = $('#redactor_link_mailto_text').val();
	}
	// file-link
	else if (tab_selected === '3')
	{
		link = $('#redactor_link_file').val();
		text = $('#redactor_link_file_text').val();
	}
	// anchor
	else if (tab_selected === '4')
	{
		link = '#' + $('#redactor_link_anchor').val();
		text = $('#redactor_link_anchor_text').val();
	}
	if (text == '')
	{
		text = 'Linktext';
	}

	this.linkInsert('<a href="' + link + '"' + target + '>' + text + '</a>', $.trim(text), link, targetBlank);
	//this.selectionRemove();
	//this.modalClose();
}

/* Accesskey-Fix */

var rex_accesskeysEnabled = false;
