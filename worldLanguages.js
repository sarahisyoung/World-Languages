'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this:  var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = "amzn1.ask.skill.953cee7c-ba71-4499-adbf-462f8a15b1dc";

//This function returns a descriptive sentence about your data.  Before a user starts a quiz, they can ask about a specific data element,
//like "Ohio."  The skill will speak the sentence from this function, pulling the data values from the appropriate record in your data.
function getSpeechDescription(item)
{
    var sentence = item.Language + " is spoken in " + item.Country + ". I've added " + item.Country + " to your Alexa app.  Which other Country would you like to know about?";
    return sentence;
}

//We have provided two ways to create your quiz questions.  The default way is to phrase all of your questions like: "What is X of Y?"
//If this approach doesn't work for your data, take a look at the commented code in this function.  You can write a different question
//structure for each property of your data.
function getQuestion(counter, property, item)
{
    return "Here is your " + counter + "th question.  What is the official" + formatCasing(property) + " of "  + item.Country + "?";

    /*
    switch(property)
    {
        case "City":
            return "Here is your " + counter + "th question.  In what city do the " + item.League + "'s "  + item.Mascot + " play?";
        break;
        case "Sport":
            return "Here is your " + counter + "th question.  What sport do the " + item.City + " " + item.Mascot + " play?";
        break;
        case "HeadCoach":
            return "Here is your " + counter + "th question.  Who is the head coach of the " + item.City + " " + item.Mascot + "?";
        break;
        default:
            return "Here is your " + counter + "th question.  What is the " + formatCasing(property) + " of the "  + item.Mascot + "?";
        break;
    }
    */
}

//This is the function that returns an answer to your user during the quiz.  Much like the "getQuestion" function above, you can use a
//switch() statement to create different responses for each property in your data.  For example, when this quiz has an answer that includes
//a state answer, we add some SSML to make sure that Alexa spells that answer out (instead of trying to pronounce it.)
function getAnswer(property, item)
{
    switch(property)
    {
        // case "Languages":
       //     return "The " + formatCasing(property) + " of " + item.TrigFunction + " is <say-as interpret-as='spell-out'>" + item[property] + "</say-as>. "
        // break;
        
        default:
            return "The " + formatCasing(property) + " of " + item.Country + " is " + item[property] + ". "
        break;
    }
}

//This is a list of positive speechcons that this skill will use when a user gets a correct answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
var speechConsCorrect = ["Booya", "All righty", "Bam", "Bazinga", "Bingo", "Boom", "Bravo", "Cha Ching", "Cheers", "Dynomite", 
"Hip hip hooray", "Hurrah", "Hurray", "Huzzah", "Oh dear.  Just kidding.  Hurray", "Kaboom", "Kaching", "Oh snap", "Phew", 
"Righto", "Way to go", "Well done", "Whee", "Woo hoo", "Yay", "Wowza", "Yowsa"];

//This is a list of negative speechcons that this skill will use when a user gets an incorrect answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
var speechConsWrong = ["Argh", "Aw man", "Blarg", "Blast", "Boo", "Bummer", "Darn", "D'oh", "Dun dun dun", "Eek", "Honk", "Le sigh",
"Mamma mia", "Oh boy", "Oh dear", "Oof", "Ouch", "Ruh roh", "Shucks", "Uh oh", "Wah wah", "Whoops a daisy", "Yikes"];

//This is the welcome message for when a user starts the skill without a specific intent.
var WELCOME_MESSAGE = "Welcome to the World Language Game!  You can ask me about any country or you can ask me to start a quiz.  What would you like to do?";  

//This is the message a user will hear when they start a quiz.
var START_QUIZ_MESSAGE = "OK.  I will ask you 10 questions about countries and their Languages.";

//This is the message a user will hear when they try to cancel or stop the skill, or when they finish a quiz.
var EXIT_SKILL_MESSAGE = "Thank you for playing the World Language Game!  Let's play again soon!";

//This is the message a user will hear after they ask (and hear) about a specific data element.
var REPROMPT_SPEECH = "Which other country would you like to know about?";

//This is the message a user will hear when they ask Alexa for help in your skill.
var HELP_MESSAGE = "I know lots of things about countries and their Languages.  You can ask me about a country, and I'll tell you what I know.  You can also test your knowledge by asking me to start a quiz.  What would you like to do?";


//This is the response a user will receive when they ask about something we weren't expecting.  For example, say "pizza" to your
//skill when it starts.  This is the response you will receive.
function getBadAnswer(item) { return "I'm sorry. " + item + " is not something I know very much about in this skill. " + HELP_MESSAGE; }

//This is the message a user will receive after each question of a quiz.  It reminds them of their current score.
function getCurrentScore(score, counter) { return "Your current score is " + score + " out of " + counter + ". "; }

//This is the message a user will receive after they complete a quiz.  It tells them their final score.
function getFinalScore(score, counter) { return "Your final score is " + score + " out of " + counter + ". "; }

//These next four values are for the Alexa cards that are created when a user asks about one of the data elements.
//This only happens outside of a quiz.

//If you don't want to use cards in your skill, set the USE_CARDS_FLAG to false.  If you set it to true, you will need an image for each
//item in your data.
var USE_CARDS_FLAG = true;

//This is what your card title will be.  For our example, we use the name of the state the user requested.
function getCardTitle(item) { return item.Country;}

//This is the small version of the card image.  We use our data as the naming convention for our images so that we can dynamically
//generate the URL to the image.  The small image should be 720x400 in dimension.
function getSmallImage(item) { return "http://i.imgur.com/CsJQeOQ.jpg"; }

//This is the large version of the card image.  It should be 1200x800 pixels in dimension.
function getLargeImage(item) { return "http://i.imgur.com/2jMJM0n.jpg"; }

//=========================================================================================================================================
//TODO: Replace this data with your own.
//=========================================================================================================================================
var data = [
                {Country: "Afghanistan",                 Language: "Dari Persian and Pashtu"},                                                   
                //{Country: "Afghanistan",                 Language: "Pashtu"},  
                {Country: "Albania",                     Language: "Albanian"},                                                   
                //{Country: "Albania",                     Language: "Greek"},          
                {Country: "Algeria",                     Language: "Arabic"},  
                //{Country: "Algeria",                     Language: "French"} ,  
                {Country: "Andorra",                     Language: "Catalan"},
                {Country: "Antigua and Barbuda",         Language: "English"},  
                {Country: "Argentina",                  Language: "Spanish"},
                {Country: "Armenia",                     Language: "Armenian"},  
                {Country: "Australia",                   Language: "English"},  
                {Country: "Austria",                     Language: "German"},  
                {Country: "Azerbaijan",                 Language: "Azerbaijani Turkic"},  
                {Country: "Bahamas",                     Language: "English"},  
                {Country: "Bahrain",                     Language: "Arabic"},  
                {Country: "Bangladesh",                     Language: "Bangla"},  
                {Country: "Barbados",                     Language: "English"},  
                {Country: "Belarus",                     Language: "Belorussian"},  
                {Country: "Belgium",                     Language: "Dutch"},  
                {Country: "Belize",                     Language: "English"},  
                {Country: "Benin",                     Language: "French"},  
                {Country: "Bhutan",                     Language: "Dzongkha"},  
                {Country: "Bolivia",                     Language: "Spanish"},  
                {Country: "Bosnia and Herzegovina",     Language: "Bosnian"},  
                {Country: "Botswana",                   Language: "English and Setswana"},  
                {Country: "Brazil",                     Language: "Portugese"},  
                {Country: "Brunei",                     Language: "Malay"},  
                {Country: "Bulgaria",                     Language: "Bulgarian"},  
                {Country: "Burkina Faso",               Language: "French"},  
                {Country: "Burundi",                     Language: "French and Kirundi"},  
                {Country: "Cambodia",                     Language: "Khmer"},  
                {Country: "Cameroon",                     Language: "English and French"},  
                {Country: "Canada",                     Language: "English and French"},  
                {Country: "Cape Verde",                 Language: "Portugese"},  
                {Country: "Central African Republic",   Language: "French"},  
                {Country: "Chad",                     Language: "Arabic and French"},  
                {Country: "Chile",                     Language: "Spanish"},  
                {Country: "China",                     Language: "Chinese"},  
                {Country: "Colombia",                     Language: "Spanish"},  
                {Country: "Comoros",                     Language: "Arabic and French"},  
                {Country: "Republic of Congo",         Language: "French"},  
                {Country: "Costa Rica",                     Language: "Spanish"},  
                {Country: "Crotia",                     Language: "Crotian"},  
                {Country: "Cuba",                     Language: "Spanish"},  
                {Country: "Cyprus",                     Language: "Greek and Turkish"},  
                {Country: "Czech Republic",            Language: "Czech"},  
                {Country: "Denmark",                     Language: "Danish"},  
                {Country: "Djibouti",                     Language: "Arabic and French"},  
                {Country: "Dominican Republic",        Language: "Spanish"},  
                {Country: "East Timor",                Language: "Portugese"},  
                {Country: "Ecuador",                     Language: "Spanish"}, 
                {Country: "Egypt",                Language: "Arabic"},  
                {Country: "El Salvador",                     Language: "Spanish"},  
                {Country: "Equitorial Guinea",                Language: "French and Spanish"},  
                {Country: "Estonia",                Language: "Estonian"},  
                {Country: "Ethiopia",                Language: "Amharic"},  
                {Country: "Fiji",                Language: "English"},  
                {Country: "Finland",                Language: "Finnish"},  
                {Country: "France",                Language: "French"},  
                {Country: "Gabon",                Language: "French"},  
                {Country: "Gambia",                Language: "English"},  
                {Country: "Georgia",                Language: "Georgian"},
                {Country: "Germany",                Language: "German"},  
                {Country: "Ghana",                Language: "English"},  
                {Country: "Greece",                Language: "Greek"},  
                {Country: "Grenada",                     Language: "English"},  
                {Country: "Guatemala",                     Language: "Spanish"},  
                {Country: "Guinea",                     Language: "French"},  
                {Country: "Haiti",                     Language: "Creole and French"},  
                {Country: "Honduras",                     Language: "Spanish"}, 
                {Country: "Hungary",                     Language: "Hungarian"},
                {Country: "Iceland",                     Language: "Icelandic"}, 
                {Country: "India",                     Language: "Hungarian"}, 
                {Country: "Indonesia",                     Language: "Bahasa Indonesia"}, 
                {Country: "Iran",                     Language: "Old Persian"}, 
                {Country: "Iraq",                     Language: "Arabic"}, 
                {Country: "Ireland",                     Language: "English and Irish"}, 
                {Country: "Isreal",                Language: "Hebrew"},  
                {Country: "Italy",                Language: "Italian"},  
                {Country: "Jamaica",                Language: "English"},  
                {Country: "Japan",                Language: "Japanese"},  
                {Country: "Jordan",                Language: "Arabic"},  
                {Country: "Kazakhstan",                Language: "Kazak"},  
                {Country: "Kenya",                Language: "English"},  
                {Country: "Kiribati",                Language: "English"},  
                {Country: "Korea",                Language: "Korean"},  
                {Country: "Kuwait",                Language: "Arabic"},  
                {Country: "Kyrgyzstan",                Language: "Kyrgyz"},  
                {Country: "Laos",                Language: "Lao"},  
                {Country: "Latvia",                Language: "Latvian"},
                {Country: "Lebanon",                Language: "Arabic"},  
                {Country: "Liberia",                Language: "Arabic and English"},  
                {Country: "Lithuania",                Language: "Lithuanian"},  
                {Country: "Luxembourg",                Language: "Luxembourgish"},  
                {Country: "Macedonia",                Language: "Macedonian"},  
                {Country: "Madagascar",                Language: "Malagasy and French"},  
                {Country: "Malawi",                Language: "Chichewa"},  
                {Country: "Malaysia",                Language: "Malay"}, 
                {Country: "Maldives",                Language: "Maldivian Dhivehi"},  
                {Country: "Mali",                Language: "French"},  
                {Country: "Malta",                Language: "Maltese and English"},  
                {Country: "Marshall Islands",                Language: "Marshallese"},  
                {Country: "Mexico",                Language: "Spanish"},  
                {Country: "Micronesia",                Language: "English"},  
                {Country: "Monaco",                Language: "French"},  
                {Country: "Mongolia",                Language: "Mongolian"},  
                {Country: "Morocco",                Language: "Arabic"},  
                {Country: "Mozambique",                Language: "Portugese"},  
                {Country: "Myanmar",                Language: "Burmese"},  
                {Country: "Namibia",                Language: "English"},  
                {Country: "Nepal",                Language: "Nepali"},  
                {Country: "Netherlands",                Language: "Dutch and Frisian"},
                {Country: "New Zealand",                Language: "English and Maori"},  
                {Country: "Nicaragua",                Language: "Spanish"},  
                {Country: "Nigeria",                Language: "English"},  
                {Country: "Norway",                Language: "Norwegian"},  
                {Country: "Oman",                Language: "Arabic"},  
                {Country: "Pakistan",                Language: "English and Urdu"},  
                {Country: "Panama",                Language: "Spanish"},  
                {Country: "Papa New Guinea",                Language: "Tok Pisin"}, 
                {Country: "Peru",                Language: "Spanish"},  
                {Country: "Panama",                Language: "Spanish"},  
                {Country: "Phillipines",                Language: "English and Filipino"},  
                {Country: "Poland",                Language: "Polish"},  
                {Country: "Portugal",                Language: "Portugese"},  
                {Country: "Qatar",                Language: "Arabic"},  
                {Country: "Romania",                Language: "Romanian"},  
                {Country: "Russia",                Language: "Russian"},  
                {Country: "Samoa",                Language: "Samoan"},  
                {Country: "Saudi Arabia",                Language: "Arabic"},  
                {Country: "Senegal",                Language: "French"},  
                {Country: "Serbia",                Language: "Serbian"},  
                {Country: "Sierra Leone",                Language: "English"},  
                {Country: "Singapore",                Language: "Mandarin"},  
                {Country: "Slovakia",                Language: "Slovak"},  
                {Country: "Slovenia",                Language: "Slovenian"},  
                {Country: "Soloman Islands",                Language: "English"},  
                {Country: "Somalia",                Language: "Somali"},  
                {Country: "South Africa",                Language: "IsiZulu"},  
                {Country: "Spain",                Language: "Spanish"},  
                {Country: "South Sudan",                Language: "English"},  
                {Country: "Sri Lanka",                Language: "Sinhala"},  
                {Country: "Sudan",                Language: "Arabic"},  
                {Country: "Swaziland",                Language: "English and siSwati"},  
                {Country: "Sweden",                Language: "Swedish"},  
                {Country: "Switzerland",                Language: "French"},  
                {Country: "Switzerland",                Language: "Swiss German"},  
                {Country: "Syria",                Language: "Arabic"},  
                {Country: "Tanzania",                Language: "English and Swahili"},  
                {Country: "Thailand",                Language: "Thai"},  
                {Country: "Tunisia",                Language: "Arabic"},  
                {Country: "Turkey",                Language: "Turkish"},  
                {Country: "Turkmenistan",                Language: "Turkmen"},  
                {Country: "Uganda",                Language: "English"},  
                {Country: "Ukraine",                Language: "Ukrainian"},  
                {Country: "United Arab Emirates",   Language: "Arabic"},  
                {Country: "United Kingdom",                Language: "English"},  
                {Country: "United States",                Language: "English US"},  
                {Country: "Uruguay",                Language: "Spanish"},  
                {Country: "Vatican City",                Language: "Italianh"},  
                {Country: "Venezuela",                Language: "Spanish"},  
                {Country: "Vietnam",                Language: "Vietnamese"},  
                {Country: "West Africa",                Language: "Yoruba"}, 
                {Country: "Yemen",                Language: "Arabic"},  
                {Country: "Zambia",                Language: "English"},  
                {Country: "Zimbabwe",                Language: "English"},  
        ];

//=========================================================================================================================================
//Editing anything below this line might break your skill.  
//=========================================================================================================================================

//=========================================================================================================================================
//Editing anything below this line might break your skill.  
//=========================================================================================================================================

var counter = 0;

var states = {
    START: "_START",
    QUIZ: "_QUIZ"
};

const handlers = {
     "LaunchRequest": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
     },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AnswerIntent": function() {
        this.handler.state = states.START;
        this.emitWithState("AnswerIntent");
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
    }
};

var startHandlers = Alexa.CreateStateHandler(states.START,{
    "Start": function() {
        this.emit(":ask", WELCOME_MESSAGE, HELP_MESSAGE);
    },
    "AnswerIntent": function() {
        var item = getItem(this.event.request.intent.slots);

        if (item!= undefined && item[Object.getOwnPropertyNames(data[0])[0]] != undefined)
        {
            if (USE_CARDS_FLAG)
            {
                var imageObj = {smallImageUrl: getSmallImage(item), largeImageUrl: getLargeImage(item)};
                this.emit(":askWithCard", getSpeechDescription(item), REPROMPT_SPEECH, getCardTitle(item), getTextDescription(item), imageObj);
            }
            else
            {
                this.emit(":ask", getSpeechDescription(item), REPROMPT_SPEECH);
            }
        }
        else
        {
            this.emit(":ask", getBadAnswer(item), getBadAnswer(item));
            
        }
    },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.emitWithState("Start");
    }
});


var quizHandlers = Alexa.CreateStateHandler(states.QUIZ,{
    "Quiz": function() {
        this.attributes["response"] = "";
        this.attributes["counter"] = 0;
        this.attributes["quizscore"] = 0;
        this.emitWithState("AskQuestion");
    },
    "AskQuestion": function() {
        if (this.attributes["counter"] == 0)
        {
            this.attributes["response"] = START_QUIZ_MESSAGE + " ";
        }

        var random = getRandom(0, data.length-1);
        var item = data[random];

        var propertyArray = Object.getOwnPropertyNames(item);
        var property = propertyArray[getRandom(1, propertyArray.length-1)];

        this.attributes["quizitem"] = item;
        this.attributes["quizproperty"] = property;
        this.attributes["counter"]++;

        var question = getQuestion(this.attributes["counter"], property, item);
        var speech = this.attributes["response"] + question;

        this.emit(":ask", speech, question);
    },
    "AnswerIntent": function() {
        var response = "";
        var item = this.attributes["quizitem"];
        var property = this.attributes["quizproperty"]

        var correct = compareSlots(this.event.request.intent.slots, item[property]);

        if (correct)
        {
            response = getSpeechCon(true);
            this.attributes["quizscore"]++;
        }
        else
        {
            response = getSpeechCon(false);
        }

        response += getAnswer(property, item);

        if (this.attributes["counter"] < 10)
        {
            response += getCurrentScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.attributes["response"] = response;
            this.emitWithState("AskQuestion");
        }
        else
        {
            response += getFinalScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.emit(":tell", response + " " + EXIT_SKILL_MESSAGE);
        }
    },
    "AMAZON.StartOverIntent": function() {
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.emitWithState("AnswerIntent");
    }
});

function compareSlots(slots, value)
{
    for (var slot in slots)
    {
        if (slots[slot].value != undefined)
        {
            if (slots[slot].value.toString().toLowerCase() == value.toString().toLowerCase())
            {
                return true;
            }
        }
    }
    return false;
}

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}

function getRandomSymbolSpeech(symbol)
{
    return "<say-as interpret-as='spell-out'>" + symbol + "</say-as>";
}

function getItem(slots)
{
    var propertyArray = Object.getOwnPropertyNames(data[0]);
    var value;
    
    for (var slot in slots)
    {
        if (slots[slot].value !== undefined)
        {
            value = slots[slot].value;
            for (var property in propertyArray)
            {
                var item = data.filter(x => x[propertyArray[property]].toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
                if (item.length > 0)
                {
                    return item[0];
                }
            }
        }
    }
    return value;
}

function getSpeechCon(type)
{
    var speechCon = "";
    if (type) return "<say-as interpret-as='interjection'>" + speechConsCorrect[getRandom(0, speechConsCorrect.length-1)] + "! </say-as><break strength='strong'/>";
    else return "<say-as interpret-as='interjection'>" + speechConsWrong[getRandom(0, speechConsWrong.length-1)] + " </say-as><break strength='strong'/>";    
}

function formatCasing(key)
{
    key = key.split(/(?=[A-Z])/).join(" ");
    return key;
}

function getTextDescription(item)
{
    var text = "";
    
    for (var key in item)
    {
        text += formatCasing(key) + ": " + item[key] + "\n";
    }
    return text;
}

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers, startHandlers, quizHandlers);
    alexa.execute();
};
