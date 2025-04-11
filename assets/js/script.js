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
		const resultContainer = document.createElement('div');  // Contenedor para el resultado final

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
				boton.onclick = () => verificarRespuesta(boton, opciones[index], pregunta.correctAnswer, botones);
			});
		}

		// Función para verificar la respuesta
		function verificarRespuesta(boton, opcionSeleccionada, respuestaCorrecta, botones) {
			// Añadir un borde distintivo a la opción seleccionada
			boton.style.border = '2px solid #000'; // Borde negro grueso para la opción seleccionada
			if (opcionSeleccionada === respuestaCorrecta) {
				score++;
				boton.style.backgroundColor = '#28a745'; // Verde para respuesta correcta

				// Marcar las otras opciones como incorrectas (en rojo)
				botones.forEach(b => {
					if (b !== boton) {
						b.style.backgroundColor = '#dc3545'; // Rojo para las otras opciones
					}
				});
			} else {
				boton.style.backgroundColor = '#dc3545'; // Rojo para respuesta incorrecta
				// Resaltar la opción correcta
				botones.forEach(b => {
					if (b.textContent === respuestaCorrecta) {
						b.style.backgroundColor = '#28a745'; // Verde para la respuesta correcta
					} else {
						b.style.backgroundColor = '#dc3545'; // Rojo para las otras respuestas
					}
				});
			}

			// Deshabilitar los botones después de la respuesta
			botones.forEach(b => b.disabled = true);

			// Actualizar el puntaje
			scoreDisplay.textContent = score;

			// Esperar 5 segundos y luego pasar a la siguiente pregunta o mostrar el final
			setTimeout(() => {
				currentQuestionIndex++;
				if (currentQuestionIndex < preguntas.length) {
					mostrarPregunta();
				} else {
					mostrarFinal();
				}

				// Resetear los estilos de los botones
				botones.forEach(b => {
					b.style.backgroundColor = '#007bff';  // Color original del botón
					b.style.border = '';
					b.disabled = false;  // Habilitar los botones de nuevo
				});
			}, 1300); // Espera 5 segundos antes de pasar a la siguiente pregunta
		}

		// Función para mostrar el resultado final sin alert
		function mostrarFinal() {
			// Ocultar el quiz
			quizContainer.style.display = 'none';

			// Crear un contenedor para el resultado final
			resultContainer.classList.add('result__container');
			resultContainer.innerHTML = `
        <h2>¡Juego terminado!</h2>
        <p>Tu puntaje final es: ${score}</p>
        <p>¡Gracias por jugar!</p>
      `;

			// Crear el botón de reiniciar
			restartButton.textContent = 'Volver a jugar';
			restartButton.classList.add('quiz__restart');
			restartButton.onclick = reiniciarJuego;

			// Mostrar el resultado y el botón de reiniciar
			resultContainer.appendChild(restartButton);
			document.body.appendChild(resultContainer);
		}

		// Función para reiniciar el juego
		function reiniciarJuego() {
			// Reiniciar variables
			currentQuestionIndex = 0;
			score = 0;
			scoreDisplay.textContent = score;

			// Ocultar el resultado final
			resultContainer.style.display = 'none';

			// Volver a mostrar el quiz
			quizContainer.style.display = 'block';

			// Mostrar la primera pregunta
			mostrarPregunta();
		}

		// Iniciar el juego con la primera pregunta
		mostrarPregunta();
	})
	.catch(error => console.error('Error al cargar las preguntas:', error));
