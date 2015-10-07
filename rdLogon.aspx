<% If Session("rdLogonReturnURL") = "" 
	Session("rdLogonReturnURL") = "rdPage.aspx"
End If %>

<html>
	<head>
		<META name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Logon</title>
		<link type="text/css" rel="stylesheet" href="_Themes/Accelerate/css/login.css" />
	</head>
	<body onkeypress="if (event.keyCode==13){frmLogon.submit()}" onload="document.getElementById('rdUsername').focus()" >	
		<table id="mainTable" cellspacing="0" >
			<tr>
				<td id="mainCell" >
					<div id="logonPanel" >
						<table cellspacing="0" >
							<tr>
								<td id="logonHeaderCell" ><span class="LogonHeader">Login</span></td>
							</tr>
							<tr>
								<td id="formCell"> 
									<form id="frmLogon" action='<%=Session("rdLogonReturnUrl") %>' method="post">
										<% If Not String.IsNullOrEmpty(Session("rdLogonFailMessage")) Then %>
											<div class="errormsg">
												<%=Session("rdLogonFailMessage") %>
											</div>
										<% End If %>
										<input class="formItem" id="rdUsername" type="text" name="rdUsername" placeholder="Username"/>
										<input id="rdFormLogon" type="hidden" name="rdFormLogon" value="True"/>
										<input class="formItem" id="rdPassword" type="password" name="rdPassword" placeholder="Password"/>
										<br/>
										<div>
											<button id="Submit1" type="submit" value="Logon" name="Submit1" class="btn">Sign in</button>
											<!--<div class="remember">
											<label>Remember me <input type="checkbox"/></label>
											</div>-->
										</div>
									</form>
								</td>
							</tr>
						</table>						
					</div>
				</td>
			</tr>
		</table>
	</body>
</html>