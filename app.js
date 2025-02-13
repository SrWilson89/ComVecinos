document.addEventListener('DOMContentLoaded', () => {
    const crearComunidadForm = document.getElementById('crear-comunidad-form');
    const añadirGastoForm = document.getElementById('añadir-gasto-form');
    const comunidadSelect = document.getElementById('comunidad-select');
    const comunidadesList = document.getElementById('comunidades-list');
    const gastosList = document.getElementById('gastos-list');

    let comunidades = JSON.parse(localStorage.getItem('comunidades')) || [];
    let gastos = JSON.parse(localStorage.getItem('gastos')) || [];

    // Mostrar comunidades y gastos al cargar la página
    renderComunidades();
    renderGastos();

    // Crear una nueva comunidad
    crearComunidadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre-comunidad').value.trim();
        if (nombre) {
            comunidades.push({ id: Date.now(), nombre });
            localStorage.setItem('comunidades', JSON.stringify(comunidades));
            renderComunidades();
            crearComunidadForm.reset();
            añadirGastoForm.style.display = 'block';
        }
    });

    // Añadir un nuevo gasto
    añadirGastoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const comunidadId = parseInt(comunidadSelect.value);
        const concepto = document.getElementById('concepto-gasto').value.trim();
        const monto = parseFloat(document.getElementById('monto-gasto').value);

        if (comunidadId && concepto && monto) {
            gastos.push({ id: Date.now(), comunidadId, concepto, monto });
            localStorage.setItem('gastos', JSON.stringify(gastos));
            renderGastos();
            añadirGastoForm.reset();
        }
    });

    // Renderizar la lista de comunidades
    function renderComunidades() {
        comunidadesList.innerHTML = comunidades.map(comunidad => `
            <div class="comunidad-item">
                <h3>${comunidad.nombre}</h3>
                <p>ID: ${comunidad.id}</p>
            </div>
        `).join('');

        // Actualizar el select de comunidades
        comunidadSelect.innerHTML = '<option value="">Selecciona una comunidad</option>' +
            comunidades.map(comunidad => `
                <option value="${comunidad.id}">${comunidad.nombre}</option>
            `).join('');
    }

    // Renderizar la lista de gastos
    function renderGastos() {
        gastosList.innerHTML = gastos.map(gasto => {
            const comunidad = comunidades.find(c => c.id === gasto.comunidadId);
            return `
                <div class="gasto-item">
                    <p><strong>Comunidad:</strong> ${comunidad ? comunidad.nombre : 'Desconocida'}</p>
                    <p><strong>Concepto:</strong> ${gasto.concepto}</p>
                    <p><strong>Monto:</strong> $${gasto.monto.toFixed(2)}</p>
                </div>
            `;
        }).join('');
    }
});