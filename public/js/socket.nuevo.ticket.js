var socket = io();

let label = $("#lblNuevoTicket");

socket.on('connect', function() {
    console.log('Servidor Conectado');
});

// On son para escuchar
socket.on('disconnect', function() {
    label.text('Cargando...');
});

/// Estado actual
socket.on('ticketActual', (ticket) => {
    label.text(ticket.actual);
});


$("button").on('click', function() {

    socket.emit('siguienteTicket', null, (ticket) => {
        label.text(ticket);
    });

})