import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cabecalho from '../components/Cabecalho';
import './Paginas.css';

// 1. Importação do seu plano de fundo oficial
import imagemFundo from '../assets/fundo-home.png'; 

// 2. Importações das fotos da equipe (Coloque as fotos na pasta src/assets/)
// Se os arquivos forem .png ou tiverem outros nomes, mude aqui embaixo:
import fotoMarina from '../assets/marina.jpeg';
import fotoPaloma from '../assets/paloma.jpeg';
import fotoYasmin from '../assets/yasmin.jpeg';
import fotoRaphaela from '../assets/raphaela.jpeg';
import fotoNicole from '../assets/nicole.jpeg';
import fotoJoao from '../assets/professor-joao.jpeg';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ backgroundColor: '#fffaf1', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Cabecalho />

      {/* SEÇÃO PRINCIPAL (HERO) */}
      <div className="hero-secao" style={{
        position: 'relative',
        height: '80vh',
        backgroundImage: `url(${imagemFundo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <div style={{ color: '#e67e22', fontSize: '40px', marginBottom: '10px' }}>🏛️</div>
        
        <h1 style={{ color: '#3d2b1f', fontSize: '72px', fontFamily: 'Merriweather, serif', margin: '0 0 5px 0', fontWeight: '700', letterSpacing: '2px' }}>
          HISTÓRIA
        </h1>
        
        <p style={{ color: '#e67e22', fontFamily: 'Merriweather, serif', fontSize: '26px', letterSpacing: '2px', fontWeight: 'bold', margin: '0 0 30px 0', textTransform: 'uppercase' }}>
          Questões de Vestibulares
        </p>
        
        <p style={{ color: '#5a4a42', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
          Estude. Pratique. Conquiste.<br />
          Questões selecionadas das principais provas do país.
        </p>

        <button
  onClick={() => navigate('/questoes?f=vestibular')}
  style={{
    backgroundColor: '#e67e22',
    color: '#fff',
    border: 'none',
    padding: '15px 40px',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    letterSpacing: '1px',
    transition: '0.3s',
    marginBottom: '50px'
  }}
  onMouseOver={(e) => e.target.style.backgroundColor = '#cf6d17'}
  onMouseOut={(e) => e.target.style.backgroundColor = '#e67e22'}
>
  COMEÇAR
</button>

        {/* OS 4 ÍCONES DE RECURSOS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{ width: '130px', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #e67e22', display: 'flex', alignItems: 'center', margin: '0 auto 10px auto', fontSize: '24px', color: '#e67e22', justifyContent: 'center' }}>📖</div>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#5a4a42', margin: 0 }}>QUESTÕES SELECIONADAS</p>
          </div>
          <div style={{ width: '130px', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #e67e22', display: 'flex', alignItems: 'center', margin: '0 auto 10px auto', fontSize: '24px', color: '#e67e22', justifyContent: 'center' }}>🏛️</div>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#5a4a42', margin: 0 }}>DIVERSOS VESTIBULARES</p>
          </div>
          <div style={{ width: '130px', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #e67e22', display: 'flex', alignItems: 'center', margin: '0 auto 10px auto', fontSize: '24px', color: '#e67e22', justifyContent: 'center' }}>📋</div>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#5a4a42', margin: 0 }}>GABARITOS COMENTADOS</p>
          </div>
          <div style={{ width: '130px', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #e67e22', display: 'flex', alignItems: 'center', margin: '0 auto 10px auto', fontSize: '24px', color: '#e67e22', justifyContent: 'center' }}>📈</div>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#5a4a42', margin: 0 }}>EVOLUÇÃO CONTÍNUA</p>
          </div>
        </div>
      </div>

      {/* SEÇÃO QUEM SOMOS INTEGRALMENTE RECONSTRUÍDA */}
      <div id="quem-somos" style={{ padding: '60px 0 0 0', textAlign: 'center', backgroundColor: '#fffaf1' }}>
        <h2 style={{ fontSize: '42px', fontFamily: 'Merriweather, serif', color: '#000000', fontWeight: 'bold', margin: '0 0 20px 0' }}>
          — QUEM SOMOS —
        </h2>
        
        <p style={{ fontSize: '18px', color: '#000000', maxWidth: '800px', margin: '0 auto 15px auto', lineHeight: '1.6', padding: '0 20px' }}>
          Somos um grupo de estudantes apaixonados por História e pela educação.
        </p>
        <p style={{ fontSize: '18px', color: '#000000', maxWidth: '800px', margin: '0 auto 15px auto', lineHeight: '1.6', padding: '0 20px' }}>
          Criamos esta plataforma com o objetivo de ajudar você a conquistar sua aprovação nos principais vestibulares do país.
        </p>
        <p style={{ fontSize: '18px', color: '#000000', maxWidth: '800px', margin: '0 auto 40px auto', lineHeight: '1.6', padding: '0 20px' }}>
          Aqui, você encontra questões selecionadas, conteúdos de qualidade e recursos feitos para tornar seus estudos mais eficazes e significativos.
        </p>

        <h3 style={{ fontStyle: 'italic', fontSize: '32px', color: '#e67e22', fontFamily: 'Merriweather, serif', fontWeight: 'bold', margin: '0 0 60px 0' }}>
          Estude. Pratique. Conquiste.
        </h3>

        {/* BLOCO DA NOSSA EQUIPE (FUNDO ABÓBORA LARANJA) */}
        <div style={{ backgroundColor: '#e67e22', padding: '50px 20px 60px 20px', textAlign: 'center' }}>
          <h4 style={{ color: '#000000', fontSize: '36px', fontFamily: 'sans-serif', fontWeight: 'bold', letterSpacing: '1px', margin: '0 0 40px 0' }}>
            NOSSA EQUIPE:
          </h4>

          {/* GRID COM OS 6 INTEGRANTES */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '20px', 
            maxWidth: '1100px', 
            margin: '0 auto' 
          }}>
            
            {/* CARD 1: MARINA */}
            <div style={{ backgroundColor: '#fffaf1', padding: '20px 10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 15px auto', backgroundColor: '#ddd' }}>
                <img src={fotoMarina} alt="Marina Queiroz" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h5 style={{ color: '#000000', fontSize: '14px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Marina Queiroz</h5>
              <p style={{ color: '#555', fontSize: '10px', fontWeight: 'bold', margin: 0, letterSpacing: '0.5px' }}>DESENVOLVEDORA</p>
            </div>

            {/* CARD 2: PALOMA */}
            <div style={{ backgroundColor: '#fffaf1', padding: '20px 10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 15px auto', backgroundColor: '#ddd' }}>
                <img src={fotoPaloma} alt="Paloma Esteves" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h5 style={{ color: '#000000', fontSize: '14px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Paloma Esteves</h5>
              <p style={{ color: '#555', fontSize: '10px', fontWeight: 'bold', margin: 0, letterSpacing: '0.5px' }}>DESENVOLVEDORA</p>
            </div>

            {/* CARD 3: YASMIN */}
            <div style={{ backgroundColor: '#fffaf1', padding: '20px 10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 15px auto', backgroundColor: '#ddd' }}>
                <img src={fotoYasmin} alt="Yasmin Ribeiro" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h5 style={{ color: '#000000', fontSize: '14px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Yasmin Ribeiro</h5>
              <p style={{ color: '#555', fontSize: '10px', fontWeight: 'bold', margin: 0, letterSpacing: '0.5px' }}>DESENVOLVEDORA</p>
            </div>

            {/* CARD 4: RAPHAELA */}
            <div style={{ backgroundColor: '#fffaf1', padding: '20px 10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 15px auto', backgroundColor: '#ddd' }}>
                <img src={fotoRaphaela} alt="Raphaela Alegritti" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h5 style={{ color: '#000000', fontSize: '14px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Raphaela Alegretti</h5>
              <p style={{ color: '#555', fontSize: '10px', fontWeight: 'bold', margin: 0, letterSpacing: '0.5px' }}>DESENVOLVEDORA</p>
            </div>

            {/* CARD 5: NICOLE */}
            <div style={{ backgroundColor: '#fffaf1', padding: '20px 10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 15px auto', backgroundColor: '#ddd' }}>
                <img src={fotoNicole} alt="Nicole Zanini" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h5 style={{ color: '#000000', fontSize: '14px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Nicole Zanin</h5>
              <p style={{ color: '#555', fontSize: '10px', fontWeight: 'bold', margin: 0, letterSpacing: '0.5px' }}>DESENVOLVEDORA</p>
            </div>

            {/* CARD 6: JOÃO MIGUEL */}
            <div style={{ backgroundColor: '#fffaf1', padding: '20px 10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 15px auto', backgroundColor: '#ddd' }}>
                <img src={fotoJoao} alt="João Miguel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h5 style={{ color: '#000000', fontSize: '14px', fontWeight: 'bold', margin: '0 0 5px 0' }}>João Miguel</h5>
              <p style={{ color: '#555', fontSize: '10px', fontWeight: 'bold', margin: 0, letterSpacing: '0.5px' }}>PROFESSOR</p>
            </div>

          </div>
        </div>

        {/* RODAPÉ DO QUEM SOMOS */}
        <div style={{ backgroundColor: '#1a0f08', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: '#e67e22', fontSize: '11px', margin: 0, fontStyle: 'italic', textAlign: 'left', maxWidth: '600px' }}>
            "A História não é apenas o passado, ela é a chave para entender o presente e transformar o futuro."
          </p>
          <p style={{ color: '#e67e22', fontSize: '11px', fontWeight: 'bold', margin: 0, letterSpacing: '1px' }}>
            BONS ESTUDOS!
          </p>
        </div>
      </div>

    </div>
  );
}