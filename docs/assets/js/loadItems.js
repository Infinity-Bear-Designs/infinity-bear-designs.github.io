const maxItemsPerPage = 15;

function getItemsList(itemType)
{
    const itemsJson = getJsonContents("docs/assets/data/items.json");
    const itemsList = itemsJson[itemType];

    return itemsList;
}

function getItemInfo(itemType, name)
{
    var itemPath = "docs/assets/data/" + itemType + "/" + name + ".json";
    var itemInfo = getJsonContents(itemPath);

    return itemInfo;
}

function addActiveItemBlock(itemType)
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

    const activeItchioLink = addActiveItchioLink(itemType);
    buttonBarDiv.appendChild(activeItchioLink);

    if (itemType != "Freebie")
    {
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

            if (itemType != "free")
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
    const genericPatternText = `<br>This item is a digital PDF pattern, and is only available for downloading and printing. <br><br>

    It is not a completed project or cross stitch kit. It does not contain any physical materials,
    including those shown in the listing imagery.<br><br>

    To view or print this pattern, you will require a PDF reader. <br><br>`;
    
    return genericPatternText;
}

function getGenericStlText()
{
    const genericStlText = `<br>This item is intended to be decorative and is not intended for organized floss storage. Consider using them as a visual accent for your finished cross-stitch pieces or related photography. <br><br>
    
    It does not contain any physical materials, including those shown in the listing imagery.

    To make use of this file you will need a slicer for your 3D printer, where you will be responsible for slicing the model and configuring it for your own printer. I cannot provide assistance with these steps.<br><br>`;
    
    return genericStlText; 
}

function getGenericItemText(itemType)
{
    var genericItemText = "";
    
    if (itemType == "Patterns" || itemType == "Freebies" || itemType == "Bundles")
    {
        genericItemText = getGenericPatternText()
    }
    else if (itemType == "STLs")
    {
        genericItemText = getGenericStlText()
    }

    return genericItemText;
}

function updateItemDetails(itemDetailsDiv, itemInfo, itemType, isActive)
{
    var details = "";

    if (itemType != "Bundles")
    {
        var numDetails = itemInfo.details.length;

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

        // Cleans up extra <br>
        patternString = patternString.slice(0, -4);

        details = "<span class=\"bold\">Patterns:</span><br> " + patternString;
    }

    if (isActive)
    {
        const genericText = getGenericItemText(itemType);
        details += genericText;
    }

    itemDetailsDiv.innerHTML = details;
}


function getCurrentPage()
{
    var currentPage = getParameterByName("page")
        
    if (currentPage == null)
    {
        currentPage = 1;
    }

    return parseInt(currentPage);
}

function loadItemCards(itemsList, startIndex, endIndex, numItems, itemType, section, parameterName) 
{
    const numItemsPerRow = 3;

    const itemSection = document.getElementById(section);

    var parentColumnDiv;

    for (var i = startIndex; i < endIndex; i++)
    {
        const itemInfo = getItemInfo(itemType, itemsList[i]);

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

        var pageType = itemType.toLowerCase();
        var currentPage =  getCurrentPage();

        activeItemLink.href = pageType + "?page=" + currentPage + "&" + parameterName + "=" + itemsList[i];

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

        updateItemDetails(contentDiv, itemInfo, itemType, false)

        cardContentDiv.appendChild(contentDiv);

        const cardFooter = addCardFooter();

        const slug = itemInfo.slug;

        const itchioLink = addItchioLink(slug, itemType);
        cardFooter.appendChild(itchioLink);

        if (itemType != "Freebies")
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

function getTotalPages(totalItems)
{
    return Math.ceil(totalItems/maxItemsPerPage);
}

function addPagination(totalPages, currentPage)
{
    const paginationNav = document.getElementById("paginationNav");

    if (currentPage > 1)
    {
        const previousLink = document.createElement("a");
        previousLink.classList.add("pagination-previous");
        previousLink.innerHTML = "Previous";

        var url = new URL(window.location.href);
        urlParams = url.searchParams;
        urlParams.set('page', currentPage - 1);

        url.search = urlParams.toString();

        var new_url = url.toString();

        previousLink.href = new_url;

        paginationNav.appendChild(previousLink);
    }

    if (currentPage != totalPages)
    {
        const nextLink = document.createElement("a");
        nextLink.classList.add("pagination-next");
        nextLink.innerHTML = "Next";

        var url = new URL(window.location.href);
        urlParams = url.searchParams;
        urlParams.set('page', currentPage + 1);

        url.search = urlParams.toString();

        var new_url = url.toString();

        nextLink.href = new_url;

        paginationNav.appendChild(nextLink);
    }

    const paginationList = document.createElement("ul");
    paginationList.classList.add("pagination-list");

    for (var i = 1; i < totalPages + 1; i++)
    {
        var pageListItem = document.createElement("li");
        var page = document.createElement("a");

        page.classList.add("pagination-link")
        
        if (i == currentPage)
        {
            page.classList.add("is-current");
        }
        
        page.innerHTML = i;

        var url = new URL(window.location.href);
        urlParams = url.searchParams;
        urlParams.set('page', i);

        url.search = urlParams.toString();

        var new_url = url.toString();

        page.href = new_url;

        pageListItem.appendChild(page);
        paginationList.appendChild(pageListItem);
    }

    paginationNav.appendChild(paginationList);

}

function updatePagination(totalPages, currentPage)
{
    const paginationNav = document.getElementById("paginationNav");
    paginationNav.innerHTML = '';
    addPagination(totalPages, currentPage)
}

function loadItems(itemType, parameterName)
{
    var itemsList = getItemsList(itemType);
    
    const numTotalItems = itemsList.length;
    const totalPages = getTotalPages(numTotalItems);
    const currentPage = Math.min(getCurrentPage(), totalPages);
    const pageIndex = currentPage - 1;
    const startIndex = pageIndex * maxItemsPerPage;
    const startRecentIndex = 0;
    const numRecentItems = 3;
    const endRecentIndex = numRecentItems;

    const endIndex = Math.min(numTotalItems, currentPage * maxItemsPerPage);
    const numItems = Math.min(numTotalItems, maxItemsPerPage);
    
    if (totalPages > 1)
    {
        addPagination(totalPages, 1)
    }

    loadItemCards(itemsList, startRecentIndex, endRecentIndex, numRecentItems, itemType, "latestSection", parameterName);
   
    itemsList = itemsList.sort();
    loadItemCards(itemsList, startIndex, endIndex, numItems, itemType, "itemSection", parameterName);
   
    addActiveItemBlock(itemType);
    loadActiveItem(itemType, parameterName);

    updatePagination(totalPages, currentPage);
}

function loadPatternsPage()
{
    loadItems("Patterns", "pattern");
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