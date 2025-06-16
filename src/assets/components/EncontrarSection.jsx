import MapboxMap from './MapBoxMap.jsx';


const EncontrarSection = () => {
  return (
    <section>
      <h2>Encuentra tu Lugar</h2>
      <MapboxMap latitude={-33.438} longitude={-70.651} zoom={10}/>
      {/* Otros contenidos */}
    </section>
  );
};

export default EncontrarSection;