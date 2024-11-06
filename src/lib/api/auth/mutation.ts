
export const login = async ({ ...props }: {
    email: string,
    password: string
}) => {
    console.log(props)
}

export const register = async ({...props} : {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}) => {
    console.log(props)
}