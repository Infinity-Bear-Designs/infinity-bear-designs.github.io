function getJsonContents(jsonFilePath)
{
    const request = new XMLHttpRequest();

    request.open("GET", jsonFilePath, false);
    request.setRequestHeader('Content-Type', 'application/json;charset=utf-8;');
    request.send(null);

    const jsonObject = JSON.parse(request.responseText);

    return jsonObject;
}

function getParameterByName(parameterName, url = window.location.href)
{
    var regex = new RegExp('[?&]' + parameterName + '(=([^&#]*))'), results = regex.exec(url);

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
    imageFigure.classList.add("is-4by3");
    
    return imageFigure;
}

function addImage(imageName)
{
    const image = document.createElement("img");
    image.src = "docs/assets/images/" + imageName + "Website.webp"

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

function addActiveItchioLink(itemType)
{
    const itchioLink = document.createElement("a");
    itchioLink.classList.add("button");
    itchioLink.classList.add("purchase-background");
    itchioLink.classList.add("bold");
    itchioLink.id = "active-item-itchio-link"

    var linkText = getItchioLabel(itemType);

    itchioLink.innerHTML = linkText;

    return itchioLink;
}

function addActiveEtsyLink()
{
    const etsyLink = document.createElement("a");
    etsyLink.classList.add("button");
    etsyLink.classList.add("etsy-background");
    etsyLink.classList.add("bold");
    etsyLink.id = "active-item-etsy-link"

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

function addItchioLink(slug, itemType)
{
    const itchioLink = document.createElement("a");
    itchioLink.classList.add("card-footer-item");
    itchioLink.classList.add("purchase-background");

    var linkText = getItchioLabel(itemType);

    itchioLink.innerHTML = linkText;

    connectItchioBuyButton(itchioLink, slug);

    return itchioLink;
}

function getItchioLabel(itemType)
{
    var label = "Buy Now";

    if (itemType == "Freebies")
    {
       label = "Download";
    }    

    return label;
}

function updateCardLink(linkId, link, slug)
{
    const linkElement = document.getElementById(linkId);

    if (slug == null)
    {
        linkElement.href = link;
    }
    else
    {
        connectItchioBuyButton(linkElement, slug);
    }
}      

function updateCardTitle(titleDiv, itemInfo)
{
    titleDiv.innerText = itemInfo.title;
}

function updateBreadcrumbNav(itemTitle)
{
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

    activeItemListLink.innerText = itemTitle;
    breadcrumbLi.classList.add("is-active");

    breadcrumbLi.appendChild(activeItemListLink);
    breadcrumbUl.appendChild(breadcrumbLi);
}

function getTotalPages(totalItems, totalItemsPerPage)
{
    return Math.ceil(totalItems/totalItemsPerPage);
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

function getCurrentPage()
{
    var currentPage = getParameterByName("page")
        
    if (currentPage == null)
    {
        currentPage = 1;
    }

    return parseInt(currentPage);
}
