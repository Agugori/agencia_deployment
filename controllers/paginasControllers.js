import { Viaje } from '../model/Viaje.js';
import { Testimonial } from '../model/Testimoniales.js';

const paginaInicio =  async (req, res) => { // req - lo que enviamos, res - lo que express nos responde
    
    const promiseDB = [];

    promiseDB.push( Viaje.findAll({limit: 3}) )
    promiseDB.push( Testimonial.findAll({limit: 3}) )

     try {
         const result = await Promise.all( promiseDB );
         res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: result[0],
            testimoniales: result[1]
        })
     } catch (error) {
         console.log(error)
     }
}

const paginaNosotros =  (req, res) => { 

    res.render('nosotros',{
        pagina: 'Nosotros'
    })
}

const paginaViajes =  async (req, res) => { 
    //consultar DB
    const viajes = await Viaje.findAll();
    console.log(viajes)

    res.render('viajes',{
        pagina: 'Proximos Viajes',
        viajes,
    })
}

const paginaTestimoniales =  async (req, res) => { 

    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        })
    } catch (error) {
        console.log(error)
    }
   
}

const paginaDetalleViajes = async (req, res) => {

    const { slug } = req.params;

    try {
        const viaje = await  Viaje.findOne({ where: { slug }});

        res.render('viaje',{
            pagina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViajes
}