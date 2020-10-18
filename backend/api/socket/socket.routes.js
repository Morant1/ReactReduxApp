
module.exports = connectSockets

const msgs = {};

function connectSockets(io) {
    io.on('connection', socket => {

        socket.emit('chat history', msgs)

        socket.on('chat topic', topic => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })
        socket.on('chat newMsg', msg => {
            if (msgs[socket.myTopic]) msgs[socket.myTopic].push(msg)
            else msgs[socket.myTopic] = [msg]
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('typing Msg', msg => {
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket.myTopic).emit('typing Msg', msg)
        })
    })
}