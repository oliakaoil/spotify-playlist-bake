import React from 'react';
import './sass/App.scss';

import { SpWebApiClient } from './components/spotify/SpWebApiClient';
import { SpAuthController } from './components/spotify/SpAuthController';
import { SpSeedSearchController } from './components/spotify/SpSeedSearchController';
import { SpAudioFeaturesController } from './components/spotify/SpAudioFeaturesController';
import { SpSavePlaylistController } from './components/spotify/SpSavePlaylistController';

import { DiBitbucket } from 'react-icons/di';

const spWebApiClientInst = new SpWebApiClient();

function App() {

  return (
    <div className="App flex flex-column h-100">
      <header className="pt3 pb3 pl2 pr2 flex items-center">
        <div className="spotify-logo"></div>
        <div className="white f4 ml3 mt1">Playlist Bake</div>
      </header>
      <main className="pt3">
          <div className="w-90 w-60-l center">
            <div className="mb4">
              <SpAuthController spApiWebClient={spWebApiClientInst} />  
            </div>
            <div className="mb4">
              <SpSeedSearchController spApiWebClient={spWebApiClientInst} />
            </div>
            <div className="mb4">
              <SpAudioFeaturesController spApiWebClient={spWebApiClientInst} />
            </div>
            <div className="mb4">
              <SpSavePlaylistController spApiWebClient={spWebApiClientInst} />
            </div>            
          </div>
      </main>
      <footer className="w-100 pt3 pb3 pl2 pr2 bt b--light-gray">
        <a href="https://bitbucket.org/oliakaoil/spotify-playlist-bake" target="_blank" rel="noopener noreferrer" className="f4"><DiBitbucket /></a>
      </footer>
    </div>
  );
}

export default App;
