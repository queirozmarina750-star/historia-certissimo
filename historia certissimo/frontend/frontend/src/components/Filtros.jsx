import React from 'react';
import './Filtros.css';

// Componente responsável por exibir os filtros das questões
export default function Filtros({
  filtros,
  onChangeFiltro,
  onFiltrarClick
}) {
  return (

    // Rodapé fixo que contém todos os filtros
    <footer className="filtro-rodape">

      {/* Filtro por vestibular */}
      <div className="filtro-grupo">

        {/* Título do filtro */}
        <span className="filtro-titulo">
          VESTIBULAR
        </span>

        {/* Select responsável por escolher o vestibular */}
        <select
          name="vestibular"
          value={filtros.vestibular}
          onChange={onChangeFiltro}
          className="filtro-select"
        >
          <option value="">Todos</option>
          <option value="ENEM">ENEM</option>
          <option value="FUVEST">FUVEST</option>
          <option value="UNICAMP">UNICAMP</option>
          <option value="USP">USP</option>
        </select>

      </div>

      {/* Filtro por ano */}
      <div className="filtro-grupo">

        {/* Título do filtro */}
        <span className="filtro-titulo">
          ANO
        </span>

        {/* Lista de anos disponíveis */}
        <select
          name="ano"
          value={filtros.ano}
          onChange={onChangeFiltro}
          className="filtro-select"
        >
          <option value="">Todos</option>

          {/* Gera automaticamente as opções de ano */}
          {[2025, 2024, 2023, 2022, 2021, 2018, 2017, 2014, 2013, 2012, 2011, 2010].map(ano => (
            <option
              key={ano}
              value={ano}
            >
              {ano}
            </option>
          ))}
        </select>

      </div>

      {/* Filtro por tema */}
      <div className="filtro-grupo">

        {/* Título do filtro */}
        <span className="filtro-titulo">
          TEMA
        </span>

        {/* Select responsável por filtrar pelo tópico */}
        <select
          name="topico"
          value={filtros.topico}
          onChange={onChangeFiltro}
          className="filtro-select filtro-topico"
        >
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

      {/* Filtro por nível de dificuldade */}
      <div className="filtro-grupo">

        {/* Título do filtro */}
        <span className="filtro-titulo">
          DIFICULDADE
        </span>

        {/* Select que define o nível de dificuldade */}
        <select
          name="dificuldade"
          value={filtros.dificuldade}
          onChange={onChangeFiltro}
          className="filtro-select"
        >
          <option value="">Todas</option>
          <option value="facil">Fácil</option>
          <option value="media">Média</option>
          <option value="dificil">Difícil</option>
        </select>

      </div>

      {/* Botão responsável por aplicar os filtros selecionados */}
      <button
        onClick={onFiltrarClick}
        className="botao-filtrar"
      >
        Filtrar Banco
      </button>

    </footer>
  );
}