var vm = new Vue({
    el: '#app',
    data: {
        items: [],
        step: 0,
        animationSpeed: 2000,
        maxAnimationSpeed: 5000,
        tmp: {},
        i: 0,
        arr: [4, 5, 2, 10, 5]
    },
    created: function () {
        this.generateArray();
        //  console.log(this.items);
    },
    filters: {
        toSecond: function (value) {
            return value / 1000 + ' c.'
        }
    },
    methods: {
        generateArray: function () {
            for (var i = 0; i < 9; i++) {
                this.items.push({
                    id: i,
                    height: 50 + this.step + 'px',
                    active: false
                });
                this.step = this.step + 15;
            }
        },
        randomIndex: function () {
            return Math.floor(Math.random() * this.items.length)
        },
        add: function (i, obj) {
            this.items.splice(i, 0, obj)
        },
        remove: function (i) {
            this.items.splice(i, 1)
        },
        shuffle: function () {
            vm.items.forEach(function(item, i, arr) {
                arr[i].active = false;
            });
            this.items = _.shuffle(this.items)
        },
        animationSort: function () {
           // var ArrayBySort = [2,7,22,6,76,9,6546,27];

            var n = vm.items.length, i = 1, j = 2;
            var timerId = setTimeout(function go() {

                vm.items.forEach(function(item, i, arr) {
                    arr[i].active = false;
                });
                vm.items[i].active = true;
                vm.items[i - 1].active = true;
                if (vm.items[i - 1].id < vm.items[i].id) {
                    i = j;
                    j++;
                   // i++;
                }
                else {
                    var tmp = vm.items[i - 1];
                    // console.log(tmp);
                    vm.remove(i - 1);
                    vm.add(i, tmp);
                    i--;
                    if (i == 0) {
                        i = j;
                        j++;
                      //  i++;
                    }
                }

                if(i == n ) {
                    vm.items.forEach(function(item, i, arr) {
                        arr[i].active = true;
                    });
                }
                if (i < n) setTimeout(go, vm.animationSpeed);
            }, 100);


        },
        gnomeSort: function (ArrayBySort) {
            var count = 0;
            var n = ArrayBySort.length, i = 1, j = 2;
            while (i < n) {
                if (ArrayBySort[i - 1] < ArrayBySort[i]) {
                    i = j;
                    j++;
                }
                else {
                    var t = ArrayBySort[i - 1];
                    ArrayBySort[i - 1] = ArrayBySort[i];
                    ArrayBySort[i] = t;
                    i--;
                    if (i == 0) {
                        i = j;
                        j++;
                    }
                }
                count++;
            }
            this.count = count;
            return ArrayBySort;
        }
    }
});