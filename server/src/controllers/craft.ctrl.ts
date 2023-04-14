import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { sql } from "../auth/artisans.model.auth";
import { deleteFromCraftByProduct, findOneCraftByUserId, insertNewArtisan, insertNewCraft, updateCraft } from "../auth/queries";
import { craft } from "../auth/craft.model.auth";
import { v4 } from "uuid";
export const craftGetMethod = (req: Request, res: Response) => {
    res.status(200).send('The Page is available')
};
export const craftPostMethod = (req: Request, res: Response) => {
    const {
         description, 
         images, 
         price_rate, 
         charge_per_hour, 
         product
    } = req.body
    const cookie = req.cookies['thisIsMyToken']
    console.log(cookie)
    if(!cookie) {
        res.status(401).send('User needs to be logged in')
    }else{
        verify(cookie, 'thisIsACommonSecret', (err: any, data: any) => {
            if(err) {
                res.status(500).send(err.message)
            }else{
                const userEmail = data.username
                const userID = data.id
                console.log(userEmail, userID)
                const userid = userID.toString()
                const craftid = v4()

                craft.craftId = craftid
                craft.userId = userid
                craft.description = description
                craft.images = images
                craft.price_rate = price_rate
                craft.charge_per_hour = charge_per_hour
                craft.product = product
                if(userEmail !== 'undefined' || userID !== undefined){
                    sql.query(findOneCraftByUserId, [craft.craftId, craft.userId], (err, result) => {
                        if(result){
                            res.status(401).send('product and craft already exists');
                        }else{
                            sql.query(insertNewCraft, [
                                craft.craftId,
                                craft.userId,
                                craft.description,
                                craft.images,
                                craft.price_rate,
                                craft.charge_per_hour,
                                craft.product
                            ], (err, result) => {
                                if(err) {
                                    res.status(403).send(err.message)
                                }else{
                                    res.status(201).send('craft and product saved for user')
                                }
                            })
                        }
                    })
                }
            }
        })

    }
    
    
}
export const craftDeleteMethod = (req: Request, res: Response) => {
    const token = req.cookies['thisIsMyToken']
    if(!token) {
        res.send('User not logged in')
    }else{
        verify(token,  'thisIsACommonSecret', (err: any, data: any) => {
            const userID = data.id;
            const product = req.params.product;
            console.log(product, userID);
            sql.query(deleteFromCraftByProduct, [product, userID], (err, result) => {
                if(err) {
                    res.status(401).send(err.message)
                }else{
                    res.send('Product deleted successfully')
                }
            })
    

        })
    }
    
};
export const craftUpdateMethod = (req: Request, res: Response) => {
    const {
        description,
        images, 
        price_rate,
        charge_per_hour,
        product
    } = req.body
    const token = req.cookies['thisIsMyToken']
    if(!token) {
        res.send('User not logged in')
    }else{
        verify(token,  'thisIsACommonSecret', (err: any, data: any) => {
            const userID = data.id;
            sql.query(updateCraft, [description, images, price_rate, charge_per_hour, product, userID], (err, result) => {
                if(err) {
                    res.status(401).send(err.message)
                }else{
                    res.send('Product updated successfully')
                }
            })
    

        })
    }
    
};