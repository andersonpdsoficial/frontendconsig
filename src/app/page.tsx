// src/app/page.tsx
import FetchHello from '../components/FetchHello';
import ConsignatariaForm from '../components/ConsignatariaForm';
import ServidorForm from '../components/ServidorForm';
import ConsultaMargemForm from '../components/ConsultaMargemForm';
import ReservaForm from '../components/ReservaForm';

const HomePage = () => {
  return (
    <div>
      <h1>Bem-vindo ao Sistema de Consulta de margem de Crédito e Reservas da Defensoria Pública de Rondônia</h1>
      <FetchHello />
      <ConsignatariaForm />
      <ServidorForm />
      <ConsultaMargemForm />
      <ReservaForm />
    </div>
  );
};

export default HomePage;
