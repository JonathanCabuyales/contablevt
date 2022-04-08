export interface MaximumI{
    tipo_comprobante: string,
    num_factura: string,
    emision: string,
    tipo_cuentas: string,
    forma_pago: string,
    tipo: string,
    subtotal_12: string,
    subtotal_0: string,
    iva_12: string,
    ice: string,
    propina: string,
    total: string,
    factura_user?: string,
    token?: string

}


export interface MaximumItemI{
    codigobarras: string,
    numerolote: string,
    fechaelaboracion: string,
    fechavencimiento: string,
    nombre_poser: string,
    descripcion: string,
    cantidad: string,
    precio: string,
    descuento: string,
    ivaSelccion: string,
    categoria: string,
}