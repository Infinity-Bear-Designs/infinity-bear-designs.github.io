function getJsonContents(jsonFilePath)
{
    const request = new XMLHttpRequest();

    request.open("GET", jsonFilePath, false);
    request.setRequestHeader('Content-Type', 'application/json;charset=utf-8;');
    request.send(null);

    const jsonObject = JSON.parse(request.responseText);

    return jsonObject;
}

function getPatternsList(patternType)
{
    const patternsJson = getJsonContents("docs/assets/data/patterns.json");

    if (patternType == "paid")
    {
        return patternsJson.paidPatterns;
    }
    else if (patternType == "free")
    {
        return patternsJson.freePatterns;
    }
}

function getPatternInfo(type, patternName)
{
    var patternPath = "docs/assets/data/" + type + "Patterns/" + patternName + ".json";
    var patternInfo = getJsonContents(patternPath);

    return patternInfo;
}

function removeProgressBar()
{
    const progressBar = document.getElementById("progressBar");
    progressBar.innerHTML = "";
}

function createPatternCard(type) 
{
    const patternsList = getPatternsList(type);

    const patternSection = document.getElementById("patternSection");
    
    const parentColumnDiv = document.createElement("div");
    parentColumnDiv.classList.add("columns");

    const numPatterns = patternsList.length;
    const numPatternsPerRow = 3;

    for (var i = 0; i < numPatterns; i++)
    {
        const patternInfo = getPatternInfo(type, patternsList[i])

        if (i % numPatternsPerRow == 0)
        {
            const parentColumnDiv = document.createElement("div");
            parentColumnDiv.classList.add("columns");
        }

        const columnDiv = document.createElement("div");
        columnDiv.classList.add("column");

        parentColumnDiv.appendChild(columnDiv);

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        columnDiv.appendChild(cardDiv)

        const cardImageDiv = document.createElement("div");
        cardImageDiv.classList.add("card-image");

        cardDiv.appendChild(cardImageDiv)

        const imageFigure = document.createElement("figure");
        imageFigure.classList.add("image");
        imageFigure.classList.add("is-4by3");

        cardImageDiv.appendChild(imageFigure)

        const image = document.createElement("img");
        image.src = "docs/assets/images/" + patternsList[i] + ".png"

        imageFigure.appendChild(image)

        const cardContentDiv = document.createElement("div");
        cardContentDiv.classList.add("card-content");

        cardDiv.appendChild(cardContentDiv);

        const mediaDiv = document.createElement("div");
        mediaDiv.classList.add("media");

        cardContentDiv.appendChild(mediaDiv);

        const mediaContentDiv = document.createElement("div");
        mediaContentDiv.classList.add("media-content");

        mediaDiv.appendChild(mediaContentDiv);

        const titleP = document.createElement("p");
        titleP.classList.add("title");
        titleP.classList.add("is-4");

        titleP.innerText = patternInfo.title;

        mediaContentDiv.appendChild(titleP);
        
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("content");

        contents = "<span class=\"bold\">✦ DMC Floss:</span> " + patternInfo.dmcFloss +  " colours <br>";
        contents += "<span class=\"bold\">✦ Pattern Size:</span> " + patternInfo.patternSize + "<br>";
        contents += "<span class=\"bold\">✦ Completed Size:</span> " + patternInfo.completedSize; 

        contentDiv.innerHTML = contents;

        cardContentDiv.appendChild(contentDiv);

        const cardFooter = document.createElement("footer");
        cardFooter.classList.add("card-footer");     
    
        if (type == "paid")
        {
            const etsyLink = document.createElement("a");
            etsyLink.classList.add("card-footer-item");
            etsyLink.classList.add("etsy-background");

            etsyLink.innerHTML = "Etsy";
            etsyLink.href = patternInfo.etsyLink;

            cardFooter.appendChild(etsyLink);
        }

        const gumroadLink = document.createElement("a");
        gumroadLink.classList.add("card-footer-item");
        gumroadLink.classList.add("gumroad-background");

        gumroadLink.innerHTML = "Gumroad";
        gumroadLink.href = patternInfo.gumroadLink;

        cardFooter.appendChild(gumroadLink);

        cardDiv.appendChild(cardFooter);

        patternSection.appendChild(parentColumnDiv);
    }

    const remainingColumns = numPatternsPerRow - (numPatterns % numPatternsPerRow);

    if (remainingColumns != 0 && remainingColumns % numPatternsPerRow != 0)
    {
        for (var i = 0; i < remainingColumns; i++)
        {
            const columnDiv = document.createElement("div");
            columnDiv.classList.add("column");
    
            parentColumnDiv.appendChild(columnDiv);            
        }
    }

    removeProgressBar();
}