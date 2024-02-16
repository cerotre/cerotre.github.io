const miedoListContainer = document.querySelector('.miedo-list');
const progressBar = document.querySelector('.progress-fill');
const siguienteBtn = document.getElementById('siguiente-btn');
const anteriorBtn = document.getElementById('anterior-btn');
const generarBtn = document.getElementById('generar-btn');
const resultadoList = document.querySelector('.resultado-list');
const twittearBtn = document.getElementById('twittear-btn'); // Agrega el botón de Twittear

const miedoData = [
    'Futuro', 'Ascensor', 'Cementerio', 'Serpiente', 'Payasos', 'Arañas', 'Oscuridad', 'Alturas', 'Pelis de terror', 'Fondo marino', 'Hospital', 'Insectos', 'Sapos', 'Agujas', 'Aviones', 'Sangre' // Agregar más miedos aquí
];

let currentIndex = 0;
let miedoScores = new Array(miedoData.length).fill({ miedo: '', score: 0 });

function crearMiedoItem(nombre) {
    const miedoItem = document.createElement('div');
    miedoItem.className = 'miedo-item';
    miedoItem.innerHTML = `
        <span>${nombre}</span>
        <input type="range" min="0" max="10" value="0" class="miedo-slider">
        <span class="miedo-value">0</span> <!-- Agrega un elemento span para mostrar el valor del miedo -->
    `;
    miedoListContainer.appendChild(miedoItem);

    // Agrega un evento input al slider para actualizar el número mientras se desliza
    const miedoSlider = miedoItem.querySelector('.miedo-slider');
    const miedoValue = miedoItem.querySelector('.miedo-value');

    miedoSlider.addEventListener('input', () => {
        miedoValue.textContent = miedoSlider.value;
    });
}

function avanzarMiedo() {
    const currentValue = parseInt(miedoListContainer.children[currentIndex].querySelector('.miedo-slider').value);
    miedoScores[currentIndex] = { miedo: miedoData[currentIndex], score: currentValue }; // Actualiza el resultado actual

    if (currentIndex < miedoData.length - 1) {
        currentIndex++;
        actualizarMiedo();
    } else {
        miedoScores[currentIndex].miedo = miedoData[currentIndex]; // Asigna el nombre del último miedo
        mostrarResultados();
    }
}

function retrocederMiedo() {
    if (currentIndex > 0) {
        currentIndex--;
        actualizarMiedo();
    }
}

function actualizarMiedo() {
    miedoListContainer.querySelectorAll('.miedo-item').forEach((item, index) => {
        item.style.display = index === currentIndex ? 'flex' : 'none';
    });
    progressBar.style.width = ((currentIndex + 1) / miedoData.length) * 100 + '%';

    siguienteBtn.disabled = currentIndex === miedoData.length - 1;
    generarBtn.style.display = currentIndex === miedoData.length - 1 ? 'block' : 'none';
    anteriorBtn.disabled = currentIndex === 0;
}

function mostrarResultados() {
    resultadoList.style.display = 'block';
    resultadoList.innerHTML = miedoScores.map(item => `<li>${item.miedo}: ${item.score}/10</li>`).join('');

    // Oculta los botones de siguiente y anterior
    siguienteBtn.style.display = 'none';
    anteriorBtn.style.display = 'none';

    // Muestra el botón de Volver a Empezar y Twittear
    const restartButton = document.getElementById('generar-btn');
    restartButton.style.display = 'block';
    twittearBtn.style.display = 'block';
}

// Generar elementos miedo-item desde el array miedoData
miedoData.forEach(miedo => {
    crearMiedoItem(miedo);
});

// Inicializar la primera pregunta
actualizarMiedo();

siguienteBtn.addEventListener('click', avanzarMiedo);
anteriorBtn.addEventListener('click', retrocederMiedo);

generarBtn.addEventListener('click', () => {
    avanzarMiedo(); // Actualiza el resultado antes de mostrarlo
    mostrarResultados();
    generarBtn.style.display = 'none';
});

// Agregar un evento al botón de Twittear
twittearBtn.addEventListener('click', () => {
    const textoTweet = 'Tabla de Miedos:\n\n' + miedoScores.map(item => `${item.miedo}: ${item.score}/10`).join('\n');
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textoTweet)}`;
    window.open(tweetURL, '_blank');
});

const reiniciarBtn = document.getElementById('reiniciar-btn'); // Agrega el botón de reinicio

// Agrega un evento click al botón de reinicio
reiniciarBtn.addEventListener('click', () => {
    // Oculta la lista de resultados
    resultadoList.style.display = 'none';

    // Muestra la barra de progreso con un ancho del 0%
    const progressFill = document.querySelector('.progress-fill');
    progressFill.style.width = '0%';

    // Muestra los botones de siguiente y anterior
    siguienteBtn.style.display = 'block';
    anteriorBtn.style.display = 'block';

    // Reinicia el índice de la pregunta
    currentIndex = 0;
    actualizarMiedo();

    // Oculta el botón de reinicio
    reiniciarBtn.style.display = 'none';

    // Vuelve a ocultar el botón de Twittear
    twittearBtn.style.display = 'none';

    progressBar.style.display = 'block';
    miedoListContainer.style.display = 'block'; 
    progressBar.style.display = 'block'; 
});


function mostrarResultados() {
    resultadoList.style.display = 'block';
    resultadoList.innerHTML = miedoScores.map(item => `<li>${item.miedo}: ${item.score}/10</li>`).join('');

    // Oculta los botones de siguiente y anterior
    siguienteBtn.style.display = 'none';
    anteriorBtn.style.display = 'none';

    // Muestra el botón de Volver a Empezar y Twittear
    generarBtn.style.display = 'none';
    twittearBtn.style.display = 'block';

    // Muestra el botón de reinicio
    reiniciarBtn.style.display = 'block';


    progressBar.style.display = 'none';
    miedoListContainer.style.display = 'none'; // Oculta la lista de miedos
    progressBar.style.display = 'none'; // Oculta la barra de progreso

}



siguienteBtn.classList.add('nav-btn-separacion'); // Agrega la clase de separación
anteriorBtn.classList.add('nav-btn-separacion'); // Agrega la clase de separación
generarBtn.style.display = 'none';
twittearBtn.classList.add('nav-btn-separacion'); // Agrega la clase de separación
reiniciarBtn.classList.add('nav-btn-separacion');
