import React from 'react';
import { UilCube, Uil0Plus, UilMusic, UilBrushAlt, UilArrowUpRight } from '@iconscout/react-unicons';
import './ArtistProfileCard.css';
import TriboxLogo from '../../Assets/Triboxlogo.svg';

interface ArtistCardProps {
  artist: {
    fullName: string;
    nickname: string;
    profilePhoto: string;
    biography: string;
    followers: number;
    occupation: string;
  };
  position: number;
}

const getIcon = (occupation: string) => {
  switch (occupation) {
    case '3D Artist':
      return <UilCube className="artist-icon" />;
    case 'Graphic Designer':
      return <Uil0Plus className="artist-icon" />;
    case 'Traditional Artist':
      return <UilBrushAlt className="artist-icon" />;
    case 'Musician':
      return <UilMusic className="artist-icon" />;
    default:
      return <img src={TriboxLogo} alt="Tribox Logo" className="artist-icon" />;
  }
};

const ArtistCardHome: React.FC<ArtistCardProps> = ({ artist, position }) => {
  return (
    <div className="artist-profile-card">
      <div className="artist-profile-card-body">
        <img src={artist.profilePhoto} alt={artist.nickname} className="artist-profile-card-image" />
        <div className="artist-profile-card-header-content">
          <h3 className="artist-profile-card-name">{artist.fullName}</h3>
          <p className="artist-profile-card-position">{artist.occupation}</p>
        </div>
        {getIcon(artist.occupation)}
      </div>
      <p className="artist-profile-card-bio">{artist.biography}</p>
      <div className="learn-more-container">
        <a href="#" className="learn-more">Learn More</a>
        <button className="learn-more-button">
          <UilArrowUpRight className="learn-more-icon" />
        </button>
      </div>
    </div>
  );
};

export default ArtistCardHome;