import { useRef, useState } from "react";
import "./MiPerfil.css";

function InfoItem({ icon, label, value, badge }) {
    return (
        <div className="mi-perfil__info">
            <p className="mi-perfil__label">
                <i className={icon} />
                {label}
            </p>
            {badge ? (
                <span className="mi-perfil__badge">{value}</span>
            ) : (
                <p className={`mi-perfil__value ${label === "Correo Institucional" ? "mi-perfil__value--email" : ""}`}>
                    {value}
                </p>
            )}
        </div>
    );
}

function PasswordField({ label, placeholder }) {
    return (
        <div className="mi-perfil__field">
            <label className="mi-perfil__field-label">{label}</label>
            <input type="password" placeholder={placeholder} className="mi-perfil__input" />
        </div>
    );
}

export default function MiPerfil() {
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const fileInputRef = useRef(null);

    const handleOpenPhotoModal = () => {
        setIsPhotoModalOpen(true);
    };

    const handleClosePhotoModal = () => {
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

    const handleSavePhoto = () => {
        setIsPhotoModalOpen(false);
    };

    return (
        <main className="mi-perfil">
            <div>
                <h1 className="mi-perfil__title">Mi Perfil</h1>
                <p className="mi-perfil__subtitle">
                    Informacion del docente y estadisticas de participacion
                </p>
            </div>

            <section className="mi-perfil__card mi-perfil__hero">
                <div className="mi-perfil__avatar">
                    <i className="bi bi-person" />
                    <button type="button" className="mi-perfil__avatar-camera" onClick={handleOpenPhotoModal}>
                        <i className="bi bi-camera" />
                    </button>
                </div>

                <div>
                    <p className="mi-perfil__name">Usuario de Ejemplo</p>
                    <p className="mi-perfil__matricula">MAT20260001</p>
                </div>
            </section>

            <section className="mi-perfil__card">
                <h2 className="mi-perfil__section-title">Informacion Academica</h2>

                <div className="mi-perfil__academic-grid">
                    <InfoItem icon="bi bi-person" label="Nombre(s)" value="Nombre" />
                    <InfoItem icon="bi bi-person" label="Apellido Paterno" value="Apellido" />
                    <InfoItem icon="bi bi-person" label="Apellido Materno" value="Segundo Apellido" />
                    <InfoItem icon="bi bi-envelope" label="Correo Institucional" value="usuario.ejemplo@universidad.edu.mx" />
                    <InfoItem icon="bi bi-person-check" label="Estado Academico" value="Activo" badge />
                </div>
            </section>

            <section className="mi-perfil__card">
                <h2 className="mi-perfil__section-title mi-perfil__section-title--with-icon">
                    <i className="bi bi-lock mi-perfil__section-title-icon" />
                    Seguridad
                </h2>

                <div className="mi-perfil__security-grid">
                    <PasswordField label="Contrasena anterior" placeholder="Ingresa tu contrasena actual" />
                    <PasswordField label="Confirmar nueva contrasena" placeholder="Confirma tu nueva contrasena" />
                    <PasswordField label="Nueva contrasena" placeholder="Ingresa tu nueva contrasena" />

                    <div className="mi-perfil__btn-wrap">
                        <button type="button" className="mi-perfil__btn">Cambiar contrasena</button>
                    </div>
                </div>
            </section>

            {isPhotoModalOpen && (
                <div className="mi-perfil__modal-overlay" onClick={handleClosePhotoModal}>
                    <div className="mi-perfil__modal" onClick={(event) => event.stopPropagation()}>
                        <div className="mi-perfil__modal-header">
                            <h3 className="mi-perfil__modal-title">Cambiar foto de perfil</h3>
                            <button type="button" className="mi-perfil__modal-close" onClick={handleClosePhotoModal}>
                                <i className="bi bi-x" />
                            </button>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={handleFileChange}
                            className="mi-perfil__file-input"
                        />

                        <button type="button" className="mi-perfil__upload-dropzone" onClick={handlePickPhoto}>
                            <i className="bi bi-upload mi-perfil__upload-icon" />
                            <p className="mi-perfil__upload-title">Haz clic para cargar fotografias</p>
                            <p className="mi-perfil__upload-text">o arrastra y suelta las imagenes aqui</p>
                            <p className="mi-perfil__upload-help">Puedes seleccionar multiples imagenes (PNG, JPG, JPEG)</p>
                            {selectedPhoto && <p className="mi-perfil__upload-selected">Archivo seleccionado: {selectedPhoto.name}</p>}
                        </button>

                        <div className="mi-perfil__modal-actions">
                            <button type="button" className="mi-perfil__modal-btn mi-perfil__modal-btn--ghost" onClick={handleClosePhotoModal}>
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="mi-perfil__modal-btn mi-perfil__modal-btn--primary"
                                onClick={handleSavePhoto}
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