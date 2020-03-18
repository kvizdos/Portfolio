const workExperience = [
    {
        place: "Singlestone",
        url: "https://www.singlestoneconsulting.com/",
        hasLogo: true,
        years: [
            {
                year: "2019",
                desc: "During my second summer internship here, I was put on the task of creating a Slack bot for their team. This Slack bot was meant to connect into multiple endpoints and receive updates from multiple sales-related sites so that the entire team can stay in the loop, no matter where they are. This is important to follow up in their traditions, but it also allows them to complete traditions remotely."
            },
            {
                year: "2018",
                desc: "During my first summer internship in 2018, I was focusing on front-end web development for Reverb's website. For this, I used Angular 6 to modify, add, and simplify sections and features on their site."
            }
        ]
    },
    {
        place: "MetaCTF",
        url: "https://metactf.com",
        hasLogo: true,
        years: [
            {
                year: "2019",
                desc: "Using Object Oriented TypeScript, MongoDB, and Redis, I developed a full back end, and modal-based front end, to quickly and securely serve and cache content to the participants of a MetaCTF competition"
            }
        ]
    },
    {
        place: "ScrumRVA",
        url: "https://scrumrva.org",
        hasLogo: false,
        years: [
            {
                year: "2017+",
                desc: "Since 2017, I've been helping Co-Organize the RVA Scrum meetup, ScrumRVA. With over 1,000 members, I've learned a lot by working in a team. Also, through this experience, I am learning how to manage meetups (including how to use the platform)."
            }
        ]
    },
    {
        place: "School",
        url: "https://teachers.henrico.k12.va.us/deeprun/cit/",
        hasLogo: false,
        years: [
            {
                year: "2018+",
                desc: "Deep Run CTF Planning Committee- I helped create a fun cyber security CTF (that was run on MetaCTF's platform) for middle school and high school students. This included problem writing and management during the competition"
            },
            {
                year: "2018+",
                desc: "Ever since my sophomore year, I've been helping my school's Center by being on the council as a Network Administrator where I helped setup VMs and physical hardware, securing networks, and setting up competition systems. There were a few smaller things, but those are my main roles."
            }
        ]
    }
];

const portfolioItems = [
    {
        name: "Yoga Your Way",
        short: "yyw",
        description: "Yoga Your Way was created for a quarter-long school project. This is it's second iteration, and is much better than v1. Overall, Yoga Your Way allows users to customize and create yoga routines with hundreds of premade poses. It is a PWA.",
        type: "mobile"
    },
    {
        name: "Auxy",
        description: "HOME Router allows for easy proxying of anything and allows you to put a strong authentication system in front of any page (note: NOT for production security, this is mainly for securing development environments). The great part about this reverse proxy is that you do not need to port forward every single application, with this you just open one port (by default, 80) and we'll take care of the rest.",
        github: "https://github.com/kvizdos/HOME-Router",
        type: "web"
    },
    {
        name: "VirusWatch",
        description: "VirusWatch.app is an application I made in light of the Coronavirus. It allows you to enter a ZIP code and get the amount of cases/deaths/recoveries in your state, along with a few PSA type segments of information.",
        live: "https://viruswatch.app",
        type: "web"
    },
    {
        name: "URL Shortener",
        description: "This is your average URL shortener, however it can do subdomain redirections and path redirections. It tracks where clicks come from, and even gives you a nice little graph to see daily amounts.",
        github: "https://github.com/kvizdos/URL-Shortener",
        status: "Limited",
        type: "web"
    },
    {
        name: "Bracketify",
        description: "Bracketify was created the summer before my freshman year of high school and was made so I could learn how NodeJS works. It was an ambitious first project, but in the end I learned so much valuable information about how NodeJS and Socket.io works that it was well worth the effort, even though the final product wasn't as good as expected. In short, Bracketify allows you to simply create tournament brackets and share them with your friends. It even supports multiple admins and realtime updates to changes across all connected users.",
        live: "https://bracketify.com",
        status: "Archived",
        type: "web"
    }
];

const renderPortfolioItems = () => {
    let i = 0;
    for(const item of portfolioItems) {
        document.getElementById("portfolioWrapper").innerHTML += `<li class="${item.type == "mobile" ? "mobileApp" : "webApp"}" onclick="openPortfolioItem(${i})"><img src="assets/images/projects/${item.short || item.name.replace(/\ /g, '').toLowerCase()}.png"></li>`
        i++;
    }
}

const openPortfolioItem = (i) => {
    const item = portfolioItems[i];

    let data = "";

    let status = "";
    let github = "";
    let live = "";

    if(item.status != undefined) {
        status = `
            <p class="status ${item.status.toLowerCase()}">${item.status == "Limited" ? "This piece is getting minimal updates." : "This piece has been archived and is no longer getting updates."}</p>
        `
    }

    if(item.github != undefined) {
        github = `<a href="${item.github}" target="_blank" class='btn github'><i class="fab fa-github-alt"></i> GitHub</a>`
    }

    if(item.live != undefined) {
        live = `<a href="${item.live}" target="_blank" class='btn live'><i class="fas fa-external-link-alt"></i> Visit</a>`
    }

    console.log(github)

    // if(item.type == "mobile") {
        data = `
        
        <section class="splitModal${item.type != "mobile" ? ' largerImg' : ''}">
            <article class="left">
                <img src="assets/images/projects/${item.short || item.name.replace(/\ /g, '').toLowerCase()}.png">
            </article>
            <article class="right">
                ${status}
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <section class="buttons">
                    ${github}
                    ${live}
                </section>
            </article>
        </section>

        `
    // } else {
    //     data = `
    //     <section class="withImg">
    //         <img src="assets/images/projects/${item.short || item.name.replace(/\ /g, '').toLowerCase()}.png">
    //         <article>
    //             ${status}
    //             <h2>${item.name}</h2>
    //             <p>${item.description}</p>
    //             <section class="buttons">
    //                 ${github}
    //                 ${live}
    //             </section>
    //         </article>
    //     </section>
    //     `
    // }

    setModalContent(data);

    openModal(data);
}

const renderWorkExperience = () => {
    let i = 0;
    for(const location of workExperience) {
        let tlData = '';

        document.getElementsByClassName("workContainer")[0].innerHTML += `
        <article class="companyBadge${i == 0 ? ' active' : ''}" onclick="showExp(this, '${location.place.toLowerCase()}')">
            ${location.hasLogo ? `<img src="./assets/images/cos/${location.place.toLowerCase()}.png">` : `<p>${location.place}</p>`}
        </article>
        `

        for(let exp of location.years) {
            tlData += `
            <article class="tlItem">
                <p class="date">${exp.year}</p>
                <p>${exp.desc}</p>
            </article>
            `
        } 

        let data = `
        <article class="whatIDid${i == 0 ? ' active' : ''}" id="${location.place.toLowerCase()}">
            <a href="${location.url}">${location.hasLogo ? `<img src="./assets/images/cos/${location.place.toLowerCase()}.png" width="200px">` : `<h2>${location.place}</h2>`}</a>
            <section class="timeline">
                ${tlData}
            </section>
        </article>
        `

        document.getElementById("aboutCo").innerHTML += data;
        i++;
    }
}