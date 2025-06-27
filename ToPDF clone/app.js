let imageFile = null;

document.getElementById("drop-area").addEventListener("click", () => {
  document.getElementById("fileElem").click();
});

document.getElementById("fileElem").addEventListener("change", (e) => {
  handleImage(e.target.files[0]);
});


dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("hover");
  const file = e.dataTransfer.files[0];
  handleImage(file);
});


dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("hover");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("hover");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("hover");
  imageFile = e.dataTransfer.files[0];
});

async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const text = document.getElementById("textInput").value;

  doc.text(text, 10, 10);

  if (imageFile) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const width = 180;
        const height = (img.height / img.width) * width;
        doc.addImage(img, 'JPEG', 10, 30, width, height);
        doc.save("output.pdf");
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(imageFile);
  } else {
    doc.save("output.pdf");
  }
}
function handleImage(file) {
  if (file && file.type.startsWith("image/")) {
    imageFile = file;

    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById("imagePreview");
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}
