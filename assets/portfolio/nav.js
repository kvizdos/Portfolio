const isMobile = window.innerWidth <= 915;

const scrollFunc = window.requestAnimationFrame ||
                    function(callback) {
                        setTimeout(callback, 1000/60)
                    }

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

const isElementShowing = (el) => {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    const mobileOffset = +getComputedStyle(el).getPropertyValue("--mobileOffset") || -1;
    const mobileOffsetWithin = +getComputedStyle(el).getPropertyValue("--mobileOffsetWithin") || -1;

    const desktopOffset = +getComputedStyle(el).getPropertyValue("--desktopOffset") || -1;

    var isVisible = false;
    
    if(isMobile && mobileOffset != -1) {
        isVisible = elemTop - (el.offsetHeight * mobileOffset) <= (mobileOffsetWithin != -1 ? mobileOffsetWithin : 500);
    } else if(desktopOffset != -1) {
        isVisible = elemTop - (el.offsetHeight * desktopOffset) <= 500;
    } else {
        isVisible = (elemTop >= -500) && (elemBottom <= window.innerHeight);
    }

    return isVisible;
}

const scrollspyLoop = () => {
        const spaceFromTop = window.scrollY;
        if(!isMobile) {
            if(spaceFromTop >= this.window.innerHeight && !showingNavbar) {
                showingNavbar = true;
            }
            if(spaceFromTop < this.window.innerHeight && showingNavbar) {
                showingNavbar = false;
            }
        }
        if(showingNavbar) {
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

        const showEls = document.querySelectorAll('.showOnScroll');

        showEls.forEach(el => {
            if(isElementShowing(el)) {
                el.classList.add('showing');
            }
        })

    scrollFunc(scrollspyLoop)
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
        document.querySelector("nav").classList.add('sticky');
    }

    // renderPortfolioItems();
    // renderWorkExperience();
    // startScrollspy();
    scrollspyLoop();

}