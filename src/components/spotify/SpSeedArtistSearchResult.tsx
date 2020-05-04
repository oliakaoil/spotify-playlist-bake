import React from 'react';
import { FaSpotify } from 'react-icons/fa';

interface Props {
    artist: any;
    onClick: CallableFunction;
    selected?: boolean;
}

interface State {
}

const thumbnailStyle = {
 height: 160,
 maxHeight: 160,
 overflow: 'hidden'
};

export class SpSeedArtistSearchResult extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event: React.MouseEvent) {
        if (event.target instanceof SVGElement) {
            return;
        }
        this.props.onClick(this.props.artist);
    }

    render() {
        const artist = this.props.artist;
        const spLink = (artist.external_urls && artist.external_urls.spotify ? artist.external_urls.spotify : '#');
        const artistImageSrc = (artist.images && artist.images.length ? artist.images[0].url : '');
        
        let containerClassNames = "ba border-light-green pa2 clickable border-radius-6";
        if (this.props.selected) {
            containerClassNames += " selected background-light-green";
        }

        return (
            <div className={containerClassNames} onClick={this.handleClick}>
                <div className="tc" style={thumbnailStyle}>
                    <img src={artistImageSrc} alt="Artist thumbnail" />
                </div>
                <div className="tc truncate mt1">
                    {artist.name}
                </div>
                <div className="tr mt1">
                    <a href={spLink} target="_blank" rel="noopener noreferrer">
                        <FaSpotify  />
                    </a>
                </div>
            </div>
        );
    }
}