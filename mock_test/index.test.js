import forEach from "./index";

describe("test mock function", () => {
  const myMock = jest.fn();

  const a = new myMock();
  const b = {
    mhname: "1"
  };
  const bound = myMock.bind(b);
  bound();

  // * myMock 函数被实例化了两次
  it("function myMock was instantiated twice", () => {
    expect(myMock.mock.instances.length).toBe(2);
  });

  // * 第一个实例应该是a
  it("the first instance of myMock should be a", () => {
    expect(myMock.mock.instances[0]).toEqual(a);
  });

  // * 第二个实例应该是b
  it("the second instance of myMock should be b", () => {
    expect(myMock.mock.instances[1]).toEqual(b);
  });

  // * 第二个实例应该是 { mhname: "1" }
  // TODO 这有个问题就是 b === { mhname: "1" } 肯定是false 但是toEqual{ mhname: "1" }却可以通过
  it("the second instance of myMock should be { mhname: '1' }", () => {
    expect(myMock.mock.instances[1]).toEqual({ mhname: "1" });
  });
});

describe("test mock function in forEach", () => {
  let mockCallback;
  // * 在所有的用例运行之前
  beforeAll(() => {
    mockCallback = jest.fn(x => 42 + x);
    forEach([0, 1], mockCallback);
  });

  // * 此 mock 函数被调用了2次
  it("mockCallback is called for second times", () => {
    expect(mockCallback.mock.calls.length).toBe(2);
  });

  // * 第一次调用函数的第一个参数是0
  it("the first call's arguments[0] should be 0", () => {
    expect(mockCallback.mock.calls[0][0]).toBe(0);
  });

  // * 第一次调用函数的第二个参数是undefined
  it("the first call's arguments[1] should be undefined", () => {
    expect(mockCallback.mock.calls[0][1]).toBe(undefined);
  });

  // * 第二次调用函数的第一个参数是1
  it("the second call's arguments[1] should be 1", () => {
    expect(mockCallback.mock.calls[1][0]).toBe(1);
  });

  // * 第二次调用函数的第三个参数是undefined
  it("the second call's arguments[2] should be undefined", () => {
    expect(mockCallback.mock.calls[1][2]).toBe(undefined);
  });

  it("the first call's result should be 42", () => {
    // expect(mockCallback.mock.results[0]).toBe(42); // !这里其实会报错，因为返回的是一个对象

    expect(mockCallback.mock.results[0].value).toBe(42); // * 正确做法应该是这样的
    expect(mockCallback.mock.results[0]).toEqual({ type: "return", value: 42 }); // * 或者这样 不过一般是用上面的方式
  });

  it("the second call's result should be 43", () => {
    expect(mockCallback.mock.results[1].value).toBe(43);
  });
});
