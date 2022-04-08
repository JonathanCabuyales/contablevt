export interface ProsernuevoI {
    //variables a utilizar
    id_proser: number,
    id_prove?: string,
    codigo_proser: string,
    categoria_proser: string,
    nombre_proser: string,
    descripcion_proser: string,
    precio_proser: number,
    preciosugerido_proser?: string,
    cantidad_proser: number,
    cantidadfinal_proser: number,
    lote_proser?: string,
    IVA_proser: string,
    created_at?: string,
    token?: string,

    // estas variables son para calcular el total de cada item en la factura
    // son opcionales ya que no seran declaradas para insertar o actualizar informacion en la base de datos
    // solo se ocuaparan en la creacion de la factura

    subtotal12?: string,
    subtotal0?: string,
    notaVenta?: string,
    iva12?: string,
    iva0?: string,
    total?: string,
    cantidadvendida?: string
}