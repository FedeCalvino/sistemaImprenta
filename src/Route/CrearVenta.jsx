import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { setClienteFeature } from "../Features/ClienteReducer";
import { selectCliente } from "../Features/ClienteReducer";
import Modal from "@mui/material/Modal";
import { Col, FloatingLabel, Row } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const CrearVenta = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const ClienteData = useSelector(selectCliente);
  console.log(ClienteData);
  //CrearCliente
  const [NombreCliN, setCliNomN] = useState(ClienteData.Nombre);
  const [MailCli, setMailCli] = useState(ClienteData.Mail);
  const [NombreFantasia, setNombreFantasia] = useState(ClienteData.Mail);
  const [TelefonoCliN, setCliTelN] = useState(ClienteData.NumeroTelefono);
  const [RutCliN, setCliRutN] = useState(ClienteData.rut);
  const [DireccCliN, setCliDireccN] = useState(ClienteData.direccion);
  const [KeyTab, setKeyTab] = useState("Crear");
  const [loadingSearch, setloadingSearch] = useState(false);
  const [loading, setloading] = useState(false);
  const [NombreVacio, setNombreVacio] = useState(false);
  //SeleccCliente
  const [Tipo, setTipo] = useState("Cliente");
  const [TiposClientes, setTiposClientes] = useState([]);
  const SearchText = NombreCliN;
  const handleClose = () => setShowModal(false);
  const [ClienteSeleccted, setClienteSeleccted] = useState("");
  const [TipodeTrabajo, setTipodeTrabajo] = useState("");
  const [FechaEntrega, setFechaEntrega] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Precio, setPrecio] = useState("");
  const [ClienteId, setClienteId] = useState("0");
  useEffect(() => {
    FetchClientesLike();
  }, [SearchText]);

  const [Clientes, setClientes] = useState([]);

  const [AllClientes, setAllClientes] = useState(null);

  const FetchClientesLike = async () => {
    try {
      console.log(AllClientes);
      if (SearchText.trim() !== "") {
        const data = AllClientes.filter((cli) =>
          cli.Nombre.toLowerCase().includes(SearchText.toLowerCase())
        );
        setClientes(data);
        console.log(data);
      } else {
        setClientes([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const FetchClientes = async () => {
    try {
      setloadingSearch(true);
      const res = await fetch("/ClientesImprenta");
      const data = await res.json();
      setAllClientes(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchClientes();
  }, []);

  const Deseleccionar = ()=>{
    setCliDireccN("");
    setCliNomN("")
    setClienteSeleccted(false);
    setCliRutN("");
    setCliTelN("");
    setNombreFantasia("");
    setClienteId("");
  }

  const CrearVenta = async () => {
    setloading(true)
    const nuevaOrden = {
      Nombre: NombreCliN,
      Telefono: TelefonoCliN,
      Rut: RutCliN,
      Direccion: DireccCliN,
      Mail: MailCli,
      NombreFantasia: NombreFantasia,
      TipoTrabajo: TipodeTrabajo,
      FechaEntrega: FechaEntrega,
      Descripcion: Descripcion,
      Precio: Precio,
      ClienteId: ClienteId,
    };
    console.log(nuevaOrden);

    console.log("Orden a guardar:", nuevaOrden);

    try {
      const response = await fetch(`/SaveImprenta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaOrden),
      });

      if (!response.ok) {
        toast.error("error al crear")
        throw new Error("Error al guardar la orden");
      }

      const result = await response.json();
      console.log("Orden guardada con éxito:", result);
      toast.success("creada")
      navigate("/Ventas");
    } catch (error) {
      console.error("Error al guardar la orden:", error.message);
    } finally {
        setloading(false)
    }
  };
  function GuardarCliente() {
    if (NombreCliN.trim() === "") {
      setNombreVacio(true);
    } else {
      const NewClienteData = {
        Nombre: NombreCliN,
        direccion: DireccCliN,
        NumeroTelefono: TelefonoCliN,
        rut: RutCliN,
        Tipo: Tipo,
        Mail: MailCli,
        set: true,
      };
      console.log("NewClienteData", NewClienteData);
      dispatch(setClienteFeature(NewClienteData));
    }
  }

  const handleSearchTextChange = (nombre) => {
    console.log(nombre);
    setCliNomN(nombre);
    console.log(SearchText);
  };

  const ConfirmSelecc = () => {
    dispatch(setClienteFeature(Clienteselecc));
    setShowModal(false);
  };

  const SelecctCliFromList = (Cli, event) => {
    setClienteSeleccted(true);
    if (event) {
      event.preventDefault();
    }
    console.log(Cli);
    setCliDireccN(Cli.Direccion);
    setCliNomN(Cli.Nombre)
    setCliRutN(Cli.Rut);
    setCliTelN(Cli.Telefono);
    setNombreFantasia(Cli.NombreFantasia);
    setClienteId(Cli._id);
  };

  return (
    <>
      <h3 style={{ marginTop: "90px" }} className="text-center mb-3">
        Crear Cliente
      </h3>
      <Container
        style={{ display: "flex", justifyContent: "center", gap: "20px" }}
      >
        <Form>
          <Row>
            <Col md={3}>
              <Form.Group controlId="Nombre" className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={NombreCliN}
                  onChange={(e) => handleSearchTextChange(e.target.value)}
                  isInvalid={NombreVacio}
                  disabled={ClienteSeleccted}
                  autoComplete="off"
                />
                <Form.Control.Feedback type="invalid">
                  El nombre no puede estar vacío
                </Form.Control.Feedback>
              </Form.Group>
              {!ClienteSeleccted ? 
              
                <ListGroup
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  {Clientes != null &&
                    Clientes.map((Cli) => (
                      <ListGroup.Item
                        key={Cli.id}
                        action
                        value={Cli.id}
                        style={{
                          padding: "10px 15px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          textAlign: "center",
                        }}
                        onClick={(event) => SelecctCliFromList(Cli, event)}
                      >
                        {Cli.Nombre}
                      </ListGroup.Item>
                    ))}
                </ListGroup>
                :
                <Button
                style={{ height: "50px"}}
                onClick={Deseleccionar}
              >
                Deseleccionar
              </Button>
              }
            </Col>
            <Col md={9}>
              <Row>
                <Col>
                  <Form.Group controlId="Telefono" className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="number"
                      value={TelefonoCliN}
                      onChange={(e) => setCliTelN(e.target.value)}
                      placeholder="Teléfono"
                      autoComplete="off"
                      disabled={ClienteSeleccted}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="Rut" className="mb-3">
                    <Form.Label>RUT</Form.Label>
                    <Form.Control
                      type="number"
                      value={RutCliN}
                      onChange={(e) => setCliRutN(e.target.value)}
                      placeholder="RUT"
                      autoComplete="off"
                      disabled={ClienteSeleccted}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="Direccion" className="mb-3">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                      type="text"
                      value={DireccCliN}
                      onChange={(e) => setCliDireccN(e.target.value)}
                      placeholder="Dirección"
                      autoComplete="off"
                      disabled={ClienteSeleccted}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="Mail" className="mb-3">
                    <Form.Label>Mail</Form.Label>
                    <Form.Control
                      type="text"
                      value={MailCli}
                      onChange={(e) => setMailCli(e.target.value)}
                      placeholder="Mail"
                      autoComplete="off"
                      disabled={ClienteSeleccted}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="Mail" className="mb-3">
                    <Form.Label>Nombre fantasia</Form.Label>
                    <Form.Control
                      type="text"
                      value={NombreFantasia}
                      onChange={(e) => setNombreFantasia(e.target.value)}
                      placeholder=""
                      autoComplete="off"
                      disabled={ClienteSeleccted}
                    />
                  </Form.Group>
                </Col>
                <Row style={{ marginTop: "10px" }}>
                  <Col>
                    <Form.Group controlId="Telefono" className="mb-3">
                      <Form.Label>Tipo de trabajo</Form.Label>
                      <Form.Control
                        type="text"
                        value={TipodeTrabajo}
                        onChange={(e) => setTipodeTrabajo(e.target.value)}
                        placeholder=""
                        autoComplete="off"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Label>Fecha Entrega</Form.Label>
                    <Form.Control
                      type="date"
                      value={FechaEntrega}
                      style={{
                        marginLeft: "10px",
                        textAlign: "center",
                        borderRadius: "10px",
                        color: "black",
                      }}
                      onChange={(e) => setFechaEntrega(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Group controlId="Rut" className="mb-3">
                      <Form.Label>Precio</Form.Label>
                      <Form.Control
                        type="number"
                        value={Precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        placeholder="Precio"
                        autoComplete="off"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                  <Col>
                    <FloatingLabel
                      controlId="floatingTextarea2"
                      label="Descripcion"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{
                          height: "200px",
                          border: "1px solid black",
                          borderRadius: "5px",
                        }}
                        value={Descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    { !loading &&
                    <Button
                      style={{ height: "50px", marginTop: "100px" }}
                      onClick={CrearVenta}
                    >
                      Crear Venta
                    </Button>
                    }
                  </Col>
                </Row>
              </Row>
            </Col>
          </Row>
        </Form>
      </Container>
      <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              zIndex: 9999,
            },
          }}
        />
    </>
  );
};
