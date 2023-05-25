const express = require('express');
const app = express();
const oracledb = require('oracledb');

oracledb.initOracleClient();

const dbConfig = {
  user: 'UniversidadDB',
  password: 'universidad',
  connectString: 'localhost:1521/xepdb1'
};

app.get('/resultados', async (req, res) => {
  const { matricula } = req.query;

  try {
    const connection = await oracledb.getConnection(dbConfig);

    const query = `
      SELECT co.course_offering_id, co.course_offering_name, s.first_name || ' ' || s.last_name AS professor_name
      FROM Courses_offered co
      JOIN Staff_Cursos sc ON co.course_offering_id = sc.course_offering_id
      JOIN Staff s ON sc.staff_id = s.staff_id
      JOIN Estudiante_Cursos ec ON co.course_offering_id = ec.course_offering_id
      WHERE student_id = :matricula
    `;
    const result = await connection.execute(query, [matricula]);

    const data = result.rows.map(row => ({
      COURSE_OFFERING_ID: row[0]
    }));

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los datos de la base de datos' });
  }
});

app.use(express.static('public'));

const port = 3000

app.listen(port, () => {
console.log(`Servidor iniciado en http://localhost:${port}`);
});
