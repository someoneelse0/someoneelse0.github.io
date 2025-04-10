let d0 = document.getElementById("qr");
let iqr = document.getElementsByClassName("iqr")[0];
const b0 = document.getElementsByClassName("b0")[0];
let oc = document.getElementsByClassName("oc")[0];
let tc = document.getElementsByClassName("tc")[0];

b0.addEventListener("click", (e) => {
    document.getElementById("qqr").style.display = "block";
    if (oc.value === "" && tc.value === "") {
        new QRCode(d0, {
            text: iqr.value,
            width: 512,
            height: 512,
            colorDark: "#000000ff",
            colorLight: "#ffffffff"
        });
    } else {
        new QRCode(d0, {
            text: iqr.value,
            width: 512,
            height: 512,
            colorDark: oc.value,
            colorLight: tc.value
        });
    }
}, false);

iqr.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        b0.click();
    }
});

const b1 = document.getElementsByClassName("b1")[0];
let itx = document.getElementsByClassName("itx")[0];
let sec = document.getElementsByClassName("sec")[0];
let txt1 = document.getElementsByClassName("txt1")[0];
let txt2 = document.getElementsByClassName("txt2")[0];
let txt3 = document.getElementsByClassName("txt3")[0];
let txt4 = document.getElementsByClassName("txt4")[0];
let txt5 = document.getElementsByClassName("txt5")[0];
let txt6 = document.getElementsByClassName("txt6")[0];
let txt7 = document.getElementsByClassName("txt7")[0];

b1.addEventListener("click", (e) => {
    let tx1 = CryptoJS.AES.encrypt(itx.value, sec.value).toString();
    let tx2 = CryptoJS.TripleDES.encrypt(itx.value, sec.value).toString();
    let tx3 = CryptoJS.SHA1(itx.value).toString();
    let tx4 = CryptoJS.SHA224(itx.value).toString();
    let tx5 = CryptoJS.SHA3(itx.value).toString();
    let tx6 = CryptoJS.SHA384(itx.value).toString();
    let tx7 = CryptoJS.SHA512(itx.value).toString();

    txt1.innerHTML = "AES: " + tx1;
    txt2.innerHTML = "TRIPLEDES: " + tx2;
    txt3.innerHTML = "SHA1: " + tx3;
    txt4.innerHTML = "SHA224: " + tx4;
    txt5.innerHTML = "SHA3: " + tx5;
    txt6.innerHTML = "SHA384: " + tx6;
    txt7.innerHTML = "SHA512: " + tx7;

    console.log("AES decrypt:", CryptoJS.AES.decrypt(tx1, sec.value).toString(CryptoJS.enc.Utf8));
    console.log("TRIPLEDES decrypt:", CryptoJS.TripleDES.decrypt(tx2, sec.value).toString(CryptoJS.enc.Utf8));
});

itx.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        b1.click(); // Simula un clic en el botón de encriptación
    }
});

let argonText = document.getElementsByClassName("argonText");
let argonTimes = document.getElementsByClassName("argonTimes");
let argonType = document.getElementsByClassName("argonType");
let argonSal = document.getElementsByClassName("argonSal");
let argonMem = document.getElementsByClassName("argonMem");
let argonParallelism = document.getElementsByClassName("argonParallelism");

const b2 = document.getElementsByClassName("b2")[0];
b2.addEventListener("click", (e) => {
    let argonTypev = "";
    if (argonType[0].value === "2i") {
        argonTypev = argon2.ArgonType.Argon2i;
    } else if (argonType[0].value === "2d") {
        argonTypev = argon2.ArgonType.Argon2d;
    } else {
        argonTypev = argon2.ArgonType.Argon2id;
    }

    argon2.hash({
        pass: argonText[0].value,
        salt: argonSal[0].value,
        time: argonTimes[0].value,
        mem: argonMem[0].value,
        parallelism: argonParallelism[0].value,
        type: argonTypev
    })
    .then(res => {
        txt8.innerHTML = "res.hash: " + res.hash + "<br />res.hashHex: " + res.hashHex + "<br />res.encoded: " + res.encoded;
    })
    .catch(err => {
        console.error(err.message);
        console.error(err.code);
    });
});

argonText[0].addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        b2.click(); // Simula un clic en el botón de Argon2 hashing
    }
});

const b3 = document.getElementsByClassName("b3")[0];
b3.addEventListener("click", (e) => {
    argon2.verify({
        pass: argonText[1].value,
        encoded: argonSal[1].value
    })
    .then(() => {
        txt9.innerHTML = "True";
    })
    .catch(err => {
        txt9.innerHTML = "False";
        console.error(err.message);
        console.error(err.code);
    });
});

argonText[1].addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        b3.click();
    }
});

