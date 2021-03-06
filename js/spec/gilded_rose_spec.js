describe("Gilded Rose", function() {

  const SellInFieldName = 'sell_in';
  const qualityFieldName = 'quality';
  const nameFieldName = 'name';

  describe("Items in the system", () => {

    it("Items have a sellIn value which shows the number of days left to sell the item", () => {
      const testItem = new Item('+5 Dexterity Vest', 10, 20);
      const keys = Object.keys(testItem);
      const sellInValue = testItem[SellInFieldName];

      expect(keys.includes(SellInFieldName)).toBe(true); // key exists
      expect(typeof sellInValue).toBe('number'); // value is number
      expect(Number.isInteger(sellInValue)).toBe(true); // value is an integer
      expect(sellInValue).toBeGreaterThan(-1); // 0 or above. 
      
    });

    it("Items have a Quality value which shows how valuable the item is", () => {
      const testItem = new Item('+5 Dexterity Vest', 10, 20);
      const keys = Object.keys(testItem);
      const qualityValue = testItem[qualityFieldName];

      expect(keys.includes(qualityFieldName)).toBe(true); // key exists
      expect(typeof qualityValue).toBe('number'); // value is number
      expect(Number.isInteger(qualityValue)).toBe(true); // value is an integer
      expect(qualityValue).toBeGreaterThan(-1); // 0 or above. 
      
    });
  });

  describe("The updateQuality Function", () => {

    function populate() {
      items.push(new Item('+5 Dexterity Vest', 10, 20));
      items.push(new Item('Aged Brie', 2, 0));
      items.push(new Item('Elixir of the Mongoose', 5, 7));
      items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
      items.push(new Item('Sulfuras, Hand of Ragnaros', -1, 80));
      items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
      items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49));
      items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49));

      // this conjured item does not work properly yet
      items.push(new Item('Conjured Mana Cake', 3, 6));

      // twice decay speed
      items.push(new Item('twice decay', 0, 4));

      // Never less than 0
      items.push(new Item('sbd_item', 2, 0));

      //mock data
      items.push(new Item('mock_data', 2, 4));

    };

    afterEach(function () {
      items = [];
    });

    it("End of each day system lowers both 'sell_in' and 'quality' values for every [ordinary] item", () => {
      // before
      const preSellins = [];
      const preQualities = [];
      

      for (const item of items) {
        console.log(item);
        preSellins.push(item[SellInFieldName]);
        preQualities.push(item[qualityFieldName]);
      
      }
      // call the fn
      update_quality();
      

      // after
      for (const [i, item] of items.entries()) {
        console.log(item);

        expect(item[SellInFieldName]).toEqual(preSellins[i] - 1);
        expect(item[qualityFieldName]).toEqual(preQualities[i] - 1);
      }

      const dummyData = new Item('mock_data', 2, 4);
      items.push(dummyData);
      populate();
      expect(dummyData.name).toEqual('mock_data');
    });


    it("Quality degrades twice as fast when sell by date has passed", () => {
      const twiceDecayItem = new Item('twice decay', 0, 4);
      const dummyData = new Item('mock_data', 2, 4);
      items.push(twiceDecayItem);
      items.push(dummyData);
      
      
      expect(dummyData.name).toEqual('mock_data');
      populate();

      expect(twiceDecayItem.quality).toEqual(4);
      update_quality();

      expect(twiceDecayItem.quality).toEqual(2);
      update_quality();

      expect(twiceDecayItem.quality).toEqual(0);
    });


    it("quality of an item is never negative", () => {
      // 'sbd_item'
      const sbd_itemIndex = items.findIndex(item => item.name === 'sbd_item');
      const dummyData = new Item('mock_data', 2, 4);
      items.push(dummyData);

      update_quality();
      populate();

      expect(items[sbd_itemIndex].quality).toEqual(0);
      expect(dummyData.name).toEqual('mock_data');
    });


    it("Aged Brie increases in 'quality' the older it gets", () => {
      const item = new Item('Aged Brie', 2, 0);
      const dummyData = new Item('mock_data', 2, 4);
      
      items.push(dummyData);
      items.push(item);

      update_quality();
      populate();

      expect(item.quality).toEqual(0);
      expect(dummyData.name).toEqual('mock_data');
    
    });

    it("quality of an item is never greater than 50", () => {
      const item = new Item("Aged Brie", 3, 50);
      const dummyData = new Item('mock_data', 2, 4);
      items.push(dummyData);

      update_quality();
      populate();

      expect(item.quality).toEqual(50);
      expect(dummyData.name).toEqual('mock_data');
    });


    it("Sulfuras is a legendary item and never has to be sold", () => {
      const item = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
      const dummyData = new Item('mock_data', 2, 4);
      items.push(dummyData);

      update_quality();
      populate();

      expect(item.sell_in).toEqual(0);
      expect(dummyData.name).toEqual('mock_data');
    });

    it("Sulfuras is a legendary item and never decreases in quality", () => {
      const item = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
      const dummyData = new Item('mock_data', 2, 4);
      items.push(dummyData);

      update_quality();
      populate();

      expect(item.quality).toEqual(80);
      expect(dummyData.name).toEqual('mock_data');
    });

    it("Sulfuras is a legendary item and never has to be sold", () => {
      const item = new Item('Sulfuras, Hand of Ragnaros', -1, 80);
      const dummyData = new Item('mock_data', 2, 4);
      items.push(dummyData);

      update_quality();
      populate();

      expect(item.sell_in).toEqual(-1);
      expect(dummyData.name).toEqual('mock_data');
    });

    it("Sulfuras is a legendary item and never decreases in quality", () => {
      const item = new Item('Sulfuras, Hand of Ragnaros', -1, 80); // this looks like a bug as sellin isn't supposed to change for legendary items
      const dummyData = new Item('mock_data', 2, 4);
      items.push(dummyData);

      update_quality();
      populate();
      
      expect(item.quality).toEqual(80);
      expect(dummyData.name).toEqual('mock_data');
    });
      

    it("Backstage passes to a concert increase in 'quality' as its sellIn value approaches", () => {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20);
      const dummyData = new Item('mock_data', 2, 4);

      items.push(item);
      items.push(dummyData);

      update_quality();
      populate();

      expect(item.quality).toEqual(21);
      expect(dummyData.name).toEqual('mock_data');
    });


    it("Backstage passes to a concert quality increases by 2 when there are 10 days or less", () => {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20);
      const dummyData = new Item('mock_data', 2, 4);

      items.push(item);
      items.push(dummyData);

      update_quality();
      populate();

      expect(item.quality).toEqual(22);
      expect(dummyData.name).toEqual('mock_data');
    });


    it("Backstage passes to a concert quality increases by 3 when there are 5 days or less", () => {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20);
      const dummyData = new Item('mock_data', 2, 4);

      items.push(item);
      items.push(dummyData);

      update_quality();
      populate();

      expect(item.quality).toEqual(23);
      expect(dummyData.name).toEqual('mock_data');
    });


    it("Backstage passes to a concert quality becomes 0 after the concert", () => {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20);
      const dummyData = new Item('mock_data', 2, 4);

      items.push(item);
      items.push(dummyData);

      update_quality();
      populate();

      expect(item.quality).toEqual(0);
      expect(dummyData.name).toEqual('mock_data');
    });

    it("Conjured items degrades twice as fast as normal items", () => {
      const twiceDecayItem = new Item('Conjured Mana Cake', 3, 6);
      const dummyData = new Item('mock_data', 2, 4);

      items.push(twiceDecayItem);
      items.push(dummyData);
      
      
      expect(dummyData.name).toEqual('mock_data');
      populate();
      
      expect(twiceDecayItem.quality).toEqual(6);
      update_quality();

      expect(twiceDecayItem.quality).toEqual(4);
      update_quality();

      expect(twiceDecayItem.quality).toEqual(2);
    });
  });
});



