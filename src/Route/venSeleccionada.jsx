import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { EstadoBotonVenta } from "./EstadoBotonVenta";
import "./VenSeleccionada.css"; // Importamos la hoja de estilos

const VenSeleccionada = ({ MostrarVen, actualizarEstadoVenta, actualizarVenta, getCliente }) => {
  const [ventaEditada, setVentaEditada] = useState(MostrarVen || {});

  useEffect(() => {
    setVentaEditada(MostrarVen || {});
  }, [MostrarVen]);

  const cliente = MostrarVen ? getCliente(MostrarVen.IdCliente) : null;

  return (
    <Col className="venta-seleccionada-container">
      <div className="venta-seleccionada">
        <h2 className="titulo">Venta</h2>

        {MostrarVen ? (
          <>
            <h2 className="cliente-nombre">{cliente?.Nombre}</h2>

            <EstadoBotonVenta venta={MostrarVen} onCambiarEstado={actualizarEstadoVenta} />

            <div className="info-container">
              <p><strong>Tipo de trabajo:</strong> {MostrarVen?.TipoTrabajo}</p>
              <p><strong>Dirección:</strong> {cliente?.Direccion || "No disponible"}</p>
              <p><strong>Fecha de entrega:</strong> {MostrarVen?.FechaEntrega || "No especificada"}</p>
              <p><strong>Nombre de fantasía:</strong> {cliente?.NombreFantasia || "N/A"}</p>
              <p><strong>Rut:</strong> {cliente?.Rut || "No registrado"}</p>
              <p><strong>Correo electrónico:</strong> {cliente?.Mail || "No disponible"}</p>
              <p><strong>Teléfono:</strong> {cliente?.Telefono || "No registrado"}</p>
            </div>

            <div className="descripcion-container">
              <p><strong>Descripción:</strong> {MostrarVen?.Descripcion || "Sin descripción"}</p>
            </div>
          </>
        ) : (
          <div className="no-venta">
            No hay venta seleccionada
          </div>
        )}
      </div>
    </Col>
  );
};

export default VenSeleccionada;
