const maxItemsPerPage = 8;

function getFinishedObjects()
{
    const finishedObjectsJson = getJsonContents("docs/assets/data/finishedObjects.json");
    return finishedObjectsJson;
}

function addFinishedObjectCard(finishedObject, patternsList, freebiesList)
{
    var patternNameClean = finishedObject.replace(/\s/g, '');
    var linkToPattern = ""

    if(patternsList.includes(patternNameClean.toUpperCase()))
    {
        linkToPattern = "patterns?pattern=" + patternNameClean;
    }
    else if(freebiesList.includes(patternNameClean.toUpperCase()))
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
    const totalPages = getTotalPages(numFinishedObjects, maxItemsPerPage);
    const currentPage = Math.min(getCurrentPage(), totalPages);
    const pageIndex = currentPage - 1;
    const startIndex = pageIndex * maxItemsPerPage;
    const endIndex = Math.min(numFinishedObjects, currentPage * maxItemsPerPage);
    const numItems = Math.min(numFinishedObjects, maxItemsPerPage);
    
    const itemsJson = getJsonContents("docs/assets/data/items.json");

    var formattedPatterns = getArrayInUpperCase(itemsJson["Patterns"]);
    var formattedFreebies = getArrayInUpperCase(itemsJson["Freebies"]);

    const finishedObjectsDiv = document.getElementById("finished-objects");

    if (totalPages > 1)
    {
        addPagination(totalPages, 1)
    }

    var parentColumnDiv;

    for (var i = startIndex; i < endIndex; i++)
    {
        if (i % numPatternsPerRow == 0)
        {
            parentColumnDiv = document.createElement("div");
            parentColumnDiv.classList.add("columns");
        }

        var finishedObjectCard = addFinishedObjectCard(finishedObjects.finishedObjects[i], formattedPatterns, formattedFreebies);
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

    updatePagination(totalPages, currentPage);
}