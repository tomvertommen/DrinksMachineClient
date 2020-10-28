package be.tomvertommen.drinksMachineClient.servlet;

import java.io.IOException;
import java.util.Arrays;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import be.tomvertommen.drinksMachine.communication.*;
import be.tomvertommen.drinksMachineClient.service.DrinksMachineService;
import be.tomvertommen.drinksMachineClient.service.IDrinksMachineService;
import be.tomvertommen.drinksMachineClient.tools.JSonResponse;

/**
 * Servlet that handles all ajax requests.
 * @author Tom Vertommen
 *
 */
public class AjaxServlet extends BaseServlet {
	
	private IDrinksMachineService dm = DrinksMachineService.instance();
	
	@SuppressWarnings("unused")
	private static Logger logger = Logger.getLogger(AjaxServlet.class);
	
	/**
	 * Ajax request handling method.
	 * handles request according to the action parameter
	 */
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		try {
			String action = req.getParameter("action");
			if("setMode".equals(action)) {
				Reply reply = dm.setMode(req.getParameter("mode"));
				if(reply.isSuccess()) {
					JSonResponse response = new JSonResponse(true);
					response.setData(reply.getStatus());
					resp.getWriter().write(new Gson().toJson(response));
				} else {
					resp.getWriter().write(new Gson().toJson(new JSonResponse(Arrays.asList(reply.getMessages()), false)));
				}
			} else if("getDrink".equals(action)) {
				Reply reply = dm.getDrink(req.getParameter("drink"));
				if(reply.isSuccess()) {
					resp.getWriter().write(new Gson().toJson(new JSonResponse(true)));
				} else {
					resp.getWriter().write(new Gson().toJson(new JSonResponse(Arrays.asList(reply.getMessages()), false)));
				}
			} else if("addIngredient".equals(action)) {
				Reply reply = dm.addIngredient(req.getParameter("ingredient"));
				if(reply.isSuccess()) {
					JSonResponse response = new JSonResponse(true);
					response.setData(reply.getStatus());
					resp.getWriter().write(new Gson().toJson(response));
				} else {
					resp.getWriter().write(new Gson().toJson(new JSonResponse(Arrays.asList(reply.getMessages()), false)));
				}
			} else if("removeIngredient".equals(action)) {
				Reply reply = dm.removeIngredient(req.getParameter("ingredient"));
				if(reply.isSuccess()) {
					JSonResponse response = new JSonResponse(true);
					response.setData(reply.getStatus());
					resp.getWriter().write(new Gson().toJson(response));
				} else {
					resp.getWriter().write(new Gson().toJson(new JSonResponse(Arrays.asList(reply.getMessages()), false)));
				}
			} else if("addMaxQty".equals(action)) {
				Reply reply = dm.addMaxQty(req.getParameter("ingredient"));
				if(reply.isSuccess()) {
					JSonResponse response = new JSonResponse(true);
					response.setData(reply.getStatus());
					resp.getWriter().write(new Gson().toJson(response));
				} else {
					resp.getWriter().write(new Gson().toJson(new JSonResponse(Arrays.asList(reply.getMessages()), false)));
				}
			} else if("removeMaxQty".equals(action)) {
				Reply reply = dm.removeMaxQty(req.getParameter("ingredient"));
				if(reply.isSuccess()) {
					JSonResponse response = new JSonResponse(true);
					response.setData(reply.getStatus());
					resp.getWriter().write(new Gson().toJson(response));
				} else {
					resp.getWriter().write(new Gson().toJson(new JSonResponse(Arrays.asList(reply.getMessages()), false)));
				}
			} else if("addAlarmQty".equals(action)) {
				Reply reply = dm.addAlarmQty(req.getParameter("ingredient"));
				if(reply.isSuccess()) {
					JSonResponse response = new JSonResponse(true);
					response.setData(reply.getStatus());
					resp.getWriter().write(new Gson().toJson(response));
				} else {
					resp.getWriter().write(new Gson().toJson(new JSonResponse(Arrays.asList(reply.getMessages()), false)));
				}
			} else if("removeAlarmQty".equals(action)) {
				Reply reply = dm.removeAlarmQty(req.getParameter("ingredient"));
				if(reply.isSuccess()) {
					JSonResponse response = new JSonResponse(true);
					response.setData(reply.getStatus());
					resp.getWriter().write(new Gson().toJson(response));
				} else {
					resp.getWriter().write(new Gson().toJson(new JSonResponse(Arrays.asList(reply.getMessages()), false)));
				}
			}  else if("getStatus".equals(action)) {
				Reply reply = dm.getStatus(getParameterAsBoolean(req, "forceLoad"), getParameterAsBoolean(req, "log", true));
				if(reply.isSuccess()) {
					JSonResponse response = new JSonResponse(true);
					response.setData(reply.getStatus());
					resp.getWriter().write(new Gson().toJson(response));
				} else {
					resp.getWriter().write(new Gson().toJson(new JSonResponse(Arrays.asList(reply.getMessages()), false)));
				}
			} else if("setPower".equals(action)) {
				Reply reply = dm.setPower(getParameterAsBoolean(req, "on"));
				if(reply.isSuccess()) {
					JSonResponse response = new JSonResponse(true);
					response.setData(reply.getStatus());
					resp.getWriter().write(new Gson().toJson(response));
				} else {
					resp.getWriter().write(new Gson().toJson(new JSonResponse(Arrays.asList(reply.getMessages()), false)));
				}
			} else if("setCard".equals(action)) {
				Reply reply = dm.setCard(getParameterAsBoolean(req, "on"));
				if(reply.isSuccess()) {
					JSonResponse response = new JSonResponse(true);
					response.setData(reply.getStatus());
					resp.getWriter().write(new Gson().toJson(response));
				} else {
					resp.getWriter().write(new Gson().toJson(new JSonResponse(Arrays.asList(reply.getMessages()), false)));
				}
			} else if("setPluggedIn".equals(action)) {
				Reply reply = dm.setPluggedIn(getParameterAsBoolean(req, "on"));
				if(reply.isSuccess()) {
					JSonResponse response = new JSonResponse(true);
					response.setData(reply.getStatus());
					resp.getWriter().write(new Gson().toJson(response));
				} else {
					resp.getWriter().write(new Gson().toJson(new JSonResponse(Arrays.asList(reply.getMessages()), false)));
				}
			} else if("setWater".equals(action)) {
				Reply reply = dm.setWater(getParameterAsBoolean(req, "on"));
				if(reply.isSuccess()) {
					JSonResponse response = new JSonResponse(true);
					response.setData(reply.getStatus());
					resp.getWriter().write(new Gson().toJson(response));
				} else {
					resp.getWriter().write(new Gson().toJson(new JSonResponse(Arrays.asList(reply.getMessages()), false)));
				}
			} else if("prepare".equals(action)) {
				Reply reply = dm.prepare(req.getParameter("drink"), req.getParameter("size"), req.getParameter("strength"));
				if(reply.isSuccess()) {
					JSonResponse response = new JSonResponse(true);
					response.setData(reply.getStatus());
					resp.getWriter().write(new Gson().toJson(response));
				} else {
					resp.getWriter().write(new Gson().toJson(new JSonResponse(Arrays.asList(reply.getMessages()), false)));
				}
			} else {
				resp.getWriter().write(new Gson().toJson(new JSonResponse(Arrays.asList("Unknown action"), false)));
			}
		} catch (Exception e) {
			e.printStackTrace();
			JSonResponse jsonResponse = new JSonResponse(false);
			jsonResponse.setMessages(Arrays.asList(new String[] {"An error occurred"}));
			resp.getWriter().write(new Gson().toJson(jsonResponse));
		}
	}

}
