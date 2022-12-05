function getItemsList(type, category)
{
    const itemsJson = getJsonContents("docs/assets/data/" + category + ".json");
    const itemsList = itemsJson[type];

    return itemsList;
}

function getItemInfo(type, category, name)
{
    var itemPath = "docs/assets/data/" + type + category + "/" + name + ".json";
    var itemInfo = getJsonContents(itemPath);

    return itemInfo;
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
            const itemInfo = getItemInfo(type, category, itemsList[itemIndex]);

            updateBreadcrumbNav(itemInfo.title);

            const item = document.getElementById("item-title");
            const itemDetailsDiv = document.getElementById("item-details");
            
            const activeItemImage = document.getElementById("active-item-image");
            activeItemImage.src = "docs/assets/images/" + itemsList[itemIndex] + "Website.png";

            const itemTitleDiv = document.getElementById("item-title");
            updateCardTitle(itemTitleDiv, itemInfo);
            updateItemDetails(itemDetailsDiv, itemInfo, type, category, true);

            if (type != "free")
            {
                updateCardLink("active-item-etsy-link", itemInfo.etsyLink);
            }

            updateCardLink("active-item-itchio-link", itemInfo.itchioLink, itemInfo.slug);            

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

function getGenericStlText()
{
    const genericStlText = `<br><br>
    Add generic STL text here. <br><br>`;
    
    return genericStlText; 
}

function updateStlDetails(itemDetailsDiv, itemInfo, isActive)
{
    var details = "<span class=\"bold\">✦ Type:</span> " + itemInfo.type +  "<br>";
    details += "<span class=\"bold\">✦ Dimensions:</span> " + itemInfo.dimensions + "<br>"; 

    var detailsContent = details;

    if (isActive)
    {
        const genericStlText = getGenericStlText();
        detailsContent += genericStlText;
    }

    itemDetailsDiv.innerHTML = detailsContent;
}

function updatePatternDetails(itemDetailsDiv, itemInfo, type, isActive)
{
    if (type != "bundle")
    {
        var details = "<span class=\"bold\">✦ DMC Floss:</span> " + itemInfo.dmcFloss +  " colours <br>";
        details += "<span class=\"bold\">✦ Pattern Size:</span> " + itemInfo.patternSize + "<br>";
        details += "<span class=\"bold\">✦ Completed Size:</span> " + itemInfo.completedSize; 
    }
    else
    {
        var patternString = "";
        var numItems = itemInfo.patterns.length;

        for (var i=0; i<numItems; i++)
        {
            var patternNameClean = itemInfo.patterns[i].replace(/\s/g, '');
            patternNameClean = patternNameClean.replace("'", "%27");
            patternString += "✦ <a href='patterns?pattern=" + patternNameClean + "'>" + itemInfo.patterns[i] + "</a><br>";
        }

        // Cleans up extra <br>
        patternString = patternString.slice(0, -4);

        var details = "<span class=\"bold\">Patterns:</span><br> " + patternString;
    }

    var detailsContent = details;

    if (isActive)
    {
        const genericPatternText = getGenericPatternText();
        detailsContent += genericPatternText;
    }

    itemDetailsDiv.innerHTML = detailsContent;
}

function updateItemDetails(itemDetailsDiv, itemInfo, type, category, isActive)
{
    if (category == "Patterns")
    {
        updatePatternDetails(itemDetailsDiv, itemInfo, type, isActive);
    }
    else if (category == "Stls")
    {
        updateStlDetails(itemDetailsDiv, itemInfo, isActive);
    }
}

function getPageType(type, category)
{
    var pageType = "";

    if (type == "paid")
    {
        pageType = category.toLowerCase();
    }
    else if (type == "free")
    {
        pageType = "freebies";
    }
    else if (type == "bundle")
    {
        pageType = "bundles";
    }

    return pageType;
}

function createItemCard(type, section, sectionType, parameterName, category) 
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

    const itemSection = document.getElementById(section);

    var parentColumnDiv;

    for (var i = 0; i < numItems; i++)
    {
        const itemInfo = getItemInfo(type, category, itemsList[i]);

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

        const activeItemLink = document.createElement("a");

        var pageType = getPageType(type, category);
       
        activeItemLink.href = pageType + "?" + parameterName + "=" + itemsList[i];

        const imageName = itemsList[i];
        const image = addImage(imageName);
        activeItemLink.appendChild(image);
        imageFigure.appendChild(activeItemLink);

        const cardContentDiv = addCardContentDiv();
        cardDiv.appendChild(cardContentDiv);

        const mediaDiv = addMediaDiv();
        cardContentDiv.appendChild(mediaDiv);

        const mediaContentDiv = addMediaContentDiv();
        mediaDiv.appendChild(mediaContentDiv);

        const itemTitle = itemInfo.title;
        const title = addTitle(itemTitle);
        mediaContentDiv.appendChild(title);
        
        const contentDiv = addContentDiv();

        updateItemDetails(contentDiv, itemInfo, type, category, false)

        cardContentDiv.appendChild(contentDiv);

        const cardFooter = addCardFooter();

        const slug = itemInfo.slug;

        const itchioLink = addItchioLink(slug, type);
        cardFooter.appendChild(itchioLink);

        if (type != "free")
        {
            const itemEtsyLink = itemInfo.etsyLink;
            const etsyLink = addEtsyLink(itemEtsyLink);
            cardFooter.appendChild(etsyLink);
        }

        cardDiv.appendChild(cardFooter);

        itemSection.appendChild(parentColumnDiv);
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
    createItemCard(type, "itemSection", "full", "pattern", "Patterns");
    createItemCard(type, "latestSection", "recent", "pattern", "Patterns");
    addActiveItemBlock(type);
    loadActiveItem(type, "pattern", "Patterns");
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