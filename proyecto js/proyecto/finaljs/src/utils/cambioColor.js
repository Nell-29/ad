export const changeColorRGB= () => {
    // CREAMOS UNA FUNCION DENTRO DE LA PRINCIPAL
    const randomNumber= (min,max)=>{
        min= Math.ceil(min);
        console.log(min);
        max= Math.floor(max);
        console.log(max);
        const random = Math.floor(Math.random() * (max - min + 1)+ min);
        console.log(random);

        return random;
    };

 // LAMAMOS ESA FUNCION Y LE PASAMOS EL MIN Y MAX PARA GENERAR LOS R G B
    
    let R= randomNumber(0,255);
    let G= randomNumber(0,255);
    let B= randomNumber(0,255);
    let A= Math.random();

    const color= `rgba(${R},${G},${B},${A})`;
    return color;
};
