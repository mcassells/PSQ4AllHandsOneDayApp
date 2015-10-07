/*
	Application.js is used for front end styling/UI
	You can add new functions to this file which can be called using studio elements.
*/

function urlParam(param) {
    param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + param + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Start cookie set, get, and remove functions
	function setCookie(n,v,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = n+"="+v+expires+"; path=/";
	}

	function readCookie(n) {
		var nameEQ = n + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function eraseCookie(n) {
		setCookie(n,"",-1);
	}
// End cookie set, get, and remove functions
	
function ToggleMenu(Constant_SaveSidebarState){
	// ToggleMenu runs when the hamburger icon is selected on the top bar
	$("#Sidebar").toggleClass("Open");
}

function BootstrapCheckboxGroup(){
	$(".checkbox-group").css("border","none");
	$("div.checkbox-group label").each(function(){
		$(this).unwrap().addClass("btn btn-default");
	});
	
	$("div.checkbox-group label").on("click", function () {
		if($("input",this).is(":checked")===true){
			$(this).addClass("active");
		}else{
			$(this).removeClass("active");
		}
	});
}

function reflowCharts(){
	//Get all charts on the page
	var chartsArray = Highcharts.charts.filter(function(n){ return n != undefined });
	
	//Loop through the array
	$.each(chartsArray,function(i){
		//Update the current chart
		chartsArray[i].reflow();
	});
}

function TemplateConfigHelper(){
	//Check the sidebar state show/hide extra sidebar options
	var configSidebar = "#Template_SidebarCollapse,#Template_SidebarStateAtStart,#Template_SidebarBranding,#Template_SidebarApplicationTitle,#Template_SidebarApplicationCaption";
	($("#Template_Sidebar input").is(':checked'))? $(configSidebar).show() : $(configSidebar).hide();
	
	//Check for the collapse flag
	($("#Template_Sidebar input").is(':checked') && $("#Template_SidebarCollapse input").is(':checked'))? $("#Template_SidebarStateAtStart").show() : $("#Template_SidebarStateAtStart").hide();
	
	//Modify the menu location selector
	(!$("#Template_Sidebar input").is(':checked'))? $("select#Template_MenuLocation option:eq(1),select#Template_AdminMenuLocation option:eq(1)").attr("disabled","") : $("select#Template_MenuLocation option:eq(1),select#Template_AdminMenuLocation option:eq(1)").removeAttr("disabled");
	
	//Header options
	if(!$("#Template_Header input").is(':checked')){
		$("select#Template_MenuLocation option:eq(2),select#Template_AdminMenuLocation option:eq(2)").attr("disabled","");
		$("#Template_HeaderBranding,#Template_HeaderApplicationTitle,#Template_HeaderApplicationCaption").hide();
	}else{
		$("select#Template_MenuLocation option:eq(2),select#Template_AdminMenuLocation option:eq(2)").removeAttr("disabled");
		$("#Template_HeaderBranding,#Template_HeaderApplicationTitle,#Template_HeaderApplicationCaption").show();
	}
	
	//Disable menu location selections based on the sidebar and Header visibility
	if(!$("#Template_Sidebar input").is(':checked') && !$("#Template_Header input").is(':checked')){
		$("select#Template_MenuLocation option:eq(3),select#Template_AdminMenuLocation option:eq(3)").attr("disabled","");
	}else{
		$("select#Template_MenuLocation option:eq(3),select#Template_AdminMenuLocation option:eq(3)").removeAttr("disabled");
	}
	
	//Disable the sidebar collapse based on the layout style
	if($("#Template_LayoutStyle select").val()==="Boxed"){
		$("#Template_SidebarCollapse,#Template_SidebarStateAtStart").hide();
		$("#Template_SidebarCollapse input").prop("checked", false);
	}
}

// On page load
$(function(){
	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 50) {
			$('#divScrollToTop').fadeIn();
		} else {
			$('#divScrollToTop').fadeOut();
		}
	});
	
	//Click event to scroll to top
	$('#ScrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},150);
		return false;
	});	
	
	// init the datepicker plugin
	// Check the page below for plugin config options
	// http://eternicode.github.io/bootstrap-datepicker/
	$(".datepicker").datepicker();
	
	// Init the BootstrapCheckboxGroup() function on page load.
	//BootstrapCheckboxGroup();	
	
	//Init the jquery minicolor tool	
	$('.colorpicker').each(function(){
		$(this).colpick({
			layout:'hex',
			submit:0,
			color: $(this).val().replace('#',''),
			onChange:function(hsb,hex,rgb,el,bySetColor) {
				if(!bySetColor) $(el).val('#'+hex);
			}
		}).keyup(function(){
			$(this).colpickSetColor('#'+this.value);
		});
	});
	
	// Remove the framework if the page is an iframe
	if(window.self !== window.top){
		$("body").addClass("transparent-bg iframe-report");
		$("#Sidebar,#Header,#Footer").remove();
	}

	// Find and destroy any extra footers
	var cf = $("div#FooterWrap").each(function(){});
	if(cf.length>1){
		$.each(cf,function(i){
			(i>0)? $(this).remove(): null;
		});
	}
	
	/**************************************************************************************
	* 						JMenu2 - built for Accelerate by Logi Analytics						 *
	**************************************************************************************/
	//JMenu2 Sidebar awesomeness
		//Destroy any duplicated menu hierarchies
		$("#Sidebar #JMenu2>ul#BuildActiveJMenu>li:not(:first),#Header ul#BuildActiveJMenuHeader>li:not(:first)").remove();
		
		//Blast away unneeded wrappers
		$("#Sidebar #JMenu2>ul#BuildActiveJMenu>li>ul#ActiveMenuItems").unwrap().unwrap();
		
		//Add the dropdown class to the dropdown items
		$("#JMenu2 ul#ActiveMenuItems li").each(function(){
			if($("ul>li",this).length!==0){
				$(this).addClass("dropdown");
				$(this).prepend('<i class="fa fa-angle-right expand-sub"></i>');
			}
		});
		
		//Sub drilldowns
		$("#JMenu2 ul#ActiveMenuItems li.dropdown .expand-sub").click(function(){
			$(this).siblings('ul:first').slideToggle("fast");
			$(this).toggleClass('fa-angle-right fa-angle-down');
		});
	
		$("#JMenu2 ul#ActiveMenuItems li i.fa").addClass("fa-fw");
	
	//JMenu2 Header awesomeness
		$("#Header #navigation .navbar-collapse>span").remove();
	
		$("#Header ul#BuildActiveJMenuHeader span").each(function(){
			$(this).contents().unwrap();
		});
		
		$("#Header ul#BuildActiveJMenuHeader ul#ActiveMenuItems.MenuBuilder").unwrap().unwrap().addClass("nav navbar-nav");
		$("#Header #navigation .navbar-collapse>span").remove();
		
		$("#Header ul#ActiveMenuItems li").each(function(){
			if($("ul>li",this).length!==0){
				$("a",this).first().append(' <span class="caret"></span>');
			}
		});
		
		$("#Header ul#ActiveMenuItems>li ul").addClass("dropdown-menu");
		
		$("#Header ul#ActiveMenuItems li a[href=''], #JMenu2 ul#ActiveMenuItems li a[href='']").click(function(){
			if($(window).width()>=769){
				return false;
			}else{
				return true;
			}
		});
		
		// Add the tab index for screen readers
		$("#JMenu2 ul#ActiveMenuItems li.dropdown>.expand-sub").each(function(){
			$(this).attr("tabindex","0");
		});

		//screen reader compliance for navigation
		$("#JMenu2 ul#ActiveMenuItems li.dropdown>.expand-sub").keydown(function(e){
			console.log(e.keyCode);
			if((e.keyCode===13 || e.keyCode===32) && $(e.target).next("ul:hidden")){
				$(this).siblings('ul:first').slideToggle("fast");
				$(this).toggleClass('fa-angle-right fa-angle-down');
				return false;
			}
		});

		
	//JMenu Active menu item setter
        var currentReport = urlParam("rdReport").replace(/[^a-zA-Z0-9]/g,'');
        if(currentReport.length>0){
            $("#JMenu2 ul#ActiveMenuItems li."+currentReport).addClass("active");
            $("#JMenu2 ul#ActiveMenuItems li."+currentReport).children("ul").attr("style", "display: block;");
            $("#JMenu2 ul#ActiveMenuItems li."+currentReport).children("i.fa-angle-right").switchClass("fa-angle-right", "fa-angle-down");
            $("#JMenu2 ul#ActiveMenuItems li."+currentReport).parents("ul").attr("style", "display: block;");
            $("#JMenu2 ul#ActiveMenuItems li."+currentReport).parents("li.dropdown").children("i.fa-angle-right").switchClass("fa-angle-right", "fa-angle-down");
            $("#Header ul#ActiveMenuItems li."+currentReport).addClass("active");
        }

		//InfoGo active menu item
        if(currentReport.length>0 && currentReport.indexOf("InfoGo")>-1){
            $("#JMenu2 ul#ActiveMenuItems li[class^=InfoGo]").addClass("active");
            $("#Header ul#ActiveMenuItems li[class^=InfoGo]").addClass("active");
		}
		
		$("#JMenu2,#Header ul#BuildActiveJMenuHeader").show();
		
	/** Template Config Form Helper **/
		//Init the TemplateConfigHelper function
		TemplateConfigHelper();
		
		$("#TemplateConfiguration input,#TemplateConfiguration select").change(function(){
			TemplateConfigHelper();
		});
});

function DashboardControls(){
	if($("#rdDashboardTabs").length>0){
		setTimeout(function(){
			var left = $("#rdDashboardTabs #rdTabs-rdDashboardTabs li.selected").position().left + ($("#rdDashboardTabs #rdTabs-rdDashboardTabs li.selected").width()-4);
			$("#rdDashboardTabs #rdSettingsCog").css({"margin-left": left});
			//$("#rdDashboardTabs #rdSettingsCog").css({"margin-left": left});
			$("#rdDashboardTabs #rdRenameTabDiv").css({"left": left,"top":0});
		},1000);
		
		$("a#ppoRenamethisTab_rdPopupOptionItem").on("click", function(){
			var left = $("#rdDashboardTabs #rdTabs-rdDashboardTabs li.selected").position().left;
			var width = $("#rdDashboardTabs #rdTabs-rdDashboardTabs li.selected").width();
			$("#rdDashboardTabs #rdRenameTabDiv").css({"left": left,"top":10, "width":width})
		});		
	}
}

Y.on('domready', function() {
	//modify the dashboard controls
	if($("#rdDashboardTabs")){
		DashboardControls();
		$(window).resize(function(){
			DashboardControls();
		});
		
		if (LogiXML.Ajax.AjaxTarget) {
			LogiXML.Ajax.AjaxTarget().on('reinitialize', function(){
				DashboardControls()
			});
		}
	}
});