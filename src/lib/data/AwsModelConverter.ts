import { ModelConverter } from "yuni-chanz-react";
import { AttributeValue as DdbAttributeValue } from "@aws-sdk/client-dynamodb";
import { AttributeValue as DdbsAttributeValue } from "@aws-sdk/client-dynamodb-streams";
import DdbUtils from "../utils/DdbUtils";

export default abstract class AwsModelConverter<T = any> extends ModelConverter<T> {
    
    /**
     * Encodes the specified number value to a DDB attribute value.
     */
    encodeNumber(value: number): DdbAttributeValue | DdbsAttributeValue {
        return DdbUtils.getNumberAV(value);
    }

    /**
     * Encodes the specified string value to a DDB attribute value.
     */
    encodeString(value: string): DdbAttributeValue | DdbsAttributeValue {
        return DdbUtils.getStringAV(value);
    }

    /**
     * Encodes the specified bool value to a DDB attribute value.
     */
    encodeBool(value: boolean): DdbAttributeValue | DdbsAttributeValue {
        return DdbUtils.getBoolAV(value);
    }

    /**
     * Encodes the specified string array value to a DDB attribute value.
     */
    encodeStringArray(value: string[]): DdbAttributeValue | DdbsAttributeValue {
        return DdbUtils.getStringArrayAV(value);
    }

    /**
     * Encodes the specified number array value to a DDB attribute value.
     */
    encodeNumberArray(value: number[]): DdbAttributeValue | DdbsAttributeValue {
        return DdbUtils.getNumberArrayAV(value);
    }

    /**
     * Encodes the specified date instance to a storable type.
     */
    encodeDate(value: Date): DdbAttributeValue | DdbsAttributeValue {
        return DdbUtils.getDateAV(value);
    }

    /**
     * Decodes the specified raw value to an int.
     */
    decodeInt(value: (DdbAttributeValue | DdbsAttributeValue)): number | null {
        return super.decodeInt(value.N);
    }

    /**
     * Decodes the specified raw value to a float.
     */
    decodeFloat(value: (DdbAttributeValue | DdbsAttributeValue)): number | null {
        return super.decodeFloat(value.N);
    }

    /**
     * Decodes the specified raw value to a string.
     */
    decodeString(value: (DdbAttributeValue | DdbsAttributeValue)): string | null {
        return super.decodeString(value.S);
    }

    /**
     * Decodes the specified raw value to a bool.
     */
    decodeBool(value: (DdbAttributeValue | DdbsAttributeValue)): boolean | null {
        return super.decodeBool(value.BOOL);
    }

    /**
     * Decodes the specified raw value to a string array.
     */
    decodeStringArray(value: (DdbAttributeValue | DdbsAttributeValue)): string[] | null {
        return value.SS ?? null;
    }

    /**
     * Decodes the specified raw value to an integer array.
     */
    decodeIntArray(value: (DdbAttributeValue | DdbsAttributeValue), radix = 10): number[] | null {
        if(value.NS === undefined) {
            return null;
        }
        const intArray: number[] = [];
        for(const v of value.NS) {
            const val = super.decodeInt(v, radix);
            if(val === null) {
                return null;
            }
            intArray.push(val);
        }
        return intArray;
    }

    /**
     * Decodes the specified raw value to a float array.
     */
    decodeFloatArray(value: (DdbAttributeValue | DdbsAttributeValue)): number[] | null {
        if(value.NS === undefined) {
            return null;
        }
        const intArray: number[] = [];
        for(const v of value.NS) {
            const val = super.decodeFloat(v);
            if(val === null) {
                return null;
            }
            intArray.push(val);
        }
        return intArray;
    }

    /**
     * Decodes the specified raw value to a Date instance.
     */
    decodeDate(value: (DdbAttributeValue | DdbsAttributeValue)): Date | null {
        return super.decodeDate(value.S);
    }
}