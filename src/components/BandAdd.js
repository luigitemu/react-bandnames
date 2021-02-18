import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {

    const [nombre, setValor] = useState('');
    const { socket } = useContext(SocketContext);
    const onSubmit = (e) => {
        e.preventDefault();

        if (nombre.trim().length > 0) {
            // crearBanda(valor);
            socket.emit('nueva-banda', nombre);
            setValor('');
        }

    }
    const handleInputChange = (e) => {
        setValor(e.target.value);
    }
    return (
        <>
            <h3>Agregar Banda</h3>
            <form onSubmit={onSubmit} >
                <input
                    className="form-control"
                    placeholder="Nuevo nombre de banda"
                    value={nombre}
                    onChange={handleInputChange}
                    type="text"
                />
            </form>
        </>
    )
}
