const submitEmail = () => {
    document.querySelector("form#cta").classList.remove("bad");
    document.querySelector("form#cta").classList.remove("good");

    const subBtn = document.querySelector("form#cta input[type='submit']");

    subBtn.disabled = true;
    subBtn.value = "Sending"

    const token = grecaptcha.getResponse();
    // TODO: Validate fields
    const name = document.querySelector("#name").value,
          email = document.querySelector("#email").value,
          company = document.querySelector("#company").value || "Unspecified",
          message = document.querySelector("#whatYouWant").value;

    if((grecaptcha && grecaptcha.getResponse().length == 0) || name == "" || email == "" || message == "") {
        document.querySelector("form#cta").classList.add("bad");
        subBtn.value = "Contact"
        subBtn.disabled = false;
        return;
    }

    var data = JSON.stringify({
        token: token,
        name: name,
        email: email,
        company: company,
        message: message,
        type: "portfolio"
    });

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            try {
                const resp = JSON.parse(JSON.parse(this.responseText).body);

                if(resp.sent) {
                    document.querySelector("form#cta").classList.add("good");
                    subBtn.value = "Sent"                
                } else {
                    document.querySelector("form#cta").classList.add("bad");
                    subBtn.value = "Something went wrong; please reload and try again"
                }
            } catch(e) {
                subBtn.value = "Something went wrong; please reload and try again"
            }
        }
    });
    xhr.open("POST", "https://api.kentonvizdos.com/pb-send-email");
    xhr.send(data);
}