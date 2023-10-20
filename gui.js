const grammarTab = document.getElementById("grammarTab");
const grammarContent = document.getElementById("grammarContent");

const overviewTab = document.getElementById("overviewTab");
const overviewContent = document.getElementById("overviewContent");

const dictionaryTab = document.getElementById("dictionaryTab");
const dictionaryContent = document.getElementById("dictionaryContent");

const collapseButton = document.getElementById("collapseButton");
collapseButton.addEventListener("click", function() {
    const collapsable = document.getElementById("collapsable");
    collapsable.style.display = collapsable.style.display === "block" ? "none" : "block";
    collapseButton.innerHTML = collapseButton.innerHTML === "_" ? "■" : "_";
});

grammarTab.addEventListener("click", function() {
    overviewContent.style.display = "none";
    dictionaryContent.style.display = "none";
    grammarContent.style.display = "block";

    overviewTab.classList.remove("active");
    dictionaryContent.classList.remove("active");
    grammarTab.classList.add("active");
});

overviewTab.addEventListener("click", function() {
    grammarContent.style.display = "none";
    dictionaryContent.style.display = "none";
    overviewContent.style.display = "block";

    grammarTab.classList.remove("active");
    dictionaryContent.classList.remove("active");
    overviewTab.classList.add("active");
});

dictionaryTab.addEventListener("click", function() {
    overviewContent.style.display = "none";
    grammarContent.style.display = "none";
    dictionaryContent.style.display = "block";

    overviewTab.classList.remove("active");
    grammarTab.classList.remove("active");
    dictionaryContent.classList.add("active");
});