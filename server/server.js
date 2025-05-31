const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const logger = require('./middlewares/logger');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());          // 모든 도메인 허용
app.use(express.json());
app.use(logger); // 로깅 미들웨어

// 라우팅
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});