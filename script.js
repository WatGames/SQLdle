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


var modal = document.getElementById("settingsMenu");
if(modal)
{
    var btn = document.getElementById("Settings");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
    modal.style.display = "block";
    }
    span.onclick = function() {
    modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    document.getElementById("saveSettings").onclick = function() {
        modal.style.display = "none";
    }

    document.getElementById("darkModeToggle").addEventListener("change", function() {
        if (this.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        } 
        else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        }
    });

}

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    var toggle = document.getElementById("darkModeToggle");
    if (toggle) toggle.checked = true;
}
