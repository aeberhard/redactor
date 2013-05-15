
			modal_image_edit: String() +
				'<div id="redactor_modal_content">' +
				'<label>' + RLANG.title + '</label>' +
				'<input id="redactor_file_alt" class="redactor_input" />' +
				'<label>' + RLANG.link + '&nbsp;&nbsp;&nbsp;<a href="javascript:rex_redactor_link_url(\'redactor_file_link\')"><strong>'+RLANG.link_insert+'</strong></a></label>' +
				'<input id="redactor_file_link" class="redactor_input" />' +
				'<label>' + RLANG.image_position + '</label>' +
				'<select id="redactor_form_image_align">' +
					'<option value="none">' + RLANG.none + '</option>' +
					'<option value="left">' + RLANG.left + '</option>' +
					'<option value="right">' + RLANG.right + '</option>' +
				'</select>' +
				'</div>' +
				'<div id="redactor_modal_footer">' +
					'<a href="javascript:void(null);" id="redactor_image_delete_btn" class="redactor_modal_btn">' + RLANG._delete + '</a>&nbsp;&nbsp;&nbsp;' +
					'<a href="javascript:void(null);" class="redactor_modal_btn redactor_btn_modal_close">' + RLANG.cancel + '</a>' +
					'<input type="button" name="save" class="redactor_modal_btn" id="redactorSaveBtn" value="' + RLANG.save + '" />' +
				'</div>',

			modal_link: String() +
				'<div id="redactor_modal_content">' +
				'<form id="redactorInsertLinkForm" method="post" action="">' +
					'<div id="redactor_tabs">' +
						'<a href="javascript:void(null);" class="redactor_tabs_act">URL</a>' +
						'<a href="javascript:void(null);">Email</a>' +
						'<a href="javascript:void(null);">' + RLANG.anchor + '</a>' +
					'</div>' +
					'<input type="hidden" id="redactor_tab_selected" value="1" />' +
					'<div class="redactor_tab" id="redactor_tab1">' +
						'<label>URL&nbsp;&nbsp;&nbsp;<a href="javascript:rex_redactor_link_url(\'redactor_link_url\')"><strong>'+RLANG.link_insert+'</strong></a></label><input type="text" id="redactor_link_url" class="redactor_input"  />' +
						'<label>' + RLANG.text + '</label><input type="text" class="redactor_input redactor_link_text" id="redactor_link_url_text" />' +
						'<label><input type="checkbox" id="redactor_link_blank"> ' + RLANG.link_new_tab + '</label>' +
					'</div>' +
					'<div class="redactor_tab" id="redactor_tab2" style="display: none;">' +
						'<label>Email</label><input type="text" id="redactor_link_mailto" class="redactor_input" />' +
						'<label>' + RLANG.text + '</label><input type="text" class="redactor_input redactor_link_text" id="redactor_link_mailto_text" />' +
					'</div>' +
					'<div class="redactor_tab" id="redactor_tab3" style="display: none;">' +
						'<label>' + RLANG.anchor + '</label><input type="text" class="redactor_input" id="redactor_link_anchor"  />' +
						'<label>' + RLANG.text + '</label><input type="text" class="redactor_input redactor_link_text" id="redactor_link_anchor_text" />' +
					'</div>' +
				'</form>' +
				'</div>' +
				'<div id="redactor_modal_footer">' +
					'<a href="javascript:void(null);" class="redactor_modal_btn redactor_btn_modal_close">' + RLANG.cancel + '</a>' +
					'<input type="button" class="redactor_modal_btn" id="redactor_insert_link_btn" value="' + RLANG.insert + '" />' +
				'</div>',
 