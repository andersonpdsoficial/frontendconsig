//função para trasformar os meses de number para strings
const getMonthName = (month) => {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return months[month - 1];
};


// Função para formatar a data
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('pt-BR', options).format(new Date(dateString));
};

 // Função para formatar o valor monetário
 const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

 // Function to generate the next 4 months and years
 const generateNextDates = (startMonth, startYear) => {
  const dates = [];
  let month = startMonth;
  let year = startYear;

  for (let i = 0; i < 4; i++) {
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
    dates.push({ month, year });
  }

  return dates;
};


