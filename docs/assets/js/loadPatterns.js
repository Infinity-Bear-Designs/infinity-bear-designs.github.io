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

function addPatternRow()
{
    const parentColumnDiv = document.createElement("div");
    parentColumnDiv.classList.add("columns");

    return parentColumnDiv;
}

function addColumn()
{
    const columnDiv = document.createElement("div");
    columnDiv.classList.add("column");

    return columnDiv;
}

function addCard()
{
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    
    return cardDiv;
}

function addCardImage()
{
    const cardImageDiv = document.createElement("div");
    cardImageDiv.classList.add("card-image");

    return cardImageDiv;
}

function addImageFigure()
{
    const imageFigure = document.createElement("figure");
    imageFigure.classList.add("image");
    imageFigure.classList.add("is-4by3");screen
    
    return imageFigure;
}

function addImage(imageName)
{
    const image = document.createElement("img");
    image.src = "docs/assets/images/" + imageName + ".png"

    return image;
}

function addCardContentDiv()
{
    const cardContentDiv = document.createElement("div");
    cardContentDiv.classList.add("card-content");

    return cardContentDiv;
}

function addMediaDiv()
{
    const mediaDiv = document.createElement("div");
    mediaDiv.classList.add("media");

    return mediaDiv;
}

function addMediaContentDiv()
{
    const mediaContentDiv = document.createElement("div");
    mediaContentDiv.classList.add("media-content");

    return mediaContentDiv;
}

function addTitle(patternTitle)
{
    const title = document.createElement("p");
    title.classList.add("title");
    title.classList.add("is-4");

    title.innerText = patternTitle;

    return title;
}

function addContentDiv()
{
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content");

    return contentDiv;
}

function addCardFooter()
{
    const cardFooter = document.createElement("footer");
    cardFooter.classList.add("card-footer");

    return cardFooter;
}

function addEtsyLink(patternEtsyLink)
{
    const etsyLink = document.createElement("a");
    etsyLink.classList.add("card-footer-item");
    etsyLink.classList.add("etsy-background");

    etsyLink.innerHTML = "Etsy";
    etsyLink.href = patternEtsyLink;

    return etsyLink;
}

function addGumroadLink(patternGumroadLink)
{
    const gumroadLink = document.createElement("a");
    gumroadLink.classList.add("card-footer-item");
    gumroadLink.classList.add("gumroad-background");

    gumroadLink.innerHTML = "Gumroad";
    gumroadLink.href = patternGumroadLink;

    return gumroadLink;
}

function createPatternCard(type) 
{
    const patternsList = getPatternsList(type);

    const patternSection = document.getElementById("patternSection");

    const numPatterns = patternsList.length;
    const numPatternsPerRow = 3;

    var parentColumnDiv;

    for (var i = 0; i < numPatterns; i++)
    {
        const patternInfo = getPatternInfo(type, patternsList[i])

        if (i % numPatternsPerRow == 0)
        {
            parentColumnDiv = addPatternRow();
        }

        const columnDiv = addColumn();
        parentColumnDiv.appendChild(columnDiv);

        const cardDiv = addCard();
        columnDiv.appendChild(cardDiv)

        const cardImageDiv = addCardImage();
        cardDiv.appendChild(cardImageDiv)

        const imageFigure = addImageFigure();
        cardImageDiv.appendChild(imageFigure)

        const imageName = patternsList[i];
        const image = addImage(imageName);
        imageFigure.appendChild(image)

        const cardContentDiv = addCardContentDiv();
        cardDiv.appendChild(cardContentDiv);

        const mediaDiv = addMediaDiv();
        cardContentDiv.appendChild(mediaDiv);

        const mediaContentDiv = addMediaContentDiv();
        mediaDiv.appendChild(mediaContentDiv);

        const patternTitle = patternInfo.title;
        const title = addTitle(patternTitle);
        mediaContentDiv.appendChild(title);
        
        const contentDiv = addContentDiv();

        var contents = "<span class=\"bold\">✦ DMC Floss:</span> " + patternInfo.dmcFloss +  " colours <br>";
        contents += "<span class=\"bold\">✦ Pattern Size:</span> " + patternInfo.patternSize + "<br>";
        contents += "<span class=\"bold\">✦ Completed Size:</span> " + patternInfo.completedSize; 

        contentDiv.innerHTML = contents;
        cardContentDiv.appendChild(contentDiv);

        const cardFooter = addCardFooter();
    
        if (type == "paid")
        {
            const patternEtsyLink = patternInfo.etsyLink;
            const etsyLink = addEtsyLink(patternEtsyLink);
            cardFooter.appendChild(etsyLink);
        }

        const patternGumroadLink = patternInfo.gumroadLink;
        const gumroadLink = addGumroadLink(patternGumroadLink);
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