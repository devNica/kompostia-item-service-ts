import { type Router } from 'express'

export interface EndPointModel {
    path: string
    controller: Router
}
