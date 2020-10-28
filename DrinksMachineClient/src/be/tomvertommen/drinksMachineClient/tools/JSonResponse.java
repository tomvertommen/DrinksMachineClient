package be.tomvertommen.drinksMachineClient.tools;

import java.util.List;

/**
 * Serialized to JSon and returned as response to AJAX requests.
 * @author Tom Vertommen
 *
 */
public class JSonResponse {
	
	private String message;
	private List<String> messages;
	private boolean success;
	private Object data;
	
	/**
	 * Creates a JSonResponse with the given success value.
	 * @param success
	 */
	public JSonResponse(boolean success) {
		this.success = success;
	}

	/**
	 * Creates a JSonResponse with the given messages and success value.
	 * @param messages
	 * @param success
	 */
	public JSonResponse(List<String> messages, boolean success) {
		this.messages = messages;
		this.success = success;
	}

	/**
	 * Creates a JSonresponse with the given message and success value.
	 * @param message
	 * @param success
	 */
	public JSonResponse(String message, boolean success) {
		this.message = message;
		this.success = success;
	}

	/**
	 * Creates a JSonResponse with the given message, messages and success value
	 * @param message
	 * @param messages
	 * @param success
	 */
	public JSonResponse(String message, List<String> messages, boolean success) {
		this.message = message;
		this.messages = messages;
		this.success = success;
	}

	/**
	 * 
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}
	
	/**
	 * sets the message
	 * @param message
	 */
	public void setMessage(String message) {
		this.message = message;
	}
	
	/**
	 * 
	 * @return the messages
	 */
	public List<String> getMessages() {
		return messages;
	}
	
	/**
	 * sets the messages
	 * @param messages
	 */
	public void setMessages(List<String> messages) {
		this.messages = messages;
	}
	
	/**
	 * 
	 * @return true if the request was handled successfully
	 */
	public boolean isSuccess() {
		return success;
	}
	
	/**
	 * sets if the request was handled successfully
	 * @param success
	 */
	public void setSuccess(boolean success) {
		this.success = success;
	}

	/**
	 * 
	 * @return the response data
	 */
	public Object getData() {
		return data;
	}

	/**
	 * sets the response data
	 * @param data
	 */
	public void setData(Object data) {
		this.data = data;
	}

}
