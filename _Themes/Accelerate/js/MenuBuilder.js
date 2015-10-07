$(function(){
	var unsaved = false;
	var savesettings = false;
	
	//Init the jquery sortable plugin
	$("#MenuBuilderContainer ul.MenuBuilder").sortable({
		group: 'menu-builder',
		handle: ".drag-handle"
	});
	
	//Add new active link to the item list
	$(".add-active-link").click(function(){
		$("#MenuBuilderContainer ul#ActiveMenuItems").prepend('<li class="custom-link"><span class="fa fa-bars drag-handle" id="drag-handle"></span><span id="report-caption-container"><a href="" class="report-caption">New Link Caption</a></span> <div class="pull-right ItemTools" id="ItemTools"><a href="javascript:void 0" onclick="javascript:OpenEditor(this)" id="actOpenEditor"><span class="btn btn-default btn-xs editor" id="ItemEditor"><span class="fa fa-pencil-square" id="icon-edit"></span></span></a> </div><div class="item-editor" style="display:none;" id="ItemEditor"> <div class="edit-group" id="EditCaption"><span>Caption</span><span><input type="TEXT" value="New Link Caption" onblur="javascript:EditCaption(this)" class="rdThemeInput form-control" id="input-caption" name="input-caption"></span> </div><div class="edit-group" id="EditIcon"><span>Item Icon</span><span><br/><button class="btn btn-default iconpicker" data-iconset="fontawesome" data-icon="" role="iconpicker"></button></span> </div><div class="edit-group" id="EditLink"><span>Link</span><span><input type="TEXT" value="" onblur="javascript:EditLink(this)" class="rdThemeInput form-control" id="input-link" name="input-link"></span> </div><div class="edit-group" id="EditTarget"><span>Target</span><span><select onchange="javascript:EditTarget(this)" class="rdThemeInput form-control" id="input-target" name="input-target"><option row="1" selected="True" value="_self">Self</option><option row="2" value="_blank">New Window</option><option row="3" value="_parent">Parent Window</option><option row="4" value="_top">Top</option></select></span> </div><div class="text-right" id="control-buttons"><a href="javascript:void 0" onclick="javascript:CloseEditor(this)" id="actCloseEditor"><span class="btn btn-default close-editor">Close Editor</span></a>&nbsp;<a href="javascript:void 0" onclick="javascript:DeleteItem(this)" id="actDeleteItem"><span class="btn btn-danger delete"><span class="fa fa-times" id="icon-remove"></span></span></a> </div></div><ul></ul></li>');
		$('.iconpicker').iconpicker().on('change', function(e) {
			EditIcon(this,e.icon);
		});
	});
	
	//Add new inactive link to the item list
	$(".add-inactive-link").click(function(){
		$("#MenuBuilderContainer ul#InactiveMenuItems").prepend('<li class="custom-link"><span class="fa fa-bars drag-handle" id="drag-handle"></span><span id="report-caption-container"><a href="" class="report-caption">New Link Caption</a></span> <div class="pull-right ItemTools" id="ItemTools"><a href="javascript:void 0" onclick="javascript:OpenEditor(this)" id="actOpenEditor"><span class="btn btn-default btn-xs editor" id="ItemEditor"><span class="fa fa-pencil-square" id="icon-edit"></span></span></a> </div><div class="item-editor" style="display:none;" id="ItemEditor"> <div class="edit-group" id="EditCaption"><span>Caption</span><span><input type="TEXT" value="New Link Caption" onblur="javascript:EditCaption(this)" class="rdThemeInput form-control" id="input-caption" name="input-caption"></span> </div><div class="edit-group" id="EditIcon"><span>Item Icon</span><span><br/><button class="btn btn-default iconpicker" data-iconset="fontawesome" data-icon="" role="iconpicker"></button></span> </div><div class="edit-group" id="EditLink"><span>Link</span><span><input type="TEXT" value="" onblur="javascript:EditLink(this)" class="rdThemeInput form-control" id="input-link" name="input-link"></span> </div><div class="edit-group" id="EditTarget"><span>Target</span><span><select onchange="javascript:EditTarget(this)" class="rdThemeInput form-control" id="input-target" name="input-target"><option row="1" selected="True" value="_self">Self</option><option row="2" value="_blank">New Window</option><option row="3" value="_parent">Parent Window</option><option row="4" value="_top">Top</option></select></span> </div><div class="text-right" id="control-buttons"><a href="javascript:void 0" onclick="javascript:CloseEditor(this)" id="actCloseEditor"><span class="btn btn-default close-editor">Close Editor</span></a>&nbsp;<a href="javascript:void 0" onclick="javascript:DeleteItem(this)" id="actDeleteItem"><span class="btn btn-danger delete"><span class="fa fa-times" id="icon-remove"></span></span></a> </div></div><ul></ul></li>');
		$('.iconpicker').iconpicker().on('change', function(e) {
			EditIcon(this,e.icon);
		});		
	});
	
	//Add a delete button to custom link items
	$("li>.item-editor>#control-buttons").append('&nbsp;<a href="javascript:void 0" onclick="javascript:DeleteItem(this)" id="actDeleteItem"><span class="btn btn-danger delete"><span class="fa fa-times" id="icon-remove"></span></span></a>');
	
	//Gather all existing menu items into an array
	var ExistingItemsArray = [];
	$("#MenuBuilderContainer ul.MenuBuilder li").each(function(){
		var item = $("a.report-caption",this)[0];
		var itmCaption = $(item).text();
		var itmIcon = $('i.fa',item).attr("class");
		var itmLink = $(item).attr("href");
		ExistingItemsArray.push({
			id: $(this).attr("class"),
			caption: itmCaption.trim(),
			link: itmLink,
			icon: (!itmIcon)? "" : itmIcon.split(" ")[1]
		});
	});
	
	//Gather all new menu item objects into an array
	var NewItemsArray = [];
	$("#MenuBuilderContainer ul#FullReportListHidden li").each(function(){
		var item = $("a.report-caption",this)[0];
		var itmCaption = $(item).text();
		var itmLink = $(item).attr("href");
		NewItemsArray.push({
			id: $(this).attr("class"),
			caption: itmCaption.trim(),
			link: itmLink
		});
	});
	
	//Match the new and old arrays - if a new item is found, prepend it to the inactive item array.
	$.each(NewItemsArray,function(i){
		var MatchValue = $.grep(ExistingItemsArray, function(arr){ return arr.id == NewItemsArray[i].id; });
		if(MatchValue.length == 0){
			$("#MenuBuilderContainer ul#InactiveMenuItems").prepend('<li class="'+NewItemsArray[i].id+'"><span class="fa fa-bars drag-handle" id="drag-handle"></span><span id="report-caption-container"><a href="'+NewItemsArray[i].link+'" class="report-caption">'+NewItemsArray[i].caption+'</a></span> <div class="pull-right ItemTools" id="ItemTools"><a href="javascript:void 0" onclick="javascript:OpenEditor(this)" id="actOpenEditor"><span class="btn btn-default btn-xs editor" id="ItemEditor"><span class="fa fa-pencil-square" id="icon-edit"></span></span></a> </div><div class="item-editor" style="display:none;" id="ItemEditor"> <div class="edit-group" id="EditCaption"><span>Caption</span><span><input type="TEXT" value="'+NewItemsArray[i].caption+'" onblur="javascript:EditCaption(this)" class="rdThemeInput form-control" id="input-caption" name="input-caption"></span> </div><div class="edit-group" id="EditIcon"><span>Item Icon</span><span><br/><button class="btn btn-default iconpicker" data-iconset="fontawesome" data-icon="'+NewItemsArray[i].icon+'" role="iconpicker"></button></span> </div><div class="edit-group" id="EditLink"><span>Link</span><span><input type="TEXT" value="'+NewItemsArray[i].link+'"  onblur="javascript:EditLink(this)" class="rdThemeInput form-control" id="input-link" name="input-link"></span> </div><div class="edit-group" id="EditTarget"><span>Target</span><span><select onchange="javascript:EditTarget(this)" class="rdThemeInput form-control" id="input-target" name="input-target"><option row="1" selected="True" value="_self">Self</option><option row="2" value="_blank">New Window</option><option row="3" value="_parent">Parent Window</option><option row="4" value="_top">Top</option></select></span> </div><div class="text-right" id="control-buttons"><a href="javascript:void 0" onclick="javascript:CloseEditor(this)" id="actCloseEditor"><span class="btn btn-default close-editor">Close Editor</span></a>&nbsp;<a href="javascript:void 0" onclick="javascript:DeleteItem(this)" id="actDeleteItem"><span class="btn btn-danger delete"><span class="fa fa-times" id="icon-remove"></span></span></a> </div></div><ul></ul></li>');
		}else{
			$.grep(ExistingItemsArray, function(arr){ 
				if(arr.id === NewItemsArray[i].id){
					if(NewItemsArray[i].caption !== arr.caption){
						var item = $("#MenuBuilderContainer ul.MenuBuilder li."+arr.id);
						item = $("a.report-caption",item)[0];
						$(item).after('<i class="fa fa-exclamation-triangle text-warning UpdateCaption" onclick="UpdateCaption(this,\''+escape(NewItemsArray[i].caption)+'\',\''+NewItemsArray[i].link+'\')"></i>');
					}
				}
			});
		}
	});
	
	setTimeout(function(){	
		$("#MenuBuilderContainer").bind("DOMSubtreeModified",function(){
			unsaved = true;
		});			
	},1000);	
	
	$(window).bind('beforeunload', function() {
		if(unsaved){
			return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
		}
	});

	//Save button action
	$(".btn-save").click(function(){
		//Sanitize the menu HTML
		$("div#MenuBuilderContainer span.drag-handle,div#MenuBuilderContainer ul li ul:empty,div#MenuBuilderContainer ul li .ItemTools,div#MenuBuilderContainer ul li .item-editor,div#MenuBuilderContainer ul li .UpdateCaption,div#MenuBuilderContainer span:empty").remove();
		$("div#MenuBuilderContainer ul li a").unwrap();
		
		//active menu html
		($("div#ActiveMenu ul#ActiveMenuItems").parents("span").length)? $("div#ActiveMenu ul#ActiveMenuItems").unwrap(): null;

		var MenuActiveHTML = $("div#ActiveMenu").html();
		$("textarea#MenuActiveOutput").val(encodeURI(MenuActiveHTML));
		
		//Inactive menu html
		var MenuInactiveHTML = $("div#InactiveMenu").html();
		$("textarea#MenuInactiveOutput").val(encodeURI(MenuInactiveHTML));
		
		//Allow the settings to save
		unsaved = false;
		
		//Activate the Logi process
		RunProcess('<rdProcessAction><Action Type="Process" Process="proc_Theme-Settings" TaskID="updateMenu" ID="actUpdateMenu"><WaitPage Class="rdThemeWaitPanel" CaptionClass="rdThemeWaitCaption" StyleSheet="_Themes/Accelerate/Theme.css" /></Action></rdProcessAction>','false','','',['','rdThemeWaitPanel','rdThemeWaitCaption']);
	});
	
	//Save button action
	$(".btn-reset").click(function(){
		//Allow the settings to save
		unsaved = false;
		
		//Activate the Logi process
		RunProcess('<rdProcessAction><Action Type="Process" ConfirmMessage="Are you sure? This action will clear any customizations and links you have made and restore the menu to the original item list." ID="actResetMenu" Process="proc_Theme-Settings" TaskID="removeMenu" /></rdProcessAction>','false','Are you sure? This action will clear any customizations and links you have made and restore the menu to the original item list.','',null);
	});		
});

function UpdateCaption(item,NewCaption,NewLink){
	//if(confirm("It looks like this report has an updated caption: '"+unescape(NewCaption)+"'. Would you like to use the new caption?")){
	if(confirm("This report caption appears to be different than the original, or has has been recently modified elsewhere. Would you like to use the updated caption:  '"+unescape(NewCaption)+"' for this link?")){
		var item = $(item).parent().closest("li");
		item = $("a.report-caption",item)[0];
		$(item).text(unescape(NewCaption));
		$(item).attr("href",NewLink);
		$(item).siblings(".UpdateCaption").remove();
	}
}

function DeleteItem(item){
	var item = $(item).parent().closest("li");
	if(confirm("Are you sure you want to permanently delete this item?")){
		if($("ul>li",item).length!==0){
			alert("This item has children and can not be deleted. Please move the child items and try again.");
		}else{
			$(item).remove();
		}
	}
}

function OpenEditor(item){
	var item = $(item).parent().closest("li");
	var editor = $(".item-editor",item)[0];
	item = $("a.report-caption",item)[0];
	var caption = $(item).text();
	var link = $(item).attr("href");
	$(editor).slideToggle();
}

function CloseEditor(item){
	var item = $(item).parent().closest("li");
	var editor = $(".item-editor",item)[0];
	$(editor).slideToggle();
}

function EditIcon(item,NewIcon){
	var item = $(item).parent().closest("li");
	item = $("a.report-caption",item)[0];
	$("i.fa",item).remove();
	(NewIcon)? $(item).prepend('<i class="fa '+NewIcon+'"></i> ') : null;
}

function EditCaption(item){
	var NewCaption = item.value;
	var item = $(item).parent().closest("li");
	item = $("a.report-caption",item)[0];
	var icon = (!$("i.fa",item).length)? "" : $("i.fa",item).prop("outerHTML")+" ";
	$(item).html(icon+NewCaption);
}

function EditLink(item){
	var NewLink = item.value;
	var item = $(item).parent().closest("li");
	item = $("a.report-caption",item)[0];
	$(item).attr("href",NewLink);
}

function EditTarget(item){
	var NewTarget = item.value;
	var item = $(item).parent().closest("li");
	item = $("a.report-caption",item)[0];
	$(item).attr("target",NewTarget);
}

function AdminControls(){
	$("#MenuBuilderContainer ul.MenuBuilder li").each(function(i){
		var item = $("a",this)[0];
		var icon = (!$("i.fa",item).length)? "" : $("i.fa",item).attr("class").split(" ")[1];
		var caption = $(item).text().trim();
		var link = $(item).attr("href");
		var target = $(item).attr("target");
		$(item).before('<span class="fa fa-bars drag-handle" id="drag-handle"></span>');
		$(item).before('<div class="pull-right ItemTools" id="ItemTools"><a href="javascript:void 0" onclick="javascript:OpenEditor(this)" id="actOpenEditor"><span class="btn btn-default btn-xs editor" id="ItemEditor"><span class="fa fa-pencil-square" id="icon-edit"></span></span></a></div>');
		$(item).after('<div class="item-editor" style="display:none;" id="ItemEditor"><div class="edit-group" id="EditCaption"><span>Caption</span><span><input type="TEXT" value="'+caption+'" onblur="javascript:EditCaption(this)" class="rdThemeInput form-control" id="input-caption" name="input-caption"></span></div><div class="edit-group" id="EditIcon"><span>Item Icon</span><span><br/><button class="btn btn-default iconpicker" data-iconset="fontawesome" data-icon="'+icon+'" role="iconpicker"></button></span></div><div class="edit-group" id="EditLink"><span>Link</span><span><input type="TEXT" value="'+link+'" onblur="javascript:EditLink(this)" class="rdThemeInput form-control" id="input-link" name="input-link"></span></div><div class="edit-group" id="EditTarget"><span>Target</span><span><select onchange="javascript:EditTarget(this)" class="rdThemeInput form-control" id="input-target'+i+'" name="input-target"><option row="1" selected="True" value="_self">Self</option><option row="2" value="_blank">New Window</option><option row="3" value="_parent">Parent Window</option><option row="4" value="_top">Top</option></select></span></div><div class="text-right" id="control-buttons"><a href="javascript:void 0" onclick="javascript:CloseEditor(this)" id="actCloseEditor"><span class="btn btn-default close-editor">Close Editor</span></a></div></div>');
		$("#inpIconSelector"+i+" option[value='"+icon+"']").attr("selected","selected");
		$("#input-target"+i+" option[value='"+target+"']").attr("selected","selected");
		$(item).wrap('<span id="report-caption-container"></span>');
		if($("ul",this).length===0){
			$(this).append("<ul></ul>");
		}
		var targetselection = $("select",this)[0];
		if(target){
			$(targetselection).val(target);
		}
		$('.iconpicker').iconpicker().on('change', function(e) {
			EditIcon(this,e.icon);
		});		
	});
}

$(function(){
	$('.iconpicker').iconpicker().on('change', function(e) {
		EditIcon(this,e.icon);
	});
});