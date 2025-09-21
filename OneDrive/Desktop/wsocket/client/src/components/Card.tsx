import React from 'react';
import TeamCard from './TeamCard';

const Card = ({ home, away, homeScore, awayScore, homeLogo, awayLogo }) => {
  return (
    <article
      style={{
        boxShadow: '0 2px 3px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '1rem',
        maxWidth: 'min-content',
        justifyContent: 'center',
        backgroundColor: '#FAF9F6	',
      }}>
      <TeamCard teamName={home} teamScore={homeScore} src={homeLogo} />
      <h2 style={{ alignSelf: 'center' }}>VS</h2>
      <TeamCard teamName={away} teamScore={awayScore} src={awayLogo} />
    </article>
  );
};

export default Card;
