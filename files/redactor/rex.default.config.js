initCallback: function(){
	
			$.extend( this.opts,
			{
				
				modal_image_edit: String()
				+ '<section>'
					+ '<label>' + this.opts.curLang.title + '</label>'
					+ '<input id="redactor_file_alt" class="redactor_input" />'
					+ '<label>' + this.opts.curLang.link + '&nbsp;&nbsp;&nbsp;<a href="javascript:rex_redactor_link_url(\'redactor_file_link\')"><strong>REDAXO '+RLANG.link_insert+'</strong></a></label>'
					+ '<input id="redactor_file_link" class="redactor_input" />'
					+ '<label>' + this.opts.curLang.image_position + '</label>'
					+ '<select id="redactor_form_image_align">'
						+ '<option value="none">' + this.opts.curLang.none + '</option>'
						+ '<option value="left">' + this.opts.curLang.left + '</option>'
						+ '<option value="right">' + this.opts.curLang.right + '</option>'
					+ '</select>'
				+ '</section>'
				+ '<footer>'
					+ '<a href="#" id="redactor_image_delete_btn" class="redactor_modal_btn">' + this.opts.curLang._delete + '</a>&nbsp;&nbsp;&nbsp;'
					+ '<a href="#" class="redactor_modal_btn redactor_btn_modal_close">' + this.opts.curLang.cancel + '</a>'
					+ '<input type="button" name="save" class="redactor_modal_btn" id="redactorSaveBtn" value="' + this.opts.curLang.save + '" />'
				+ '</footer>',

				modal_link: String()
				+ '<section>'
					+ '<form id="redactorInsertLinkForm" method="post" action="">'
						+ '<div id="redactor_tabs">'
							+ '<a href="#" class="redactor_tabs_act">URL</a>'
							+ '<a href="#">Email</a>'
							+ '<a href="#">' + this.opts.curLang.anchor + '</a>'
						+ '</div>'
						+ '<input type="hidden" id="redactor_tab_selected" value="1" />'
						+ '<div class="redactor_tab" id="redactor_tab1">'
							+ '<label>' + this.opts.curLang.web + '&nbsp;&nbsp;&nbsp;<a href="javascript:rex_redactor_link_url(\'redactor_link_url\')"><strong>REDAXO '+this.opts.curLang.link_insert+'</strong></a></label>'
							+ '<input type="text" id="redactor_link_url" class="redactor_input"  />'
							+ '<label>' + this.opts.curLang.text + '</label>'
							+ '<input type="text" class="redactor_input redactor_link_text" id="redactor_link_url_text" />'
							+ '<label><input type="checkbox" id="redactor_link_blank"> ' + this.opts.curLang.link_new_tab + '</label>'
						+ '</div>'
						+ '<div class="redactor_tab" id="redactor_tab2" style="display: none;">'
							+ '<label>' + this.opts.curLang.mailto + '</label>'
							+ '<input type="text" id="redactor_link_mailto" class="redactor_input" />'
							+ '<label>' + this.opts.curLang.text + '</label>'
							+ '<input type="text" class="redactor_input redactor_link_text" id="redactor_link_mailto_text" />'
						+ '</div>'
						+ '<div class="redactor_tab" id="redactor_tab3" style="display: none;">'
							+ '<label>' + this.opts.curLang.anchor + '</label>'
							+ '<input type="text" class="redactor_input" id="redactor_link_anchor"  />'
							+ '<label>' + this.opts.curLang.text + '</label>'
							+ '<input type="text" class="redactor_input redactor_link_text" id="redactor_link_anchor_text" />'
						+ '</div>'
					+ '</form>'
				+ '</section>'
				+ '<footer>'
					+ '<a href="#" class="redactor_modal_btn redactor_btn_modal_close">' + this.opts.curLang.cancel + '</a>'
					+ '<input type="button" class="redactor_modal_btn" id="redactor_insert_link_btn" value="' + this.opts.curLang.insert + '" />'
				+ '</footer>'			

			});

},
		
buttonsCustom:{
	
	rex_link:{
		title: RLANG.link_insert,
		callback: function(buttonName, buttonDOM, buttonObject){
					actualredactor = this;

					var callback = $.proxy(function(){
						this.insert_link_node = false;
						this.selectionSave();
						
						var sel = this.getSelection();
						var url = '', text = '', target = '';
						
						var elem = this.getParent();
						var par = $(elem).parent().get(0);
						if (par && par.tagName === 'A')
						{
							elem = par;
						}

						if (elem && elem.tagName === 'A')
						{
							url = elem.href;
							url = url.replace(/\/$/i, '');
							text = $(elem).text();
							target = elem.target;

							this.insert_link_node = elem;
						}
						else text = sel.toString();
			
						$('.redactor_link_text').val(text);
						
						var tabs = $('#redactor_tabs').find('a');
						if (this.opts.linkAnchor === false) tabs.eq(3).remove();
						if (this.opts.linkEmail === false) tabs.eq(1).remove();
				
						var thref = self.location.href.replace(/\/$/i, '');
						var turl = url.replace(thref, '');

						if (url.search('mailto:') === 0)
						{
							this.modalSetTab.call(this, 2);
							$('#redactor_tab_selected').val(2);
							$('#redactor_link_mailto').val(url.replace('mailto:', ''));
						}
						else if (url.search('/redaxo/files/') > 0 && url.search('#') < 0)
						{
							this.modalSetTab.call(this, 3);						
							$('#redactor_tab_selected').val(3);
							var shortfile = url.split('/redaxo/files/');
							$('#redactor_link_file').val('./%MEDIAFOLDER%/'+shortfile[1]);
						}
						else if (url.search('#') > 0 && url.search('/redaxo/') > 0)
						{
							this.modalSetTab.call(this, 4);
							$('#redactor_tab_selected').val(4);
							var anchor = url.split('#');
							$('#redactor_link_anchor').val(anchor[1]);
						}
						else
						{
							this.modalSetTab.call(this, 1);
							$('#redactor_tab_selected').val(1);
							$('#redactor_link_url').val(turl);
						}
						
						if (target === '_blank') $('#redactor_link_blank').prop('checked', true);
					
						$('#redactor_insert_link_btn').click($.proxy(rex_linkProcess, this));
					}, this);
				
					this.modalInit(this.opts.curLang.link_insert,
					'<section>'
					+ '<form id="redactorInsertLinkForm" method="post" action="">'
						+ '<div id="redactor_tabs">'
							+ '<a href="#" class="redactor_tabs_act">' + this.opts.curLang.web + '</a>'
							+ '<a href="#">' + this.opts.curLang.mailto + '</a>'
							+ '<a href="#">' + this.opts.curLang.file + '</a>'
							+ '<a href="#">' + this.opts.curLang.anchor + '</a>'
						+ '</div>'
						+ '<input type="hidden" id="redactor_tab_selected" value="1" />'
						+ '<div class="redactor_tab" id="redactor_tab1">'
							+ '<label>' + this.opts.curLang.web + '&nbsp;&nbsp;&nbsp;<a href="javascript:rex_redactor_link_url(\'redactor_link_url\')"><strong>REDAXO '+this.opts.curLang.link_insert+'</strong></a></label>'
							+ '<input type="text" id="redactor_link_url" class="redactor_input"  />'
							+ '<label>' + this.opts.curLang.text + '</label>'
							+ '<input type="text" class="redactor_input redactor_link_text" id="redactor_link_url_text" />'
							+ '<label><input type="checkbox" id="redactor_link_blank"> ' + this.opts.curLang.link_new_tab + '</label>'
						+ '</div>'
						+ '<div class="redactor_tab" id="redactor_tab2" style="display: none;">'
							+ '<label>' + this.opts.curLang.mailto + '</label>'
							+ '<input type="text" id="redactor_link_mailto" class="redactor_input" />'
							+ '<label>' + this.opts.curLang.text + '</label>'
							+ '<input type="text" class="redactor_input redactor_link_text" id="redactor_link_mailto_text" />'
						+ '</div>'
						+ '<div class="redactor_tab" id="redactor_tab3" style="display: none;">'
							+ '<label>' + this.opts.curLang.file + '&nbsp;&nbsp;&nbsp;<a href="javascript:rex_redactor_media_ins(\'redactor_link_file\')"><strong>REDAXO '+this.opts.curLang.file+' ...</strong></a></label>'
							+ '<input type="text" id="redactor_link_file" class="redactor_input" />'
							+ '<label>' + this.opts.curLang.text + '</label>'
							+ '<input type="text" class="redactor_input redactor_link_text" id="redactor_link_file_text" />'
						+ '</div>'
						+ '<div class="redactor_tab" id="redactor_tab4" style="display: none;">'
							+ '<label>' + this.opts.curLang.anchor + '</label>'
							+ '<input type="text" class="redactor_input" id="redactor_link_anchor"  />'
							+ '<label>' + this.opts.curLang.text + '</label>'
							+ '<input type="text" class="redactor_input redactor_link_text" id="redactor_link_anchor_text" />'
						+ '</div>'
					+ '</form>'
				+ '</section>'
				+ '<footer>'
					+ '<a href="#" class="redactor_modal_btn redactor_btn_modal_close">' + this.opts.curLang.cancel + '</a>'
					+ '<input type="button" class="redactor_modal_btn" id="redactor_insert_link_btn" value="' + this.opts.curLang.insert + '" />'
				+ '</footer>'
				, 500, callback);

		}

	},
	
	rex_linkmap:{
		title: 'REDAXO ' + RLANG.link_insert,
		callback: rex_redactor_link_ins
	},

	rex_image:{
		title: RLANG.image,
		callback: rex_redactor_image
	},
	
	rex_unlink:{
		title: RLANG.unlink,
		exec: 'unlink'
	},
	
	rex_media:{
		title: RLANG.file,
		dropdown:{
			rex_media_ins:{
				title: RLANG.file + ' ' + RLANG.link_insert,
				callback: rex_redactor_media_ins
			},
			rex_media_del:{
				title: RLANG.file + ' ' +RLANG.unlink,
				exec: 'unlink'
			}
		}
	}
	
},

//linkProtocol: '',
convertLinks: false,
autoresize: false,
linkEmail: true,
linkAnchor: true,
