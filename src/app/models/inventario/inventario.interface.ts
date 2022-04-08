export interface InventarioI {
    id_inv?: number,
    id_usuario: number,
    id_proser: number,
    stockasignado_inv: number,
    stockentregado_inv: number,
    proyectos_inv: string,
    token?: string
}