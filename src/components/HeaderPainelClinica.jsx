import { Link } from 'react-router-dom';
import './HeaderPainelClinica.css';

const HeaderPainelClinica = ({ 
  titulo = "PAINEL DA CLÍNICA", 
  subtitulo = "ACOMPANHE AS MÉTRICAS E ATIVIDADES EM TEMPO REAL",
  showAmbulanciaButton = true,
  ambulanciaLink = "/gestao-ambulancia"
}) => {
  return (
    <div className="painel-clinica-header">
      <div>
        <h1 className="painel-clinica-titulo">{titulo}</h1>
        <p className="painel-clinica-subtitulo">{subtitulo}</p>
      </div>
      {showAmbulanciaButton && (
        <Link to={ambulanciaLink} className="btn-ambulancia">
          <i className="fa fa-ambulance" aria-hidden="true"></i>
          AMBULÂNCIA
        </Link>
      )}
    </div>
  );
};

export default HeaderPainelClinica;

