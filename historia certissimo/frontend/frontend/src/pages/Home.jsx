import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cabecalho from '../components/Cabecalho';
import './Home.css';

// 1. Importação do seu plano de fundo oficial
import imagemFundo from '../assets/fundo-home.png'; 

// 2. Importações das fotos da equipe
import fotoMarina from '../assets/marina.jpeg';
import fotoPaloma from '../assets/paloma.jpeg';
import fotoYasmin from '../assets/yasmin.jpeg';
import fotoRaphaela from '../assets/raphaela.jpeg';
import fotoNicole from '../assets/nicole.jpeg';
import fotoJoao from '../assets/professor-joao.jpeg';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Cabecalho />

      {/* SEÇÃO PRINCIPAL (HERO) */}
      <div className="hero-secao" style={{ backgroundImage: `url(${imagemFundo})` }}>
        <div className="hero-emoji">🏛️</div>
        
        <h1 className="hero-titulo">HISTÓRIA</h1>
        
        <p className="hero-subtitulo">Questões de Vestibulares</p>
        
        <p className="hero-texto">
          Estude. Pratique. Conquiste.<br />
          Questões selecionadas das principais provas do país.
        </p>

        <button
          onClick={() => navigate('/questoes?f=vestibular')}
          className="btn-comecar"
        >
          COMEÇAR
        </button>

        {/* OS 4 ÍCONES DE RECURSOS */}
        <div className="recursos-container">
          <div className="recurso-card">
            <div className="recurso-circulo">📖</div>
            <p className="recurso-texto">QUESTÕES SELECIONADAS</p>
          </div>
          <div className="recurso-card">
            <div className="recurso-circulo">🏛️</div>
            <p className="recurso-texto">DIVERSOS VESTIBULARES</p>
          </div>
          <div className="recurso-card">
            <div className="recurso-circulo">📋</div>
            <p className="recurso-texto">GABARITOS COMENTADOS</p>
          </div>
          <div className="recurso-card">
            <div className="recurso-circulo">📈</div>
            <p className="recurso-texto">EVOLUÇÃO CONTÍNUA</p>
          </div>
        </div>
      </div>

      {/* SEÇÃO QUEM SOMOS */}
      <div id="quem-somos" className="quem-somos-secao">
        <h2 className="quem-somos-titulo">— QUEM SOMOS —</h2>
        
        <p className="quem-somos-paragrafo">
          Somos um grupo de estudantes apaixonados por História e pela educação.
        </p>
        <p className="quem-somos-paragrafo">
          Criamos esta plataforma com o objetivo de ajudar você a conquistar sua aprovação nos principais vestibulares do país.
        </p>
        <p className="quem-somos-paragrafo">
          Aqui, você encontra questões selecionadas, conteúdos de qualidade e recursos feitos para tornar seus estudos mais eficazes e significativos.
        </p>

        <h3 className="quem-somos-slogan">Estude. Pratique. Conquiste.</h3>

        {/* BLOCO DA NOSSA EQUIPE */}
        <div className="equipe-bloco">
          <h4 className="equipe-titulo">NOSSA EQUIPE:</h4>
          
          <div className="equipe-container">
            {/* CARD 1: MARINA */}
            <div className="membro-card">
              <div className="membro-foto-container">
                <img src={fotoMarina} alt="Marina Queiroz" className="membro-foto" />
              </div>
              <h5 className="membro-nome">Marina Queiroz</h5>
              <p className="membro-cargo">DESENVOLVEDORA</p>
            </div>

            {/* CARD 2: PALOMA */}
            <div className="membro-card">
              <div className="membro-foto-container">
                <img src={fotoPaloma} alt="Paloma Esteves" className="membro-foto" />
              </div>
              <h5 className="membro-nome">Paloma Esteves</h5>
              <p className="membro-cargo">DESENVOLVEDORA</p>
            </div>

            {/* CARD 3: YASMIN */}
            <div className="membro-card">
              <div className="membro-foto-container">
                <img src={fotoYasmin} alt="Yasmin Ribeiro" className="membro-foto" />
              </div>
              <h5 className="membro-nome">Yasmin Ribeiro</h5>
              <p className="membro-cargo">DESENVOLVEDORA</p>
            </div>

            {/* CARD 4: RAPHAELA */}
            <div className="membro-card">
              <div className="membro-foto-container">
                <img src={fotoRaphaela} alt="Raphaela Alegritti" className="membro-foto" />
              </div>
              <h5 className="membro-nome">Raphaela Olegretti</h5>
              <p className="membro-cargo">DESENVOLVEDORA</p>
            </div>

            {/* CARD 5: NICOLE */}
            <div className="membro-card">
              <div className="membro-foto-container">
                <img src={fotoNicole} alt="Nicole Zanini" className="membro-foto" />
              </div>
              <h5 className="membro-nome">Nicole Zanin</h5>
              <p className="membro-cargo">DESENVOLVEDORA</p>
            </div>

            {/* CARD 6: JOÃO MIGUEL */}
            <div className="membro-card">
              <div className="membro-foto-container">
                <img src={fotoJoao} alt="João Miguel" className="membro-foto" />
              </div>
              <h5 className="membro-nome">João Miguel</h5>
              <p className="membro-cargo">PROFESSOR</p>
            </div>
          </div>
        </div>

        {/* RODAPÉ DO QUEM SOMOS */}
        <div className="rodape-container">
          <p className="rodape-citacao">
            "A História não é apenas o passado, ela é a chave para entender o presente e transformar o futuro."
          </p>
          <p className="rodape-saudacao">BONS ESTUDOS!</p>
        </div>
      </div>
    </div>
  );
}