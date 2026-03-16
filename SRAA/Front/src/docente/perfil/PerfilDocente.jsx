import { useRef, useState } from "react";
import "./PerfilDocente.css";

function DatoDoc({ icon, label, value, badge }) {
    return (
        <div className="perfil-doc__info">
            <p className="perfil-doc__label">
                <i className={icon} />
                {label}
            </p>
            {badge ? (
                <span className="perfil-doc__badge">{value}</span>
            ) : (
                <p className={`perfil-doc__value ${label === "Correo Institucional" ? "perfil-doc__value--email" : ""}`}>{value}</p>
            )}
        </div>
    );
}

function PasswordFieldDoc({ label, placeholder }) {
    return (
        <div className="perfil-doc__field">
            <label className="perfil-doc__field-label">{label}</label>
            <input type="password" placeholder={placeholder} className="perfil-doc__input" />
        </div>
    );
}

export default function PerfilDocente() {
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const fileInputRef = useRef(null);

    const handleClose = () => {
        setIsPhotoModalOpen(false);
        setSelectedPhoto(null);
    };

    const handlePickPhoto = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0] || null;
        setSelectedPhoto(file);
    };

    return (
        <main className="perfil-doc">
            <div>
                <h1 className="perfil-doc__title">Mi Perfil</h1>
                <p className="perfil-doc__subtitle">Informacion del docente y estadisticas de participacion</p>
            </div>

            <section className="perfil-doc__card perfil-doc__hero">
                <div className="perfil-doc__avatar">
                    <i className="bi bi-person" />
                    <button type="button" className="perfil-doc__avatar-camera" onClick={() => setIsPhotoModalOpen(true)}>
                        <i className="bi bi-camera" />
                    </button>
                </div>

                <div>
                    <p className="perfil-doc__name">Docente de Ejemplo</p>
                    <p className="perfil-doc__matricula">DOC20260001</p>
                </div>
            </section>

            <section className="perfil-doc__card">
                <h2 className="perfil-doc__section-title">Informacion Academica</h2>
                <div className="perfil-doc__grid">
                    <DatoDoc icon="bi bi-person" label="Nombre(s)" value="Nombre" />
                    <DatoDoc icon="bi bi-person" label="Apellido Paterno" value="Apellido" />
                    <DatoDoc icon="bi bi-person" label="Apellido Materno" value="Segundo Apellido" />
                    <DatoDoc icon="bi bi-envelope" label="Correo Institucional" value="docente.ejemplo@universidad.edu.mx" />
                    <DatoDoc icon="bi bi-person-check" label="Estado Academico" value="Activo" badge />
                </div>
            </section>

            <section className="perfil-doc__card">
                <h2 className="perfil-doc__section-title perfil-doc__section-title--with-icon">
                    <i className="bi bi-lock perfil-doc__section-title-icon" />
                    Seguridad
                </h2>

                <div className="perfil-doc__security">
                    <PasswordFieldDoc label="Contrasena anterior" placeholder="Ingresa tu contrasena actual" />
                    <PasswordFieldDoc label="Confirmar nueva contrasena" placeholder="Confirma tu nueva contrasena" />
                    <PasswordFieldDoc label="Nueva contrasena" placeholder="Ingresa tu nueva contrasena" />
                    <div className="perfil-doc__btn-wrap">
                        <button type="button" className="perfil-doc__btn">Cambiar contrasena</button>
                    </div>
                </div>
            </section>

            {isPhotoModalOpen && (
                <div className="perfil-doc__modal-overlay" onClick={handleClose}>
                    <div className="perfil-doc__modal" onClick={(event) => event.stopPropagation()}>
                        <div className="perfil-doc__modal-header">
                            <h3 className="perfil-doc__modal-title">Cambiar foto de perfil</h3>
                            <button type="button" className="perfil-doc__modal-close" onClick={handleClose}>
                                <i className="bi bi-x" />
                            </button>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={handleFileChange}
                            className="perfil-doc__file-input"
                        />

                        <button type="button" className="perfil-doc__dropzone" onClick={handlePickPhoto}>
                            <i className="bi bi-upload perfil-doc__drop-icon" />
                            <p className="perfil-doc__drop-title">Haz clic para cargar fotografias</p>
                            <p className="perfil-doc__drop-text">o arrastra y suelta las imagenes aqui</p>
                            <p className="perfil-doc__drop-help">Puedes seleccionar multiples imagenes (PNG, JPG, JPEG)</p>
                            {selectedPhoto && <p className="perfil-doc__drop-selected">Archivo seleccionado: {selectedPhoto.name}</p>}
                        </button>

                        <div className="perfil-doc__modal-actions">
                            <button type="button" className="perfil-doc__modal-btn perfil-doc__modal-btn--ghost" onClick={handleClose}>
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="perfil-doc__modal-btn perfil-doc__modal-btn--primary"
                                onClick={handleClose}
                                disabled={!selectedPhoto}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}