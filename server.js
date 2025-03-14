const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const qr = require('qrcode');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

/*AQUI VAN LOS DETALLES DE SUS MAQUINAS LOCALES,NO MODIFICAR NADA*/
const db = mysql.createConnection({
  host: '192.168.18.4',
  user: 'node_user',
  password: 'Zapatitoblanco123',
  database: 'SCGEM',
});



// Role constants
const ROLES = {
  MOSTRADOR: '1',
  INVENTARIOS: '2',
  ADMINISTRATIVO: '3',
  ADMIN: '99'
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication required' });


  jwt.verify(token, 'aVeryStrongSecretKeyHere', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });

};

// Role check middleware
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.user_role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT *, ALUMNOS.matricula FROM USUARIOS JOIN ALUMNOS ON USUARIOS.id_user = ALUMNOS.matricula WHERE user_name = ?;', [username], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (result.length === 0 || result[0].password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result[0];
    const token = jwt.sign({
        user_id: user.id_user,
        user_name: user.user_name,
        user_role: user.user_role,
        user_matricula: user.matricula
      },
      'aVeryStrongSecretKeyHere',
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user_role: user.user_role,
      user_id: user.id_user,
      user_matricula: user.matricula
    });
  });
});