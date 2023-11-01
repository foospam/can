class GameSettings {

    static DEBITOR_HARM: number = 25;
    static RAMDOM_PRICE_VARIATION_PERCENTAGE: number = 3;
    static RANDOM_PLACE_EVENT_FREQ: number = 0.2;
    static RANDOM_USER_EVENT_FREQ: number = 0.3;
    static WORLD_SIZE: number = 20;
    static AROUND_WORLD_TICKET_PRICE: number = 500;
    static PRICE_PER_KM: number = GameSettings.AROUND_WORLD_TICKET_PRICE / GameSettings.WORLD_SIZE;
    static MIN_DISTANCE: number = 5;
    static NUMBER_OF_PLACES: number = 8;
    static INITIAL_HEALTH: number = 100;
    static INITIAL_CASH: number = 500;
    static INITIAL_HOLD: number = 10;
    static INITIAL_REPUTATION: number = 1;

    // Loan shark settings
    static BASIC_LOAN: number = 10000;
    static MIN_LOAN: number = 1000;
    static MAX_PAYMENT_PERIOD: number = 15;
    static MIN_PAYMENT_PERIOD: number = 3;
    static INTEREST_RATE: number = 10;
    static ROBBER_VENGEANCE_HARM: number = 5;

    // Robbery settings
    static MAX_CASH_ROBBERY_PERCENT: number = 80;
    static MIN_CASH_ROBBERY_PERCENT: number = 20;
    static MAX_STUFF_ROBBERY_PERCENT: number = 80;
    static MIN_STUFF_ROBBERY_PERCENT: number = 20;

    // Event frequency settings
    static LOW_FREQ: number = 1;
    static NORMAL_FREQ: number = 2;
    static HIGH_FREQ: number = 3;
    static EVENT_FREQUENCY: Map<string, number> = new Map([
        ["PRICE_INCREASE_EVENT", GameSettings.NORMAL_FREQ],
        ["PRICE_DECREASE_EVENT", GameSettings.NORMAL_FREQ],
        ["BUY_ARM_EVENT", GameSettings.LOW_FREQ],
        ["BUY_STUFF_CARRIER_EVENT", GameSettings.NORMAL_FREQ],
        ["MONEY_ROBBERY_EVENT", GameSettings.LOW_FREQ],
        ["STUFF_ROBBERY_EVENT", GameSettings.HIGH_FREQ],
        ["POLICE_COMBAT_EVENT", GameSettings.NORMAL_FREQ]
    ]);

    static FALSE_INPUT_TOKEN: string = "FALSE_INPUT";
}

/* enum EventName {
    PRICE_INCREASE_EVENT = 'PRICE_INCREASE_EVENT',
    PRICE_DECREASE_EVENT = 'PRICE_DECREASE_EVENT',
    BUY_ARM_EVENT = 'BUY_ARM_EVENT',
    BUY_STUFF_CARRIER_EVENT = 'BUY_STUFF_CARRIER_EVENT',
    MONEY_ROBBERY_EVENT = 'MONEY_ROBBERY_EVENT',
    STUFF_ROBBERY_EVENT = 'STUFF_ROBBERY_EVENT',
    POLICE_COMBAT_EVENT = 'POLICE_COMBAT_EVENT'
} */

export default GameSettings;