export interface UsuarioI {
    //variables a utilizar
    id_usuario: number,
    nombres: string,
    apellidos: string,
    ciruc: string,
    direccion: string,
    email: string,
    telefono: string,
    usuario: string,
    contrasenia: string,
    rol: string,
    sueldo: string,
    fotoperfil: string,
    tipocontrato: string,
    create_at: Date,
    token?: string
}