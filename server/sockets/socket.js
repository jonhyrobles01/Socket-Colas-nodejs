const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.emit('ticketActual', {
        actual: ticketControl.ticketActual(),
        ultimos4: ticketControl.Ultimos4()
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {
        callback(ticketControl.siguienteTicket());
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: { message: 'El escritorio es necesario' }
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.Ultimos4()
        });
    });


});