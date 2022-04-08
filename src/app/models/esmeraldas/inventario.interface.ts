export interface InventarioEI{
    codigo: string,
    codigo_ant: string,
    descripcion: string,
    fabricante: string,
    noparte: string,
    cantidadmano: number,
    udm: string,
    conteo: string,
    ubicacion_ant: string,
    ubicacion_act?: string,
    latitude?: string,
    longitude?: string,
    foto?: string
}