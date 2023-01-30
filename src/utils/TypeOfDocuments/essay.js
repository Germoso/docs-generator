export const introductionStructure = (prompt) => {
    return `
    Dame la estructura de la Introduccion de un ensayo sobre "${prompt}"

    Ejemplo:
        I. Introducción 
        A. Breve descripción de los bulldogs
        B. Resumen de la historia de los bulldogs
        C.Declaración de la tesis
    `
}

export const bodyStructure = (prompt) => {
    return `
    Dame la estructura del Cuerpo de un ensayo sobre "${prompt}"

    Ejemplo:
        II. Cuerpo del ensayo 
        A. Características de los bulldogs y su comportamiento
        B. Descripción de los cuidados necesarios para los bulldogs
        C.Características principales que distinguen a los bulldogs
    `
}

export const conclusionStructure = (prompt) => {
    return `
    Dame la estructura de la Conclusion de un ensayo sobre "${prompt}"

    Ejemplo:
        III. Conclusión 
        A. Resumen de las principales características y descripción de los bulldogs 
        B. Resumen de los cuidados necesarios para los bulldogs
        C. Declaración final apoyando la tesis 
    `
}

export const requestStructure = (prompt) => {
    return `
    Desarrolla extensamente lo siguiente dentro de etiquetas html: 
        ${prompt}

    Debe de cumplir con las siguientes caracteristicas: 
        - parrafos separados en etiquetas <p> individuales
        - de 2 a 3 parrafos minimos por tema
        - Titulos y subtitulos (si es necesario)
        - No imagenes
    `
}
