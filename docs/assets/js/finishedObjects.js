function getJsonContents(jsonFilePath)
{
    const request = new XMLHttpRequest();

    request.open("GET", jsonFilePath, false);
    request.setRequestHeader('Content-Type', 'application/json;charset=utf-8;');
    request.send(null);

    const jsonObject = JSON.parse(request.responseText);

    return jsonObject;
}

function getFinishedObjects()
{
    const finishedObjectsJson = getJsonContents("docs/assets/data/finishedObjects.json");
    return finishedObjectsJson;
}

function addFinishedObjectCard(finishedObject)
{
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

    const finishedObjectImage = document.createElement("img");
    finishedObjectImage.src = "docs/assets/images/finishedObjects/" + finishedObject + ".jpg";
    imageFigure.appendChild(finishedObjectImage);

    const cardFooter = document.createElement("footer");
    cardFooter.classList.add("card-footer");
    cardDiv.appendChild(cardFooter);

    const patternLink = document.createElement("a");
    patternLink.classList.add("card-footer-item");
    patternLink.classList.add("finished-object-background");
    patternLink.classList.add("bold");

    var patternNameClean = finishedObject.replace(/\s/g, '');

    patternLink.innerHTML = finishedObject;
    patternLink.href = "patterns?pattern=" + patternNameClean;

    cardFooter.appendChild(patternLink);

    return columnDiv;
}

function loadFinishedObjects()
{
    const finishedObjects = getFinishedObjects();
    const numFinishedObjects = finishedObjects.finishedObjects.length;

    const finishedObjectsDiv = document.getElementById("finished-objects");

    const parentColumnDiv = document.createElement("div");
    parentColumnDiv.classList.add("columns");

    finishedObjectsDiv.appendChild(parentColumnDiv);

    for (var i=0; i<numFinishedObjects; i++)
    {
        var finishedObjectCard = addFinishedObjectCard(finishedObjects.finishedObjects[i]);
        parentColumnDiv.appendChild(finishedObjectCard);
    }
}