import { useState } from 'react';

// Validador de RUT
const Fn = {
  validaRut: function (rutCompleto) {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
    var tmp = rutCompleto.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv === 'K') digv = 'k';
    return Fn.dv(rut) == digv;
  },
  dv: function (T) {
    var M = 0, S = 1;
    for (; T; T = Math.floor(T / 10))
      S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
  }
};

const initialState = {
  nombre: '',
  direccion: '',
  telefono: '',
  rut: '',
  imagen: null,
  catalogo: '',
  email: '',
  password: '', 
};

const RegistroEmprendimiento = ({ onClose }) => {
  const [form, setForm] = useState(initialState);
  const [rutValido, setRutValido] = useState(true);
  const [error, setError] = useState('');
  const [perfil, setPerfil] = useState(() => {
    const data = localStorage.getItem('perfilEmprendimiento');
    return data ? JSON.parse(data) : null;
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (files) {
      setForm(f => ({ ...f, [name]: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
    if (name === 'rut') setRutValido(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!Fn.validaRut(form.rut)) {
      setRutValido(false);
      setError('RUT inválido. Intenta nuevamente.');
      return;
    }
    setRutValido(true);
    setError('');
    localStorage.setItem('perfilEmprendimiento', JSON.stringify(form));
    setPerfil(form);
    alert('¡Perfil registrado!');
  };

  const handleDelete = () => {
    localStorage.removeItem('perfilEmprendimiento');
    setPerfil(null);
    setForm(initialState);
  };

  const handleEdit = () => {
    setForm(perfil);
    setPerfil(null);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card p-4">
            <h2 className="mb-4">Información Básica</h2>
            <div className="row">
              {/* Columna izquierda: Foto */}
              <div className="col-md-4 text-center border-end">
                <div className="mb-3">
                  <img
                    src={form.imagen ? URL.createObjectURL(form.imagen) : "src/assets/images/perfil.svg"}
                    alt="Perfil"
                    className="rounded-circle mb-2"
                    style={{ width: 120, height: 120, objectFit: 'cover', border: '2px solid #ccc' }}
                  />
                  <div>
                    <label className="btn btn-link p-0" style={{ color: "#6400E0", cursor: "pointer" }}>
                      <i className="fas fa-upload me-1"></i> Reemplazar
                      <input
                        type="file"
                        name="imagen"
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </div>
              </div>
              {/* Columna derecha: Inputs */}
              <div className="col-md-8">
                {!perfil ? (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Nombre del emprendimiento</label>
                        <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">RUT del emprendimiento</label>
                        <input type="text" className={`form-control ${!rutValido ? 'is-invalid' : ''}`} name="rut" value={form.rut} onChange={handleChange} required />
                        {!rutValido && <div className="invalid-feedback">{error}</div>}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Dirección</label>
                      <input type="text" className="form-control" name="direccion" value={form.direccion} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Teléfono</label>
                      <input type="tel" className="form-control" name="telefono" value={form.telefono} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Catálogo (documento o link)</label>
                      <input type="file" className="form-control mb-2" name="catalogo" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={handleChange} />
                      <input type="url" className="form-control" name="catalogo" placeholder="O ingresa un link de red social o web" value={form.catalogo} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Correo electrónico o nombre de usuario</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                      />
                    </div>
                    <button type="submit" className="btn cta-btn cta-btn-primary">Registrar</button>
                  </form>
                ) : (
                  <div>
                    <h4>Perfil registrado</h4>
                    <p><b>Nombre:</b> {perfil.nombre}</p>
                    <p><b>Dirección:</b> {perfil.direccion}</p>
                    <p><b>Teléfono:</b> {perfil.telefono}</p>
                    <p><b>RUT:</b> {perfil.rut}</p>
                    <button className="btn btn-warning me-2" onClick={handleEdit}>Editar</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroEmprendimiento;