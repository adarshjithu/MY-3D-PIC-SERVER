import {Document} from 'mongoose'

export interface IShape extends Document{
 name:string;
 image:string;
 isActive:boolean
}