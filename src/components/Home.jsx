import CategoryList from './CategoryList';

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Bienvenidos a Termo Tienda</h1>
        <p>Descubre la mejor selección de termos y accesorios para mantener tus bebidas a la temperatura perfecta</p>
      </div>
      
      <CategoryList />
      
      <div className="features-section">
        <h2>¿Por qué elegirnos?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>🛡️ Calidad Garantizada</h3>
            <p>Todos nuestros productos cuentan con garantía de calidad</p>
          </div>
          <div className="feature">
            <h3>🚚 Envío Rápido</h3>
            <p>Recibe tus productos en la puerta de tu casa</p>
          </div>
          <div className="feature">
            <h3>💬 Atención Personalizada</h3>
            <p>Nuestro equipo está listo para ayudarte</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
