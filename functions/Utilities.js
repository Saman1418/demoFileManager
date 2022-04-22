const autherizeUser = async (autherizationHeader , firebaseAuth) => {
    if(!autherizationHeader){
        throw 'no authorization provided!';
    }

    const token = autherizationHeader.split(" ")[1];

    try {
        const decodedToken = await firebaseAuth.verifyIdToken(token);

        return decodedToken;
    } catch (error) {
        throw error;
    }
};


const validateRecipePostPut = (newpatient) =>{
    let missingFields = "";

    if(!newpatient){
        missingFields += "patient";

        return missingFields;
    }

    if(!newpatient.FirstName){
        missingFields += "FirstName";
    }


    if(!newpatient.LastName){
        missingFields += "LastName";
    }


    if(!newpatient.Age){
        missingFields += "Age";
    }


    if(!newpatient.Gender){
        missingFields += "Gender";
    }
    
    if(!newpatient.Email){
        missingFields += "Email";
    }


    if(!newpatient.PhoneNumber){
        missingFields += "PhoneNumber";
    }



    if(!newpatient.State){
        missingFields += "State";
    }


    return missingFields;

    // use all fields as mentions----------------
}


const sanitizeRecipePostPut = (newpatient)=>{
    const patient = {};

    patient.FirstName = newpatient.FirstName;
    patient.LastName = newpatient.LastName;
    patient.Age = newpatient.Age;
    patient.Gender = newpatient.Gender;
    patient.Email = newpatient.Email;
    patient.PhoneNumber = newpatient.PhoneNumber;
    patient.State = newpatient.State;
    

    return patient;
}


module.exports = {
    autherizeUser,
    validateRecipePostPut,
    sanitizeRecipePostPut,
}