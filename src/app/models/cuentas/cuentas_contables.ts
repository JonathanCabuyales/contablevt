export interface CuentasLibroI{
    id_libro?: string,
    tipo_compobante: string,
    fecha_emision: string,
    nom_factura: string,
    codigo: string,
    cuenta_libro: string,
    detalle: string,
    parcial: string,
    valor: string,
    debe_haber: string,
    cuenta_num: string,
    token?: string

}

export interface CuentasLibroNuevoI{
    id_libro?: string,
    tipo_compobante: string,
    fecha_emision: string,
    nom_factura: string,
    codigo: string,
    cuenta_libro: string,
    detalle: string,
    parcial: string,
    valor: string,
    debe_haber: string,
    cuenta_num: string,
    token?: string
}