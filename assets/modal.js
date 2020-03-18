const openModal = () => {
    console.log("Opening")
    const modalContainer = document.querySelector("#modal");
    document.querySelector("#modal #modalCloser").classList.remove("modalSide");

    modalContainer.classList.add('show');

}
const closeModal = () => {
    const modalContainer = document.querySelector("#modal");
    const modalContent = document.querySelector("#modal #modalContent #content");

    modalContainer.classList.remove('show');
    document.querySelector("#modal #modalCloser").classList.add("modalSide");

    setTimeout(function() {
        modalContent.classList.remove("xl");
    }, 300)
}

const setXlModal = () => {
    const modalContent = document.querySelector("#modal #modalContent #content");
    modalContent.classList.add("xl");
}

const setModalContent = (data) => {
    const modalContent = document.querySelector("#modal #modalContent #content");

    modalContent.innerHTML = data;
}

const showStatus = (el, type) => {
    switch(type) {
        case "limited":
            el.innerText = "This piece is getting minimal updates."
            break;
    }
}