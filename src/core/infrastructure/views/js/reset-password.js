// const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

async function updatePassword() {

    const response = await fetch('/clinik/api/v1/auth/reset-password', {
        method: 'POST',
        headers: {
            'x-csrf-token': document.getElementById('_csrf').value,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: document.getElementById("_token").value,
            newPassword: document.getElementById('_newPassword').value
        }),
    })

    if (response.ok) {
        // Si el servidor responde con redirección, sigue la URL
        const location = response.headers.get('Location');
        if (location) {
            window.location.href = location;
        } else {
            // Si no hay redirección, muestra un mensaje o redirige manualmente
            alert('Contraseña actualizada exitosamente. Redirigiendo...');
            window.location.href = '/clinik/api/v1/auth/reset-password-success';
        }
    } else {
        // Manejo de errores
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'No se pudo actualizar la contraseña'}`);
    }

}

document.getElementById('updatePasswordBtn').addEventListener('click', function (e) {
    e.preventDefault() // Evita acciones predeterminadas
    updatePassword()
})