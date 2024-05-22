export interface Admin {
   id: number;
   email: string;
   name?: string;
   password: string;
   last_login?: string;
 }

 export interface User {
   id: number;
   email: string;
   name?: string;
   password: string;
   is_verified: boolean;
   otp?: number;
   last_login?: string;
   created_at: string;
   updated_at?: string;
   onRent: RentedCar[];
   onWishlist: WishlistedCar[];
 }

 export interface Model {
   id: number;
   brand: string;
   name: string;
   power: number;
   acceleration: number;
   topSpeed: number;
   price: number;
   rent: number;
   published: boolean;
   imageSource: string;
   carId: number;
   rentedBy: RentedCar[];
   wishlistedBy: WishlistedCar[];
 }

 export interface RentedCar {
   id: number;
   carId: number;
   rentedtoId: number;
   startDate: string;
   endDate: string;
   status: boolean;
   rentedto: User;
   car: Model;
 }

 export interface WishlistedCar {
   id: number;
   carId: number;
   wishlistedbyId: number;
   car: Model;
   wishlistedby: User;
 }
