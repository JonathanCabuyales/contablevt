export interface NotificacionI {
    id_noti: number,
    numerocuenta_ins: string,
    ciruc_cli: string,
    nombres: string,
    direccion_cat: string,
    clavecatastral: string,
    medidor: string,
    tarifa: string,
    mesesdeuda: string,
    fotoPredio: string,
    fotoNotificacion: string,
    grupoCorte: string,
    create_at?: string
}