
import { useEffect, useState } from "react";
import { helpFetch } from "./helpers/helpFetch";

const api = helpFetch();
const URL = "/api/productos";

const productoVacio = {
  nombre: "",
  precio: "",
  stock: "",
  categoria: "Decorativa",
};

export default function Negocio() {
  const [productos, setProductos] = useState([]);
  const [formulario, setFormulario] = useState(productoVacio);
  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarProductos = async () => {
    try {
      setError("");
      const datos = await api.get(URL);
      setProductos(datos);
    } catch {
      setError("No fue posible cargar los productos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const abrirNuevo = () => {
    setFormulario(productoVacio);
    setEditando(null);
    setMostrarFormulario(true);
  };

  const abrirEditar = (producto) => {
    setFormulario({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria,
    });
    setEditando(producto.id);
    setMostrarFormulario(true);
  };

  const guardarProducto = async (e) => {
    e.preventDefault();

    const datos = {
      nombre: formulario.nombre.trim(),
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
      categoria: formulario.categoria,
    };

    if (
      !datos.nombre ||
      formulario.precio === "" ||
      formulario.stock === "" ||
      !Number.isFinite(datos.precio) ||
      !Number.isInteger(datos.stock) ||
      datos.precio <= 0 ||
      datos.stock < 0
    ) {
      alert("Verifica los datos del producto.");
      return;
    }

    try {
      setError("");

      if (editando !== null) {
        await api.put(`${URL}/${editando}`, datos);
      } else {
        await api.post(URL, datos);
      }

      setMostrarFormulario(false);
      setFormulario(productoVacio);
      setEditando(null);
      await cargarProductos();
    } catch {
      setError("No fue posible guardar el producto.");
    }
  };

  const eliminarProducto = async (producto) => {
    const confirmar = window.confirm(
      `¿Deseas eliminar ${producto.nombre}?`
    );

    if (!confirmar) return;

    try {
      setError("");
      await api.del(`${URL}/${producto.id}`);
      await cargarProductos();
    } catch {
      setError("No fue posible eliminar el producto.");
    }
  };

  const formatoPrecio = (precio) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(precio);

  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <span className="text-uppercase small">
          Gestión de inventario
        </span>
        <h1 className="display-5 fw-bold mt-2">
          Fortune Candles
        </h1>
        <p>Administración de velas artesanales</p>
      </header>

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <div>
              <h2 className="h4 mb-1">Nuestros productos</h2>
              <p className="text-muted mb-0">
                Consulta y administra el inventario.
              </p>
            </div>

            <button
              className="btn btn-dark"
              onClick={abrirNuevo}
            >
              + Agregar producto
            </button>
          </div>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          {mostrarFormulario && (
            <form
              onSubmit={guardarProducto}
              className="p-4 rounded mb-4 formulario-producto"
            >
              <h3 className="h5 mb-3">
                {editando !== null
                  ? "Editar producto"
                  : "Registrar producto"}
              </h3>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre</label>
                  <input
                    className="form-control"
                    required
                    value={formulario.nombre}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        nombre: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Categoría</label>
                  <select
                    className="form-select"
                    value={formulario.categoria}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        categoria: e.target.value,
                      })
                    }
                  >
                    <option>Decorativa</option>
                    <option>Personalizada</option>
                    <option>Aromática</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Precio (COP)</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    required
                    className="form-control"
                    value={formulario.precio}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        precio: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    required
                    className="form-control"
                    value={formulario.stock}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        stock: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button className="btn btn-success" type="submit">
                  {editando !== null
                    ? "Guardar cambios"
                    : "Registrar producto"}
                </button>

                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td className="fw-semibold">
                      {producto.nombre}
                    </td>
                    <td>{producto.categoria}</td>
                    <td>{formatoPrecio(producto.precio)}</td>
                    <td>
                      <span
                        className={`badge ${
                          producto.stock > 0
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {producto.stock > 0
                          ? `${producto.stock} disponibles`
                          : "Agotado"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => abrirEditar(producto)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => eliminarProducto(producto)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {cargando && <p>Cargando productos...</p>}

            {!cargando && productos.length === 0 && !error && (
              <p className="text-center text-muted">
                No hay productos registrados.
              </p>
            )}
          </div>
        </div>
      </div>

      <footer className="text-center mt-5 text-muted small">
        Fortune Candles · Laboratorio IV · Programación Web
      </footer>
    </div>
  );
}
