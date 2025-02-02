// Variables
let token = '';
let operaciones = [];

// Referencias de elementos
const loginForm = document.getElementById('login-form');
const operationsSection = document.getElementById('operations-section');
const chartSection = document.getElementById('chart-section');
const balanceSection = document.getElementById('balance-section');
const balanceText = document.getElementById('balance');
const balanceChart = document.getElementById('balanceChart');

// Función para simular el login (sin backend real)
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
        token = 'mi_token_simulado'; // Simulamos un token
        document.getElementById('login-section').classList.add('hidden');
        operationsSection.classList.remove('hidden');
        chartSection.classList.remove('hidden');
        balanceSection.classList.remove('hidden');
    } else {
        alert('Credenciales incorrectas');
    }
});

// Función para registrar operaciones contables
document.getElementById('operations-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const descripcion = document.getElementById('descripcion').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const tipo = document.getElementById('tipo').value;

    // Guardar operación (en este ejemplo solo la almacenamos en el frontend)
    operaciones.push({ descripcion, monto, tipo });

    // Actualizar el balance
    actualizarBalance();

    // Limpiar formulario
    document.getElementById('operations-form').reset();
});

// Función para actualizar el balance
function actualizarBalance() {
    let saldoIngreso = 0;
    let saldoGasto = 0;

    operaciones.forEach(operacion => {
        if (operacion.tipo === 'ingreso') {
            saldoIngreso += operacion.monto;
        } else if (operacion.tipo === 'gasto') {
            saldoGasto += operacion.monto;
        }
    });

    const saldoTotal = saldoIngreso - saldoGasto;
    balanceText.innerText = `Saldo total: $${saldoTotal.toFixed(2)}`;

    // Actualizar gráfico
    actualizarGrafico(saldoIngreso, saldoGasto);
}

// Función para actualizar el gráfico
function actualizarGrafico(ingresos, gastos) {
    new Chart(balanceChart, {
        type: 'bar',
        data: {
            labels: ['Ingresos', 'Gastos'],
            datasets: [{
                label: 'Balance',
                data: [ingresos, gastos],
                backgroundColor: ['#4CAF50', '#F44336'],
                borderColor: ['#388E3C', '#D32F2F'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}