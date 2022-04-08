export interface ClienteI {
    //variables a utilizar
    id_cli: number,
    nombres_cli: string,
    apellidos_cli: string,
    ciruc_cli: string,
    direccion_cli: string,
    telefono_cli: string,
    email_cli: string,
    created_at: Date,
    token?: string
}