import { Model } from "./Model";

export interface WishlistedCar {
   id: number;
   carId: number;
   wishlistedbyId: number
 }

 export interface WishlistedModel {
  model: Model
  wishlistedCarId: number
 }
