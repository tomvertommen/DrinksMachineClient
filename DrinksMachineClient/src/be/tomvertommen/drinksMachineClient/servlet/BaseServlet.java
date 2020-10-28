package be.tomvertommen.drinksMachineClient.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

/**
 * Super class for all servlets with utility methods 
 * @author Tom Vertommen
 *
 */
public class BaseServlet extends HttpServlet {
	
	@SuppressWarnings("unused")
	private static Logger logger = Logger.getLogger(BaseServlet.class);
	
	/**
	 * Forwards a request to an url
	 * @param request
	 * @param response
	 * @param url
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void forward(HttpServletRequest request, HttpServletResponse response, String url) throws ServletException, IOException {
    	getServletContext().getRequestDispatcher(url).forward(request, response);
    }
	
	/**
	 * Gets a parameter as boolean from the request
	 * @param request
	 * @param name
	 * @return
	 */
	protected boolean getParameterAsBoolean(HttpServletRequest request, String name) {
		String parameter = request.getParameter(name);
		return  parameter != null && Boolean.valueOf(parameter);
	}
	
	/**
	 * Gets a parameter as boolean from the request.
	 * Allows setting a default value in case the parameter is not found.
	 * @param request
	 * @param name
	 * @param defaultValue
	 * @return
	 */
	protected boolean getParameterAsBoolean(HttpServletRequest request, String name, boolean defaultValue) {
		String parameter = request.getParameter(name);
		return parameter == null ? defaultValue : Boolean.valueOf(parameter);
	}

}
