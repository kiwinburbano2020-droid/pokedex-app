import { useState, useEffect } from 'react';
import { getPokemonDetails } from '../services/pokemonService';

function PokemonCard({ pokemonName, onClick }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const data = await getPokemonDetails(pokemonName);
        setPokemon(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [pokemonName]);

  if (loading) return <div style={cardStyle(false)}>Cargando registro...</div>;
  if (!pokemon) return null;

  return (
    <div
      style={cardStyle(isHovered)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(pokemon)}
    >
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{
          width: '100px',
          height: '100px',
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'scale(1.15)' : 'scale(1)',
        }}
      />
      <h3 style={{ textTransform: 'capitalize', margin: '10px 0 5px 0' }}>
        #{pokemon.id} {pokemon.name}
      </h3>
      <div>
        <strong>Tipos: </strong>
        {pokemon.types.map((t) => t.type.name).join(', ')}
      </div>
      <p style={{ marginTop: '8px' }}>
        <strong>HP:</strong> {pokemon.stats[0].base_stat} | <strong>Ataque:</strong> {pokemon.stats[1].base_stat}
      </p>
    </div>
  );
}

const cardStyle = (isHovered) => ({
  border: isHovered ? '1px solid #3b82f6' : '1px solid #cbd5e1',
  borderRadius: '12px',
  padding: '15px',
  margin: '12px',
  width: '190px',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  transform: isHovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
  boxShadow: isHovered
    ? '0 12px 24px -6px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(0, 0, 0, 0.1)'
    : '0 2px 5px rgba(0, 0, 0, 0.05)',
});

export default PokemonCard;
