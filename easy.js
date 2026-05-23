let currentChallenge = null;
let attemptsLeft = 5;

function countAllEasyPromts() 
{
    let total = 0;
   
        for (const db of databases) 
            {
            for (const table of db.tables) 
            {
                total+= table.columns.length;
            }

        }

       return total * EasySQLTypes.length;
}

function createPrompt() 
{
    const usedPrompts = loadUsedPrompts();  
    if(usedPrompts.length >= countAllEasyPromts())
    {
        clearUsedPrompts();
    }
    
    let selectedDB, selectedTable, selectedColumn, result;
    let sqlType = "";
    
    

    
    let attempts = 0;
    do {
        sqlType = EasySQLTypes[Math.floor(Math.random() * EasySQLTypes.length)];
        selectedDB = databases[Math.floor(Math.random() * databases.length)];
        selectedTable = selectedDB.tables[Math.floor(Math.random() * selectedDB.tables.length)];
        selectedColumn = selectedTable.columns[Math.floor(Math.random() * selectedTable.columns.length)];
        if(sqlType === "SELECT")
        {
            result = SelectPrompt(selectedColumn, selectedTable);
        }
        else if(sqlType === "DELETE")
        {
            result = DeletePrompt(selectedColumn, selectedTable);
        }
        else if(sqlType === "UPDATE")
        {
            result = UpdatePrompt(selectedColumn, selectedTable);
        }
        attempts++;
        if (attempts > 100) // Failsafe to prevent infinite loops in case of a bug
        {
            console.warn("Too many attempts to generate a unique prompt. Clearing used prompts.");
            clearUsedPrompts();
            break;
        }

    } while (isPromptUsed(result.answer));

    


    saveUsedPrompt(result.answer);
    return {
        chosenDB: displayDB(selectedDB, selectedTable),
        prompt: result.prompt,
        answer: result.answer
    };
}

function SelectPrompt(column, table)
{
    let prompt, answer;
    const harder = Math.random() < 0.5; 
    
    if (harder) 
        {
            if (column.type === "INT")
            {
                const randomValue = Math.floor(Math.random() * 1000); 
                prompt = `Write a query that returns the ${column.name} column from the ${table.name} table where the value is greater than ${randomValue}.`;
                answer = `SELECT ${column.name} FROM ${table.name} WHERE ${column.name} > ${randomValue};`;
            }
            else if (column.type.startsWith("VARCHAR"))
            {
                const randomValue = `'example'`;
                prompt = `Write a query that returns the ${column.name} column from the ${table.name} table where the value is equal to ${randomValue}.`;
                answer = `SELECT ${column.name} FROM ${table.name} WHERE ${column.name} = "${randomValue}";`;
            }
        }
    else 
    {
        prompt = `Write a query that returns the ${column.name} column from the ${table.name} table.`;
        answer = `SELECT ${column.name} FROM ${table.name};`;
    }

    return{prompt, answer};

}

function DeletePrompt(column, table)
{
    return{
    prompt: `Write a query that deletes all entries from the ${table.name} table.`,
    answer: `DELETE FROM ${table.name};`
    };
}

function UpdatePrompt(column, table)
{
    return{
    prompt: `Write a query that updates the ${column.name} column in the ${table.name} table to 'updated' for all entries where it is not null.`,
    answer: `UPDATE ${table.name} SET ${column.name} = 'updated' WHERE ${column.name} IS NOT NULL;`
    };
}
function displayDB(selectedDB, table) {
    const db      = selectedDB.name;
    const tables  = table.name;
    const columns = table.columns.map(c => `${c.name}`).join(", ");
    return `${db}: ${tables} (${columns})`;
}

function newPrompt() {
    currentChallenge = createPrompt(); 
    attemptsLeft = 5;
    document.getElementById("database").innerHTML = `Current Database: <br>${currentChallenge.chosenDB}`;
    document.getElementById("prompt-text").textContent = currentChallenge.prompt;
    document.getElementById("count").textContent = `Attempts left: ${attemptsLeft}`;
    document.getElementById("query-input").value = '';
    document.getElementById("feedback").textContent = '';
}

function normalizeQuery(query) 
{
    return query.replace(/\s+/g, ' ').replace(/;$/, '').trim().toLowerCase();
}

function checkAnswer()
{
    if(document.getElementById("query-input").value.trim() === '')
    {
        document.getElementById("feedback").textContent = "Please enter a query.";
        return;
    }
    if(!currentChallenge)
    {
        document.getElementById("feedback").textContent = "Please generate a prompt first.";
        return;
    }

    const userQuery = normalizeQuery(document.getElementById("query-input").value);
    const correctAnswer = normalizeQuery(currentChallenge.answer);
    
    if(attemptsLeft <= 0)
    {
        document.getElementById("feedback").textContent = "No attempts left.";
        return;
    }

    if(userQuery === correctAnswer)
    {
        document.getElementById("feedback").textContent = "Correct!";
        attemptsLeft = 0; // End the game after a correct answer
    }
    else
    {
        attemptsLeft--;
        document.getElementById("count").textContent = `Attempts left: ${attemptsLeft}`;
        document.getElementById("feedback").textContent = "Incorrect. Try again.";
        if(attemptsLeft == 0)
        {
            document.getElementById("feedback").textContent = `Game over! The correct answer was: ${currentChallenge.answer}`;
        }
        else
        {
            document.getElementById("feedback").textContent = "Incorrect. Try again.";
        }        
    }    
}
newPrompt();    