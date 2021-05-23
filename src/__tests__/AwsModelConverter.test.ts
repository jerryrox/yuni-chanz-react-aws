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

    const timestamp = converter.encodeDate(new Date(2020, 1, 0));
    expect(timestamp).toBe(new Date(2020, 1, 0).toISOString());
});

test("AWS data decode functions", () => {
    const converter = new TestConverter();

    const timestamp = new Date(2020, 1, 0).toISOString();
    expect(converter.decodeDate(timestamp)?.getTime()).toBe(new Date(2020, 1, 0).getTime());
});