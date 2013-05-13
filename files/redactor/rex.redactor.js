
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

function redactor_openMediaPool(id)
{
	if (typeof(id) == 'undefined')
	{
		id = '';
	}
	newPoolWindow('index.php?page=mediapool&redactor=true&opener_input_field='+ id +'&clang='+redactor_getURLParam('clang'));
}


/* Dateilink */ 

function rex_redactor_media_ins(obj, event, key)
{
	actualredactor = obj;
	redactor_openMediaPool('REDACTORFILE');
}

/* Image */ 

function rex_redactor_image(obj, event, key)
{
	actualredactor = obj;
	redactor_openMediaPool('REDACTORIMG');
}

/* Linkmap */ 

function rex_redactor_link_ins(obj, event, key)
{
	actualredactor = obj;
	openLinkMap('VALUE[1]', '&redactor=true&clang='+redactor_getURLParam('clang'));
}

/* Accesskey-Fix */

var rex_accesskeysEnabled = false;
