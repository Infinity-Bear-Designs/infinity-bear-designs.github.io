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
    else if (patternType == "bundle")
    {
        return patternsJson.bundlePatterns;
    }
}

function getPatternInfo(type, patternName)
{
    var patternPath = "docs/assets/data/" + type + "Patterns/" + patternName + ".json";
    var patternInfo = getJsonContents(patternPath);

    return patternInfo;
}

function getParameterByName(name, url = window.location.href)
{
    var regex = new RegExp('[?&]' + name + '(=([^&#]*))'), results = regex.exec(url);

    if (!results)
    {
        return null;
    }
    if (!results[2])
    {
        return '';
    }

     return decodeURIComponent(results[2]);
}

function addActivePatternBlock(type)
{
    const activePatternDiv = document.getElementById("active-pattern");
    const activePatternColumnRow = addColumnRow();
    
    activePatternDiv.appendChild(activePatternColumnRow);
    
    const activeImageColumn = addColumn();

    const activeImage = document.createElement("img");
    activeImage.id = "active-pattern-image";

    activeImageColumn.appendChild(activeImage);

    activePatternColumnRow.appendChild(activeImageColumn);

    const patternInformationColumn = addColumn();

    const patternTitleP = document.createElement("p");
    patternTitleP.id = "pattern-title"
    patternTitleP.classList.add("title");
    patternTitleP.classList.add("is-3");

    patternInformationColumn.appendChild(patternTitleP);

    const patternDetailsDiv = document.createElement("div");
    patternDetailsDiv.id = "pattern-details"

    patternInformationColumn.appendChild(patternDetailsDiv);

    const buttonBarDiv = document.createElement("div");
    buttonBarDiv.id = "button-bar";

    patternInformationColumn.appendChild(buttonBarDiv);

    const activeItchioLink = addActiveItchioLink(type);
    buttonBarDiv.appendChild(activeItchioLink);

    if (type != "free")
    {
        const activeEtsyLink = addActiveEtsyLink();
        buttonBarDiv.appendChild(activeEtsyLink);
    }

    activePatternColumnRow.appendChild(patternInformationColumn);
}

function loadActivePattern(type)
{
    const pattern = getParameterByName("pattern");

    if (pattern != null)
    {
        const patternsList = getPatternsList(type);
        const numPatterns = patternsList.length;
        var patternIndex = -1;

        for (var i = 0; i<numPatterns; i++)
        {
            if (patternsList[i].toUpperCase() == pattern.toUpperCase())
            {
                patternIndex = i;
                break;
            }
        }

        if (patternIndex != -1)
        {
            const patternInfo = getPatternInfo(type, patternsList[patternIndex]);

            const patternTitleDiv = document.getElementById("pattern-title");
            const patternDetailsDiv = document.getElementById("pattern-details");

            const breadcrumbNav = document.getElementById("breadcrumb");
            const breadcrumbUl = breadcrumbNav.getElementsByTagName("ul")[0];
            const breadcrumbLi = document.createElement("li");

            const breadcrumbItems = breadcrumbUl.getElementsByTagName("li");
            const numBreadcrumItems = breadcrumbItems.length;

            for (var i = 0; i < numBreadcrumItems; i++)
            {
                breadcrumbItems[i].classList.remove("is-active");
            }

            const activePatternListLink = document.createElement("a");

            activePatternListLink.innerText = patternInfo.title;
            breadcrumbLi.classList.add("is-active");

            breadcrumbLi.appendChild(activePatternListLink);
            breadcrumbUl.appendChild(breadcrumbLi);

            const activePatternImage = document.getElementById("active-pattern-image");
            activePatternImage.src = "docs/assets/images/" + patternsList[patternIndex] + "Website.png";

            updatePatternTitle(patternTitleDiv, patternInfo);
            updatePatternDetails(patternDetailsDiv, patternInfo, type, true);

            if (type != "free")
            {
                updatePatternLink("active-pattern-etsy-link", patternInfo.etsyLink);
            }

            updatePatternLink("active-pattern-itchio-link", patternInfo.itchioLink, patternInfo.slug);            

            const activePatternDiv = document.getElementById("active-pattern");
            activePatternDiv.style.display = "block";
        }
    }
}

function removeProgressBar()
{
    const progressBar = document.getElementById("progressBar");
    progressBar.innerHTML = "";
}

function addColumnRow()
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
    image.src = "docs/assets/images/" + imageName + "Website.png"

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

function addActiveItchioLink(type)
{
    const itchioLink = document.createElement("a");
    itchioLink.classList.add("button");
    itchioLink.classList.add("purchase-background");
    itchioLink.classList.add("bold");
    itchioLink.id = "active-pattern-itchio-link"

    var linkText = "Buy Now";

    if (type == "free")
    {
       linkText = "Download"
    }

    itchioLink.innerHTML = linkText;

    return itchioLink;
}

function addActiveEtsyLink()
{
    const etsyLink = document.createElement("a");
    etsyLink.classList.add("button");
    etsyLink.classList.add("etsy-background");
    etsyLink.classList.add("bold");
    etsyLink.id = "active-pattern-etsy-link"

    etsyLink.innerHTML = "Get it on Etsy";

    return etsyLink;
}

function connectItchioBuyButton(element, slug)
{
    Itch.attachBuyButton(element, {
        user: "infinity-bear-designs",
        game: slug
      });
}

function addItchioLink(slug, type)
{
    const itchioLink = document.createElement("a");
    itchioLink.classList.add("card-footer-item");
    itchioLink.classList.add("purchase-background");

    var linkText = "Buy Now";

    if (type == "free")
    {
       linkText = "Download"
    }

    itchioLink.innerHTML = linkText;

    connectItchioBuyButton(itchioLink, slug);

    return itchioLink;
}

function updatePatternLink(patternLinkId, link, slug)
{
    const patternLink = document.getElementById(patternLinkId);

    if (slug == null)
    {
        patternLink.href = link;
    }
    else
    {
        connectItchioBuyButton(patternLink, slug);
    }
}      

function updatePatternTitle(patternTitleDiv, patternInfo)
{
    patternTitleDiv.innerText = patternInfo.title;
}

function getGenericPatternText()
{
    const genericPatternText = `<br><br>
    This item is a digital PDF pattern, and is only available for downloading and printing. <br><br>

    It is not a completed project or cross stitch kit. It does not contain any physical materials,
    including those shown in the listing imagery.<br><br>

    To view or print this pattern, you will require a PDF reader. <br><br>`;
    
    return genericPatternText;
}

function updatePatternDetails(patternDetailsDiv, patternInfo, type, isActivePattern)
{
    if (type != "bundle")
    {
        var details = "<span class=\"bold\">✦ DMC Floss:</span> " + patternInfo.dmcFloss +  " colours <br>";
        details += "<span class=\"bold\">✦ Pattern Size:</span> " + patternInfo.patternSize + "<br>";
        details += "<span class=\"bold\">✦ Completed Size:</span> " + patternInfo.completedSize; 
    }
    else
    {
        var patternString = "";
        var numPatterns = patternInfo.patterns.length;

        for (var i=0; i<numPatterns; i++)
        {
            var patternNameClean = patternInfo.patterns[i].replace(/\s/g, '');
            patternString += "✦ <a href='patterns?pattern=" + patternNameClean + "'>" + patternInfo.patterns[i] + "</a><br>";
        }

        // Clean up extra <br>
        patternString = patternString.slice(0, -4);

        var details = "<span class=\"bold\">Patterns:</span><br> " + patternString;
    }

    var detailsContent = details;

    if (isActivePattern)
    {
        const genericPatternText = getGenericPatternText();
        detailsContent += genericPatternText;
    }

    patternDetailsDiv.innerHTML = detailsContent;
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
        const patternInfo = getPatternInfo(type, patternsList[i]);

        if (i % numPatternsPerRow == 0)
        {
            parentColumnDiv = addColumnRow();
        }

        const columnDiv = addColumn();
        parentColumnDiv.appendChild(columnDiv);

        const cardDiv = addCard();
        columnDiv.appendChild(cardDiv)

        const cardImageDiv = addCardImage();
        cardDiv.appendChild(cardImageDiv)

        const imageFigure = addImageFigure();
        cardImageDiv.appendChild(imageFigure)

        const activePatternLink = document.createElement("a");

        var pageType = ""

        if (type == "paid")
        {
            pageType = "patterns";
        }
        else if (type == "free")
        {
            pageType = "freebies";
        }
        else if (type == "bundle")
        {
            pageType = "bundles";
        }
        
        activePatternLink.href = pageType + "?pattern=" + patternsList[i];

        const imageName = patternsList[i];
        const image = addImage(imageName);
        activePatternLink.appendChild(image);
        imageFigure.appendChild(activePatternLink);

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

        updatePatternDetails(contentDiv, patternInfo, type, false);

        cardContentDiv.appendChild(contentDiv);

        const cardFooter = addCardFooter();

        const slug = patternInfo.slug;

        const itchioLink = addItchioLink(slug, type);
        cardFooter.appendChild(itchioLink);

        if (type != "free")
        {
            const patternEtsyLink = patternInfo.etsyLink;
            const etsyLink = addEtsyLink(patternEtsyLink);
            cardFooter.appendChild(etsyLink);
        }

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