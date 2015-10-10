describe("Test 1", function() {
	it("test function should be defined", function() {
		expect(test()).toBeDefined();
	});

	it("test should return test", function() {
		expect(test()).toEqual('test');
	});

	it("onready to be defined", function() {
		expect(onReady).toBeDefined();
	});

	it("onready to be defined", function() {
		onReady();
		expect(pageName).toBeDefined();
	});

});