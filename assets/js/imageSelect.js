function init() {
    [...document.querySelectorAll('.kg-gallery-image:not(.kg-width-full) img, .kg-image-card:not(.kg-width-full) img')].forEach(el => {
        el.classList.add("is-zoomable");

        const parent = el.parentNode;
        const tabWrapper = document.createElement("a");

        tabWrapper.href = el.src;
        tabWrapper.target = "_blank";
        tabWrapper.className = "is-zoomable-selector";

        parent.replaceChild(tabWrapper, el);
        tabWrapper.appendChild(el)
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .is-zoomable {
            cursor: pointer;
            transition: .2s;
            tabindex: 0;
        }

        .is-zoomable:hover,
        .is-zoomable-selector:focus-visible,
        .is-zoomable-selector:focus-visible img {
            transform: scale3d(1.01,1.01,1.01);
            transition: .2s;
        }
        `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', init, false);
