import React, { useEffect, useState } from "react";
import { ChevronDown, CheckCircle, Clock, Circle,DollarSign } from "lucide-react";
import { toast } from "react-hot-toast";
import './EstadoBoton.css';
export const EstadoBotonVenta = ({ venta, onCambiarEstado }) => {
  const estados = [
    {
      nombre: "Sin Empezar",
      key: "SinEmpezar",
      icono: <Circle className="text-red-500" />,
      colorFondo: "bg-gray-100",
      colorBorde: "border-gray-300",
      api: "SinEmpezar",
    },
    {
      nombre: "En Proceso",
      key: "EnProceso",
      icono: <Clock className="text-blue-500" />,
      colorFondo: "bg-blue-100",
      colorBorde: "border-blue-300",
      api: "EnProceso",
    },
    {
      nombre: "Terminada",
      key: "Terminada",
      icono: <CheckCircle className="text-green-500" />,
      colorFondo: "bg-green-100",
      colorBorde: "border-green-300",
      api: "Terminada",
    },{
        nombre: "Pagado",
        key: "Pagado",
        icono: <DollarSign className="text-green-300" />,  // Ícono de dinero
        colorFondo: "bg-green-100",
        colorBorde: "border-green-300",
        api: "Pagado",
    }
  ];

  const getEstadoActual = () => {
    if (venta.Pagado){
        console.log("enproceso")
        return 3;
     } 
    if (venta.Terminada){
        console.log("terminada")
        return 2;
     } 
     
    if (venta.EnProceso){
        console.log("enproceso")
        return 1;
     } 
        console.log("sin empezar")
        return 0;
  };

  const [estadoActual, setEstadoActual] = useState(getEstadoActual());
  const [expandido, setExpandido] = useState(false);

  const cambiarEstado = async (indice) => {

    const estado = estados[indice];

    try {
        console.log(`http://localhost:2985/${estado.api}`)
      const response = await fetch(`/estado/${estado.api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idVenta: venta._id }),
      });

      if (response.ok) {
        setEstadoActual(indice);
        setExpandido(false);

        if(estado.key==="Terminada"){
            venta.Terminada=true
            venta.EnProceso=false
            venta.SinEmpezar=false
            venta.Pagado=false
            onCambiarEstado(venta);
        }
        if(estado.key==="EnProceso"){
            venta.Terminada=false
            venta.EnProceso=true
            venta.SinEmpezar=false
            venta.Pagado=false
            onCambiarEstado(venta);
        }
        if(estado.key==="SinEmpezar"){
            venta.Terminada=false
            venta.EnProceso=false
            venta.SinEmpezar=true
            venta.Pagado=false
            onCambiarEstado(venta);
        }
        if(estado.key==="Pagado"){
            venta.Terminada=false
            venta.EnProceso=false
            venta.SinEmpezar=false
            venta.Pagado=true
            onCambiarEstado(venta);
        }

        toast.success(`Venta cambiada a ${estado.nombre}`);
      } else {
        toast.error("Error al actualizar el estado de la venta");
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      toast.error("Error de conexión");
    }
  };
  useEffect(() => {
    setEstadoActual(getEstadoActual());
}, [venta]);


  return (
    <div className="estado-boton-container">
      <div
        className={`estado-boton-header ${estados[estadoActual].colorFondo} ${estados[estadoActual].colorBorde} ${expandido ? "expandido" : ""}`}
        onClick={() => setExpandido(!expandido)}
      >
        <div className="estado-boton-icono-nombre">
          {estados[estadoActual].icono}
          <span>{estados[estadoActual].nombre}</span>
        </div>
        <ChevronDown
          className={`estado-boton-chevron ${expandido ? "rotate-180" : ""}`}
        />
      </div>

      {expandido && (
        <div className="estado-boton-opciones">
          {estados
            .filter((_, index) => index !== estadoActual)
            .map((estado, index) => (
              <div
                key={estado.nombre}
                className={`estado-boton-opcion ${estado.colorFondo} ${estado.colorBorde}`}
                onClick={() =>
                  cambiarEstado(estados.findIndex((e) => e.nombre === estado.nombre))
                }
              >
                {estado.icono}
                <span>{estado.nombre}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
