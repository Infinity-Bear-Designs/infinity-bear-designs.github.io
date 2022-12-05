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
    console.log("Name: " + parameterName)
    var regex = new RegExp('[?&]' + parameterName + '(=([^&#]*))'), results = regex.exec(url);
    console.log(url)
    console.log(results)

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
    itchioLink.id = "active-item-itchio-link"

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