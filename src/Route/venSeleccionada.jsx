import { useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { EstadoBotonVenta } from "./EstadoBotonVenta";

const VenSeleccionada = ({ MostrarVen, actualizarEstadoVenta, actualizarVenta, getCliente }) => {

  const [ventaEditada, setVentaEditada] = useState(MostrarVen || {});
  const cliente = getCliente(MostrarVen?.IdCliente) || {};

  const handleChange = (e) => {
    setVentaEditada({
      ...ventaEditada,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardar = () => {
    actualizarVenta(ventaEditada);
  };

  return (
    <Col>
            <div className="venta-seleccionada">
              <h2>Venta</h2>

              {MostrarVen ? (
                <>
                <h2 style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center"}}>{getCliente(MostrarVen.IdCliente).Nombre}</h2>
                  <EstadoBotonVenta
                    venta={MostrarVen}
                    onCambiarEstado={actualizarEstadoVenta}
                  />
                  <div
                    style={{
                      padding: "20px",
                      backgroundColor: "#f4f4f9",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      marginBottom: "20px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.1rem",
                        margin: "8px 0",
                        color: "#333",
                      }}
                    >
                      <strong>Tipo de trabajo:</strong> {MostrarVen.TipoTrabajo}
                    </p>
                    {(() => {
                      const cliente = getCliente(MostrarVen.IdCliente);
                      return (
                        <>
                          <p
                            style={{
                              fontSize: "1.1rem",
                              margin: "8px 0",
                              color: "#333",
                            }}
                          >
                            <strong>Dirección:</strong> {cliente?.Direccion}
                          </p>
                          <p
                            style={{
                              fontSize: "1.1rem",
                              margin: "8px 0",
                              color: "#333",
                            }}
                          >
                            <strong>Fecha de entrega:</strong>{" "}
                            {MostrarVen.FechaEntrega}
                          </p>
                          <p
                            style={{
                              fontSize: "1.1rem",
                              margin: "8px 0",
                              color: "#333",
                            }}
                          >
                            <strong>Nombre de fantasía:</strong>{" "}
                            {cliente?.NombreFantasia}
                          </p>
                          <p
                            style={{
                              fontSize: "1.1rem",
                              margin: "8px 0",
                              color: "#333",
                            }}
                          >
                            <strong>Rut:</strong> {cliente?.Rut}
                          </p>
                          <p
                            style={{
                              fontSize: "1.1rem",
                              margin: "8px 0",
                              color: "#333",
                            }}
                          >
                            <strong>Correo electrónico:</strong> {cliente?.Mail}
                          </p>
                          <p
                            style={{
                              fontSize: "1.1rem",
                              margin: "8px 0",
                              color: "#333",
                            }}
                          >
                            <strong>Teléfono:</strong> {cliente?.Telefono}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      padding: "20px",
                      backgroundColor: "#e8f4f8",
                      border: "1px solid #d1d1d1",
                      borderRadius: "8px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                      marginLeft: "20px",
                      maxWidth: "500px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.1rem",
                        color: "#333",
                        margin: "10px 0",
                      }}
                    >
                      <strong>Descripción:</strong> {MostrarVen.Descripcion}
                    </p>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    padding: "20px",
                    backgroundColor: "#fff0f0",
                    color: "#e74c3c",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                  }}
                >
                  No hay venta seleccionada
                </div>
              )}
            </div>
          </Col>
  );
};

export default VenSeleccionada;
