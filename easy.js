let currentChallenge = null;
let attemptsLeft = 5;

document.addEventListener("DOMContentLoaded", function() {
    const newPromptButton = document.getElementById("NewPromptButton");
    newPromptButton.disabled = true; // Disable the button by default
    document.getElementById("PracticeMode").onchange = function() 
    {
        if (this.checked) {
            newPromptButton.disabled = false;
        } else {
            newPromptButton.disabled = true;
        }
    }
});

function createPrompt() 
{
    const { db : selectedDB, table : selectedTable, column : selectedColumn, sqlType, rng } = dealPrompt();  
    let result;
    if (sqlType === "SELECT")
    {
        result = SelectPrompt(selectedColumn, selectedTable, rng);
    }
    else if (sqlType === "DELETE")
    {
        result = DeletePrompt(selectedColumn, selectedTable, rng);
    }
    else if (sqlType === "UPDATE")
    {
        result = UpdatePrompt(selectedColumn, selectedTable, rng);
    }

    if (!result)
    {
        console.error("No result generated for SQL type:", sqlType);
        return null;
    }

    
    return {
        chosenDB: displayDB(selectedDB, selectedTable),
        prompt: result.prompt,
        answer: result.answer
    };
}

function SelectPrompt(column, table, rng)
{
    let prompt, answer;
    const harder = rng() < 0.5; 
    
    if (harder) 
        {
            if (column.type === "INT")
            {
                const randomValue = Math.floor(rng() * 1000); 
                const condition = Math.floor(rng() * 3);
                if(condition === 0)
                {
                    prompt = `Write a query that returns the ${column.name} column from the ${table.name} table where the value is equal to ${randomValue}.`;
                answer = `SELECT ${column.name} FROM ${table.name} WHERE ${column.name} = ${randomValue};`;
                }
                else if(condition === 1)
                {
                    prompt = `Write a query that returns the ${column.name} column from the ${table.name} table where the value is greater than ${randomValue}.`;
                    answer = `SELECT ${column.name} FROM ${table.name} WHERE ${column.name} > ${randomValue};`;
                }
                else if(condition === 2)             
                    {
                    prompt = `Write a query that returns the ${column.name} column from the ${table.name} table where the value is less than ${randomValue}.`;
                    answer = `SELECT ${column.name} FROM ${table.name} WHERE ${column.name} < ${randomValue};`;
                }                
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

function DeletePrompt(column, table, rng)
{
    return{
    prompt: `Write a query that deletes all entries from the ${table.name} table.`,
    answer: `DELETE FROM ${table.name};`
    };
}

function UpdatePrompt(column, table, rng)
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
    if (!currentChallenge) {
        document.getElementById("prompt-text").textContent = "Error loading prompt — check console.";
        return;
    }
    attemptsLeft = 5;
    document.getElementById("database").innerHTML = `Current Database: <br>${currentChallenge.chosenDB}`;
    document.getElementById("prompt-text").textContent = currentChallenge.prompt;
    document.getElementById("count").textContent = `Attempts left: ${attemptsLeft}`;
    document.getElementById("query-input").value = '';
    document.getElementById("feedback").textContent = '';
}

function onNewPromptClicked() {
    if (!document.getElementById("PracticeMode").checked) {
        document.getElementById("feedback").textContent = "Enable Practice Mode to get a new prompt.";
        return;
    }
    newPrompt();
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