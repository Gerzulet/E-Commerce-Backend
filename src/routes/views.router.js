import { Router } from 'express'

const router = Router()




router.get('/', (req, res) => {
  //Verificamos que hayamos iniciado sesion para ver las otras funcionalidades, DE TODAS MANERA SE VALIDA EL JWT, NO PUEDE ENTRAR CUALQUIERA
  let verification = req.cookies.coderCokieToken ? true : false
  res.render('index', { styleRoute: `<link href="../styles/index.css" rel="stylesheet">`, loggedin: verification })
})

router.get('/loggerTest', (req, res) => {
  req.logger.fatal("Este es un log a nivel fatal")
  req.logger.error("Este es un log a nivel error")
  req.logger.warning("Este es un log a nivel warning")
  req.logger.info("Este es un log a nivel info")
  req.logger.http("Este es un log a nivel http")
  req.logger.debug("Este es un log a nivel debug")
  res.send("Comprobar en consola los logs ")
})

export default router;
