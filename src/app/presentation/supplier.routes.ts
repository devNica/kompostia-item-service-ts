import { createSupplierFactory } from "@app/factories/supplier/create.factory";
import { getSupplierFactory } from "@app/factories/supplier/get.factory";
import { listSupplierFactory } from "@app/factories/supplier/list.factory";
import { updateSupplierFactory } from "@app/factories/supplier/update.factory";
import { expressRouteAdapter } from "@core/infrastructure/express/express-route-adapter";
import { Router } from "express";


export const supplierRouter = Router()

supplierRouter.post('/', expressRouteAdapter(createSupplierFactory))
supplierRouter.put('/:supplierId', expressRouteAdapter(updateSupplierFactory))
supplierRouter.get('/:supplierId', expressRouteAdapter(getSupplierFactory))
supplierRouter.get('/', expressRouteAdapter(listSupplierFactory))