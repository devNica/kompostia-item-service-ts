
async function accountRecovery() {

    const response = await fetch('/clinik/api/v1/auth/account-recovery', {
        method: 'POST',
        headers: {
            'x-csrf-token': document.getElementById('_csrf').value,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: document.getElementById("_token").value,
            code: document.getElementById('_emailCode').value + document.getElementById('_phoneCode').value
        }),
    })

    if (response.ok) {
        // Si el servidor responde con redirección, sigue la URL
        const location = response.headers.get('Location');
        if (location) {
            window.location.href = location;
        } else {
            // Si no hay redirección, muestra un mensaje o redirige manualmente
            alert('Recuperacion de cuenta exitoso. Redirigiendo...');
            window.location.href = '/clinik/api/v1/auth/account-recovery-success';
        }
    } else {
        // Manejo de errores
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'No se pudo recuperar el acceso a la cuenta'}`);
    }

}

document.getElementById('accountRecoveryBtn').addEventListener('click', function (e) {
    e.preventDefault() // Evita acciones predeterminadas
    accountRecovery()
})