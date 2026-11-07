function PokemonModal({ pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeButtonStyle} onClick={onClose}>
          ✕
        </button>
        <div style={{ textAlign: 'center' }}>
          <img
            src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            style={{ width: '160px', height: '160px' }}
          />
          <h2 style={{ textTransform: 'capitalize', margin: '10px 0', color: '#0f172a' }}>
            #{pokemon.id} {pokemon.name}
          </h2>
          <p>
            <strong>Altura:</strong> {pokemon.height / 10} m | <strong>Peso:</strong> {pokemon.weight / 10} kg
          </p>
          <div style={{ marginBottom: '15px' }}>
            <strong>Tipos: </strong>
            {pokemon.types.map((t) => (
              <span key={t.type.name} style={typeBadgeStyle}>
                {t.type.name}
              </span>
            ))}
          </div>

          <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '5px', marginTop: '20px' }}>
            Estadísticas Base
          </h3>
          <div style={{ textAlign: 'left', marginTop: '10px' }}>
            {pokemon.stats.map((s) => (
              <div key={s.stat.name} style={{ margin: '8px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold' }}>
                  <span style={{ textTransform: 'capitalize' }}>{s.stat.name}</span>
                  <span>{s.base_stat}</span>
                </div>
                <div style={statBarBackgroundStyle}>
                  <div style={statBarFillStyle(s.base_stat)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(15, 23, 42, 0.65)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  animation: 'fadeIn 0.2s ease-out',
};

const modalStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '25px',
  maxWidth: '420px',
  width: '90%',
  maxHeight: '85vh',
  overflowY: 'auto',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  border: 'none',
  background: '#f1f5f9',
  borderRadius: '50%',
  width: '32px',
  height: '32px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#64748b',
};

const typeBadgeStyle = {
  display: 'inline-block',
  backgroundColor: '#3b82f6',
  color: '#ffffff',
  padding: '4px 10px',
  borderRadius: '12px',
  fontSize: '12px',
  textTransform: 'capitalize',
  margin: '0 4px',
};

const statBarBackgroundStyle = {
  height: '8px',
  backgroundColor: '#e2e8f0',
  borderRadius: '4px',
  overflow: 'hidden',
  marginTop: '4px',
};

const statBarFillStyle = (value) => ({
  height: '100%',
  width: `${Math.min((value / 150) * 100, 100)}%`,
  backgroundColor: value > 75 ? '#22c55e' : value > 45 ? '#eab308' : '#ef4444',
  borderRadius: '4px',
  transition: 'width 0.5s ease-out',
});

export default PokemonModal;
