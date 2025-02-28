
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';

const VSL = () => {
  const location = useLocation();
  const balance = location.state?.balance || 500; // Default to 500 if no balance is passed

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header balance={balance} title="Summit Trader" />
      
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="max-w-4xl mx-auto">
          {/* Title from Anexo 2 */}
          <div className="bg-black text-white text-center py-8 mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              FAÇA 500 REAIS ENQUANTO ASSISTE, OU EU SOU OBRIGADO A
              <span className="text-amber-400"> TE ENVIAR 1.000 REAIS DO MEU BOLSO</span>
            </h1>
          </div>
          
          {/* Video VSL */}
          <div className="glass-card rounded-lg overflow-hidden mb-8">
            <div id="vid_67c1e8ac4916cbb478b01d98" style={{ position: 'relative', width: '100%', padding: '56.25% 0 0' }}>
              <img 
                id="thumb_67c1e8ac4916cbb478b01d98" 
                src="https://images.converteai.net/d205677e-a24a-4ad8-9343-877343d335d0/players/67c1e8ac4916cbb478b01d98/thumbnail.jpg" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                alt="thumbnail" 
              />
              <div 
                id="backdrop_67c1e8ac4916cbb478b01d98" 
                style={{ WebkitBackdropFilter: 'blur(5px)', backdropFilter: 'blur(5px)', position: 'absolute', top: 0, height: '100%', width: '100%' }}
              ></div>
            </div>
            <script
              type="text/javascript"
              id="scr_67c1e8ac4916cbb478b01d98"
              dangerouslySetInnerHTML={{
                __html: `var s=document.createElement("script"); s.src="https://scripts.converteai.net/d205677e-a24a-4ad8-9343-877343d335d0/players/67c1e8ac4916cbb478b01d98/player.js", s.async=!0,document.head.appendChild(s);`
              }}
            ></script>
          </div>
          
          {/* Call to Action Button */}
          <div className="text-center mt-8">
            <a 
              href="https://zeuzdrm.shop/summer/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full text-xl inline-block transition-all transform hover:scale-105"
            >
              QUERO COMEÇAR AGORA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSL;
