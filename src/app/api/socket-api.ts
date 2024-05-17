import io, { Socket } from 'socket.io-client'

export class SocketApi {
	static socket: Socket;

	static createConnection() {
		this.socket = io(`http://localhost:5000`, {
			withCredentials: true,
		})

		this.socket.on('connect', () => {
      console.log('connected')
    })

		this.socket.on('disconnect', () => {
      console.log('disconnected')
    })
	}
}