package be.tomvertommen.drinksMachineClient.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.SocketException;
import java.net.UnknownHostException;

import org.apache.log4j.Logger;

import be.tomvertommen.drinksMachine.communication.Constants;
import be.tomvertommen.drinksMachine.communication.Reply;
import be.tomvertommen.drinksMachine.communication.Request;
import be.tomvertommen.drinksMachine.communication.RequestName;
import be.tomvertommen.drinksMachine.tools.Config;
import be.tomvertommen.drinksMachine.tools.Convertor;

/**
 * Reference implementation from {@link IDrinksMachineService}
 * Can only be instantiated once.
 * Connects to the DrinksMachine server and reconnects if needed.
 * Sends XML {@link Request} over TCP/IP and returns the received {@link Reply}
 * host and port are configurable in application.properties
 * @author Tom Vertommen
 *
 */
public class DrinksMachineService implements IDrinksMachineService {
	
	private static IDrinksMachineService instance;
	
	private static Logger logger = Logger.getLogger(DrinksMachineService.class);
	
	public static IDrinksMachineService instance() {
		if(instance == null)
			instance = new DrinksMachineService();
		return instance;
	}
	
	private DrinksMachineService() {
		connect();
	}
	
	private PrintWriter out;
	private BufferedReader in;
	private Socket socket;
	private int nrOfAttempts = 3;
	
	private void connect() {
		logger.info("connecting");
		if(socket != null)
			try {
				socket.close();
			} catch (IOException e) {
				logger.error("IOException while closing socket", e);
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		if(out != null)
			out.close();
		if(in != null)
			try {
				in.close();
			} catch (IOException e) {
				logger.error("IOException while closing bufferedReader", e);
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		try {
			socket = 
					new Socket(
							Config.getInstance().getProperty(be.tomvertommen.drinksMachineClient.tools.Property.HOST), 
							Integer.valueOf(Config.getInstance().getProperty(be.tomvertommen.drinksMachineClient.tools.Property.PORT)));
		} catch (UnknownHostException e) {
			logger.error("UnknownHostException while creating socket", e);
			e.printStackTrace();
			throw new RuntimeException(e);
		} catch (IOException e) {
			logger.error("IOException while creating socket", e);
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		OutputStream outputStream = null;
		try {
			outputStream = socket.getOutputStream();
		} catch (IOException e) {
			logger.error("IOException while getting outputStream", e);
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		out = new PrintWriter(outputStream, true);
		InputStream inputStream = null;
		try {
			inputStream = socket.getInputStream();
		} catch (IOException e) {
			logger.error("IOException while getting inputStream", e);
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		in = new BufferedReader(new InputStreamReader(inputStream));
		logger.info("connected");
	}
	
	private Reply send(Request request) {
		return send(request, true);
	}
	
	private Reply send(Request request, boolean log) {
		int attempt = 0;
		while(attempt <= nrOfAttempts) {
			attempt++;
			String xml = Convertor.marshall(request, Request.class);
			if(log) 
				logger.info(xml);
			out.println(xml + Constants.END_OF_MESSAGE);
			String line = null;
			try {
				line = in.readLine() + System.getProperty("line.separator");
			} catch (SocketException e) {
				logger.warn("SocketException while reading line", e);
				connect();
				continue;
			} catch (IOException e) {
				logger.warn("IOException while reading line", e);
				connect();
				continue;
			}
			xml = "";
			while (!line.startsWith(Constants.END_OF_MESSAGE)) {
				xml += line;
				try {
					line = in.readLine() + System.getProperty("line.separator");
				} catch (IOException e) {
					logger.error("IOException while reading line", e);
					e.printStackTrace();
					throw new RuntimeException(e);
				}
			}
			if(log) 
				logger.info(xml);
			return (Reply)Convertor.unmarshall(xml, Reply.class);
		}
		Reply reply = new Reply();
		reply.setMessages(new String[] {"failed to send request"});
		return reply;
	}
	
	/**
	 * @see IDrinksMachineService#setMode(String)
	 */
	public Reply setMode(String mode) {
		Request request = new Request();
		request.setName(RequestName.SET_MODE.name());
		request.setMode(mode);
		return send(request);
	}

	/**
	 * @see IDrinksMachineService#getDrink(String)
	 */
	public Reply getDrink(String name) {
		Request request = new Request();
		request.setDrink(name);
		request.setName(RequestName.GET_DRINK.name());
		return send(request);
	}

	/**
	 * @see IDrinksMachineService#addIngredient(String)
	 */
	public Reply addIngredient(String ingredient) {
		Request request = new Request();
		request.setIngredient(ingredient);
		request.setName(RequestName.ADD_INGREDIENT.name());
		return send(request);
	}

	/**
	 * @see IDrinksMachineService#removeIngredient(String)
	 */
	public Reply removeIngredient(String ingredient) {
		Request request = new Request();
		request.setIngredient(ingredient);
		request.setName(RequestName.REMOVE_INGREDIENT.name());
		return send(request);
	}

	/**
	 * @see IDrinksMachineService#addMaxQty(String)
	 */
	public Reply addMaxQty(String ingredient) {
		Request request = new Request();
		request.setIngredient(ingredient);
		request.setName(RequestName.ADD_MAX_QTY.name());
		return send(request);
	}

	/**
	 * @see IDrinksMachineService#removeMaxQty(String)
	 */
	public Reply removeMaxQty(String ingredient) {
		Request request = new Request();
		request.setIngredient(ingredient);
		request.setName(RequestName.REMOVE_MAX_QTY.name());
		return send(request);
	}

	/**
	 * @see IDrinksMachineService#addAlarmQty(String)
	 */
	public Reply addAlarmQty(String ingredient) {
		Request request = new Request();
		request.setIngredient(ingredient);
		request.setName(RequestName.ADD_ALARM_QTY.name());
		return send(request);
	}

	/**
	 * @see IDrinksMachineService#removeAlarmQty(String)
	 */
	public Reply removeAlarmQty(String ingredient) {
		Request request = new Request();
		request.setIngredient(ingredient);
		request.setName(RequestName.REMOVE_ALARM_QTY.name());
		return send(request);
	}

	/**
	 * @see IDrinksMachineService#getStatus(boolean, boolean)
	 */
	public Reply getStatus(boolean forceLoad, boolean log) {
		Request request = new Request();
		request.setForceLoad(forceLoad);
		request.setLog(log);
		request.setName(RequestName.GET_STATUS.name());
		return send(request, log);
	}

	/**
	 * @see IDrinksMachineService#getStatus(boolean)
	 */
	public Reply getStatus(boolean forceLoad) {
		Request request = new Request();
		request.setForceLoad(forceLoad);
		request.setName(RequestName.GET_STATUS.name());
		return send(request, true);
	}

	/**
	 * @see IDrinksMachineService#setPower(boolean)
	 */
	public Reply setPower(boolean on) {
		Request request = new Request();
		request.setName(RequestName.SET_POWER.name());
		request.setOn(on);
		return send(request);
	}

	/**
	 * @see IDrinksMachineService#setCard(boolean)
	 */
	public Reply setCard(boolean on) {
		Request request = new Request();
		request.setName(RequestName.SET_CARD.name());
		request.setOn(on);
		return send(request);
	}

	/**
	 * @see IDrinksMachineService#setPluggedIn(boolean)
	 */
	public Reply setPluggedIn(boolean on) {
		Request request = new Request();
		request.setName(RequestName.SET_PLUGGED_IN.name());
		request.setOn(on);
		return send(request);
	}

	/**
	 * @see IDrinksMachineService#setWater(boolean)
	 */
	public Reply setWater(boolean on) {
		Request request = new Request();
		request.setName(RequestName.SET_WATER.name());
		request.setOn(on);
		return send(request);
	}

	/**
	 * @see IDrinksMachineService#prepare(String, String, String)
	 */
	public Reply prepare(String drinkId, String size, String strength) {
		Request request = new Request();
		request.setName(RequestName.PREPARE.name());
		request.setDrink(drinkId);
		request.setSize(size);
		request.setStrength(strength);
		return send(request);
	}

}
