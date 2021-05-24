import { DdbUtils } from "../lib";
import AttributeExpression from "../lib/data/AttributeExpression";

test("No input outputs undefined result fields", () => {
    const expression = new AttributeExpression();
    const result = expression.build();
    expect(result.UpdateExpression).toBeUndefined();
    expect(result.ExpressionAttributeNames).toBeUndefined();
    expect(result.ExpressionAttributeValues).toBeUndefined();
});

test("Expression output with only SET action", () => {
    const expression = new AttributeExpression();
    expression.setAttribute("asdf", DdbUtils.getStringAV("a"));

    let result = expression.build();
    expect(result.UpdateExpression).toBe("SET #asdf = :asdf");
    expect(result.ExpressionAttributeNames).toMatchObject({
        "#asdf": "asdf",
    });
    expect(result.ExpressionAttributeValues).toMatchObject({
        ":asdf": {
            S: "a",
        },
    });

    expression.setAttribute("asdf2", DdbUtils.getStringAV("b"));
    result = expression.build();
    expect(result.UpdateExpression).toBe("SET #asdf = :asdf, #asdf2 = :asdf2");
    expect(result.ExpressionAttributeNames).toMatchObject({
        "#asdf": "asdf",
        "#asdf2": "asdf2",
    });
    expect(result.ExpressionAttributeValues).toMatchObject({
        ":asdf": {
            S: "a",
        },
        ":asdf2": {
            S: "b",
        },
    });
});

test("Expression output with only ADD action", () => {
    const expression = new AttributeExpression();
    expression.addAttribute("asdf", DdbUtils.getNumberAV(1));

    let result = expression.build();
    expect(result.UpdateExpression).toBe("ADD #asdf :asdf");
    expect(result.ExpressionAttributeNames).toMatchObject({
        "#asdf": "asdf",
    });
    expect(result.ExpressionAttributeValues).toMatchObject({
        ":asdf": {
            N: "1",
        },
    });

    expression.addAttribute("asdf2", DdbUtils.getNumberArrayAV([2, 3]));
    result = expression.build();
    expect(result.UpdateExpression).toBe("ADD #asdf :asdf, #asdf2 :asdf2");
    expect(result.ExpressionAttributeNames).toMatchObject({
        "#asdf": "asdf",
        "#asdf2": "asdf2",
    });
    expect(result.ExpressionAttributeValues).toMatchObject({
        ":asdf": {
            N: "1",
        },
        ":asdf2": {
            NS: ["2", "3"],
        },
    });
});

test("Expression output with only DELETE action", () => {
    const expression = new AttributeExpression();
    expression.deleteAttribute("asdf", DdbUtils.getNumberArrayAV([1, 2]));

    let result = expression.build();
    expect(result.UpdateExpression).toBe("DELETE #asdf :asdf");
    expect(result.ExpressionAttributeNames).toMatchObject({
        "#asdf": "asdf",
    });
    expect(result.ExpressionAttributeValues).toMatchObject({
        ":asdf": {
            NS: ["1", "2"],
        },
    });

    expression.deleteAttribute("asdf2", DdbUtils.getStringArrayAV(["a", "b"]));
    result = expression.build();
    expect(result.UpdateExpression).toBe("DELETE #asdf :asdf, #asdf2 :asdf2");
    expect(result.ExpressionAttributeNames).toMatchObject({
        "#asdf": "asdf",
        "#asdf2": "asdf2",
    });
    expect(result.ExpressionAttributeValues).toMatchObject({
        ":asdf": {
            NS: ["1", "2"],
        },
        ":asdf2": {
            SS: ["a", "b"],
        },
    });
});

test("Expression output with only REMOVE action", () => {
    const expression = new AttributeExpression();
    expression.removeAttribute("asdf");

    let result = expression.build();
    expect(result.UpdateExpression).toBe("REMOVE #asdf");
    expect(result.ExpressionAttributeNames).toMatchObject({
        "#asdf": "asdf",
    });
    expect(result.ExpressionAttributeValues).toBeUndefined();

    expression.removeAttribute("asdf2");
    result = expression.build();
    expect(result.UpdateExpression).toBe("REMOVE #asdf, #asdf2");
    expect(result.ExpressionAttributeNames).toMatchObject({
        "#asdf": "asdf",
        "#asdf2": "asdf2",
    });
    expect(result.ExpressionAttributeValues).toBeUndefined();
});

test("Expression output with multiple actions", () => {
    const expression = new AttributeExpression();
    expression.addAttribute("a", DdbUtils.getNumberArrayAV([1]));
    expression.deleteAttribute("b", DdbUtils.getStringArrayAV(["xyz"]));
    expression.removeAttribute("c");
    expression.setAttribute("d", DdbUtils.getBoolAV(true));

    const result = expression.build();
    expect(result.UpdateExpression).toBe("ADD #a :a, DELETE #b :b, REMOVE #c, SET #d = :d");
    expect(result.ExpressionAttributeNames).toMatchObject({
        "#a": "a",
        "#b": "b",
        "#c": "c",
        "#d": "d",
    });
    expect(result.ExpressionAttributeValues).toMatchObject({
        ":a": {
            NS: ["1"],
        },
        ":b": {
            SS: ["xyz"],
        },
        ":d": {
            BOOL: true,
        },
    });
});

test("AttributeExpression.setFromPlain", () => {
    const expression = AttributeExpression.setFromPlain({
        a: DdbUtils.getStringAV("abc"),
        b: DdbUtils.getNumberAV(123),
    });
    const result = expression.build();
    expect(result.UpdateExpression).toBe("SET #a = :a, #b = :b");
    expect(result.ExpressionAttributeNames).toMatchObject({
        "#a": "a",
        "#b": "b",
    });
    expect(result.ExpressionAttributeValues).toMatchObject({
        ":a": {
            S: "abc",
        },
        ":b": {
            N: "123",
        },
    });
});