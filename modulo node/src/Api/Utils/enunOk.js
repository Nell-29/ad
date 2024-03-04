const EnumOK = (gender) => {
    const enumGender = ["hombre", "mujer", "otro"];
    if (enumGender.includes(gender)) {
        return { check:true, gender};
    } else {
        return {check: false};
    } 
}; 

// exportamos el modulo

module.exports= EnumOK;