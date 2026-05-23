const Storage_Key = "sqldle_used_prompts";

// need to swtitch to a server when going to upload figure out later

function loadUsedPrompts() 
{
    const raw = localStorage.getItem(Storage_Key);
    return raw ? JSON.parse(raw) : [];
}

function saveUsedPrompt(promptText)
{
    const used = loadUsedPrompts();
    if(!used.includes(promptText))
    {
        used.push(promptText);
        localStorage.setItem(Storage_Key, JSON.stringify(used));
    }

}

function clearUsedPrompts()
{
    localStorage.removeItem(Storage_Key);
}

// Check if a prompt has already been used
function isPromptUsed(promptText)
{
    return loadUsedPrompts().includes(promptText);
}

//returns true if all prompts have been used should never happen


function allPromptsUsed()
{
    const used = loadUsedPrompts();
    return allPrompts.every(prompt => used.includes(prompt));
}

function markPromptAsUsed(promptText)
{
    saveUsedPrompt(promptText);
}