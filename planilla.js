function Alumno(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.notasTrimestrales = [];
  }
  
  function ingresarNotasConConfirmacion(alumno, alumnoIndex) {
    for (let i = 0; i < 3; i++) {
      const nota = parseFloat(prompt(`Ingrese la nota del trimestre ${i + 1} para ${alumno.nombre} ${alumno.apellido}:`));
      if (!isNaN(nota) && isFinite(nota)) {
        alumno.notasTrimestrales.push(nota);
      } else {
        alert("Por favor, ingrese una nota numérica válida.");
        i--; // Reintentar la entrada
      }
    }
  
    const datosIngresados = `Datos registrados para ${alumno.nombre} ${alumno.apellido}:\nNotas Trimestrales: ${alumno.notasTrimestrales.join(", ")}`;
    const confirmacion = confirm(`${datosIngresados}\n¿Los datos son correctos?`);
    if (!confirmacion) {
      alumno.notasTrimestrales = [];
      alert("Por favor, ingrese nuevamente las notas.");
      ingresarNotasConConfirmacion(alumno, alumnoIndex);
    } else {
      // Guardar los datos del alumno en el Local Storage
      const alumnosGuardados = JSON.parse(localStorage.getItem("alumnos")) || [];
      alumnosGuardados[alumnoIndex] = alumno;
      localStorage.setItem("alumnos", JSON.stringify(alumnosGuardados));
    }
  }
  
  function calcularPromedioTrimestral(notas) {
    let suma = 0;
    for (let i = 0; i < notas.length; i++) {
      suma += notas[i];
    }
    return suma / notas.length;
  }
  
  function registrarAlumnos() {
    const numAlumnosInput = document.getElementById("numAlumnos");
    const numAlumnos = parseInt(numAlumnosInput.value);
  
    const alumnosContainer = document.getElementById("alumnosContainer");
    alumnosContainer.innerHTML = ""; // Limpiar contenido anterior
  
    const alumnosGuardados = JSON.parse(localStorage.getItem("alumnos")) || [];
  
    for (let i = 0; i < numAlumnos; i++) {
      const nombre = prompt(`Ingrese el nombre del alumno ${i + 1}:`);
      const apellido = prompt(`Ingrese el apellido del alumno ${i + 1}:`);
      const alumno = new Alumno(nombre, apellido);
      ingresarNotasConConfirmacion(alumno, i);
  
      alumnosGuardados.push(alumno);
  
      const alumnoInfo = document.createElement("div");
      const promedioTrimestral = calcularPromedioTrimestral(alumno.notasTrimestrales);
      alumnoInfo.innerHTML = `
        <h2>Alumno ${i + 1}</h2>
        <p>Nombre: ${alumno.nombre}</p>
        <p>Apellido: ${alumno.apellido}</p>
        <p>Notas Trimestrales: ${alumno.notasTrimestrales.join(", ")}</p>
        <p>Promedio Trimestral: ${promedioTrimestral.toFixed(2)}</p>
      `;
  
      alumnosContainer.appendChild(alumnoInfo);
    }
  
    // Guardar los datos de todos los alumnos en el Local Storage
    localStorage.setItem("alumnos", JSON.stringify(alumnosGuardados));
  }
  
  // Llamar a registrarAlumnos() al cargar la página para mostrar los alumnos previamente registrados
  window.onload = registrarAlumnos;