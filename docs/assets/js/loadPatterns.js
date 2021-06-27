function getJsonContents(jsonFilePath)
{
    var request = new XMLHttpRequest();
    request.open("GET", jsonFilePath, false);
    request.setRequestHeader('Content-Type', 'application/json;charset=utf-8;');
    request.send(null);

    var jsonObject = JSON.parse(request.responseText);

    return jsonObject;
}

function getPatternsList(patternType)
{
    var patternsJson = getJsonContents("docs/assets/data/patterns.json");

    if (patternType == "paid")
    {
        return patternsJson.paidPatterns;
    }
}

function getPatternInfo(patternName)
{
    var patternPath = "docs/assets/data/paidPatterns/" + patternName + ".json";
    var patternInfo = getJsonContents(patternPath);

    return patternInfo;
}

function createPatternCard() 
{
    var patternsList = getPatternsList("paid");

    var patternSection = document.getElementById("patternSection");
    
    var parentColumnDiv = document.createElement("div");
    parentColumnDiv.classList.add("columns");

    var numPatterns = patternsList.length;
    var numPatternsPerRow = 3;

    for (var i = 0; i < numPatterns; i++)
    {
        var patternInfo = getPatternInfo(patternsList[i])

        if (i % numPatternsPerRow == 0)
        {
            var parentColumnDiv = document.createElement("div");
            parentColumnDiv.classList.add("columns");
        }

        var columnDiv = document.createElement("div");
        columnDiv.classList.add("column");

        parentColumnDiv.appendChild(columnDiv);

        var cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        columnDiv.appendChild(cardDiv)

        var cardImageDiv = document.createElement("div");
        cardImageDiv.classList.add("card-image");

        cardDiv.appendChild(cardImageDiv)

        var imageFigure = document.createElement("figure");
        imageFigure.classList.add("image");
        imageFigure.classList.add("is-4by3");

        cardImageDiv.appendChild(imageFigure)

        var image = document.createElement("img");
        image.src = "docs/assets/images/" + patternsList[i] + ".png"

        imageFigure.appendChild(image)

        var cardContentDiv = document.createElement("div");
        cardContentDiv.classList.add("card-content");

        cardDiv.appendChild(cardContentDiv);

        var mediaDiv = document.createElement("div");
        mediaDiv.classList.add("media");

        cardContentDiv.appendChild(mediaDiv);

        var mediaContentDiv = document.createElement("div");
        mediaContentDiv.classList.add("media-content");

        mediaDiv.appendChild(mediaContentDiv);

        var titleP = document.createElement("p");
        titleP.classList.add("title");
        titleP.classList.add("is-4");

        titleP.innerText = patternInfo.title;

        mediaContentDiv.appendChild(titleP);
        
        var contentDiv = document.createElement("div");
        contentDiv.classList.add("content");

        contents = "<span class=\"bold\">✦ DMC Floss:</span> " + patternInfo.dmcFloss +  " colours <br>";
        contents += "<span class=\"bold\">✦ Pattern Size:</span> " + patternInfo.patternSize + "<br>";
        contents += "<span class=\"bold\">✦ Completed Size:</span> " + patternInfo.completedSize; 

        contentDiv.innerHTML = contents;

        cardContentDiv.appendChild(contentDiv);

        var cardFooter = document.createElement("footer");
        cardFooter.classList.add("card-footer");     
    
        var etsyLink = document.createElement("a");
        etsyLink.classList.add("card-footer-item");
        etsyLink.classList.add("etsy-background");

        etsyLink.innerHTML = "Etsy";
        etsyLink.href = patternInfo.etsyLink;

        cardFooter.appendChild(etsyLink);

        var gumroadLink = document.createElement("a");
        gumroadLink.classList.add("card-footer-item");
        gumroadLink.classList.add("gumroad-background");

        gumroadLink.innerHTML = "Gumroad";
        gumroadLink.href = patternInfo.gumroadLink;

        cardFooter.appendChild(gumroadLink);

        cardDiv.appendChild(cardFooter);

        patternSection.appendChild(parentColumnDiv);
    }

    var remainingColumns = numPatternsPerRow - (numPatterns % numPatternsPerRow);

    if (remainingColumns != 0 && remainingColumns % numPatternsPerRow != 0)
    {
        for (var i = 0; i < remainingColumns; i++)
        {
            var columnDiv = document.createElement("div");
            columnDiv.classList.add("column");
    
            parentColumnDiv.appendChild(columnDiv);            
        }
    }
}