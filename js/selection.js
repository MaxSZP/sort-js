var vm = new Vue({
    el: '#app',
    data: {
        items: [],
        step: 35,
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
            for (var i = 0; i < 10; i++) {
                this.items.push({
                    id: i,
                    height: 50 + this.step + 'px',
                    active: false,
                    min: false,
                    sort: false
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
            vm.items.forEach(function (item, i, arr) {
                arr[i].active = false;
            });
            this.items = _.shuffle(this.items)
        },
        animationSort: function () {

            var len = vm.items.length;
            var i = 0;

            var timer = setTimeout(function g() {
                var min = i;
                vm.items[min].min = true;
                var j = i;
                var timerId = setTimeout(function go() {
                    vm.items.forEach(function (item, i, arr) {
                        arr[i].active = false;
                    });
                    vm.items[j].active = true;
                    console.log(j);
                    if (vm.items[j].id < vm.items[min].id) {
                        min = j;
                        vm.items.forEach(function (item, i, arr) {
                            arr[i].min = false;
                        });
                        vm.items[min].min = true;
                        console.log('<<<<< '+ min);
                    }
                    if ( j == len - 1) {
                        vm.items[min].sort = true;
                        var tmp = vm.items[min];
                        vm.remove(min);
                        vm.add(i - 1, tmp);
                    }
                    if (j < len - 1 /*- (j-1)*/) setTimeout(go, vm.animationSpeed);
                    j++;
                }, 100);

                if (i < len - 1) setTimeout(g, vm.animationSpeed * vm.items.length);
                i++;
            }, 100);

        },
    }
});