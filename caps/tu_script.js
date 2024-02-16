// Obtén los elementos del DOM
const items = document.querySelectorAll(".miedo-item");
const verificarBtn = document.getElementById("verificar-btn");
const resultado = document.getElementById("resultado");

// Agrega un controlador de eventos al botón de verificar
verificarBtn.addEventListener("click", () => {
    let correctas = 0;
    const respuestasIncorrectas = [];

    items.forEach(item => {
        const input = item.querySelector(".miedo-slider");
        const capital = input.getAttribute("data-capital").toLowerCase();
        const respuesta = input.value.toLowerCase();

        if (capital === respuesta) {
            correctas++;
            item.style.backgroundColor = "green";
        } else {
            item.style.backgroundColor = "red";
            respuestasIncorrectas.push({
                pais: capital.split(" - ")[0],
                respuestaCorrecta: capital.split(" - ")[1]
            });
        }
    });

    if (correctas === items.length) {
        resultado.textContent = "¡Todas las respuestas son correctas!";
    } else {
        let resultadoText = `Respuestas correctas: ${correctas} de ${items.length}.`;

        if (respuestasIncorrectas.length > 0) {
            resultadoText += " Respuestas incorrectas:";
            respuestasIncorrectas.forEach(respuesta => {
                resultadoText += `\n${respuesta.pais}: ${respuesta.respuestaCorrecta}`;
            });
        }

        resultado.textContent = resultadoText;
    }
});
