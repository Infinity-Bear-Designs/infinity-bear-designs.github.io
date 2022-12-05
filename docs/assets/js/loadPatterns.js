function getItemsList(type, category)
{
    const itemsJson = getJsonContents("docs/assets/data/" + category + ".json");
    const itemsList = itemsJson[type];

    return itemsList;
}

function getPatternInfo(type, patternName)
{
    var patternPath = "docs/assets/data/" + type + "Patterns/" + patternName + ".json";
    var patternInfo = getJsonContents(patternPath);

    return patternInfo;
}

function addActiveItemBlock(type)
{
    const activeItemDiv = document.getElementById("active-item");
    const activeItemColumnRow = addColumnRow();
    
    activeItemDiv.appendChild(activeItemColumnRow);
    
    const activeImageColumn = addColumn();

    const activeImage = document.createElement("img");
    activeImage.id = "active-item-image";

    activeImageColumn.appendChild(activeImage);

    activeItemColumnRow.appendChild(activeImageColumn);

    const itemInformationColumn = addColumn();

    const itemTitleP = document.createElement("p");
    itemTitleP.id = "item-title"
    itemTitleP.classList.add("title");
    itemTitleP.classList.add("is-3");

    itemInformationColumn.appendChild(itemTitleP);

    const itemDetailsDiv = document.createElement("div");
    itemDetailsDiv.id = "item-details"

    itemInformationColumn.appendChild(itemDetailsDiv);

    const buttonBarDiv = document.createElement("div");
    buttonBarDiv.id = "button-bar";

    itemInformationColumn.appendChild(buttonBarDiv);

    const activeItchioLink = addActiveItchioLink(type);
    buttonBarDiv.appendChild(activeItchioLink);

    if (type != "free")
    {
        const activeEtsyLink = addActiveEtsyLink();
        buttonBarDiv.appendChild(activeEtsyLink);
    }

    activeItemColumnRow.appendChild(itemInformationColumn);
}

function loadActiveItem(type, parameterName, category)
{
    const item = getParameterByName(parameterName);

    if (item != null)
    {
        const itemsList = getItemsList(type, category);
        const numItems = itemsList.length;
        var itemIndex = -1;

        for (var i = 0; i<numItems; i++)
        {
            if (itemsList[i].toUpperCase() == item.toUpperCase())
            {
                itemIndex = i;
                break;
            }
        }

        if (itemIndex != -1)
        {
            const patternInfo = getPatternInfo(type, itemsList[itemIndex]);

            const item = document.getElementById("item-title");
            const itemDetailsDiv = document.getElementById("item-details");

            const breadcrumbNav = document.getElementById("breadcrumb");
            const breadcrumbUl = breadcrumbNav.getElementsByTagName("ul")[0];
            const breadcrumbLi = document.createElement("li");

            const breadcrumbItems = breadcrumbUl.getElementsByTagName("li");
            const numBreadcrumItems = breadcrumbItems.length;

            for (var i = 0; i < numBreadcrumItems; i++)
            {
                breadcrumbItems[i].classList.remove("is-active");
            }

            const activeItemListLink = document.createElement("a");

            activeItemListLink.innerText = patternInfo.title;
            breadcrumbLi.classList.add("is-active");

            breadcrumbLi.appendChild(activeItemListLink);
            breadcrumbUl.appendChild(breadcrumbLi);

            const activeItemImage = document.getElementById("active-item-image");
            activeItemImage.src = "docs/assets/images/" + itemsList[itemIndex] + "Website.png";

            const itemTitleDiv = document.getElementById("item-title");
            updateCardTitle(itemTitleDiv, patternInfo);
            updatePatternDetails(itemDetailsDiv, patternInfo, type, true);

            if (type != "free")
            {
                updateCardLink("active-item-etsy-link", patternInfo.etsyLink);
            }

            updateCardLink("active-item-itchio-link", patternInfo.itchioLink, patternInfo.slug);            

            const activeItemDiv = document.getElementById("active-item");
            activeItemDiv.style.display = "block";
        }
    }
}

function removeProgressBar()
{
    const progressBar = document.getElementById("progressBar");
    progressBar.innerHTML = "";
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

function updatePatternDetails(itemDetailsDiv, patternInfo, type, isActivePattern)
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
        var numItems = patternInfo.patterns.length;

        for (var i=0; i<numItems; i++)
        {
            var patternNameClean = patternInfo.patterns[i].replace(/\s/g, '');
            patternNameClean = patternNameClean.replace("'", "%27");
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

    itemDetailsDiv.innerHTML = detailsContent;
}

function createPatternCard(type, section, sectionType, category) 
{
    var itemsList = getItemsList(type, category);
    var numItems = itemsList.length;
    const numItemsPerRow = 3;

    if (sectionType == "recent")
    {
        numItems = numItemsPerRow;
    }
    else
    {
        itemsList = itemsList.sort();
    }

    const patternSection = document.getElementById(section);

    var parentColumnDiv;

    for (var i = 0; i < numItems; i++)
    {
        const patternInfo = getPatternInfo(type, itemsList[i]);

        if (i % numItemsPerRow == 0)
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
        
        activePatternLink.href = pageType + "?pattern=" + itemsList[i];

        const imageName = itemsList[i];
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

    const remainingColumns = numItemsPerRow - (numItems % numItemsPerRow);

    if (remainingColumns != 0 && remainingColumns % numItemsPerRow != 0)
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

function loadPatterns(type)
{
    createPatternCard(type, "patternSection", "full", "patterns");
    createPatternCard(type, "latestSection", "recent", "patterns");
    addActiveItemBlock(type);
    loadActiveItem(type, "pattern", "patterns");
}

function loadPaidPatternsPage()
{
    loadPatterns("paid")
    updateCopyright();
}

function loadBundlesPage()
{
    loadPatterns("bundle")
    updateCopyright();
}

function loadFreebiesPage()
{
    loadPatterns("free")
    updateCopyright();
}