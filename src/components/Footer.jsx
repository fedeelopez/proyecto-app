import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-main">
          <div className="footer-brand">
            <h3>Termo Tienda</h3>
            <p>Tu destino para los mejores termos y accesorios..</p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>Productos</h4>
              <ul>
                <li><Link to="/category/termos">Termos</Link></li>
                <li><Link to="/category/accesorios">Accesorios</Link></li>
                <li><a href="#">Novedades</a></li>
                <li><a href="#">Ofertas</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Ayuda</h4>
              <ul>
                <li><a href="#">Cómo comprar</a></li>
                <li><a href="#">Envíos</a></li>
                <li><a href="#">Devoluciones</a></li>
                <li><a href="#">Garantía</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Empresa</h4>
              <ul>
                <li><a href="#">Sobre nosotros</a></li>
                <li><a href="#">Contacto</a></li>
                <li><a href="#">Trabaja con nosotros</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sección de contacto */}
        <div className="footer-contact">
          <div className="contact-info">
            <h4>Contacto</h4>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+54 11 1234-5678</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>info@termotienda.com</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Buenos Aires, Argentina</span>
            </div>
          </div>

          <div className="newsletter">
            <h4>Newsletter</h4>
            <p>Suscribite para recibir ofertas exclusivas</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="newsletter-input"
              />
              <button className="newsletter-button">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 Termo Tienda. Todos los derechos reservados.</p>
          <div className="footer-bottom-links">
            <a href="#">Términos y condiciones</a>
            <a href="#">Política de privacidad</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
