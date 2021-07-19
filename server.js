const http = require("http");
const fs = require("fs");
const url = require("url");
const {v4} = require("uuid")
const retornoPromesaMailer = require('./mailer')
const crearPlantilla = require('./miindicador')
const templateCorreo = require('./mailTemplate')

http
  .createServer( async (req, res) => {
    const {correos,asunto,contenido} = url.parse(req.url,true).query

    if (req.url == "/") {
      fs.readFile("public/index.html", "utf8", (err, html) => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.end(JSON.stringify(err));
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      });
    } 
    
    else if (req.url == "/estilos") {
      fs.readFile("public/style.css", (err, css) => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.end(JSON.stringify(err));
        }
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(css);
      });
    } 

    else if (req.url == "/javascript") {
        fs.readFile("public/script.js", (err, js) => {
          if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end(JSON.stringify(err));
          }
          res.writeHead(200, { "Content-Type": "application/javascript" });
          res.end(js);
        });
      }   
      
      
      else if (req.url.startsWith("/mailing")) {
         try {
          const arrayDestinatarios = correos.split(",")
          const templateHtml = await crearPlantilla(contenido)          
          const respuestaCorreo = await retornoPromesaMailer(arrayDestinatarios,asunto,templateHtml)
          if(respuestaCorreo){
            res.write("Correo Enviado Exitosamente")
            const idCorreo = v4().slice(-6)
            const datosCorreo = templateCorreo(respuestaCorreo,asunto,templateHtml)
            fs.writeFileSync(`./correos/${idCorreo}.json`,datosCorreo)           
          }
          res.end()
         } catch (error) {
           console.log(error);
          res.end("No se puede enviar el correo");
         }
      }  

     else{
        fs.readFile("public/404.html", "utf8", (err, errorPage) => {
            if (err) {
              console.log(err);
              res.statusCode = 500;
              res.end(JSON.stringify(err));
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(errorPage);
          });
        
    }
  })
  .listen(process.env.PORT || 3000);
