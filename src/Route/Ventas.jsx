import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./Ventas.css";
import { Toaster, toast } from "react-hot-toast";
import { EstadoBotonVenta } from "./EstadoBotonVenta";
import VenSeleccionada from "./venSeleccionada";

export const Ventas = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [MostrarVen, setMostrarVen] = useState(null);
  const dispatch = useDispatch();
  const [SearchText, setSearchText] = useState("");
  const [Tamano, setTamano] = useState("1");
  const [Ventas, setVentas] = useState([]);
  const [sort, setsort] = useState(null);
  const [VentasTotales, setVentasTotales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let lastDay = "";
  const [ConfirmDelete, setConfirmDelete] = useState(false);
  const [loadingDelete, setloadingDelete] = useState(false);

  /*
    const UrlVentas = "/VentasEP";
    const UrlVenta = "/VentasEP/";
    const UrlDelete = "/VentasEP/";
    */
  const UrlVentas = "/VentasImprenta";

  const setVentaView = async (Venta) => {
    if (Venta._id != null) {
      setShowModal(true);
      setIsLoading(true);
      try {
        if (Venta._id === MostrarVen?._id) {
          setMostrarVen(null);
        } else {
          setMostrarVen(Venta);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const FetchVentas = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      const res = await fetch(UrlVentas, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      const sortedData = data.sort(
        (a, b) => Date.parse(b.FechaEntrega) + Date.parse(a.FechaEntrega)
      );
      setVentas(sortedData);
      setVentasTotales(sortedData);
    } catch (error) {
      console.log(error);
      toast.error("Error al cargar las ventas");
    }
  };

  const actualizarEstadoVenta = (ventaActualizada) => {
    setVentas((ventasAnteriores) =>
      ventasAnteriores.map((venta) =>
        venta._id === ventaActualizada._id ? ventaActualizada : venta
    )
    );
    setVentasTotales((ventasAnteriores) =>
      ventasAnteriores.map((venta) =>
        venta._id === ventaActualizada._id ? ventaActualizada : venta
    )
    );
  };

  const [AllClientes, setAllClientes] = useState(null);

  const FetchClientes = async () => {
    try {
      const res = await fetch("/ClientesImprenta");
      const data = await res.json();
      setAllClientes(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchVentas();
    FetchClientes();
  }, []);

  const MostrarDia = ({ Day }) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate() + 1).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      return `${day}/${month}`;
    };

    let Ok = false;
    if (lastDay !== Day) {
      Ok = true;
      lastDay = Day;
    }

    return (
      <>
        {Ok && (
          <div className="day-header">
            <h3>{formatDate(Day)}</h3>
          </div>
        )}
      </>
    );
  };

  const groupedVentas = Ventas.reduce((acc, venta) => {
    const dateKey = venta.FechaHoy.split("T")[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(venta);
    return acc;
  }, {});

  const FiltrarVentas = () => {
    if (SearchText.trim()) {
      const filtered = VentasTotales.filter((venta) =>
      AllClientes.find((cli) => cli._id === venta.IdCliente).Nombre.toLowerCase().includes(SearchText.toLowerCase())
      );
      setVentas(filtered);
    } else {
      setVentas(VentasTotales);
    }
  };
  const actualizarVenta=()=>{

  }

  const getVenEstado = (ven) => {
    if (ven.Pagado) {
        return 3;
      }
    if (ven.Terminada) {
      console.log("terminada");
      return 2;
    }

    if (ven.EnProceso) {
      console.log("enproceso");
      return 1;
    }
    console.log("sin empezar");
    return 0;
  };
  useEffect(() => {
    sortVentas();
  }, [sort]); // Se ejecuta automáticamente cuando cambia "sort"
  

  const sortVentas = () => {
    let sortedVentas = [...VentasTotales]; // Copia el array para evitar mutaciones
  
    if (!sort) {
        sortedVentas = sortedVentas.sort((a, b) => new Date(b.FechaEntrega) - new Date(a.FechaEntrega));
    } else if (sort === "SinTerminar") {
      sortedVentas = sortedVentas.filter((ven) => ven.Terminada === false && ven?.Pagado === false);
      sortedVentas = sortedVentas.sort((a, b) => new Date(b.FechaEntrega) + new Date(a.FechaEntrega));
    } else if (sort === "Creada") {
        sortedVentas= sortedVentas.sort((a, b) => new Date(b.FechaHoy) - new Date(a.FechaHoy));
    }
  
    setVentas(sortedVentas);
  };
  
  
  
  

  const FechaEntrega = () => {
    setsort("FechaEntrega")
  };
  const SinTerminar = () => {
    setsort("SinTerminar")  
  };


  const Creada = () => {
    setsort(null)
  };

  const getCliente = (idCli) => {
    if (AllClientes) {
      return AllClientes.find((cli) => cli._id === idCli);
    }
  };
  const getFecha = (fecha) => {
    const fechasplit = fecha.split("-");
    return fechasplit[2] + "/" + fechasplit[1];
  };

  useEffect(() => {
    FiltrarVentas();
    lastDay = "";
  }, [SearchText]);

  const handleClose = () => {
    setConfirmDelete(false);
    setShowModal(false);
    setIsLoading(false); // Restablece el estado de carga
  };

  const handleDelete = async () => {
    console.log(idVenta);
    if (idVenta != null) {
      setloadingDelete(true);
      const requestOptionsventa = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      try {
        const response = await fetch(UrlDelete + idVenta, requestOptionsventa);
        if (response.ok) {
          setloadingDelete(false);
          handleClose();
          FetchVentas();
          toast.success("venta eliminada");
        } else {
          toast.error("error al eliminar");
          console.error("Error al eliminar la venta", response.status);
          setloadingDelete(false);
        }
      } catch (error) {
        toast.error("error al eliminar", error);
        setloadingDelete(false);
        console.error("Error al realizar la solicitud", error);
      }
    }
  };

  return (
    <>
      <div className="container">
        <Row style={{ marginTop: "50px" }}>
          <h1 className="title">VENTAS</h1>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <div className="search-container">
              <Form.Control
                type="text"
                value={SearchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Buscar por cliente"
                className="search-input"
              />
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Button
                style={{ height: "50px", margin: "5px" }}
                onClick={() => SinTerminar()}
              >
                Sin Terminar
              </Button>
              <Button
                style={{ height: "50px", margin: "5px" }}
                onClick={() => FechaEntrega()}
              >
                Fecha Entrega
              </Button>
              <Button
                style={{ height: "50px", margin: "5px" }}
                onClick={() => Creada()}
              >
                Creada
              </Button>
            </div>
                  {Ventas.map((Ven) => (
                    <div
                      className={`Venta${getVenEstado(Ven)} shadow-sm p-3 mb-4 bg-white rounded`}
                      onClick={() => setVentaView(Ven)}
                      key={Ven.id}
                    >
                      <Row className="align-items-center">
                        <Col md={12}>
                          <div
                            className="d-flex justify-content-between align-items-center fw-bold"
                            style={{ fontSize: "26px" }}
                          >
                            <span>{getCliente(Ven.IdCliente)?.Nombre}</span>
                            <span style={{ marginLeft: "100px" }}>
                              {getFecha(Ven.FechaEntrega)}
                            </span>
                          </div>
                          <div>{Ven.TipoTrabajo}</div>
                        </Col>
                      </Row>
                    </div>
                  ))}
          </Col>
          <Col>
          <VenSeleccionada
            MostrarVen={MostrarVen}
            actualizarEstadoVenta={actualizarEstadoVenta}
            actualizarVenta={actualizarVenta}
            getCliente={getCliente}
          />
          </Col>
        </Row>

        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              zIndex: 9999,
            },
          }}
        />
      </div>
    </>
  );
};
