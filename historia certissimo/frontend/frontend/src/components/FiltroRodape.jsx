import React from 'react';

export default function FiltroRodape({ filtros, onChangeFiltro, onFiltrarClick }) {
  return (
    <footer style={{
      position: 'fixed', bottom: 0, left: 0, width: '100%', background: '#1a1a1a', color: '#fff',
      padding: '15px 20px', boxSizing: 'border-box', display: 'flex', gap: '15px',
      justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', zIndex: 1000,
      boxShadow: '0 -4px 15px rgba(0,0,0,0.3)'
    }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '0.7em', color: '#aaa', fontWeight: 'bold' }}>VESTIBULAR</span>
        <select name="vestibular" value={filtros.vestibular} onChange={onChangeFiltro} style={{ padding: '6px 10px', borderRadius: '4px', border: 'none', background: '#333', color: '#fff', fontSize: '0.9em' }}>
          <option value="">Todos</option>
          <option value="ENEM">ENEM</option>
          <option value="FUVEST">FUVEST</option>
          <option value="UNICAMP">UNICAMP</option>
          <option value="USP">USP</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '0.7em', color: '#aaa', fontWeight: 'bold' }}>ANO</span>
        <select name="ano" value={filtros.ano} onChange={onChangeFiltro} style={{ padding: '6px 10px', borderRadius: '4px', border: 'none', background: '#333', color: '#fff', fontSize: '0.9em' }}>
          <option value="">Todos</option>
          {[2025, 2024, 2023, 2022, 2021, 2018, 2017, 2014, 2013, 2012, 2011, 2010].map(ano => (
            <option key={ano} value={ano}>{ano}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '0.7em', color: '#aaa', fontWeight: 'bold' }}>TEMA</span>
        <select name="topico" value={filtros.topico} onChange={onChangeFiltro} style={{ padding: '6px 10px', borderRadius: '4px', border: 'none', background: '#333', color: '#fff', fontSize: '0.9em', maxWidth: '180px' }}>
          <option value="">Todos</option>
          <option value="Era Vargas">Era Vargas</option>
          <option value="Brasil Império">Brasil Império</option>
          <option value="Guerra Fria">Guerra Fria</option>
          <option value="Ditadura Militar no Brasil">Ditadura Militar</option>
          <option value="Independência do Brasil">Independência do Brasil</option>
          <option value="Revolução Industrial">Revolução Industrial</option>
          <option value="Iluminismo">Iluminismo</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '0.7em', color: '#aaa', fontWeight: 'bold' }}>DIFICULDADE</span>
        <select name="dificuldade" value={filtros.dificuldade} onChange={onChangeFiltro} style={{ padding: '6px 10px', borderRadius: '4px', border: 'none', background: '#333', color: '#fff', fontSize: '0.9em' }}>
          <option value="">Todas</option>
          <option value="facil">Fácil</option>
          <option value="media">Média</option>
          <option value="dificil">Difícil</option>
        </select>
      </div>

      <button 
        onClick={onFiltrarClick} 
        style={{ background: '#007bff', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', alignSelf: 'flex-end', height: '32px', fontSize: '0.9em', display: 'flex', alignItems: 'center' }}
      >
        Filtrar Banco
      </button>
    </footer>
  );
}