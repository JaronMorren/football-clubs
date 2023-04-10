import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateLogin from '../middleware/loginValidations';
import validateToken from '../middleware/tokenValidations';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', validateLogin, (request, response) => {
  loginController.userLogin(request, response);
});

loginRouter.get('/role', validateToken, (request, response) => {
  loginController.getUserRole(request, response);
});

export default loginRouter;
