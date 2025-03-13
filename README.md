# PRODUCT MICROSERVICE API V 1.0.0

### Request
```http
PUT /gnosys/api/v1/products/:productId
```
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `productId` | `uuid` | **true** | `Product Identifier` |


### Response

    HTTP/1.1 200 OK
    Content-Language: en
    Status: 200 OK
    Connection: keep-alive
    Keep-Alive: timeout-5
    Content-Type: application/json
 
    {
	    "message": 'Peticion Exitosa!', 
	    "meta": {
            "productName": string,
            "reference": string,
            "sku": string,
            "mask": string,
            "supplierProductName":string,
            "supplierProductCode":string,
            "supplier": {
                "supplierId": uuid,
                "supplierCode": string,
                "supplierName":string
            },
            "brand": {
                "brandId":uuid,
                "brandName":string
            },
            "category": {
                "categoryId": uuid,
                "path" : {
                    "categoryId" : uuid,
                    "name": string,
                    "nomeclature": string, 
                    "path": {
                        "categoryId" : uuid,
                        "name": string,
                        "nomeclature": string, 
                        "path": null | or recursive
                    }
                }
            },
            "location": {
                "locationId": uuid,
                "address": string,
                "path":{
                    "locationId": uuid,
                    "name": string,
                    "ref": string,
                    "type": string,
                    "path":{
                        "locationId": uuid,
                        "name": string,
                        "ref": string,
                        "type": string,
                        "path": null | or recursive
                    },
                }
            },
            "quality": {
                "qltId": uuid,
                "assurance": string,
                "maxPerformance": number,
                "minPerformance": number
            },
            "urls": [{ "url": string }] | [],
            "isActive": boolean,
            "createdAt": number
        }
	}
