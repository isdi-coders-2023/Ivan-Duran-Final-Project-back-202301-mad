import { Router, Router as router } from 'express';
import { AikidoUsersController } from '../../application/controllers/aikido.users.controllers.js';
import { Interceptors } from '../middleware/interceptors.middleware.js';
import ServerRouter from '../server.router.js';

export default class AikidoUserRouter implements ServerRouter {
  path: string = '/aikido-users';
  router: Router = router();

  // eslint-disable-next-line no-unused-vars
  constructor(private aikidoUsersControllers: AikidoUsersController) {
    this.registerControllers();
  }

  registerControllers(): void {
    this.router.post(
      '/register',
      this.aikidoUsersControllers.register.bind(this.aikidoUsersControllers)
    );

    this.router.post(
      '/login',
      this.aikidoUsersControllers.login.bind(this.aikidoUsersControllers)
    );

    this.router.get(
      '/users/list/:id?:id',
      Interceptors.logged,
      this.aikidoUsersControllers.getUsersCategorized.bind(
        this.aikidoUsersControllers
      )
    );

    // Queda comentado por si acaso => Funcionaba
    // this.router.get(
    //   '/users/senseis?:id',
    //   Interceptors.logged,
    //   this.aikidoUsersControllers.getSenseisCategorized.bind(
    //     this.aikidoUsersControllers
    //   )
    // );
    // this.router.get(
    //   '/users/students?:id',
    //   Interceptors.logged,
    //   this.aikidoUsersControllers.getStudentsCategorized.bind(
    //     this.aikidoUsersControllers
    //   )
    // );

    this.router.get(
      '/users/:id',
      Interceptors.logged,
      this.aikidoUsersControllers.getUserById.bind(this.aikidoUsersControllers)
    );
  }
}
