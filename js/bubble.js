var vm = new Vue({
    el: '#app',
    data: {
        items: [],
        step: 15,
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
            vm.items.forEach(function (item, i, arr) {
                arr[i].active = false;
            });
            this.items = _.shuffle(this.items)
        },
        animationSort: function () {
            var j = 1;
            var timer = setTimeout(function g() {
                var i = 1;
                var timerId = setTimeout(function go() {
                    vm.items.forEach(function (item, i, arr) {
                        arr[i].active = false;
                    });
                    console.log(i);
                    vm.items[i].active = true;
                    vm.items[i - 1].active = true;
                    if (vm.items[i].id < vm.items[i - 1].id) {

                        var tmp = vm.items[i - 1];
                        vm.remove(i - 1);
                        vm.add(i, tmp);
                    }

                    if (i < vm.items.length /*- (j-1)*/) setTimeout(go, vm.animationSpeed);
                    i++;
                }, 100);
                if (j < vm.items.length - 1) setTimeout(g, vm.animationSpeed * vm.items.length);
                j++;
            }, 100);


        }
    }
});