const maxItemsPerPage = 15;

function getItemsList(itemType)
{
    const itemsJson = getJsonContents("docs/assets/data/items.json");
    const itemsList = itemsJson[itemType];

    return itemsList;
}

function getItemInfo(itemType, name)
{
    if (itemType == "Patreon" || itemType == "trackerPatterns" || itemType == "TheNoirDimension")
    { 
        itemType = "Patterns"
    }

    var itemPath = "docs/assets/data/" + itemType + "/" + name + ".json";
    var itemInfo = getJsonContents(itemPath);

    return itemInfo;
}

function addActiveItemBlock(itemType)
{
    const activeItemDiv = document.getElementById("active-item");
    const activeItemColumnRow = addActiveColumnRow();
    activeItemColumnRow.classList.add("is-vcentered");

    activeItemDiv.appendChild(activeItemColumnRow);
    
    const activeImageColumn = addActiveColumn();
    activeImageColumn.classList.add("is-align-items-center");

    const activeImage = document.createElement("img");
    activeImage.id = "active-item-image";

    activeImageColumn.appendChild(activeImage);

    activeItemColumnRow.appendChild(activeImageColumn);

    const itemInformationColumn = addActiveColumn();

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

    const activeItchioLink = addActiveItchioLink(itemType);
    buttonBarDiv.appendChild(activeItchioLink);

    if (itemType != "Freebies")
    {
        // const activeStitchWitLink = addActiveStitchWitLink();
        // buttonBarDiv.appendChild(activeStitchWitLink);

        const activeEtsyLink = addActiveEtsyLink();
        buttonBarDiv.appendChild(activeEtsyLink);
    }

    activeItemColumnRow.appendChild(itemInformationColumn);
}

function loadActiveItem(itemType, parameterName)
{
    const item = getParameterByName(parameterName);

    if (item != null)
    {
        const itemsList = getItemsList(itemType);
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
            const itemInfo = getItemInfo(itemType, itemsList[itemIndex]);

            updateBreadcrumbNav(itemInfo.title);

            const item = document.getElementById("item-title");
            const itemDetailsDiv = document.getElementById("item-details");
            
            const activeItemImage = document.getElementById("active-item-image");
            activeItemImage.src = "docs/assets/images/" + itemsList[itemIndex] + "Website.webp";

            const itemTitleDiv = document.getElementById("item-title");
            updateCardTitle(itemTitleDiv, itemInfo);
            updateItemDetails(itemDetailsDiv, itemInfo, itemType, true);

            if (itemType != "Freebies")
            {
                if (itemInfo.stitchWitLink !== undefined)
                {
                    //updateCardLink("active-item-stitch-wit-link", itemInfo.stitchWitLink);
                }
                else
                {
                    //document.getElementById("active-item-stitch-wit-link").remove();
                }

                updateCardLink("active-item-etsy-link", itemInfo.saveAndShareEtsyLink);
            }

            updateCardLink("active-item-itchio-link", itemInfo.itchioLink, itemInfo.slug);            

            const activeItemDiv = document.getElementById("active-item");
            activeItemDiv.style.display = "block";
        }
    }
}

function getGenericItemText(descriptionType)
{
    var jsonFilePath = "docs/assets/data/itemDescriptions.json";
    var descriptionJson = getJsonContents(jsonFilePath);
    var genericItemText = descriptionJson[descriptionType];
    
    return genericItemText
}

function updateItemDetails(itemDetailsDiv, itemInfo, itemType, isActive)
{
    var details = "";

    if (itemType != "Bundles")
    {
        var numDetails = itemInfo.details.length;

        if (itemInfo.story !== undefined)
        {
            details += "<i>" + itemInfo.story + "</i><br><br>"
        }

        for (var i = 0; i < numDetails; i++)
        {
            details += "<span class=\"bold\">✦ " + itemInfo.details[i].label + ":</span> " + itemInfo.details[i].info + "<br>";
        } 
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

        details = "<span class=\"bold\">Patterns:</span><br> " + patternString;
    }

    if (isActive)
    {
        const genericText = getGenericItemText(itemInfo.descriptionType);
        details += genericText;
    }

    itemDetailsDiv.innerHTML = details;
}

function loadItemCards(itemsList, startIndex, endIndex, numItems, itemType, section, parameterName) 
{
    const itemSection = document.getElementById(section);

    var parentColumnDiv = addColumnRow();

    for (var i = startIndex; i < endIndex; i++)
    {
        const itemInfo = getItemInfo(itemType, itemsList[i]);
        
        const columnDiv = addColumn();
        parentColumnDiv.appendChild(columnDiv);

        const cardDiv = addCard();
        columnDiv.appendChild(cardDiv)

        const cardImageDiv = addCardImage();
        cardDiv.appendChild(cardImageDiv)

        const imageFigure = addImageFigure();
        cardImageDiv.appendChild(imageFigure)

        const activeItemLink = document.createElement("a");

        var pageType = itemType

        if (itemType != "trackerPatterns")
        {
            pageType = itemType.toLowerCase();
        }

        var currentPage =  getCurrentPage();

        if (itemType == "Patreon")
        {
            activeItemLink.href = "https://www.patreon.com/InfinityBearDesigns"
        }
        else
        {
            activeItemLink.href = pageType + "?page=" + currentPage + "&" + parameterName + "=" + itemsList[i];
        }

        const imageName = itemsList[i];
        const image = addImage(imageName);
        
        
        if (parameterName != "zine")
        {
            activeItemLink.appendChild(image);
            imageFigure.appendChild(activeItemLink);
        }
        else
        {
            imageFigure.appendChild(image);
        }

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

        updateItemDetails(contentDiv, itemInfo, itemType, false)

        cardContentDiv.appendChild(contentDiv);

        const cardFooter = addCardFooter();

        if (itemType == "Patreon")
        {
            const patreonLink = addPatreonLink();
            cardFooter.appendChild(patreonLink);
        }
        else
        {
            const slug = itemInfo.slug;
            const itchioLink = addItchioLink(slug, itemType);
            cardFooter.appendChild(itchioLink);

            if (itemType != "Freebies")
            {
                if (itemInfo.stitchWitLink !== undefined)
                {
                    // const itemStitchWitLink = itemInfo.stitchWitLink;
                    // const stitchWitLink = addStitchWitLink(itemStitchWitLink);
                    // cardFooter.appendChild(stitchWitLink);
                }

                const itemEtsyLink = itemInfo.saveAndShareEtsyLink;
                const etsyLink = addEtsyLink(itemEtsyLink);
                cardFooter.appendChild(etsyLink);
            }
        }

       if (parameterName != "zine")
       {
           cardDiv.appendChild(cardFooter);
       }

        itemSection.appendChild(parentColumnDiv);
    }
}

function loadItems(itemType, parameterName)
{
    var itemsList = getItemsList(itemType);

    const numTotalItems = itemsList.length;
    const totalPages = getTotalPages(numTotalItems, maxItemsPerPage);
    const currentPage = Math.min(getCurrentPage(), totalPages);
    const pageIndex = currentPage - 1;
    const startIndex = pageIndex * maxItemsPerPage;
    const startRecentIndex = 0;
    const numRecentItems = 3;
    const endRecentIndex = numRecentItems;

    const endIndex = Math.min(numTotalItems, currentPage * maxItemsPerPage);
    const numItems = Math.min(numTotalItems, maxItemsPerPage);
    
    if (parameterName != "zine" && totalPages > 1)
    {
        addPagination(totalPages, 1)
    }

    if(parameterName != "zine")
    {
        loadItemCards(itemsList, startRecentIndex, endRecentIndex, numRecentItems, itemType, "latestSection", parameterName);
        itemsList = itemsList.sort();
    }

    loadItemCards(itemsList, startIndex, endIndex, numItems, itemType, "itemSection", parameterName);

    if(parameterName != "zine")
    {
        addActiveItemBlock(itemType);
        loadActiveItem(itemType, parameterName);

        updatePagination(totalPages, currentPage);
    }
}

function loadPatternsPage()
{
    loadItems("Patterns", "pattern");
    updateCopyright();
}

function loadTrackerPatternsPage()
{
    loadItems("trackerPatterns", "pattern");
    updateCopyright();
}

function loadTheNoirDimensionPage()
{
    loadItems("TheNoirDimension", "zine");
    updateCopyright();
}

function loadBundlesPage()
{
    loadItems("Bundles", "pattern");
    updateCopyright();
}

function loadStlsPage()
{
    loadItems("STLs", "stl");
    updateCopyright();
}

function loadFreebiesPage()
{
    loadItems("Freebies", "item");
    updateCopyright();
}

function loadHomepage()
{
    var itemsListPatreon = getItemsList("Patreon");
    var itemsListPatterns = getItemsList("Patterns");
    var itemsListFreebies = getItemsList("Freebies");
    var itemsListBundles = getItemsList("Bundles");
    
    const startRecentIndex = 0;
    const numRecentItems = 3;
    const endRecentIndex = numRecentItems;

    loadItemCards(itemsListPatreon, startRecentIndex, endRecentIndex, numRecentItems, "Patreon", "latestSectionPatreon", "pattern");
    loadItemCards(itemsListPatterns, startRecentIndex, endRecentIndex, numRecentItems, "Patterns", "latestSectionPatterns", "pattern");
    loadItemCards(itemsListFreebies, startRecentIndex, endRecentIndex, numRecentItems, "Freebies", "latestSectionFreebies", "item");
    loadItemCards(itemsListBundles, startRecentIndex, endRecentIndex, numRecentItems, "Bundles", "latestSectionBundles", "pattern");

    updateCopyright();
}