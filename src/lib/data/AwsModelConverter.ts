import { ModelConverter } from "yuni-chanz-react";

export default abstract class AwsModelConverter<T = any> extends ModelConverter<T> {
    
    /**
     * Encodes the specified date instance to a storable type.
     */
    encodeDate(date: Date): string {
        return date.toISOString();
    }
}