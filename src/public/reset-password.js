///const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

async function updatePassword() {
    
    const password = document.getElementById('_newPassword').value;
    const token = document.getElementById('_token').value;
    // const csrfToken = document.getElementById('_csrf').value;
    
    await fetch('/update-password', {
        method: 'POST',
        headers: {
            'x-csrf-token': csrfToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
    });

}

document.getElementById('updatePasswordBtn').addEventListener('click', (e) => {
    e.preventDefault(); // Evita acciones predeterminadas
    console.log('Botón clickeado');
    updatePassword();
});
