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
    const etsyIconSpan = document.createElement("span")
    const etsyLinkSpan = document.createElement("span")

    etsyLink.classList.add("card-footer-item");
    etsyLink.classList.add("ib-background");
    etsyLink.classList.add("etsy-hover");
    etsyLink.classList.add("bold");
    etsyIconSpan.classList.add("icon")

    etsyIconSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="15" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M384 348c-1.8 10.8-13.8 110-15.5 132-117.9-4.3-219.9-4.7-368.5 0v-25.5c45.5-8.9 60.6-8 61-35.3 1.8-72.3 3.5-244.1 0-322-1-28.5-12.1-26.8-61-36v-25.5c73.9 2.4 255.9 8.6 363-3.8-3.5 38.3-7.8 126.5-7.8 126.5H332C320.9 115.7 313.2 68 277.3 68h-137c-10.3 0-10.8 3.5-10.8 9.8V241.5c58 .5 88.5-2.5 88.5-2.5 29.8-1 27.6-8.5 40.8-65.3h25.8c-4.4 101.4-3.9 61.8-1.8 160.3H257c-9.2-40.1-9.1-61-39.5-61.5 0 0-21.5-2-88-2v139c0 26 14.3 38.3 44.3 38.3H263c63.6 0 66.6-25 98.8-99.8H384z"/></svg>'
    etsyLinkSpan.innerHTML = "Etsy";

    etsyLink.appendChild(etsyIconSpan)
    etsyLink.appendChild(etsyLinkSpan)

    etsyLink.href = patternEtsyLink;

    return etsyLink;
}

function addPatreonLink()
{
    const patreonLinkURL = "https://www.patreon.com/InfinityBearDesigns";
    const patreonLink = document.createElement("a");
    const patreonIconSpan = document.createElement("span")
    const patreonLinkSpan = document.createElement("span")

    patreonIconSpan.classList.add("icon")

    patreonLink.classList.add("card-footer-item");
    patreonLink.classList.add("ib-background");
    patreonLink.classList.add("patreon-hover");
    patreonLink.classList.add("bold");

    patreonIconSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M489.7 153.8c-.1-65.4-51-119-110.7-138.3C304.8-8.5 207-5 136.1 28.4C50.3 68.9 23.3 157.7 22.3 246.2C21.5 319 28.7 510.6 136.9 512c80.3 1 92.3-102.5 129.5-152.3c26.4-35.5 60.5-45.5 102.4-55.9c72-17.8 121.1-74.7 121-150z"/></svg>'
    patreonLinkSpan.innerHTML = "Patreon";

    patreonLink.appendChild(patreonIconSpan)
    patreonLink.appendChild(patreonLinkSpan)

    patreonLink.href = patreonLinkURL;

    return patreonLink;
}

function addActiveItchioLink(itemType)
{
    const itchioLink = document.createElement("a");
    itchioLink.id = "active-item-itchio-link"
    itchioLink.classList.add("card-footer-item");
    itchioLink.classList.add("ib-background");
    itchioLink.classList.add("itchio-hover");
    itchioLink.classList.add("bold");
    itchioLink.classList.add("button");

    const itchioIconSpan = document.createElement("span")
    const itchioLinkSpan = document.createElement("span")

    itchioIconSpan.classList.add("icon")

    itchioIconSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M71.9 34.8C50.2 47.7 7.4 96.8 7 109.7v21.3c0 27.1 25.3 50.8 48.3 50.8 27.6 0 50.5-22.9 50.5-50 0 27.1 22.2 50 49.8 50s49-22.9 49-50c0 27.1 23.6 50 51.2 50h.5c27.6 0 51.2-22.9 51.2-50 0 27.1 21.5 50 49 50s49.8-22.9 49.8-50c0 27.1 23 50 50.5 50 23 0 48.3-23.8 48.3-50.8v-21.3c-.4-12.9-43.2-62.1-64.9-75C372.6 32.4 325.8 32 256 32S91.1 33.1 71.9 34.8zm132.3 134.4c-22 38.4-77.9 38.7-99.9 .3-13.2 23.1-43.2 32.1-56 27.7-3.9 40.2-13.7 237.1 17.7 269.2 80 18.7 302.1 18.1 379.8 0 31.7-32.3 21.3-232 17.8-269.2-12.9 4.4-42.9-4.6-56-27.7-22 38.5-77.9 38.1-99.9-.2-7.1 12.5-23.1 28.9-51.8 28.9a57.5 57.5 0 0 1 -51.8-28.9zm-41.6 53.8c16.5 0 31.1 0 49.2 19.8a436.9 436.9 0 0 1 88.2 0C318.2 223 332.9 223 349.3 223c52.3 0 65.2 77.5 83.9 144.5 17.3 62.2-5.5 63.7-34 63.7-42.2-1.6-65.5-32.2-65.5-62.8-39.3 6.4-101.9 8.8-155.6 0 0 30.6-23.3 61.2-65.5 62.8-28.4-.1-51.2-1.6-33.9-63.7 18.7-67 31.6-144.5 83.9-144.5zM256 270.8s-44.4 40.8-52.4 55.2l29-1.2v25.3c0 1.6 21.3 .2 23.3 .2 11.7 .5 23.3 1 23.3-.2v-25.3l29 1.2c-8-14.5-52.4-55.2-52.4-55.2z"/></svg>'
    itchioLinkSpan.innerHTML =  getItchioLabel(itemType);

    itchioLink.appendChild(itchioIconSpan)
    itchioLink.appendChild(itchioLinkSpan)

    return itchioLink;
}

function addActiveEtsyLink()
{
    const etsyLink = document.createElement("a");
//    etsyLink.classList.add("button");
    etsyLink.id = "active-item-etsy-link"

    const etsyIconSpan = document.createElement("span")
    const etsyLinkSpan = document.createElement("span")

    etsyLink.classList.add("card-footer-item");
    etsyLink.classList.add("ib-background");
    etsyLink.classList.add("etsy-hover");
    etsyLink.classList.add("bold");
    etsyLink.classList.add("button");

    etsyIconSpan.classList.add("icon")

    etsyIconSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="15" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M384 348c-1.8 10.8-13.8 110-15.5 132-117.9-4.3-219.9-4.7-368.5 0v-25.5c45.5-8.9 60.6-8 61-35.3 1.8-72.3 3.5-244.1 0-322-1-28.5-12.1-26.8-61-36v-25.5c73.9 2.4 255.9 8.6 363-3.8-3.5 38.3-7.8 126.5-7.8 126.5H332C320.9 115.7 313.2 68 277.3 68h-137c-10.3 0-10.8 3.5-10.8 9.8V241.5c58 .5 88.5-2.5 88.5-2.5 29.8-1 27.6-8.5 40.8-65.3h25.8c-4.4 101.4-3.9 61.8-1.8 160.3H257c-9.2-40.1-9.1-61-39.5-61.5 0 0-21.5-2-88-2v139c0 26 14.3 38.3 44.3 38.3H263c63.6 0 66.6-25 98.8-99.8H384z"/></svg>'
    etsyLinkSpan.innerHTML = "Get it on Etsy";

    etsyLink.appendChild(etsyIconSpan)
    etsyLink.appendChild(etsyLinkSpan)

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
    itchioLink.classList.add("ib-background");
    itchioLink.classList.add("itchio-hover");
    itchioLink.classList.add("bold");

    const itchioIconSpan = document.createElement("span")
    const itchioLinkSpan = document.createElement("span")

    itchioIconSpan.classList.add("icon")

    itchioIconSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M71.9 34.8C50.2 47.7 7.4 96.8 7 109.7v21.3c0 27.1 25.3 50.8 48.3 50.8 27.6 0 50.5-22.9 50.5-50 0 27.1 22.2 50 49.8 50s49-22.9 49-50c0 27.1 23.6 50 51.2 50h.5c27.6 0 51.2-22.9 51.2-50 0 27.1 21.5 50 49 50s49.8-22.9 49.8-50c0 27.1 23 50 50.5 50 23 0 48.3-23.8 48.3-50.8v-21.3c-.4-12.9-43.2-62.1-64.9-75C372.6 32.4 325.8 32 256 32S91.1 33.1 71.9 34.8zm132.3 134.4c-22 38.4-77.9 38.7-99.9 .3-13.2 23.1-43.2 32.1-56 27.7-3.9 40.2-13.7 237.1 17.7 269.2 80 18.7 302.1 18.1 379.8 0 31.7-32.3 21.3-232 17.8-269.2-12.9 4.4-42.9-4.6-56-27.7-22 38.5-77.9 38.1-99.9-.2-7.1 12.5-23.1 28.9-51.8 28.9a57.5 57.5 0 0 1 -51.8-28.9zm-41.6 53.8c16.5 0 31.1 0 49.2 19.8a436.9 436.9 0 0 1 88.2 0C318.2 223 332.9 223 349.3 223c52.3 0 65.2 77.5 83.9 144.5 17.3 62.2-5.5 63.7-34 63.7-42.2-1.6-65.5-32.2-65.5-62.8-39.3 6.4-101.9 8.8-155.6 0 0 30.6-23.3 61.2-65.5 62.8-28.4-.1-51.2-1.6-33.9-63.7 18.7-67 31.6-144.5 83.9-144.5zM256 270.8s-44.4 40.8-52.4 55.2l29-1.2v25.3c0 1.6 21.3 .2 23.3 .2 11.7 .5 23.3 1 23.3-.2v-25.3l29 1.2c-8-14.5-52.4-55.2-52.4-55.2z"/></svg>'
    itchioLinkSpan.innerHTML =  getItchioLabel(itemType);

    itchioLink.appendChild(itchioIconSpan)
    itchioLink.appendChild(itchioLinkSpan)

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

function getArrayInUpperCase(array)
{
    return array.map(array => array.toUpperCase());
}