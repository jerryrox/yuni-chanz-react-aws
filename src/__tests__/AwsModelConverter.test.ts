import AwsModelConverter from "../lib/data/AwsModelConverter";

class TestConverter extends AwsModelConverter {

    toModel(data: any) {
        return data;
    }

    toPlain(model: any) {
        return model;
    }
}

test("AWS data encode functions", () => {
    const converter = new TestConverter();

    expect(converter.encodeNumber(1)).toMatchObject({
        N: "1",
    });
    expect(converter.encodeNumber(1.5)).toMatchObject({
        N: "1.5",
    });

    expect(converter.encodeString("lolz")).toMatchObject({
        S: "lolz",
    });

    expect(converter.encodeBool(true)).toMatchObject({
        BOOL: true,
    });

    expect(converter.encodeStringArray(["lol", "z", "a"])).toMatchObject({
        SS: ["lol", "z", "a"],
    });

    expect(converter.encodeNumberArray([5, 10, 15.5])).toMatchObject({
        NS: ["5", "10", "15.5"],
    });

    expect(converter.encodeDate(new Date(2020, 1, 0))).toMatchObject({
        S: new Date(2020, 1, 0).toISOString(),
    });
});

test("AWS data decode functions", () => {
    const converter = new TestConverter();

    expect(converter.decodeInt({
        N: "5"
    })).toBe(5);
    expect(converter.decodeFloat({
        N: "5.5"
    })).toBeCloseTo(5.5);

    expect(converter.decodeString({
        S: "lol",
    })).toBe("lol");

    expect(converter.decodeBool({
        BOOL: false,
    })).toBe(false);

    expect(converter.decodeStringArray({
        SS: ["a", "b", "c"]
    })).toMatchObject(["a", "b", "c"]);

    expect(converter.decodeIntArray({
        NS: ["5.5", "4", "3"]
    })).toMatchObject([5, 4, 3]);
    expect(converter.decodeIntArray({
        NS: ["5.5", "adcb", "3"]
    })).toBeNull();

    expect(converter.decodeFloatArray({
        NS: ["5.5", "4", "3"]
    })).toMatchObject([5.5, 4, 3]);
    expect(converter.decodeFloatArray({
        NS: ["5.5", "adcb", "3"]
    })).toBeNull();

    expect(converter.decodeDate({
        S: new Date(2020, 1, 0).toISOString(),
    })?.getTime()).toBe(new Date(2020, 1, 0).getTime());
});