import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandList = () => {


    const { socket } = useContext(SocketContext);
    const [bands, setBands] = useState([]);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setBands(bands);
        })
        return () => socket.off('current-bands');
    }, [socket]);



    const cambioNombre = (event, id) => {

        const nuevoNombre = event.target.value;
        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = nuevoNombre
            }
            return band;
        }));
    }

    const onPerdioFoco = (id, nombre) => {
        // cambiarNombre(id, nombre);
        socket.emit('cambiar-nombre-banda', { id, nombre });
    }

    const borrarBanda = (id) => {
        socket.emit('eliminar-banda', id);
    }

    const votar = (id) => {
        socket.emit('votar-banda', id);
    }


    const crearRows = () => {
        return (
            bands.map(band => (
                <tr key={band.id}>
                    <td>
                        <button
                            onClick={() => votar(band.id)}
                            className="btn btn-primary"
                        > +1 </button>
                    </td>
                    <td>
                        <input
                            className="form-control"
                            value={band.name}
                            onChange={(event) => cambioNombre(event, band.id)}
                            onBlur={() => onPerdioFoco(band.id, band.name)}
                        />
                    </td>
                    <td> <h3> {band.votes} </h3> </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => borrarBanda(band.id)}
                        >
                            Borrar
                        </button>
                    </td>
                </tr>
            ))
        );
    }

    return (
        <>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos actuales</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {crearRows()}
                </tbody>
            </table>
        </>
    )
}
