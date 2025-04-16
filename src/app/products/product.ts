export interface Product {     
    id: number;
    brand: string;  
    title: string;    
    price: number;     
    description: string;     
    category: string;     
    image: string;     
    rating?: {         
        rate: number;         
        count: number;     
    } 
}

export type Category = 'all' | 'electronics' | 'jewelery' | 'men\'s clothing' | 'women\'s clothing';
