/**
 * @interface PaginationParams
 *
 * @property skip : number
 * @property take : number
 */

export interface PaginationParams {
  skip: number;
  take: number;
}


/**
 * @interface PaginationParams
 *
 * @property status : number
 * @property message : string 
 * @property errors : object
 */
export interface Result {
  status: number;
  message: string;
  errors: { [key: string]: any } | null;
}
