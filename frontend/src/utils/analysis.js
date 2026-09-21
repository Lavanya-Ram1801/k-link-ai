export function analyzeWorkplaceMessage(message) {

    const text = message.toLowerCase().trim();

    let riskScore = 0;

    let reasons = [];

    let tone = "Professional";

    let emotion = "Neutral";

    let professionalism = "High";

    let politeness = "Good";

    let urgency = "Normal";

    let clarity = "Clear";

    let rewrite = message;

    //-------------------------------------------------------
    // Offensive Language Detection
    //-------------------------------------------------------

    const rudeWords = [
        "idiot",
        "stupid",
        "useless",
        "shut up",
        "fool",
        "dumb",
        "hate",
        "lazy",
        "nonsense",
        "worthless"
    ];

    rudeWords.forEach(word => {

        if (text.includes(word)) {

            riskScore += 35;

            reasons.push("Offensive language detected.");

            rewrite = rewrite.replace(new RegExp(word, "ig"), "");

            tone = "Aggressive";

            emotion = "Angry";

            professionalism = "Low";
        }

    });

    //-------------------------------------------------------
    // Direct Command Detection
    //-------------------------------------------------------

    const commands = [
        "send",
        "give",
        "finish",
        "do",
        "complete",
        "submit",
        "reply",
        "call",
        "come",
        "fix"
    ];

    commands.forEach(cmd => {

        if (text.startsWith(cmd)) {

            riskScore += 20;

            reasons.push("Very direct command.");

            tone = "Demanding";

        }

    });

    //-------------------------------------------------------
    // Missing Politeness
    //-------------------------------------------------------

    const politeWords = [

        "please",

        "could you",

        "would you",

        "kindly",

        "may i",

        "would it be possible"

    ];

    let polite = false;

    politeWords.forEach(word => {

        if (text.includes(word))

            polite = true;

    });

    if (!polite) {

        riskScore += 15;

        politeness = "Needs Improvement";

        reasons.push("Polite wording is missing.");

    }

    //-------------------------------------------------------
    // ALL CAPS
    //-------------------------------------------------------

    if (message.length > 5 && message === message.toUpperCase()) {

        riskScore += 15;

        tone = "Angry";

        emotion = "Frustrated";

        reasons.push("Message looks like shouting.");

    }

    //-------------------------------------------------------
    // Excessive Punctuation
    //-------------------------------------------------------

    if (
        message.includes("!!!") ||
        message.includes("???")
    ) {

        riskScore += 10;

        reasons.push("Too much punctuation can sound emotional.");

    }

    //-------------------------------------------------------
    // Urgency Detection
    //-------------------------------------------------------

    const urgentWords = [

        "immediately",

        "urgent",

        "asap",

        "right now",

        "today",

        "now"

    ];

    urgentWords.forEach(word => {

        if (text.includes(word)) {

            urgency = "High";

            riskScore += 8;

            reasons.push("Urgent language detected.");

        }

    });

    //-------------------------------------------------------
    // Very Short Message
    //-------------------------------------------------------

    if (text.split(" ").length <= 2) {

        clarity = "Poor";

        riskScore += 10;

        reasons.push("Message lacks enough context.");

    }

    //-------------------------------------------------------
    // Very Long Message
    //-------------------------------------------------------

    if (text.split(" ").length > 60) {

        clarity = "Needs Simplification";

        reasons.push("Message may be difficult to read.");

    }

    //-------------------------------------------------------
    // Positive Language
    //-------------------------------------------------------

    const positiveWords = [

        "thank",

        "thanks",

        "appreciate",

        "great",

        "excellent",

        "good job"

    ];

    positiveWords.forEach(word => {

        if (text.includes(word)) {

            riskScore -= 8;

            reasons.push("Positive language improves communication.");

        }

    });

    //-------------------------------------------------------
    // Smart Rewrite
    //-------------------------------------------------------

    rewrite = rewrite.replace(/\s+/g, " ").trim();

    if (rewrite.length === 0) {

        rewrite = "Could you please assist with this task?";

    }

    else {

        rewrite =
            "Could you please " +
            rewrite.charAt(0).toLowerCase() +
            rewrite.slice(1);

    }

    //-------------------------------------------------------
    // Professional Ending
    //-------------------------------------------------------

    if (
        !rewrite.endsWith(".") &&
        !rewrite.endsWith("?")
    ) {

        rewrite += ".";

    }

    //-------------------------------------------------------
    // Explanation
    //-------------------------------------------------------

    let explanation = "";

    if (riskScore <= 20) {

        explanation =
            "This message is professional and unlikely to cause misunderstanding.";

    }

    else if (riskScore <= 40) {

        explanation =
            "The message is acceptable but could be made more polite.";

    }

    else if (riskScore <= 70) {

        explanation =
            "This message may sound demanding or emotionally strong in a workplace.";

    }

    else {

        explanation =
            "This message has a high chance of creating conflict or misunderstanding.";

    }

    //-------------------------------------------------------

    riskScore = Math.max(0, Math.min(100, riskScore));

    if (reasons.length === 0)

        reasons.push("No communication risks detected.");

    //-------------------------------------------------------

    return {

        riskScore,

        tone,

        emotion,

        professionalism,

        politeness,

        urgency,

        clarity,

        reasons,

        rewrite,

        explanation

    };

}