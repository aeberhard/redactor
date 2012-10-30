function redactor_getURLParam(strParamName){
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("?") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return unescape(strReturn);
}

/* Dateilink */ 

function rex_redactor_media(){
}

function rex_redactor_media_ins(){
	openMediaPool('TINYIMG');
}

function rex_redactor_media_del(){
	alert('function rex_redactor_media_del');
}

/* Image */ 

function rex_redactor_image(){
	openMediaPool('TINYIMG');
}

function insertImage(src,alt)
{
  alert ('insert '+ src + ' - ' + alt);
}

/* Linkmap */ 

function rex_redactor_link(){
}

function rex_redactor_link_ins(){
	openLinkMap('Hier der Feldname der Textarea', '&clang='+redactor_getURLParam('clang'));
}

function rex_redactor_link_del(){
	alert('function rex_redactor_link_del');
}
function insertLink(link, title)
{
  alert ('insert '+ link + ' - ' + title);
}
