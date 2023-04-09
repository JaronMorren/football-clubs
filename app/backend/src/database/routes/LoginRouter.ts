import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateLogin from '../middleware/loginValidations';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', validateLogin, (request, response) => {
  loginController.userLogin(request, response);
});

export default loginRouter;
