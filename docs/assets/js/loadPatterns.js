function createPatternCard() 
{
    var patternSection = document.getElementById("patternSection");
    
    var parentColumnDiv = document.createElement("div");
    parentColumnDiv.classList.add("columns");

    var numPatterns = 7

    for (var i = 0; i < numPatterns; i++)
    {
        if (i % 4 == 0)
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
        image.src = "docs/assets/images/DreamingOfOuterSpace.png"

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

        titleP.innerText = "Dreaming of Outer Space";

        mediaContentDiv.appendChild(titleP);
        
        var contentDiv = document.createElement("div");
        contentDiv.classList.add("content");

        contents = "<span class=\"bold\">✦ DMC Floss:</span> 7 colours<br>";
        contents += "<span class=\"bold\">✦ Pattern Size:</span>  100 x 100 stitches<br>";
        contents += "<span class=\"bold\">✦ Completed Size:</span> 7.14 x 7.14 inches or 18.14 x 18.14 cm on 14 count aida"; 

        contentDiv.innerHTML = contents;

        cardContentDiv.appendChild(contentDiv);

        var cardFooter = document.createElement("footer");
        cardFooter.classList.add("card-footer");     
    
        var etsyLink = document.createElement("a");
        etsyLink.classList.add("card-footer-item");
        etsyLink.classList.add("etsy-background");

        etsyLink.innerHTML = "Etsy";
        etsyLink.href = "#";

        cardFooter.appendChild(etsyLink);

        var gumroadLink = document.createElement("a");
        gumroadLink.classList.add("card-footer-item");
        gumroadLink.classList.add("gumroad-background");

        gumroadLink.innerHTML = "Gumroad";
        gumroadLink.href = "#";

        cardFooter.appendChild(gumroadLink);

        cardDiv.appendChild(cardFooter);

        patternSection.appendChild(parentColumnDiv);
    }

    var remainingColumns = 4 - (numPatterns % 4);

    if (remainingColumns != 0 && remainingColumns % 4 != 0)
    {
        for (var i = 0; i < remainingColumns; i++)
        {
            var columnDiv = document.createElement("div");
            columnDiv.classList.add("column");
    
            parentColumnDiv.appendChild(columnDiv);            
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

// Get all "navbar-burger" elements
const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

// Check if there are any navbar burgers
if ($navbarBurgers.length > 0) {

// Add a click event on each of them
$navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

    // Get the target from the "data-target" attribute
    const target = el.dataset.target;
    const $target = document.getElementById(target);

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    el.classList.toggle('is-active');
    $target.classList.toggle('is-active');

    });
});
}

});