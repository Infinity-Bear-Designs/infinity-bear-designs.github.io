function includeFile(filename, elementID)
{
    const request = new XMLHttpRequest();
    request.open("GET", "includes/" + filename, false);
    request.send(null);

    const content = request.responseText;

    const element = document.getElementById(elementID);
    element.innerHTML = content;
}

function updateCopyright()
{
    const currentYear = new Date().getFullYear();
    const copyrightSpan = document.getElementById("copyrightYear");
    copyrightSpan.innerText = currentYear;
}

document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if (navbarBurgers.length > 0)
    {
        // Add a click event on each of them
        navbarBurgers.forEach( el =>
        {
            el.addEventListener('click', () =>
            {
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const targetElement = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                targetElement.classList.toggle('is-active');
            });
        });
    }
});