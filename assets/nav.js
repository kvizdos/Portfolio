const isMobile = window.innerWidth <= 915;

const swipeFirstPage = () => {
    const hero = document.getElementById("hero");
    const page = document.getElementById("page");
    const nav = document.querySelector("nav");
    const spacer = document.querySelector(".spacer");

    const scroll = document.querySelector("nav").getBoundingClientRect().top;

    hero.style.transition = "0.2s"
    page.style.transition = "0.2s"
    nav.style.transition = "0.2s"
    spacer.style.transition = "0.2s"

    hero.style.transform = `translate(0, -${scroll}px)`;
    page.style.transform = `translate(0, -${scroll}px)`;
    nav.style.transform = `translate(0, -${scroll}px)`;
    spacer.style.transform = `translate(0, -${scroll}px)`;
    
    setTimeout(function() {
        hero.style.transition = "0s"
        page.style.transition = "0s"
        nav.style.transition = "0s"
        spacer.style.transition = "0s"

        page.style.transform = "translate(0, 0)";
        hero.style.transform = "translate(0, 0)";
        nav.style.transform = "translate(0, 0)";
        spacer.style.transform = "translate(0, 0)";

        window.scrollTo(0, window.innerHeight)

        document.querySelector("nav").classList.add('sticky');
        document.querySelector(".spacer").classList.remove('noshow');
    }, 200)
}

let showingNavbar = false;

if(!isMobile) {
    window.addEventListener('scroll', function() {
        const spaceFromTop = window.scrollY;

        if(spaceFromTop >= this.window.innerHeight && !showingNavbar) {
            const hero = document.getElementById("hero");
            document.querySelector(".spacer").classList.remove('noshow');

            document.querySelector("nav").classList.add('sticky');
            showingNavbar = true;
        }

        if(spaceFromTop < this.window.innerHeight && showingNavbar) {
            this.console.log("here")
            const hero = document.getElementById("hero");
            document.querySelector(".spacer").classList.add('noshow');

            document.querySelector("nav").classList.remove('sticky');

            showingNavbar = false;
        }
    });
}

const portfolio = (el, type = "web") => {
    document.querySelector(".categorySelector .active").classList.remove('active');
    el.classList.add('active');

    if(type == "web") {
        [...document.querySelectorAll(".mobileApp")].forEach(el => el.classList.add("noshow"));
        [...document.querySelectorAll(".webApp")].forEach(el => el.classList.remove("noshow"));
    } else if(type == "mobile") {
        [...document.querySelectorAll(".mobileApp")].forEach(el => el.classList.remove("noshow"));
        [...document.querySelectorAll(".webApp")].forEach(el => el.classList.add("noshow"));
    } else {
        [...document.querySelectorAll(".mobileApp")].forEach(el => el.classList.remove("noshow"));
        [...document.querySelectorAll(".webApp")].forEach(el => el.classList.remove("noshow"));

    }
}

const showExp = (el, company) => {
    document.querySelector(".companyBadge.active").classList.remove('active');
    el.classList.add('active');

    document.querySelector(".whatIDid.active").classList.remove("active");
    document.querySelector(`.whatIDid#${company}`).classList.add("active");
}

window.onload = function() {
    if(isMobile) {
        
        document.querySelector(".spacer").classList.remove('noshow');

        document.querySelector("nav").classList.add('sticky');
    }

    renderPortfolioItems();
    renderWorkExperience();
}