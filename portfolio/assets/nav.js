const isMobile = window.innerWidth <= 915;

let showingNavbar = false;

const swipeFirstPage = () => {
    if(showingNavbar) return;

    const hero = document.getElementById("hero");
    const page = document.getElementById("page");
    const nav = document.querySelector("nav");

    const scroll = document.querySelector("nav").getBoundingClientRect().top;

    hero.style.transition = "0.2s"
    page.style.transition = "0.2s"
    nav.style.transition = "0.2s"

    hero.style.transform = `translate(0, -${scroll}px)`;
    page.style.transform = `translate(0, -${scroll}px)`;
    nav.style.transform = `translate(0, -${scroll}px)`;
    
    setTimeout(function() {
        hero.style.transition = "0s"
        page.style.transition = "0s"
        nav.style.transition = "0s"

        page.style.transform = "translate(0, 0)";
        hero.style.transform = "translate(0, 0)";
        nav.style.transform = "translate(0, 0)";

        window.scrollTo(0, window.innerHeight)

        showingNavbar = true;
    }, 200)
}


const startScrollspy = () => {
    window.addEventListener('scroll', function() {
        const spaceFromTop = window.scrollY;
        if(!isMobile) {
            if(spaceFromTop >= this.window.innerHeight && !showingNavbar) {
                showingNavbar = true;
            }
            if(spaceFromTop < this.window.innerHeight && showingNavbar) {
                showingNavbar = false;
            }
        }
        if(showingNavbar || isMobile) {
            const threshold = 110;
            const about = document.querySelector("#about").getBoundingClientRect().top <= threshold;
            const portfolio = document.querySelector("#portfolio").getBoundingClientRect().top <= threshold;
            
            const workExperience = window.innerWidth <= 1800 ? document.querySelector("#work").getBoundingClientRect().top <= threshold : (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
            if(this.document.querySelector(".active")) this.document.querySelector(".active").classList.remove("active");
            
            if(workExperience) {
                this.document.querySelector("#navlist").children[2].classList.add("active");
            } else if(portfolio) {
                this.document.querySelector("#navlist").children[1].classList.add("active");
            } else if(about) {
                this.document.querySelector("#navlist").children[0].classList.add("active");
            }  
            
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

const closeNav = () => {
    if(isMobile) {
        document.querySelector("nav .right ul").classList.remove("show");
    }
}

const openNav = () => {
    if(isMobile) {
        document.querySelector("nav .right ul").classList.add("show");
    }
}

window.onload = function() {
    if(isMobile) {
        document.querySelector("nav").classList.add('sticky');
    }

    renderPortfolioItems();
    renderWorkExperience();
    startScrollspy();
}