let deck = [];
let deckIndex = 0;

const sqlTypes = {
    easy: ["SELECT", "DELETE", "UPDATE"],
    medium: ["SELECT", "DELETE", "INSERT", "UPDATE", "CREATE", "ALTER", "DROP"],
    hard: ["SELECT", "DELETE", "INSERT", "UPDATE", "CREATE", "ALTER", "DROP"]
};

function buildDeck(difficulty = "easy") {
    const types = sqlTypes[difficulty];
    deck = [];
    for (const db of databases) {
        for (const table of db.tables) {
            for (const column of table.columns) {
                for (const sqlType of types) {
                    deck.push({ db, table, column, sqlType });
                }
            }
        }
    }
    shuffleDeck(getDailySeed());
}

function shuffleDeck(seed = null) 
{
    const rng = seed !== null ? seededRNG(seed) : Math.random.bind(Math);
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    deckIndex = 0;
}

function dealPrompt()
{
    if (deckIndex >= deck.length) 
        {
            shuffleDeck(getDailySeed());
        }
        const card = deck[deckIndex++];
        const rng = seededRNG(getDailySeed() + deckIndex);
        return {...card, rng};
}

function seededRNG(seed) 
{
    return function() 
    {
        seed |= 0; seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

function getDailySeed()
{
    const now = new Date();

    return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

buildDeck();
