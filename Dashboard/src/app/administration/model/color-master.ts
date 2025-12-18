export interface ColorMasterData {
    _id?: string; 
    colorCode: string;
    name: string;
    modifiedBy?: string; // Assuming modifiedBy is a string in the MongoDB document
    modifiedOn?: Date; // Assuming modifiedOn is an optional Date in the MongoDB document
  }
  export interface ApiResponse<T> {
    data: T | T[];
    // Add other properties as needed.
  }  