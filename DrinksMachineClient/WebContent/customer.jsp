<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="be.tomvertommen.drinksMachine.business.Strength"%>
<%@page import="be.tomvertommen.drinksMachine.business.Size"%>
<html lang="nl-be">
	<head>
		<title>Drinks machine - customer</title>
		<script type="text/javascript" src="/DrinksMachine/resources/js/general.js"></script>
		<script type="text/javascript" src="/DrinksMachine/resources/js/customer.js"></script>
		<link rel="stylesheet" type="text/css" href="/DrinksMachine/resources/css/general.css" />
		<link rel="stylesheet" type="text/css" href="/DrinksMachine/resources/css/customer.css" />
	</head>
	<body onload="p.onload()">
		<div class="header"><img alt="header" src="/DrinksMachine/resources/images/banner.webp"></div>
		<div class="menu">
			<ul class="main">
				<li class="selected"><a href="/DrinksMachine/customer.jsp">Customer</a></li>
				<li><a href="/DrinksMachine/maintenance.jsp">Maintenance</a></li>
			</ul>
		</div>
		<div class="content">
			<table class="centered" id="drinksMachine">
				<tr>
					<td>
						<table id="statusTbl">
							<tr>
								<td id="statusTextTd"></td>
								<td id="statusImgTd"><img alt="status" src="" id="statusImg"></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table id="cardTbl">
							<tr>
								<td id="cardTd">
									<img id="cardImg" alt="card" src="">
									<img id="cardLightImg" alt="cardLight" src="">
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table id="topDrinksTbl">
							<tr>
								<td id="topLeftDrinkTd"><input type="button" class="drinkBtn"/></td>
								<td><input type="button" class="drinkBtn"/></td>
								<td><input type="button" class="drinkBtn"/></td>
								<td id="topRightDrinkTd"><input type="button" class="drinkBtn"/></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table id="bottomDrinksTbl">
							<tr>
								<td class="bottomDrinksTd">
									<table id="leftDrinksTbl">
										<tr><td><input type="button" class="drinkBtn"/></td></tr>
										<tr><td><input type="button" class="drinkBtn"/></td></tr>
										<tr><td><input type="button" class="drinkBtn"/></td></tr>
										<tr><td><input type="button" class="drinkBtn"/></td></tr>
									</table>
								</td>
								<td id="optionsTd">
									<table id="optionsTbl" class="hidden">
										<tr id="optionsTopTr">
											<td></td>
										</tr>
										<tr>
											<td id="sizeTxtTd">Size</td>
											<td id="sizeTd">
												<img id="<%= Size.REGULAR.name() %>SizeImg" alt="regular" src="/DrinksMachine/resources/images/cup.png">
												<img id="<%= Size.LARGE.name() %>SizeImg" alt="large" src="/DrinksMachine/resources/images/cup.png">
												<img id="<%= Size.XXL.name() %>SizeImg" alt="xxl" src="/DrinksMachine/resources/images/cup.png">
											</td>
										</tr>
										<tr>
											<td id="flavourTxtTd">Flavour</td>
											<td id="strengthTd">
												<img id="<%= Strength .REGULAR.name() %>StrengthImg" alt="regular" src="/DrinksMachine/resources/images/plus.png">
												<img id="<%= Strength.STRONG.name() %>StrengthImg" alt="strong" src="/DrinksMachine/resources/images/plusPlus.png">
												<img id="<%= Strength.VERY_STRONG.name() %>StrengthImg" alt="very strong" src="/DrinksMachine/resources/images/plusPlusPlus.png">
											</td>
										</tr>
										<tr>
											<td id="priceTxtTd">Price</td>
											<td id="priceTd">
												<input id="priceInp" readonly="readonly"/>
											</td>
										</tr>
										<tr>
											<td></td>
											<td id="prepareTd">
												<input type="button" value="Prepare" id="prepareBtn"/>
											</td>
										</tr>
									</table>
								</td>
								<td class="bottomDrinksTd">
									<table id="rightDrinksTbl">
										<tr><td><input type="button" class="drinkBtn"/></td></tr>
										<tr><td><input type="button" class="drinkBtn"/></td></tr>
										<tr><td><input type="button" class="drinkBtn"/></td></tr>
										<tr><td><input type="button" class="drinkBtn"/></td></tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td id="cupTd">
						<img alt="cup" src="/DrinksMachine/resources/images/cup.png" id="cupImg" style="opacity: 0">
						<img alt="greenLight" src="/DrinksMachine/resources/images/greenLight.png" id="cupLightImg" style="visibility: hidden;">
					</td>
				</tr>
			</table>
		</div>
	</body>
</html>