package be.tomvertommen.drinksMachineClient.service;

import be.tomvertommen.drinksMachine.business.Drink;
import be.tomvertommen.drinksMachine.business.Status;
import be.tomvertommen.drinksMachine.communication.Reply;

public interface IDrinksMachineService {

	/**
	 * sets drinkMachine mode (READY or MAINTENANCE)
	 * @param mode
	 * @return {@link Reply}
	 */
	Reply setMode(String mode);

	/**
	 * gets the {@link Drink} for the given name
	 * @param name
	 * @return {@link Reply}
	 */
	Reply getDrink(String name);

	/**
	 * adds 1 to the current qty of the given ingredient
	 * @param ingredient
	 * @return {@link Reply}
	 */
	Reply addIngredient(String ingredient);

	/**
	 * subtracts 1 of the current qty of the given ingredient
	 * @param ingredient
	 * @return {@link Reply}
	 */
	Reply removeIngredient(String ingredient);

	/**
	 * adds 1 to the max qty of the given ingredient
	 * @param ingredient
	 * @return {@link Reply}
	 */
	Reply addMaxQty(String ingredient);

	/**
	 * subtracts 1 of the max qty of the given ingredient
	 * @param ingredient
	 * @return {@link Reply}
	 */
	Reply removeMaxQty(String ingredient);

	/**
	 * adds 1 to the alarm qty of the given ingredient
	 * @param ingredient
	 * @return {@link Reply}
	 */
	Reply addAlarmQty(String ingredient);

	/**
	 * subtracts 1 of the alarm qty of the given ingredient
	 * @param ingredient
	 * @return {@link Reply}
	 */
	Reply removeAlarmQty(String ingredient);

	/**
	 * returns the {@link Status} of the drinksMachine
	 * @param forceLoad forces loading the {@link Status} from the persistent store or not
	 * @param log turns on or off logging inside this method
	 * @return {@link Reply}
	 */
	Reply getStatus(boolean forceLoad, boolean log);

	/**
	 * returns the {@link Status} of the drinksMachine
	 * logging inside this method is enabled
	 * @param forceLoad forces loading the {@link Status} from the persistent store or not
	 * @return {@link Reply}
	 */
	Reply getStatus(boolean forceLoad);

	/**
	 * sets power
	 * @param on
	 * @return {@link Reply}
	 */
	Reply setPower(boolean on);

	/**
	 * inserts or removes bank card
	 * @param on
	 * @return {@link Reply}
	 */
	Reply setCard(boolean on);

	/**
	 * sets pluggedIn
	 * @param on
	 * @return {@link Reply}
	 */
	Reply setPluggedIn(boolean on);

	/**
	 * sets water connection
	 * @param on
	 * @return {@link Reply}
	 */
	Reply setWater(boolean on);

	/**
	 * prepares the given drink with given size and strength
	 * @param drinkId
	 * @param size
	 * @param strength
	 * @return {@link Reply}
	 */
	Reply prepare(String drinkId, String size, String strength);

}