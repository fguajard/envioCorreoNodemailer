const nodemailer = require('nodemailer')


const retornoPromesaMailer = async (para,asunto,contenido) =>{



let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:"nodemailerfguajard@gmail.com",
        pass:"Nodemailer"
    }
})

let mailOptions = {
    from: 'nodemailerfguajard@gmail.com',
    to:`${para}`,
    subject:`${asunto}`,    
    html: `${contenido}`,
}
return transporter.sendMail(mailOptions)
}


module.exports = retornoPromesaMailer