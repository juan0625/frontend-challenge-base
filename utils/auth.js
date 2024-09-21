import jwt from 'jsonwebtoken';

export const login = (username, password) => {
  // Aquí deberías hacer una validación real
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  } else {
    throw new Error('Credenciales inválidas');
  }
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
