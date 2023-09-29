const cleanErrors = (form: HTMLElement) => {
    let allInputs = Array.from(form.querySelectorAll<HTMLElement>('input'))
    let allTextareas = Array.from(form.querySelectorAll<HTMLElement>('textarea'))
    let allSelects = Array.from(form.querySelectorAll<HTMLElement>('select'))

    let allFields = [...allInputs, ...allTextareas, ...allSelects]
    
    allFields.forEach(field => {
        field.classList.remove('has-error')
        let errorMessage = field.nextElementSibling as HTMLElement
        errorMessage.innerText = ''
    })
}

const showErrors = (message: string = 'Oops... An error ocurred', form: HTMLElement) => {
    let errors = JSON.parse(message)

    errors.forEach((error: any) => {
        let fieldWithError = form.querySelector<HTMLElement>(`.field [name="${error.path[0] ?? 'passwordRepeat'}"]`)
        
        if(fieldWithError) {
            fieldWithError.classList.add('has-error')
            let errorMessage = fieldWithError.nextElementSibling as HTMLElement
            errorMessage.innerText = error.message
        }
    })
}

export { cleanErrors, showErrors }