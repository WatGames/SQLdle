let selectedDiff = null;
function selectDifficulty(difficulty)
{
    selectedDiff = difficulty;
    
    document.querySelectorAll(".difficulty").forEach(btn => btn.classList.remove("active"));
    document.getElementById(difficulty + 'Link').classList.add('active');
}
function Play() 
{
    if (selectedDiff == null) 
    {
        alert("Please select a difficulty level before playing.");
        return;
    }
    window.location.href = selectedDiff + ".html";
}


