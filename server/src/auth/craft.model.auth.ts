import { sql } from "./artisans.model.auth";
import { Request, Response } from "express";

interface craft {
    craftId: string;
    userId: string;
    description: string;
    images: string[];
    price_rate: number;
    charge_per_hour: number;
    product: string;
  }
  export const craft: craft = {
    craftId: "",
    userId: "",
    description: "",
    images: [],
    price_rate: 0,
    charge_per_hour: 0,
    product: "",
};

export const createCraftTable = async(req: Request,  res: Response) => {
    const client = await sql.connect()
    try {
        client.query(`CREATE TABLE IF NOT EXISTS Craft (
            id SERIAL ,
            craftID UUID PRIMARY KEY, 
            userId UUID REFERENCES Artisan(UserId),
            description TEXT NOT NULL,
            images VARCHAR[],
            price_rate INT NOT NULL,
            charge_per_hour INT NOT NULL,
            product VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`)
        res.send('Table has been created')
    } catch (error) {
        if (error) console.error(error)
    }
}

