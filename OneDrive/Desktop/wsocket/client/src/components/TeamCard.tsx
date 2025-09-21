import React from 'react';

const TeamCard = ({ teamName, teamScore, src }) => {
  return (
    <div
      style={{
        backgroundColor: '#FAF9F6	',
        width: '10rem',
        aspectRatio: 1,
        //   textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        rowGap: '1rem',
        padding: '.8rem',
      }}>
      <div>
        <p style={{ textAlign: 'center' }}>{teamName}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <img
          src={
            src ||
            'https://www.logo.wine/a/logo/Arsenal_F.C./Arsenal_F.C.-Logo.wine.svg'
          }
          style={{ width: '50%', aspectRatio: '1', objectFit: 'cover' }}
        />
        <p
          style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            width: '50%',
            textAlign: 'center',
          }}>
          {teamScore}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
