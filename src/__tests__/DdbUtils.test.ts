import DdbUtils from "../lib/utils/DdbUtils";

test("Converting values to AttributeValues", () => {

    expect(DdbUtils.getNumberAV(1)).toMatchObject({
        N: "1",
    });
    expect(DdbUtils.getNumberAV(1.5)).toMatchObject({
        N: "1.5",
    });

    expect(DdbUtils.getStringAV("lolz")).toMatchObject({
        S: "lolz",
    });

    expect(DdbUtils.getBoolAV(true)).toMatchObject({
        BOOL: true,
    });

    expect(DdbUtils.getDateAV(new Date(2020, 1, 0))).toMatchObject({
        S: new Date(2020, 1, 0).toISOString(),
    });

    expect(DdbUtils.getStringArrayAV(["lol", "z", "a"])).toMatchObject({
        SS: ["lol", "z", "a"],
    });

    expect(DdbUtils.getNumberArrayAV([5, 10, 15.5])).toMatchObject({
        NS: ["5", "10", "15.5"],
    });
});