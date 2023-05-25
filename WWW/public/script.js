function buscar() {
  const matricula = $('#matricula').val();

  $.ajax({
    url: '/resultados',
    method: 'GET',
    data: { matricula: matricula },
    success: function(data) {
      const resultadosContainer = $('#resultados-container');
      resultadosContainer.empty();

      if (data.length > 0) {
        resultadosContainer.append('<h2>Resultados</h2>');
        data.forEach((row) => {
          resultadosContainer.append('<p>' + row.COURSE_OFFERING_ID + '</p>');
        });
      } else {
        resultadosContainer.append('<p>No se encontraron resultados</p>');
      }
    },
    error: function() {
      alert('Error al obtener los datos del servidor');
    }
  });
}
