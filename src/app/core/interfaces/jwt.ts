export interface IJWT {
    authorities: Array<string>
    exp : number
    iat: number
    jti: string
    sub: string
}