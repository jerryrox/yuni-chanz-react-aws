import { AttributeValue as DdbAttributeValue } from "@aws-sdk/client-dynamodb";
import { AttributeValue as DdbsAttributeValue } from "@aws-sdk/client-dynamodb-streams";

class DdbUtils {
    
    /**
     * Returns the specified number as DDB attribute value.
     */
    getNumberAV(value: number): DdbAttributeValue | DdbsAttributeValue {
        return {
            N: value.toString(),
        };
    }

    /**
     * Returns the specified string as DDB attribute value.
     */
    getStringAV(value: string): DdbAttributeValue | DdbsAttributeValue {
        return {
            S: value,
        };
    }

    /**
     * Returns the specified bool as DDB attribute value.
     */
    getBoolAV(value: boolean): DdbAttributeValue | DdbsAttributeValue {
        return {
            BOOL: value,
        };
    }

    /**
     * Returns the specified date as DDB attribute value.
     */
    getDateAV(value: Date): DdbAttributeValue | DdbsAttributeValue {
        return {
            S: value.toISOString(),
        };
    }

    /**
     * Returns the specified string array as DDB attribute value.
     */
    getStringArrayAV(value: string[]): DdbAttributeValue | DdbsAttributeValue {
        return {
            SS: value,
        };
    }

    /**
     * Returns the specified numberarray as DDB attribute value.
     */
    getNumberArrayAV(value: number[]): DdbAttributeValue | DdbsAttributeValue {
        return {
            NS: value.map((v) => v.toString()),
        };
    }
}
export default new DdbUtils();