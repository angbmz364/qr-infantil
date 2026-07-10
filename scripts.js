const $$ = (s) => document.getElementById(s); 
const resultBox = $$("resultado");

let buttonState = false;

const button = $$("generateQR");

const toggleButtonState = () => {
  buttonState = !buttonState
}

const showResult = (qrURL) => {
  resultBox.innerHTML = `
  <h3>QR generado</h3>
  <img src="${qrURL}"> 
  `
  
  toggleButtonState();
}

button.addEventListener("click", async () => {
  let nino = $$("nino").value;
  let apoderado = $$("apoderado").value;
  let telefono = $$("telefono").value;
  let direccion = $$("direccion").value;
  let redes = $$("redes").value;
  let medicamentos = $$("medicamentos").value;
  let alergias = $$("alergias").value;
  let importante = $$("importante").value;
  
  if (buttonState) return;
  toggleButtonState();

  fetch(
    "https://script.google.com/macros/s/AKfycbyPoZ2kKurZVRfrlqa4tLuXWdFzbUEcFPJhysxJgEotUkcGdrRQieNY-E6Z4-vLfPyZ/exec",
    {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        nino: nino,
        apoderado: apoderado,
        telefono: telefono,
        direccion: direccion,
        redes: redes,
        medicamentos: medicamentos,
        alergias: alergias,
        importante: importante,
      }),
    },
  ).catch((error) => {
    console.log("Error Google Sheets:", error);
    toggleButtonState();
  });

  let enlace =
    "https://angbmz364.github.io/qr-infantil/perfil.html?" +
    "nino=" +
    encodeURIComponent(nino) +
    "&apoderado=" +
    encodeURIComponent(apoderado) +
    "&telefono=" +
    encodeURIComponent(telefono) +
    "&direccion=" +
    encodeURIComponent(direccion) +
    "&redes=" +
    encodeURIComponent(redes) +
    "&medicamentos=" +
    encodeURIComponent(medicamentos) +
    "&alergias=" +
    encodeURIComponent(alergias) +
    "&importante=" +
    encodeURIComponent(importante);

  let qrURL =
    "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
    encodeURIComponent(enlace);
  
  showResult(qrURL);
});