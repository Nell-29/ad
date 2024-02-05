export const changeColorRGB =() =>{
    //creamos la  una funcion dentro de la principal//

    const randomNumber = (min,max) =>{
        min = Math.ceil(min);
        console.log(min);
        max = Math.floor(max);
        console.log(max);
        const random = Math.floor(Math.random() * (max - min +1) + min );
        console.log(random);

        return random;
    };

    //llamamos esa funcion y le pasamos el min y max para generar los R G B//

    let R = randomNumber(0, 255);
    let G = randomNumber(0, 255);
    let B = randomNumber(0, 255);
    let A = Math.random();

const color = `rgba(${R},${G},${B},~${A})`;
return color;

};