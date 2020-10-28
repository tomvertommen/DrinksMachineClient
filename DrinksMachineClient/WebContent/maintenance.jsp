<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="be.tomvertommen.drinksMachine.business.Ingredient"%>
<%@page import="be.tomvertommen.drinksMachine.business.Mode"%>
<html lang="nl-be">
	<head>
		<title>Drinks machine - maintenance</title>
		<script type="text/javascript" src="/DrinksMachine/resources/js/general.js"></script>
		<script type="text/javascript" src="/DrinksMachine/resources/js/maintenance.js"></script>
		<link rel="stylesheet" type="text/css" href="/DrinksMachine/resources/css/general.css" />
		<link rel="stylesheet" type="text/css" href="/DrinksMachine/resources/css/maintenance.css" />
	</head>
	<body onload="p.onload()">
		<div class="header"><img alt="header" src="/DrinksMachine/resources/images/banner.webp"></div>
		<div class="menu">
			<ul class="main">
				<li><a href="/DrinksMachine/customer.jsp">Customer</a></li>
				<li class="selected"><a href="/DrinksMachine/maintenance.jsp">Maintenance</a></li>
			</ul>
		</div>
		<div class="content">
			<table class="centered" id="drinksMachine">
				<tr>
					<td>
						<table id="modePowerTbl">
							<tr>
								<td id="modeTd">
									<input 
										type="button" value="READY" onclick="p.setMode('<%= Mode.READY.name() %>')" 
										class="modeBtn disabled" id="modeBtn_<%= Mode.READY.name() %>"/>
									<input 
										type="button" value="MAINTENANCE" onclick="p.setMode('<%= Mode.MAINTENANCE.name() %>')" 
										class="modeBtn disabled" id="modeBtn_<%= Mode.MAINTENANCE.name() %>"/>
									<img alt="mode" src="/DrinksMachine/resources/images/blackLight.png" class="modeImg" id="modeImg">
								</td>
								<td style="text-align: right;" id="powerTd">
									<img alt="mode" src="/DrinksMachine/resources/images/blackLight.png" id="powerLight">
									<img alt="power" src="/DrinksMachine/resources/images/on.jpg" id="powerImg" class="clickable">
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="center">
						<table class="centered" id="stockTbl">
							<tr><th></th><th class="center">Current</th><th class="center">Alarm</th><th class="center">Max</th></tr>
							<% for(Ingredient ingredient : Ingredient.valuesSorted()) { %>
								<tr>
									<td class="drinkTd"><%= ingredient.getGuiName() %></td>
									<td class="plusMinTd">
										<table>
											<tr>
												<td><input class="qtyInp" readonly="readonly" id="currentQtyInp_<%= ingredient.name() %>"/></td>
												<td>
													<table>
														<tr>
															<td>
																<img 
																	alt="plus" src="/DrinksMachine/resources/images/plus.png" class="plusMinImg" 
																	id="currentPlus_<%= ingredient.name() %>">
															</td>
														</tr>
														<tr>
															<td>
																<img 
																	alt="min" src="/DrinksMachine/resources/images/min.png" class="plusMinImg" 
																	id="currentMin_<%= ingredient.name() %>">
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
									<td class="plusMinTd">
										<table>
											<tr>
												<td><input class="qtyInp" readonly="readonly" id="alarmQtyInp_<%= ingredient.name() %>"/></td>
												<td>
													<table>
														<tr>
															<td>
																<img 
																	alt="plus" src="/DrinksMachine/resources/images/plus.png" class="plusMinImg"
																	id="alarmPlus_<%= ingredient.name() %>">
															</td>
														</tr>
														<tr>
															<td>
																<img 
																	alt="min" src="/DrinksMachine/resources/images/min.png" class="plusMinImg"
																	id="alarmMin_<%= ingredient.name() %>">
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
									<td class="plusMinTd">
										<table>
											<tr>
												<td><input class="qtyInp" readonly="readonly" id="maxQtyInp_<%= ingredient.name() %>"/></td>
												<td>
													<table>
														<tr>
															<td>
																<img 
																	alt="plus" src="/DrinksMachine/resources/images/plus.png" class="plusMinImg"
																	id="maxPlus_<%= ingredient.name() %>">
															</td>
														</tr>
														<tr>
															<td>
																<img 
																	alt="min" src="/DrinksMachine/resources/images/min.png" class="plusMinImg"
																	id="maxMin_<%= ingredient.name() %>">
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							<% } %>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table id="modePowerTbl">
							<tr>
								<td id="connectionTd">
									<img alt="connection" src="/DrinksMachine/resources/images/disconnected.png" id="connectionImg">
									<img alt="connection" src="/DrinksMachine/resources/images/blackLight.png" id="connectionLightImg">
								</td>
								<td id="waterTd">
									<img alt="water" src="/DrinksMachine/resources/images/blackLight.png" id="waterLightImg">
									<img alt="water" src="/DrinksMachine/resources/images/water.png" id="waterImg">
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</div>
	</body>
</html>