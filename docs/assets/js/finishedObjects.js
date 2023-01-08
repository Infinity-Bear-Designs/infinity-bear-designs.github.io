function getFinishedObjects()
{
    const finishedObjectsJson = getJsonContents("docs/assets/data/finishedObjects.json");
    return finishedObjectsJson;
}

function addFinishedObjectCard(finishedObject)
{
    var patternNameClean = finishedObject.replace(/\s/g, '');
    var linkToPattern = ""

    const itemsJson = getJsonContents("docs/assets/data/items.json");

    if(itemsJson["Patterns"].includes(patternNameClean))
    {
        linkToPattern = "patterns?pattern=" + patternNameClean;
    }
    else if(itemsJson["Freebies"].includes(patternNameClean))
    {
        linkToPattern = "freebies?item=" + patternNameClean;
    }

    const columnDiv = document.createElement("div");
    columnDiv.classList.add("column");
    columnDiv.classList.add("is-one-quarter");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    columnDiv.appendChild(cardDiv);

    const cardImageDiv = document.createElement("div");
    cardImageDiv.classList.add("card-image");
    cardDiv.appendChild(cardImageDiv);

    const imageFigure = document.createElement("figure");
    imageFigure.classList.add("image");
    cardImageDiv.appendChild(imageFigure)

    const finishedObjectImageLink = document.createElement("a");
    finishedObjectImageLink.href = linkToPattern;

    const finishedObjectImage = document.createElement("img");
    finishedObjectImage.src = "docs/assets/images/finishedObjects/" + finishedObject + ".webp";
    finishedObjectImageLink.appendChild(finishedObjectImage);
    imageFigure.appendChild(finishedObjectImageLink);

    const cardFooter = document.createElement("footer");
    cardFooter.classList.add("card-footer");
    cardDiv.appendChild(cardFooter);

    const patternLink = document.createElement("a");
    patternLink.classList.add("card-footer-item");
    patternLink.classList.add("finished-object-background");
    patternLink.classList.add("bold");

    patternLink.innerHTML = finishedObject;
    patternLink.href = linkToPattern;

    cardFooter.appendChild(patternLink);

    return columnDiv;
}

function loadFinishedObjects()
{
    const finishedObjects = getFinishedObjects();
    const numFinishedObjects = finishedObjects.finishedObjects.length;
    const numPatternsPerRow = 4;

    const finishedObjectsDiv = document.getElementById("finished-objects");

    var parentColumnDiv;

    for (var i = 0; i < numFinishedObjects; i++)
    {
        if (i % numPatternsPerRow == 0)
        {
            parentColumnDiv = document.createElement("div");
            parentColumnDiv.classList.add("columns");
        }

        var finishedObjectCard = addFinishedObjectCard(finishedObjects.finishedObjects[i]);
        parentColumnDiv.appendChild(finishedObjectCard);

        finishedObjectsDiv.appendChild(parentColumnDiv);
    }

    const remainingColumns = numPatternsPerRow - (numFinishedObjects % numPatternsPerRow);

    if (remainingColumns != 0 && remainingColumns % numPatternsPerRow != 0)
    {
        for (var j = 0; j < remainingColumns; j++)
        {
            const columnDiv = document.createElement("div");
            columnDiv.classList.add("column");
    
            parentColumnDiv.appendChild(columnDiv);            
        }
    }
}