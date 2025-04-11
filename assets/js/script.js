fetch('data/questions.json')
  .then(response => response.json())
  .then(preguntas => {
    let currentQuestionIndex = 0; // Índice de la pregunta actual
    let score = 0; // Puntaje

    const quizContainer = document.getElementById('quiz__container');  // Contenedor del quiz
    const scoreDisplay = document.getElementById('score');  // Para mostrar el puntaje
    const questionDisplay = document.querySelector('.quiz__question');  // Para mostrar la pregunta
    const optionsDisplay = document.querySelector('.quiz__options');  // Para mostrar las opciones
    const restartButton = document.createElement('button');  // Crear el botón de reiniciar

    // Función para mostrar una pregunta
    function mostrarPregunta() {
      const pregunta = preguntas[currentQuestionIndex];
      const opciones = pregunta.options;

      // Mostrar la pregunta en el HTML
      questionDisplay.textContent = pregunta.question;

      // Asignar las opciones a los botones
      const botones = document.querySelectorAll('.quiz__option');
      
      botones.forEach((boton, index) => {
        boton.textContent = opciones[index] || '';  // Si no hay opción, dejar vacío
        boton.onclick = () => verificarRespuesta(opciones[index], pregunta.correctAnswer);
      });
    }

    // Función para verificar la respuesta
    function verificarRespuesta(opcionSeleccionada, respuestaCorrecta) {
      if (opcionSeleccionada === respuestaCorrecta) {
        score++;
        alert('¡Correcto!');
      } else {
        alert('Incorrecto.');
      }

      // Actualizar el puntaje
      scoreDisplay.textContent = score;

      // Avanzar a la siguiente pregunta
      currentQuestionIndex++;

      // Comprobar si hay más preguntas
      if (currentQuestionIndex < preguntas.length) {
        mostrarPregunta();
      } else {
        // Si ya no hay más preguntas, terminar el quiz
        mostrarFinal();
      }
    }

    // Función para mostrar el resultado final y el botón de reiniciar
    function mostrarFinal() {
      // Ocultar el quiz
      quizContainer.style.display = 'none';

      // Mostrar el puntaje final
      alert('¡Juego terminado! Tu puntaje final es: ' + score);

      // Crear el botón de reiniciar
      restartButton.textContent = 'Volver a jugar';
      restartButton.classList.add('quiz__restart');
      restartButton.onclick = reiniciarJuego;

      // Mostrar el botón de reiniciar
      document.body.appendChild(restartButton);
    }

    // Función para reiniciar el juego
    function reiniciarJuego() {
      // Reiniciar variables
      currentQuestionIndex = 0;
      score = 0;
      scoreDisplay.textContent = score;

      // Ocultar el botón de reiniciar
      restartButton.style.display = 'none';

      // Volver a mostrar el quiz
      quizContainer.style.display = 'block';

      // Mostrar la primera pregunta
      mostrarPregunta();
    }

    // Iniciar el juego con la primera pregunta
    mostrarPregunta();
  })
  .catch(error => console.error('Error al cargar las preguntas:', error));
