import { AttributeValue } from "@aws-sdk/client-dynamodb";

class DdbUtils {
    
    /**
     * Returns the specified number as DDB attribute value.
     */
    getNumberAV(value: number): AttributeValue {
        return {
            N: value.toString(),
        };
    }

    /**
     * Returns the specified string as DDB attribute value.
     */
    getStringAV(value: string): AttributeValue {
        return {
            S: value,
        };
    }

    /**
     * Returns the specified bool as DDB attribute value.
     */
    getBoolAV(value: boolean): AttributeValue {
        return {
            BOOL: value,
        };
    }

    /**
     * Returns the specified date as DDB attribute value.
     */
    getDateAV(value: Date): AttributeValue {
        return {
            S: value.toISOString(),
        };
    }

    /**
     * Returns the specified string array as DDB attribute value.
     */
    getStringArrayAV(value: string[]): AttributeValue {
        return {
            SS: value,
        };
    }

    /**
     * Returns the specified numberarray as DDB attribute value.
     */
    getNumberArrayAV(value: number[]): AttributeValue {
        return {
            NS: value.map((v) => v.toString()),
        };
    }
}
export default new DdbUtils();