const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

let countDown = new Date('Mar 30, 2020 00:00:00').getTime(),
    x = setInterval(function () {

        let now = new Date().getTime(),
            distance = countDown - now;


        document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

        //do something later when date is reached
        //if (distance < 0) {
        //  clearInterval(x);
        //  'IT'S MY BIRTHDAY!;
        //}

    }, second)

function dialog(hoejde, bredde, baggrundsfarve, fontfarve, placering, indhold, knapper) {

    const htmlkrop = document.body;
    htmlkrop.insertAdjacentHTML('afterend', '<div id="modaldialog" class="modal_dialog"><div id="modalindhold"></div></div>');

    const modalindhold = document.getElementById("modalindhold");
    modalindhold.classList.add("modal_indhold");

    const modaldialog = document.getElementById("modaldialog");
    let dialogIndhold = '<span onclick="modaldialog.remove()" class="close">X</span><p><br>' + indhold + '</p>';

    modalindhold.style.width = bredde;
    modalindhold.style.height = hoejde;
    modalindhold.style.backgroundColor = baggrundsfarve;
    modalindhold.style.color = fontfarve;

    if (placering === "centrer") {
        modalindhold.style.left = "50%";
        modalindhold.style.top = "50%";
        modalindhold.style.transform = "translate(-50%,-50%)";
        modalindhold.style.boxShadow = "5px 5px 5px black";
    } else if (placering === "bund") {
        modalindhold.style.left = "0";
        modalindhold.style.bottom = "0";
    } else if (placering === "top") {
        modalindhold.style.left = "0";
        modalindhold.style.top = "0";
    }

    if (knapper) {
        dialogIndhold += '<div class="knappanel"><button type="button" class="knapper" onclick="modaldialog.remove()">Fortryd</button><button type="button" class="knapper" onclick="modaldialog.remove()">OK</button></div>';
    }

    modalindhold.innerHTML = dialogIndhold;
}


// Hovedprogram

const formular = `
<form>
<label for ="text1">Udfyld email og postnummer, for at deltage i konkurrencen</label>
<br> <br>
<input type="text" placeholder="Email"><br>
<br>
<input type="text" placeholder="Postnummer" id="postnr" list="pbliste">
</form>
<br> <br>
`;

document.getElementById("centrerknap").addEventListener("click", function () {
    dialog("200px", "400px", "white", "black", "centrer", formular, true);
});


fetch("https://dawa.aws.dk/postnumre")

    .then(function (data) {
        return data.json();
    })

    .then(function (post) {
        for (let i = 0; i < post.length; i++) {
            document.getElementById("pbliste").insertAdjacentHTML("beforeend", "<option>" + post[i].nr + " " + post[i].navn + "</option>");
        }
    })
