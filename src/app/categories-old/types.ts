export interface SubCategory {
    id:string;
    name:string;
    slug:string;
}

export interface Category {
    id:string;
    name:string;
    slug:string;
    subcategories: SubCategory[];
    image: string;
}