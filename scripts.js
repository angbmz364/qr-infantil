const $ = (id) => document.getElementById(id);

const resultBox = $("resultado");
const button = $("generateQR");

const getFormData = () => ({
  nino: $("nino").value,
  apoderado: $("apoderado").value,
  telefono: $("telefono").value,
  direccion: $("direccion").value,
  redes: $("redes").value,
  medicamentos: $("medicamentos").value,
  alergias: $("alergias").value,
  importante: $("importante").value,
});

const sendToSheets = async (data) => {
  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbyPoZ2kKurZVRfrlqa4tLuXWdFzbUEcFPJhysxJgEotUkcGdrRQieNY-E6Z4-vLfPyZ/exec",
    {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Error sending data to Google Sheets.");
  }
};

const generateProfileUrl = (data) => {
  const params = new URLSearchParams(data);

  return `https://angbmz364.github.io/qr-infantil/perfil.html?${params}`;
};

const generateQrUrl = (profileUrl) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(profileUrl)}`;

const showResult = (qrUrl) => {
  resultBox.innerHTML = `
    <h3>QR generado</h3>
    <img src="${qrUrl}" alt="Código QR">
  `;
};

button.addEventListener("click", async () => {
  if (button.disabled) return;

  button.disabled = true;

  try {
    const data = getFormData();

    await sendToSheets(data);

    const profileUrl = generateProfileUrl(data);
    const qrUrl = generateQrUrl(profileUrl);

    showResult(qrUrl);
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al generar el código QR.");
  } finally {
    button.disabled = false;
  }
});