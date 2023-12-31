const TextObject = {
    "arms": {
      "default": {
        "name": "Fists",
        "harm": 5,
        "accuracy": 75,
        "price": 0,
        "default": true
      },
      "1": {
        "name": "Beretta",
        "harm": 40,
        "accuracy": 50,
        "price": 750
      },
      "2": {
        "name": "Baseball bat",
        "harm": 10,
        "accuracy": 80,
        "price": 100
      },
      "3": {
        "name": "Uzi",
        "harm": 40,
        "accuracy": 80,
        "price": 1000
      },
      "4": {
        "name": "Bazooka",
        "harm": 100,
        "accuracy": 30,
        "price": 5000
      },
      "5": {
        "name": "Stonethrower",
        "harm": 10,
        "accuracy": 20,
        "price": 50
      }
    },
    "placeNames": [
      "Cincinatti",
      "Acapulco",
      "Montreal",
      "Leeds",
      "Cape Town",
      "Metropolis",
      "Gotham",
      "Manhattan"
    ],
    "stuffNames": [
      "Bubble head",
      "Fizzy Dizzs",
      "Funny Frogs",
      "Red Tongues",
      "Chocolate Punch",
      "Licorice Krispies",
      "Mint Q",
      "Sugarator"
    ],
    "stuffCarriers": {
      "1": {
        "name": "Old trenchcoat",
        "hold": 10,
        "price": 500
      },
      "2": {
        "name": "Big trenchcoat",
        "hold": 20,
        "price": 1000
      },
      "3": {
        "name": "Deluxe trenchcoat",
        "hold": 40,
        "price": 2000
      },
      "4": {
        "name": "Army backpack",
        "hold": 60,
        "price": 5000
      },
      "5": {
        "name": "Narcoboat",
        "hold": 500,
        "price": 25000
      }
    },
    "screen_texts": {
      "default_values": {
        "badInputPrompt": "%s is not a valid input!",
        "prompt": null,
        "validInput": null,
        "advanceDay": 0,
        "passInput": false,
        "transitionDelay": false,
        "defaultNextScreen": null
      },
      "MAIN_SELECTION" : {
        "badInputPrompt" : "Just type one of the capital letters highlighted in the options. It's not rocket science!",
        "prompt": "Here are your possible plans:\n(B)uy stuff              (S)ell stuff             (J)et to another city\n(V)isit the bank         Go to the (H)ospital     See the (L)oan shark\n(R)elax and do nothing   (Q)uit like a coward\nWhat do you do?",
        "validInput" : "[BSJVHLRQ]"
      },
      "SELECT_STUFF_TO_BUY": {
        "badInputPrompt": "Please enter a number from 1 to 8!",
        "prompt": "-What sweet stuff are you interested in?\n\n    1. %1$-20s 5. %5$-20s\n    2. %2$-20s 6. %6$-20s\n    3. %3$-20s 7. %7$-20s\n    4. %4$-20s 8. %8$-20s\n",
        "validInput": "[1-8]",
        "passInput": true,
        "defaultNextScreen": "SELECT_QTY_TO_BUY"
      },
      "SELECT_QTY_TO_BUY": {
        "badInputPrompt": "Please enter a valid number!",
        "prompt": "-How much do you want to buy?",
        "validInput": "[0-9]+",
        "advanceDay": 1
      },
      "ZERO_STUFF_TO_BUY": {
        "prompt": "-You come to me to buy nothing? Come back when you want to make serious business!"
      },
      "CASH_EXCEEDED": {
        "prompt": "-Come back when you got the money, you broke bastard!"
      },
      "HOLD_EXCEEDED": {
        "prompt": "You can't carry that much!"
      },
      "SELECT_STUFF_TO_SELL": {
        "badInputPrompt": "Please enter a number from 1 to 8!",
        "prompt": "What do you have for me?\n\n    1. %1$-20s 5. %5$-20s\n    2. %2$-20s 6. %6$-20s\n    3. %3$-20s 7. %7$-20s\n    4. %4$-20s 8. %8$-20s\n",
        "validInput": "[1-8]",
        "passInput": true,
        "defaultNextScreen": "SELECT_QTY_TO_SELL"
      },
      "SELECT_QTY_TO_SELL": {
        "badInputPrompt": "Please enter a valid number!",
        "prompt": "-How much do you want to unload?",
        "validInput": "[0-9]+",
        "advanceDay": 1
      },
      "ZERO_STUFF_TO_SELL": {
        "prompt": "-Come on, guy! Don't you dare pull that one on me ever again! My children are hungry!"
      },
      "STASH_EXCEEDED": {
        "prompt": "You don't have that much on you!"
      },
      "BANK_OPERATION_SELECTION": {
        "badInputPrompt": "Please answer just 'D' or 'W'!",
        "prompt": "What brings you to our humble bank?\n\n    (D)eposit some cash\n    (W)ithdraw some cash",
        "validInput": "[DW]"
      },
      "DEPOSIT_MONEY": {
        "badInputPrompt": "Please enter a valid number!",
        "prompt": "How much do you want to deposit?",
        "validInput": "\\d+"
      },
      "DEPOSIT_EXCEEDED": {
        "prompt": "You don't have that much cash!"
      },
      "WITHDRAW_MONEY": {
        "badInputPrompt": "Please enter a valid number!",
        "prompt": "How much do you want to withdraw?",
        "validInput": "\\d+"
      },
      "WITHDRAW_LIMIT_EXCEEDED": {
        "prompt": "You don't have that much cash!"
      },
      "GO_TO_HOSPITAL": {
        "badInputPrompt": "Just say Y or N, man!",
        "prompt": "You drag your sorry ass to the local hospital. The docs check you up and come to the conclusion that it will cost %d $ to check you out.%n%nDo you sign the consent forms? (Y/N)",
        "validInput": "[YN]",
        "passInput": true
      },
      "HEALED": {
        "prompt": "You are good to go. Just lay in bed for %s days."
      },
      "NOT_HEALED": {
        "prompt": "God help you man!"
      },
      "NO_CASH_FOR_HEALING": {
        "prompt": "You don't have enough money! The docs also want to eat!"
      },
      "LOAN_SHARK": {
        "badInputPrompt": "I don't speak your language! Just say B or P, man",
        "prompt": "What do you want from me? (B)orrow some money or (P)ay some money back?",
        "validInput": "[BP]"
      },
      "BORROW_MONEY": {
        "badInputPrompt": "Just name a figure, don't be shy!",
        "prompt": "How much do you want to borrow?",
        "validInput": "\\d+",
        "passInput": true
      },
      "BORROW_MONEY_TOO_MUCH": {
        "prompt": "No, man, that's too risky."
      },
      "BORROW_MONEY_TOO_LITTLE": {
        "prompt": "That's too little. You won't get my lazy ass off the sofa for less than 1000 $."
      },
      "BORROW_MONEY_OK": {
        "prompt": "Here you are, sir. Now, you know the drill: you have %s days to pay me back, or you'll get a visit from my boys.",
        "advanceDay": 1
      },
      "BORROW_MONEY_NOT_OK": {
        "prompt": "No way, man! You still owe me %s $. You better pay me back soon, the clock is ticking..."
      },
      "PAY_BACK_MONEY": {
        "badInputPrompt": "Come on, say a figure!",
        "prompt": "How much have you brought me?",
        "validInput": "\\d+"
      },
      "PAY_BACK_IN_FULL": {
        "prompt": "You pay in full? It's a pleasure to make business with you, sir."
      },
      "PAY_BACK_PARTIALLY": {
        "prompt": "Each note is beautiful, but you still owe me %s."
      },
      "PAY_BACK_ZERO": {
        "prompt": "Do you think that's funny? I won't take that little. Get the hell out of my office and make me some money."
      },
      "PAY_BACK_TOO_MUCH": {
        "prompt": "Where are those moneys? You don't have that much on you!"
      },
      "TRAVEL": {
        "badInputPrompt": "Just type the number of your destination",
        "prompt": "You are at the airport.%nWhere do you want to go?%n%s%n",
        "validInput": "\\d+"
      },
      "TRAVEL_OK": {
        "prompt": "All right! Hop in! We're headed to %s!",
        "advanceDay": 1
      },
      "TRAVEL_NOT_OK": {
        "prompt": "Man, you are already in %s! So here you remain."
      },
      "TRAVEL_TOO_EXPENSIVE": {
        "prompt": "You don't have enough money to get to %s! Come back when you got the money!"
      },
      "RELAX": {
        "prompt": "Yeah, just relax and wait to see what the future has in store for you.",
        "advanceDay": 1
      },
      "EVENT_PRICE_INCREASE": {
        "prompt": "The cops have seized an important cargo of %s. Its prices are exploding!"
      },
      "EVENT_PRICE_DECREASE": {
        "prompt": "Some cops have started traficking themselves. The market is flooded with %s!"
      },
      "ROB_ALL_MONEY": {
        "prompt": "A gangster steps out of a dark alley and puts a gun to your temple.\n\"Empty your pockets, man!\"\nYou manage to save some of your cash, but he takes %s percent of it."
      },
      "ROB_ALL_MONEY_NO_OK": {
        "prompt": "A gangster steps out of a dark alley and puts a gun to your temple.\n\"Empty your pockets, man!\"\nUnfortunately, you don't have enough. He hits you with the back of his gun.\n\"You broke bastard!\"\nYou get away injured."
      },
      "ROB_ALL_STUFF": {
        "prompt": "A potential customer steps out of a dark alley and puts a gun to your temple.\n\"Give me all that sweet stuff of yours!\"\nYou trick him a little, but he takes %s unit%s you were carrying."
      },
      "ROB_ALL_STUFF_NO_OK": {
        "prompt": "A gangster steps out of a dark alley and puts a gun to your temple.\n\"Give me all that sweet stuff of yours!\"\nUnfortunately, you don't carry anything. He hits you with the back of his gun.\n\"Now I'll have to go cold turkey!\"\nYou get away injured."
      },
      "BUY_STUFF_CARRIER": {
        "badInputPrompt": "Just say yes or no, man. I don't have all day.",
        "prompt": "A shady guy approaches in a dark alley. Do you want to buy a %s? It can hold up to %s units of stuff, and it costs just %s.",
        "validInput": "[YN]"
      },
      "BUY_STUFF_CARRIER_OK": {
        "prompt": "Here you are! It's a pleasure to make business with you!"
      },
      "BUY_STUFF_CARRIER_NO": {
        "prompt": "Your miss. That was some sweet merch!"
      },
      "BUY_ARM": {
        "badInputPrompt": "Just say yes or no, man. I don't have all day.",
        "prompt": "A shady guy with a military look approaches in a dark alley. Do you want to buy a %s?%nIt's a powerful weapon! You hit somebody, they get %s stitches.%nWith an accuracy of %s, you cannot miss.%nThe unit costs %s. I can give you %s for %s, you take it or leave it.",
        "validInput": "[YN]"
      },
      "BUY_ARM_OK": {
        "prompt": "Here you are! It's a pleasure to make business with you, sir!"
      },
      "BUY_ARM_NO_OK": {
        "prompt": "I'm sorry. This could really have protected you."
      },
      "NO_MONEY": {
        "prompt": "Come back when you got the money!"
      },
      "RECLAIM_DEBT": {
        "prompt": "A group of sketchy guys round you up in dark alley. You don't have time to react. One of them has a baseball bat.",
        "passInput": true
      },
      "HIT_DEBITOR": {
        "prompt": "CRACK!",
        "transitionDelay": true,
        "passInput": true
      },
      "WARN_DEBITOR": {
        "prompt": "The loan shark needs his money, comprende? You got 10 more days. Next time you won't come off so lightly!"
      },
      "GAME_OVER": {
        "badInputPrompt": "Just type Y or N!",
        "prompt": "You kinda fall asleep. Next thing you see, you are surrounded by fire and some weird people in red pajamas are running around carrying forks. You're dead, amigo.\n\nDo you want to start a new game?",
        "validInput": "[YN]"
      },
      "GOOD_BYE": {
        "prompt": "Oh, look, Mr. important has more important things to do than play little games! You'll be back and you know it!"
      },
      "EVENT_LOOP": {
        "prompt": null
      },
      "SET_COMBAT": {
        "badInputPrompt": "Just type a number, we'll see how many come to your call!",
        "prompt": "Someone must have snitched on you, because Five-Oh is on you. %s cop%s %s trying to bring you in! How much reinforcement do you want to bring? (Max: %s) %n",
        "validInput": "\\d+"
      },
      "COMBAT_ACTION_SELECTION": {
        "badInputPrompt": "Just type G for 'go' or F for 'fight', man!",
        "prompt": "THIS IS THE SITUATION:%n%sWhat do you do now? (G)o or (F)ight!",
        "validInput": "[GF]"
      },
      "QUIT_CONFIRMATION": {
        "badInputPrompt": "Just type Y or N, man!",
        "prompt": "Do you really want to chicken out after building this mess?",
        "validInput": "[YN]"
      },
      "WELCOME_SCREEN": {
        "badInputPrompt": "Just type 1 or 2!",
        "prompt": "Welcome to... \n\n   █████████                           █████            █████                              █████\n  ███░░░░░███                         ░░███            ░░███                              ░░███ \n ███     ░░░   ██████   ████████    ███████  █████ ████ ░███         ██████  ████████   ███████ \n░███          ░░░░░███ ░░███░░███  ███░░███ ░░███ ░███  ░███        ███░░███░░███░░███ ███░░███ \n░███           ███████  ░███ ░███ ░███ ░███  ░███ ░███  ░███       ░███ ░███ ░███ ░░░ ░███ ░███ \n░░███     ███ ███░░███  ░███ ░███ ░███ ░███  ░███ ░███  ░███      █░███ ░███ ░███     ░███ ░███ \n ░░█████████ ░░████████ ████ █████░░████████ ░░███████  ███████████░░██████  █████    ░░████████\n  ░░░░░░░░░   ░░░░░░░░ ░░░░ ░░░░░  ░░░░░░░░   ░░░░░███ ░░░░░░░░░░░  ░░░░░░  ░░░░░      ░░░░░░░░ \n                                              ███ ░███                                          \n                                             ░░██████                                           \n                                              ░░░░░░                                            \n\t\t\t\t\t\t\t\t\t\t\t  \n\n1. Start a new game\n2. Load saved game",
        "validInput": "[12]"
      }
    },
    "battlePrompts": {
      "escaped": "%s escaped the battle scene!",
      "youEscaped": "You chickenend out like the chicken you are!",
      "youEscapedNot": "You tried to chicken out, but the cops were quicker. Good luck next time!",
      "hit": "%s shot %s. %s took %s points of harm.",
      "miss": "%s shot %s. %s missed.",
      "killed": "%s has bitten the dust!",
      "youKilled": "You have bitten the dust!",
      "youWin": "You have won! Your reputation is intact!",
      "retriveArm": "You retrieve a %s from the battlefield."
    },
    "generalTexts": {
      "armString" :  "%s (harm: %s, acc.: %s)",
      "holsterArmString" : "%s %s (%s, %s %s %s %s) ",
      "fighterString" : "%s %s: %s %s %s",
      "enterToContinue": "\n(Press enter to continue.)",
      "is": "is",
      "are": "are",
      "singularEnding": "",
      "pluralEnding": "s",
      "copName": "Cop",
      "accompliceName": "Accomplice",
      "travelPriceRow": " %d. %-15s (%3s $)   %d. %-18s (%3s $)%n",
      "userStatsRow": "%s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s (%s) ",
      "stuffDataRow": "%s %-18s (%s %3s %s %5s $)    %s %-18s (%s %3s %s %5s $)%n"
  
    }
  }

  export default TextObject;
  
  